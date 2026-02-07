-- Migration: 002_conflict_functions.sql

CREATE OR REPLACE FUNCTION detect_capability_overlaps(p_org_id UUID)
RETURNS TABLE(pcf_id TEXT, capability_name TEXT, initiative_count BIGINT,
  initiative_names TEXT[], artifact_ids UUID[])
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT cm.pcf_id, cm.capability_name,
    COUNT(DISTINCT aa.source_entity_id),
    array_agg(DISTINCT aa.artifact_name),
    array_agg(DISTINCT aa.id)
  FROM architecture_artifacts aa
  JOIN capability_map cm ON aa.pcf_category_id = cm.pcf_id AND aa.org_id = cm.org_id
  WHERE aa.org_id = p_org_id AND aa.lifecycle_status = 'active'
    AND aa.source_entity_type = 'initiative'
  GROUP BY cm.pcf_id, cm.capability_name
  HAVING COUNT(DISTINCT aa.source_entity_id) > 1
  ORDER BY COUNT(DISTINCT aa.source_entity_id) DESC;
END; $$;

CREATE OR REPLACE FUNCTION detect_cross_domain_artifacts(p_org_id UUID)
RETURNS TABLE(artifact_id UUID, artifact_name TEXT, source_module TEXT,
  domains TEXT[], domain_count BIGINT)
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT aa.id, aa.artifact_name, aa.source_module,
    array_agg(DISTINCT adt.domain),
    COUNT(DISTINCT adt.domain)
  FROM architecture_artifacts aa
  JOIN architecture_domain_tags adt ON aa.id = adt.artifact_id
  WHERE aa.org_id = p_org_id AND aa.lifecycle_status = 'active'
  GROUP BY aa.id, aa.artifact_name, aa.source_module
  HAVING COUNT(DISTINCT adt.domain) >= 2
  ORDER BY COUNT(DISTINCT adt.domain) DESC;
END; $$;

CREATE OR REPLACE FUNCTION scan_parking_lot_conflicts(p_org_id UUID)
RETURNS TABLE(parked_item_id UUID, parked_item_name TEXT,
  active_artifact_id UUID, active_artifact_name TEXT, overlapping_capabilities TEXT[])
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT pl.id, pl.item_name, aa.id, aa.artifact_name,
    (SELECT array_agg(cap) FROM unnest(pl.affected_capabilities) cap
     WHERE cap = aa.pcf_category_id)
  FROM parking_lot pl
  JOIN architecture_artifacts aa
    ON aa.org_id = p_org_id AND aa.lifecycle_status = 'active'
    AND aa.pcf_category_id = ANY(pl.affected_capabilities)
  WHERE pl.org_id = p_org_id AND pl.status = 'parked';
END; $$;
