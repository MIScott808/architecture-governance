import { AUTO_TAG_RULES, HUMAN_VALIDATION_THRESHOLD } from './tag-rules';
import type { ArchitectureDomain, DomainTag } from '@/lib/types/artifacts';

export interface ClassificationResult {
  domain: ArchitectureDomain;
  subDomain: string;
  confidence: number;
  needsHumanValidation: boolean;
}

export function classifyArtifact(
  sourceModule: string,
  sourceEntityType: string
): ClassificationResult | null {
  const key = `${sourceModule}:${sourceEntityType}`;
  const rule = AUTO_TAG_RULES[key];

  if (!rule) return null;

  return {
    domain: rule.defaultDomain,
    subDomain: rule.defaultSubDomain,
    confidence: rule.confidence,
    needsHumanValidation: rule.confidence < HUMAN_VALIDATION_THRESHOLD,
  };
}

export function buildAutoTag(
  artifactId: string,
  classification: ClassificationResult,
  userId: string
): Omit<DomainTag, 'id' | 'createdAt'> {
  return {
    artifactId,
    domain: classification.domain,
    subDomain: classification.subDomain,
    tagSource: 'auto',
    confidence: classification.confidence,
    taggedBy: userId,
    reasoning: `Auto-classified with confidence ${(classification.confidence * 100).toFixed(0)}%`,
  };
}
