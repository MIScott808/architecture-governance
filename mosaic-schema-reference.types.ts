// MOSAIC Archive — TypeScript Schema Reference
// Exported: 2026-05-12 before project deletion
// Source: Supabase project eaagcnxnkjvykfypefcb (MOSAIC)
// Purpose: Reference DDL for porting tables forward into mana-academy
// Do NOT import this directly — use manaolana-academy-migrations/types/database.types.ts instead
// Claude Code: use this file as a field-by-field reference when authoring migrations for Labs 2-20

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      adkar_assessments: {
        Row: {
          ability_score: number | null
          assessed_by: string | null
          assessment_date: string
          assessment_type: string | null
          awareness_score: number | null
          barrier_point: string | null
          barrier_score: number | null
          context_questions: Json | null
          created_at: string | null
          desire_score: number | null
          id: string
          knowledge_score: number | null
          notes: string | null
          overall_score: number | null
          program_id: string | null
          question_responses: Json
          reinforcement_score: number | null
          stakeholder_group_id: string | null
          user_id: string
        }
        Insert: {
          ability_score?: number | null
          assessed_by?: string | null
          assessment_date?: string
          assessment_type?: string | null
          awareness_score?: number | null
          barrier_point?: string | null
          barrier_score?: number | null
          context_questions?: Json | null
          created_at?: string | null
          desire_score?: number | null
          id?: string
          knowledge_score?: number | null
          notes?: string | null
          overall_score?: number | null
          program_id?: string | null
          question_responses?: Json
          reinforcement_score?: number | null
          stakeholder_group_id?: string | null
          user_id: string
        }
        Update: {
          ability_score?: number | null
          assessed_by?: string | null
          assessment_date?: string
          assessment_type?: string | null
          awareness_score?: number | null
          barrier_point?: string | null
          barrier_score?: number | null
          context_questions?: Json | null
          created_at?: string | null
          desire_score?: number | null
          id?: string
          knowledge_score?: number | null
          notes?: string | null
          overall_score?: number | null
          program_id?: string | null
          question_responses?: Json
          reinforcement_score?: number | null
          stakeholder_group_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "adkar_assessments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "cm_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adkar_assessments_stakeholder_group_id_fkey"
            columns: ["stakeholder_group_id"]
            isOneToOne: false
            referencedRelation: "cm_stakeholder_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      adm_cycles: {
        Row: {
          baseline_architecture_snapshot: Json | null
          completed_at: string | null
          created_at: string | null
          current_phase: string | null
          cycle_name: string
          cycle_number: number
          gap_analysis_results: Json | null
          id: string
          phase_history: Json | null
          started_at: string | null
          status: string | null
          target_architecture_snapshot: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          baseline_architecture_snapshot?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_phase?: string | null
          cycle_name: string
          cycle_number: number
          gap_analysis_results?: Json | null
          id?: string
          phase_history?: Json | null
          started_at?: string | null
          status?: string | null
          target_architecture_snapshot?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          baseline_architecture_snapshot?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_phase?: string | null
          cycle_name?: string
          cycle_number?: number
          gap_analysis_results?: Json | null
          id?: string
          phase_history?: Json | null
          started_at?: string | null
          status?: string | null
          target_architecture_snapshot?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      application_inventory: {
        Row: {
          business_criticality: string | null
          business_owner: string | null
          category: string | null
          created_at: string | null
          deployment_type: string | null
          description: string | null
          enriched_by_search: boolean | null
          id: string
          lifecycle_status: string | null
          metadata: Json | null
          name: string
          search_citations: string[] | null
          technology_stack: string[] | null
          updated_at: string | null
          url: string | null
          user_id: string
          vendor: string | null
        }
        Insert: {
          business_criticality?: string | null
          business_owner?: string | null
          category?: string | null
          created_at?: string | null
          deployment_type?: string | null
          description?: string | null
          enriched_by_search?: boolean | null
          id?: string
          lifecycle_status?: string | null
          metadata?: Json | null
          name: string
          search_citations?: string[] | null
          technology_stack?: string[] | null
          updated_at?: string | null
          url?: string | null
          user_id: string
          vendor?: string | null
        }
        Update: {
          business_criticality?: string | null
          business_owner?: string | null
          category?: string | null
          created_at?: string | null
          deployment_type?: string | null
          description?: string | null
          enriched_by_search?: boolean | null
          id?: string
          lifecycle_status?: string | null
          metadata?: Json | null
          name?: string
          search_citations?: string[] | null
          technology_stack?: string[] | null
          updated_at?: string | null
          url?: string | null
          user_id?: string
          vendor?: string | null
        }
        Relationships: []
      }
      architecture_artifacts: {
        Row: {
          adm_cycle_id: string | null
          adm_phase: string | null
          artifact_description: string | null
          artifact_name: string
          auto_tag_confidence: number | null
          created_at: string | null
          human_validated: boolean | null
          id: string
          lifecycle_status: string | null
          metadata: Json | null
          pcf_category_id: string | null
          pcf_category_name: string | null
          source_entity_id: string
          source_entity_type: string
          source_module: string
          updated_at: string | null
          user_id: string
          validated_at: string | null
          validated_by: string | null
        }
        Insert: {
          adm_cycle_id?: string | null
          adm_phase?: string | null
          artifact_description?: string | null
          artifact_name: string
          auto_tag_confidence?: number | null
          created_at?: string | null
          human_validated?: boolean | null
          id?: string
          lifecycle_status?: string | null
          metadata?: Json | null
          pcf_category_id?: string | null
          pcf_category_name?: string | null
          source_entity_id: string
          source_entity_type: string
          source_module: string
          updated_at?: string | null
          user_id: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Update: {
          adm_cycle_id?: string | null
          adm_phase?: string | null
          artifact_description?: string | null
          artifact_name?: string
          auto_tag_confidence?: number | null
          created_at?: string | null
          human_validated?: boolean | null
          id?: string
          lifecycle_status?: string | null
          metadata?: Json | null
          pcf_category_id?: string | null
          pcf_category_name?: string | null
          source_entity_id?: string
          source_entity_type?: string
          source_module?: string
          updated_at?: string | null
          user_id?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "architecture_artifacts_adm_cycle_id_fkey"
            columns: ["adm_cycle_id"]
            isOneToOne: false
            referencedRelation: "adm_cycles"
            referencedColumns: ["id"]
          },
        ]
      }
      architecture_conflicts: {
        Row: {
          affected_capabilities: string[] | null
          affected_domains: string[] | null
          artifact_a_id: string | null
          artifact_b_id: string | null
          conflict_type: string
          created_at: string | null
          description: string
          detection_method: string | null
          id: string
          resolution_notes: string | null
          resolution_status: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          affected_capabilities?: string[] | null
          affected_domains?: string[] | null
          artifact_a_id?: string | null
          artifact_b_id?: string | null
          conflict_type: string
          created_at?: string | null
          description: string
          detection_method?: string | null
          id?: string
          resolution_notes?: string | null
          resolution_status?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          affected_capabilities?: string[] | null
          affected_domains?: string[] | null
          artifact_a_id?: string | null
          artifact_b_id?: string | null
          conflict_type?: string
          created_at?: string | null
          description?: string
          detection_method?: string | null
          id?: string
          resolution_notes?: string | null
          resolution_status?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "architecture_conflicts_artifact_a_id_fkey"
            columns: ["artifact_a_id"]
            isOneToOne: false
            referencedRelation: "architecture_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "architecture_conflicts_artifact_b_id_fkey"
            columns: ["artifact_b_id"]
            isOneToOne: false
            referencedRelation: "architecture_artifacts"
            referencedColumns: ["id"]
          },
        ]
      }
      architecture_domain_tags: {
        Row: {
          archimate_element_type: string | null
          artifact_id: string | null
          confidence: number | null
          created_at: string | null
          domain: string
          id: string
          reasoning: string | null
          sub_domain: string | null
          tag_source: string | null
          tagged_by: string | null
        }
        Insert: {
          archimate_element_type?: string | null
          artifact_id?: string | null
          confidence?: number | null
          created_at?: string | null
          domain: string
          id?: string
          reasoning?: string | null
          sub_domain?: string | null
          tag_source?: string | null
          tagged_by?: string | null
        }
        Update: {
          archimate_element_type?: string | null
          artifact_id?: string | null
          confidence?: number | null
          created_at?: string | null
          domain?: string
          id?: string
          reasoning?: string | null
          sub_domain?: string | null
          tag_source?: string | null
          tagged_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "architecture_domain_tags_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "architecture_artifacts"
            referencedColumns: ["id"]
          },
        ]
      }
      architecture_principles: {
        Row: {
          created_at: string | null
          domain: string
          id: string
          implications: string | null
          principle_name: string
          priority: number | null
          rationale: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          domain: string
          id?: string
          implications?: string | null
          principle_name: string
          priority?: number | null
          rationale?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          domain?: string
          id?: string
          implications?: string | null
          principle_name?: string
          priority?: number | null
          rationale?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      architecture_states: {
        Row: {
          adm_cycle_id: string | null
          architecture_elements: Json
          capability_scores: Json
          captured_at: string | null
          created_by: string | null
          domain: string
          gap_summary: Json | null
          id: string
          state_type: string
          user_id: string
        }
        Insert: {
          adm_cycle_id?: string | null
          architecture_elements: Json
          capability_scores: Json
          captured_at?: string | null
          created_by?: string | null
          domain: string
          gap_summary?: Json | null
          id?: string
          state_type: string
          user_id: string
        }
        Update: {
          adm_cycle_id?: string | null
          architecture_elements?: Json
          capability_scores?: Json
          captured_at?: string | null
          created_by?: string | null
          domain?: string
          gap_summary?: Json | null
          id?: string
          state_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "architecture_states_adm_cycle_id_fkey"
            columns: ["adm_cycle_id"]
            isOneToOne: false
            referencedRelation: "adm_cycles"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_snapshots: {
        Row: {
          assessment_data: Json
          category_scores: Json | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          overall_score: number | null
          snapshot_date: string | null
          total_assessed: number | null
          total_gaps: number | null
          user_id: string
        }
        Insert: {
          assessment_data: Json
          category_scores?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          overall_score?: number | null
          snapshot_date?: string | null
          total_assessed?: number | null
          total_gaps?: number | null
          user_id: string
        }
        Update: {
          assessment_data?: Json
          category_scores?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          overall_score?: number | null
          snapshot_date?: string | null
          total_assessed?: number | null
          total_gaps?: number | null
          user_id?: string
        }
        Relationships: []
      }
      assessments: {
        Row: {
          created_at: string | null
          current_maturity: number | null
          current_state: string | null
          id: string
          initiative_id: string | null
          notes: string | null
          owner: string | null
          owner_user_id: string | null
          priority: number | null
          process_id: string
          status: string | null
          strategic_priority_ids: string | null
          target_maturity: number | null
          target_state: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_maturity?: number | null
          current_state?: string | null
          id?: string
          initiative_id?: string | null
          notes?: string | null
          owner?: string | null
          owner_user_id?: string | null
          priority?: number | null
          process_id: string
          status?: string | null
          strategic_priority_ids?: string | null
          target_maturity?: number | null
          target_state?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_maturity?: number | null
          current_state?: string | null
          id?: string
          initiative_id?: string | null
          notes?: string | null
          owner?: string | null
          owner_user_id?: string | null
          priority?: number | null
          process_id?: string
          status?: string | null
          strategic_priority_ids?: string | null
          target_maturity?: number | null
          target_state?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      belt_progress: {
        Row: {
          belt_level: Database["public"]["Enums"]["belt_level"]
          created_at: string
          id: string
          profile_id: string
          requirements: Json
          unlocked_at: string | null
        }
        Insert: {
          belt_level: Database["public"]["Enums"]["belt_level"]
          created_at?: string
          id?: string
          profile_id: string
          requirements?: Json
          unlocked_at?: string | null
        }
        Update: {
          belt_level?: Database["public"]["Enums"]["belt_level"]
          created_at?: string
          id?: string
          profile_id?: string
          requirements?: Json
          unlocked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "belt_progress_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bpmn_diagrams: {
        Row: {
          archived_at: string | null
          bpmn_xml: string | null
          bpmn_xml_generated_at: string | null
          created_at: string | null
          description: string | null
          diagram_json: Json
          id: string
          linked_applications: string[] | null
          linked_capabilities: string[] | null
          name: string
          parent_version_id: string | null
          process_id: string
          status: string | null
          tags: string[] | null
          updated_at: string | null
          user_id: string
          version: number | null
        }
        Insert: {
          archived_at?: string | null
          bpmn_xml?: string | null
          bpmn_xml_generated_at?: string | null
          created_at?: string | null
          description?: string | null
          diagram_json?: Json
          id?: string
          linked_applications?: string[] | null
          linked_capabilities?: string[] | null
          name: string
          parent_version_id?: string | null
          process_id: string
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id: string
          version?: number | null
        }
        Update: {
          archived_at?: string | null
          bpmn_xml?: string | null
          bpmn_xml_generated_at?: string | null
          created_at?: string | null
          description?: string | null
          diagram_json?: Json
          id?: string
          linked_applications?: string[] | null
          linked_capabilities?: string[] | null
          name?: string
          parent_version_id?: string | null
          process_id?: string
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bpmn_diagrams_parent_version_id_fkey"
            columns: ["parent_version_id"]
            isOneToOne: false
            referencedRelation: "bpmn_diagrams"
            referencedColumns: ["id"]
          },
        ]
      }
      bpmn_node_links: {
        Row: {
          artifact_id: string | null
          capability_id: string | null
          created_at: string | null
          diagram_id: string
          id: string
          link_notes: string | null
          node_id: string
          node_label: string | null
          node_type: string
        }
        Insert: {
          artifact_id?: string | null
          capability_id?: string | null
          created_at?: string | null
          diagram_id: string
          id?: string
          link_notes?: string | null
          node_id: string
          node_label?: string | null
          node_type: string
        }
        Update: {
          artifact_id?: string | null
          capability_id?: string | null
          created_at?: string | null
          diagram_id?: string
          id?: string
          link_notes?: string | null
          node_id?: string
          node_label?: string | null
          node_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "bpmn_node_links_diagram_id_fkey"
            columns: ["diagram_id"]
            isOneToOne: false
            referencedRelation: "bpmn_diagrams"
            referencedColumns: ["id"]
          },
        ]
      }
      capability_map: {
        Row: {
          business_criticality: string | null
          capability_level: number | null
          capability_name: string
          created_at: string | null
          id: string
          maturity_current: string | null
          maturity_score: number | null
          maturity_target: string | null
          metadata: Json | null
          owner_user_id: string | null
          parent_id: string | null
          pcf_id: string
          pcf_name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          business_criticality?: string | null
          capability_level?: number | null
          capability_name: string
          created_at?: string | null
          id?: string
          maturity_current?: string | null
          maturity_score?: number | null
          maturity_target?: string | null
          metadata?: Json | null
          owner_user_id?: string | null
          parent_id?: string | null
          pcf_id: string
          pcf_name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          business_criticality?: string | null
          capability_level?: number | null
          capability_name?: string
          created_at?: string | null
          id?: string
          maturity_current?: string | null
          maturity_score?: number | null
          maturity_target?: string | null
          metadata?: Json | null
          owner_user_id?: string | null
          parent_id?: string | null
          pcf_id?: string
          pcf_name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "capability_map_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "capability_map"
            referencedColumns: ["id"]
          },
        ]
      }
      cm_communication_items: {
        Row: {
          actual_date: string | null
          adkar_dimension: string | null
          channel: string | null
          created_at: string | null
          effectiveness_rating: number | null
          feedback_notes: string | null
          id: string
          message_summary: string | null
          program_id: string | null
          scheduled_date: string | null
          sender: string | null
          sender_role: string | null
          status: string | null
          target_groups: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_date?: string | null
          adkar_dimension?: string | null
          channel?: string | null
          created_at?: string | null
          effectiveness_rating?: number | null
          feedback_notes?: string | null
          id?: string
          message_summary?: string | null
          program_id?: string | null
          scheduled_date?: string | null
          sender?: string | null
          sender_role?: string | null
          status?: string | null
          target_groups?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_date?: string | null
          adkar_dimension?: string | null
          channel?: string | null
          created_at?: string | null
          effectiveness_rating?: number | null
          feedback_notes?: string | null
          id?: string
          message_summary?: string | null
          program_id?: string | null
          scheduled_date?: string | null
          sender?: string | null
          sender_role?: string | null
          status?: string | null
          target_groups?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cm_communication_items_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "cm_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      cm_intervention_plans: {
        Row: {
          actual_score_improvement: number | null
          assessment_id: string | null
          completed_date: string | null
          created_at: string | null
          deliverables: Json | null
          description: string | null
          due_date: string | null
          id: string
          intervention_type: string
          owner: string | null
          priority: string | null
          program_id: string | null
          stakeholder_group_id: string | null
          start_date: string | null
          status: string | null
          sync_target_module: string | null
          synced_milestone_id: string | null
          target_dimension: string
          target_score_improvement: number | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_score_improvement?: number | null
          assessment_id?: string | null
          completed_date?: string | null
          created_at?: string | null
          deliverables?: Json | null
          description?: string | null
          due_date?: string | null
          id?: string
          intervention_type: string
          owner?: string | null
          priority?: string | null
          program_id?: string | null
          stakeholder_group_id?: string | null
          start_date?: string | null
          status?: string | null
          sync_target_module?: string | null
          synced_milestone_id?: string | null
          target_dimension: string
          target_score_improvement?: number | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_score_improvement?: number | null
          assessment_id?: string | null
          completed_date?: string | null
          created_at?: string | null
          deliverables?: Json | null
          description?: string | null
          due_date?: string | null
          id?: string
          intervention_type?: string
          owner?: string | null
          priority?: string | null
          program_id?: string | null
          stakeholder_group_id?: string | null
          start_date?: string | null
          status?: string | null
          sync_target_module?: string | null
          synced_milestone_id?: string | null
          target_dimension?: string
          target_score_improvement?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cm_intervention_plans_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "adkar_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cm_intervention_plans_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "cm_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cm_intervention_plans_stakeholder_group_id_fkey"
            columns: ["stakeholder_group_id"]
            isOneToOne: false
            referencedRelation: "cm_stakeholder_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      cm_milestone_sync: {
        Row: {
          created_at: string | null
          id: string
          last_synced_at: string | null
          source_id: string
          source_type: string
          sync_status: string | null
          target_entity_id: string | null
          target_entity_name: string | null
          target_entity_type: string
          target_module: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_synced_at?: string | null
          source_id: string
          source_type: string
          sync_status?: string | null
          target_entity_id?: string | null
          target_entity_name?: string | null
          target_entity_type: string
          target_module: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_synced_at?: string | null
          source_id?: string
          source_type?: string
          sync_status?: string | null
          target_entity_id?: string | null
          target_entity_name?: string | null
          target_entity_type?: string
          target_module?: string
          user_id?: string
        }
        Relationships: []
      }
      cm_programs: {
        Row: {
          barrier_point: string | null
          change_scale: string | null
          change_type: string | null
          created_at: string | null
          description: string | null
          id: string
          initiative_id: string | null
          metadata: Json | null
          name: string
          overall_readiness_score: number | null
          project_id: string | null
          sponsor_name: string | null
          sponsor_role: string | null
          status: string | null
          target_go_live: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          barrier_point?: string | null
          change_scale?: string | null
          change_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          initiative_id?: string | null
          metadata?: Json | null
          name: string
          overall_readiness_score?: number | null
          project_id?: string | null
          sponsor_name?: string | null
          sponsor_role?: string | null
          status?: string | null
          target_go_live?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          barrier_point?: string | null
          change_scale?: string | null
          change_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          initiative_id?: string | null
          metadata?: Json | null
          name?: string
          overall_readiness_score?: number | null
          project_id?: string | null
          sponsor_name?: string | null
          sponsor_role?: string | null
          status?: string | null
          target_go_live?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cm_readiness_gates: {
        Row: {
          ability_threshold: number | null
          awareness_threshold: number | null
          created_at: string | null
          description: string | null
          desire_threshold: number | null
          evaluation_details: Json | null
          gate_name: string
          gate_status: string | null
          id: string
          knowledge_threshold: number | null
          last_evaluated_at: string | null
          override_at: string | null
          override_by: string | null
          override_reason: string | null
          program_id: string | null
          reinforcement_threshold: number | null
          required_group_ids: string[] | null
          target_milestone_id: string | null
          target_milestone_name: string
          target_module: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ability_threshold?: number | null
          awareness_threshold?: number | null
          created_at?: string | null
          description?: string | null
          desire_threshold?: number | null
          evaluation_details?: Json | null
          gate_name: string
          gate_status?: string | null
          id?: string
          knowledge_threshold?: number | null
          last_evaluated_at?: string | null
          override_at?: string | null
          override_by?: string | null
          override_reason?: string | null
          program_id?: string | null
          reinforcement_threshold?: number | null
          required_group_ids?: string[] | null
          target_milestone_id?: string | null
          target_milestone_name: string
          target_module: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ability_threshold?: number | null
          awareness_threshold?: number | null
          created_at?: string | null
          description?: string | null
          desire_threshold?: number | null
          evaluation_details?: Json | null
          gate_name?: string
          gate_status?: string | null
          id?: string
          knowledge_threshold?: number | null
          last_evaluated_at?: string | null
          override_at?: string | null
          override_by?: string | null
          override_reason?: string | null
          program_id?: string | null
          reinforcement_threshold?: number | null
          required_group_ids?: string[] | null
          target_milestone_id?: string | null
          target_milestone_name?: string
          target_module?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cm_readiness_gates_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "cm_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      cm_stakeholder_groups: {
        Row: {
          created_at: string | null
          current_state_description: string | null
          future_state_description: string | null
          group_name: string
          group_size: number | null
          id: string
          impact_level: string | null
          influence_level: string | null
          key_concerns: string | null
          metadata: Json | null
          program_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_state_description?: string | null
          future_state_description?: string | null
          group_name: string
          group_size?: number | null
          id?: string
          impact_level?: string | null
          influence_level?: string | null
          key_concerns?: string | null
          metadata?: Json | null
          program_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_state_description?: string | null
          future_state_description?: string | null
          group_name?: string
          group_size?: number | null
          id?: string
          impact_level?: string | null
          influence_level?: string | null
          key_concerns?: string | null
          metadata?: Json | null
          program_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cm_stakeholder_groups_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "cm_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      cm_training_items: {
        Row: {
          actual_completion_percent: number | null
          actual_date: string | null
          adkar_dimension: string | null
          completion_target_percent: number | null
          created_at: string | null
          description: string | null
          duration_hours: number | null
          id: string
          materials_url: string | null
          program_id: string | null
          scheduled_date: string | null
          status: string | null
          sync_target_module: string | null
          synced_milestone_id: string | null
          target_groups: string[] | null
          title: string
          training_type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_completion_percent?: number | null
          actual_date?: string | null
          adkar_dimension?: string | null
          completion_target_percent?: number | null
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          id?: string
          materials_url?: string | null
          program_id?: string | null
          scheduled_date?: string | null
          status?: string | null
          sync_target_module?: string | null
          synced_milestone_id?: string | null
          target_groups?: string[] | null
          title: string
          training_type?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_completion_percent?: number | null
          actual_date?: string | null
          adkar_dimension?: string | null
          completion_target_percent?: number | null
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          id?: string
          materials_url?: string | null
          program_id?: string | null
          scheduled_date?: string | null
          status?: string | null
          sync_target_module?: string | null
          synced_milestone_id?: string | null
          target_groups?: string[] | null
          title?: string
          training_type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cm_training_items_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "cm_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_members: {
        Row: {
          cohort_id: string
          joined_at: string
          profile_id: string
        }
        Insert: {
          cohort_id: string
          joined_at?: string
          profile_id: string
        }
        Update: {
          cohort_id?: string
          joined_at?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_members_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cohorts: {
        Row: {
          belt_level: Database["public"]["Enums"]["belt_level"]
          code: string
          created_at: string
          id: string
          is_active: boolean
          max_members: number
          name: string
          owner_id: string | null
        }
        Insert: {
          belt_level?: Database["public"]["Enums"]["belt_level"]
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          max_members?: number
          name: string
          owner_id?: string | null
        }
        Update: {
          belt_level?: Database["public"]["Enums"]["belt_level"]
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          max_members?: number
          name?: string
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cohorts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_a3_reports: {
        Row: {
          background: string | null
          countermeasures: string | null
          created_at: string | null
          current_condition: string | null
          follow_up: string | null
          goal_target: string | null
          id: string
          implementation_plan: string | null
          project_id: string
          root_cause_analysis: string | null
          snapshot_data: Json | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          background?: string | null
          countermeasures?: string | null
          created_at?: string | null
          current_condition?: string | null
          follow_up?: string | null
          goal_target?: string | null
          id?: string
          implementation_plan?: string | null
          project_id: string
          root_cause_analysis?: string | null
          snapshot_data?: Json | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          background?: string | null
          countermeasures?: string | null
          created_at?: string | null
          current_condition?: string | null
          follow_up?: string | null
          goal_target?: string | null
          id?: string
          implementation_plan?: string | null
          project_id?: string
          root_cause_analysis?: string | null
          snapshot_data?: Json | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_a3_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_analyses: {
        Row: {
          analysis_name: string
          analysis_type: string
          created_at: string | null
          data: Json | null
          findings: string | null
          id: string
          project_id: string
          updated_at: string | null
        }
        Insert: {
          analysis_name: string
          analysis_type: string
          created_at?: string | null
          data?: Json | null
          findings?: string | null
          id?: string
          project_id: string
          updated_at?: string | null
        }
        Update: {
          analysis_name?: string
          analysis_type?: string
          created_at?: string | null
          data?: Json | null
          findings?: string | null
          id?: string
          project_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_analyses_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_baselines: {
        Row: {
          cp: number | null
          cpk: number | null
          created_at: string | null
          data_points: Json | null
          dpmo: number | null
          id: string
          lsl: number | null
          mean: number | null
          median: number | null
          metric_name: string
          project_id: string
          sigma_level: number | null
          std_dev: number | null
          target: number | null
          updated_at: string | null
          usl: number | null
        }
        Insert: {
          cp?: number | null
          cpk?: number | null
          created_at?: string | null
          data_points?: Json | null
          dpmo?: number | null
          id?: string
          lsl?: number | null
          mean?: number | null
          median?: number | null
          metric_name: string
          project_id: string
          sigma_level?: number | null
          std_dev?: number | null
          target?: number | null
          updated_at?: string | null
          usl?: number | null
        }
        Update: {
          cp?: number | null
          cpk?: number | null
          created_at?: string | null
          data_points?: Json | null
          dpmo?: number | null
          id?: string
          lsl?: number | null
          mean?: number | null
          median?: number | null
          metric_name?: string
          project_id?: string
          sigma_level?: number | null
          std_dev?: number | null
          target?: number | null
          updated_at?: string | null
          usl?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_baselines_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_control_data: {
        Row: {
          control_plan_id: string | null
          created_at: string | null
          id: string
          metric_name: string
          project_id: string
          recorded_at: string | null
          subgroup_id: string | null
          value: number
        }
        Insert: {
          control_plan_id?: string | null
          created_at?: string | null
          id?: string
          metric_name: string
          project_id: string
          recorded_at?: string | null
          subgroup_id?: string | null
          value: number
        }
        Update: {
          control_plan_id?: string | null
          created_at?: string | null
          id?: string
          metric_name?: string
          project_id?: string
          recorded_at?: string | null
          subgroup_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_control_data_control_plan_id_fkey"
            columns: ["control_plan_id"]
            isOneToOne: false
            referencedRelation: "dmaic_control_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dmaic_control_data_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_control_plans: {
        Row: {
          characteristic: string
          control_method: string | null
          created_at: string | null
          frequency: string | null
          id: string
          measurement_method: string | null
          process_step: string
          project_id: string
          reaction_plan: string | null
          responsible: string | null
          sample_size: string | null
          specification: string | null
          updated_at: string | null
        }
        Insert: {
          characteristic: string
          control_method?: string | null
          created_at?: string | null
          frequency?: string | null
          id?: string
          measurement_method?: string | null
          process_step: string
          project_id: string
          reaction_plan?: string | null
          responsible?: string | null
          sample_size?: string | null
          specification?: string | null
          updated_at?: string | null
        }
        Update: {
          characteristic?: string
          control_method?: string | null
          created_at?: string | null
          frequency?: string | null
          id?: string
          measurement_method?: string | null
          process_step?: string
          project_id?: string
          reaction_plan?: string | null
          responsible?: string | null
          sample_size?: string | null
          specification?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_control_plans_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_data_collection_plans: {
        Row: {
          created_at: string | null
          data_type: string | null
          frequency: string | null
          id: string
          measure_name: string
          measurement_method: string | null
          notes: string | null
          operational_definition: string | null
          project_id: string
          responsible: string | null
          sample_size: number | null
        }
        Insert: {
          created_at?: string | null
          data_type?: string | null
          frequency?: string | null
          id?: string
          measure_name: string
          measurement_method?: string | null
          notes?: string | null
          operational_definition?: string | null
          project_id: string
          responsible?: string | null
          sample_size?: number | null
        }
        Update: {
          created_at?: string | null
          data_type?: string | null
          frequency?: string | null
          id?: string
          measure_name?: string
          measurement_method?: string | null
          notes?: string | null
          operational_definition?: string | null
          project_id?: string
          responsible?: string | null
          sample_size?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_data_collection_plans_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_fmea: {
        Row: {
          action_owner: string | null
          action_taken: string | null
          created_at: string | null
          current_controls: string | null
          detection: number
          failure_cause: string | null
          failure_effect: string | null
          failure_mode: string
          id: string
          new_detection: number | null
          new_occurrence: number | null
          new_rpn: number | null
          new_severity: number | null
          occurrence: number
          process_step: string
          project_id: string
          recommended_action: string | null
          rpn: number | null
          severity: number
          updated_at: string | null
        }
        Insert: {
          action_owner?: string | null
          action_taken?: string | null
          created_at?: string | null
          current_controls?: string | null
          detection: number
          failure_cause?: string | null
          failure_effect?: string | null
          failure_mode: string
          id?: string
          new_detection?: number | null
          new_occurrence?: number | null
          new_rpn?: number | null
          new_severity?: number | null
          occurrence: number
          process_step: string
          project_id: string
          recommended_action?: string | null
          rpn?: number | null
          severity: number
          updated_at?: string | null
        }
        Update: {
          action_owner?: string | null
          action_taken?: string | null
          created_at?: string | null
          current_controls?: string | null
          detection?: number
          failure_cause?: string | null
          failure_effect?: string | null
          failure_mode?: string
          id?: string
          new_detection?: number | null
          new_occurrence?: number | null
          new_rpn?: number | null
          new_severity?: number | null
          occurrence?: number
          process_step?: string
          project_id?: string
          recommended_action?: string | null
          rpn?: number | null
          severity?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_fmea_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_hypothesis_log: {
        Row: {
          confirmed: boolean | null
          created_at: string | null
          hypothesis: string
          id: string
          notes: string | null
          p_value: number | null
          project_id: string
          result: string | null
          test_method: string | null
        }
        Insert: {
          confirmed?: boolean | null
          created_at?: string | null
          hypothesis: string
          id?: string
          notes?: string | null
          p_value?: number | null
          project_id: string
          result?: string | null
          test_method?: string | null
        }
        Update: {
          confirmed?: boolean | null
          created_at?: string | null
          hypothesis?: string
          id?: string
          notes?: string | null
          p_value?: number | null
          project_id?: string
          result?: string | null
          test_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_hypothesis_log_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_msa_studies: {
        Row: {
          acceptable: boolean | null
          created_at: string | null
          gage_rr: number | null
          id: string
          measurement_system: string
          notes: string | null
          num_operators: number | null
          num_parts: number | null
          num_trials: number | null
          part_variation: number | null
          project_id: string
          repeatability: number | null
          reproducibility: number | null
          study_name: string
        }
        Insert: {
          acceptable?: boolean | null
          created_at?: string | null
          gage_rr?: number | null
          id?: string
          measurement_system: string
          notes?: string | null
          num_operators?: number | null
          num_parts?: number | null
          num_trials?: number | null
          part_variation?: number | null
          project_id: string
          repeatability?: number | null
          reproducibility?: number | null
          study_name: string
        }
        Update: {
          acceptable?: boolean | null
          created_at?: string | null
          gage_rr?: number | null
          id?: string
          measurement_system?: string
          notes?: string | null
          num_operators?: number | null
          num_parts?: number | null
          num_trials?: number | null
          part_variation?: number | null
          project_id?: string
          repeatability?: number | null
          reproducibility?: number | null
          study_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_msa_studies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_pilots: {
        Row: {
          created_at: string | null
          decision: string | null
          decision_notes: string | null
          end_date: string | null
          id: string
          pilot_name: string
          project_id: string
          results: string | null
          scope: string | null
          solution_id: string
          start_date: string | null
          status: string | null
          success_criteria: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          decision?: string | null
          decision_notes?: string | null
          end_date?: string | null
          id?: string
          pilot_name: string
          project_id: string
          results?: string | null
          scope?: string | null
          solution_id: string
          start_date?: string | null
          status?: string | null
          success_criteria?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          decision?: string | null
          decision_notes?: string | null
          end_date?: string | null
          id?: string
          pilot_name?: string
          project_id?: string
          results?: string | null
          scope?: string | null
          solution_id?: string
          start_date?: string | null
          status?: string | null
          success_criteria?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_pilots_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dmaic_pilots_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "dmaic_solutions"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_process_maps: {
        Row: {
          created_at: string | null
          edges: Json | null
          id: string
          map_name: string
          map_type: string | null
          metadata: Json | null
          nodes: Json | null
          project_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          edges?: Json | null
          id?: string
          map_name: string
          map_type?: string | null
          metadata?: Json | null
          nodes?: Json | null
          project_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          edges?: Json | null
          id?: string
          map_name?: string
          map_type?: string | null
          metadata?: Json | null
          nodes?: Json | null
          project_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_process_maps_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_projects: {
        Row: {
          actual_savings: number | null
          business_case: string | null
          champion: string | null
          completed_at: string | null
          created_at: string | null
          current_phase: string | null
          estimated_savings: number | null
          goal_statement: string | null
          id: string
          metadata: Json | null
          out_of_scope: string | null
          primary_metric: string | null
          primary_metric_actual: number | null
          primary_metric_baseline: number | null
          primary_metric_target: number | null
          problem_statement: string
          process_owner: string | null
          project_name: string
          scope: string | null
          start_date: string | null
          status: string | null
          target_end_date: string | null
          team_members: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_savings?: number | null
          business_case?: string | null
          champion?: string | null
          completed_at?: string | null
          created_at?: string | null
          current_phase?: string | null
          estimated_savings?: number | null
          goal_statement?: string | null
          id?: string
          metadata?: Json | null
          out_of_scope?: string | null
          primary_metric?: string | null
          primary_metric_actual?: number | null
          primary_metric_baseline?: number | null
          primary_metric_target?: number | null
          problem_statement: string
          process_owner?: string | null
          project_name: string
          scope?: string | null
          start_date?: string | null
          status?: string | null
          target_end_date?: string | null
          team_members?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_savings?: number | null
          business_case?: string | null
          champion?: string | null
          completed_at?: string | null
          created_at?: string | null
          current_phase?: string | null
          estimated_savings?: number | null
          goal_statement?: string | null
          id?: string
          metadata?: Json | null
          out_of_scope?: string | null
          primary_metric?: string | null
          primary_metric_actual?: number | null
          primary_metric_baseline?: number | null
          primary_metric_target?: number | null
          problem_statement?: string
          process_owner?: string | null
          project_name?: string
          scope?: string | null
          start_date?: string | null
          status?: string | null
          target_end_date?: string | null
          team_members?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      dmaic_sipoc: {
        Row: {
          created_at: string | null
          customers: Json | null
          id: string
          inputs: Json | null
          outputs: Json | null
          process_steps: Json | null
          project_id: string
          suppliers: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customers?: Json | null
          id?: string
          inputs?: Json | null
          outputs?: Json | null
          process_steps?: Json | null
          project_id: string
          suppliers?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customers?: Json | null
          id?: string
          inputs?: Json | null
          outputs?: Json | null
          process_steps?: Json | null
          project_id?: string
          suppliers?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_sipoc_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_solutions: {
        Row: {
          cost_score: number | null
          created_at: string | null
          description: string | null
          feasibility_score: number | null
          id: string
          impact_score: number | null
          implementation_plan: string | null
          project_id: string
          solution_name: string
          status: string | null
          total_score: number | null
          updated_at: string | null
          verified_cause_id: string | null
        }
        Insert: {
          cost_score?: number | null
          created_at?: string | null
          description?: string | null
          feasibility_score?: number | null
          id?: string
          impact_score?: number | null
          implementation_plan?: string | null
          project_id: string
          solution_name: string
          status?: string | null
          total_score?: number | null
          updated_at?: string | null
          verified_cause_id?: string | null
        }
        Update: {
          cost_score?: number | null
          created_at?: string | null
          description?: string | null
          feasibility_score?: number | null
          id?: string
          impact_score?: number | null
          implementation_plan?: string | null
          project_id?: string
          solution_name?: string
          status?: string | null
          total_score?: number | null
          updated_at?: string | null
          verified_cause_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_solutions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dmaic_solutions_verified_cause_id_fkey"
            columns: ["verified_cause_id"]
            isOneToOne: false
            referencedRelation: "dmaic_verified_causes"
            referencedColumns: ["id"]
          },
        ]
      }
      dmaic_verified_causes: {
        Row: {
          analysis_id: string | null
          cause_description: string
          created_at: string | null
          evidence_summary: string | null
          id: string
          impact_level: string | null
          project_id: string
        }
        Insert: {
          analysis_id?: string | null
          cause_description: string
          created_at?: string | null
          evidence_summary?: string | null
          id?: string
          impact_level?: string | null
          project_id: string
        }
        Update: {
          analysis_id?: string | null
          cause_description?: string
          created_at?: string | null
          evidence_summary?: string | null
          id?: string
          impact_level?: string | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dmaic_verified_causes_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "dmaic_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dmaic_verified_causes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dmaic_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      gaps: {
        Row: {
          category: number | null
          category_name: string | null
          created_at: string | null
          current_state: string
          gap_magnitude: number | null
          id: string
          import_source: string | null
          pcf_id: string
          pcf_name: string
          short_description: string | null
          target_state: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: number | null
          category_name?: string | null
          created_at?: string | null
          current_state: string
          gap_magnitude?: number | null
          id?: string
          import_source?: string | null
          pcf_id: string
          pcf_name: string
          short_description?: string | null
          target_state: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: number | null
          category_name?: string | null
          created_at?: string | null
          current_state?: string
          gap_magnitude?: number | null
          id?: string
          import_source?: string | null
          pcf_id?: string
          pcf_name?: string
          short_description?: string | null
          target_state?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      import_history: {
        Row: {
          ai_analysis: Json | null
          assessment_count: number | null
          id: string
          imported_at: string | null
          metadata: Json | null
          user_id: string
        }
        Insert: {
          ai_analysis?: Json | null
          assessment_count?: number | null
          id?: string
          imported_at?: string | null
          metadata?: Json | null
          user_id: string
        }
        Update: {
          ai_analysis?: Json | null
          assessment_count?: number | null
          id?: string
          imported_at?: string | null
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      initiative_charters: {
        Row: {
          business_case: string | null
          change_readiness_score: number | null
          created_at: string | null
          current_state_summary: string | null
          dependencies: string[] | null
          dependency_notes: string | null
          description: string | null
          effort_level: string | null
          estimated_cost_range: string | null
          estimated_duration_weeks: number | null
          gap_magnitude: number | null
          id: string
          milestones: Json | null
          name: string
          objective: string | null
          pcf_process_ids: string[] | null
          pct_assessment: Json | null
          primary_category: number | null
          priority: string | null
          problem_statement: string | null
          proposed_solution: string | null
          requirements: Json | null
          risks: Json | null
          stakeholders: Json | null
          status: string | null
          strategic_alignment_score: number | null
          strategic_priority_ids: string[] | null
          success_criteria: Json | null
          target_state_summary: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          business_case?: string | null
          change_readiness_score?: number | null
          created_at?: string | null
          current_state_summary?: string | null
          dependencies?: string[] | null
          dependency_notes?: string | null
          description?: string | null
          effort_level?: string | null
          estimated_cost_range?: string | null
          estimated_duration_weeks?: number | null
          gap_magnitude?: number | null
          id?: string
          milestones?: Json | null
          name: string
          objective?: string | null
          pcf_process_ids?: string[] | null
          pct_assessment?: Json | null
          primary_category?: number | null
          priority?: string | null
          problem_statement?: string | null
          proposed_solution?: string | null
          requirements?: Json | null
          risks?: Json | null
          stakeholders?: Json | null
          status?: string | null
          strategic_alignment_score?: number | null
          strategic_priority_ids?: string[] | null
          success_criteria?: Json | null
          target_state_summary?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          business_case?: string | null
          change_readiness_score?: number | null
          created_at?: string | null
          current_state_summary?: string | null
          dependencies?: string[] | null
          dependency_notes?: string | null
          description?: string | null
          effort_level?: string | null
          estimated_cost_range?: string | null
          estimated_duration_weeks?: number | null
          gap_magnitude?: number | null
          id?: string
          milestones?: Json | null
          name?: string
          objective?: string | null
          pcf_process_ids?: string[] | null
          pct_assessment?: Json | null
          primary_category?: number | null
          priority?: string | null
          problem_statement?: string | null
          proposed_solution?: string | null
          requirements?: Json | null
          risks?: Json | null
          stakeholders?: Json | null
          status?: string | null
          strategic_alignment_score?: number | null
          strategic_priority_ids?: string[] | null
          success_criteria?: Json | null
          target_state_summary?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      org_settings: {
        Row: {
          created_at: string | null
          custom_logo_url: string | null
          email_domain: string | null
          id: string
          org_name: string | null
          settings: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          custom_logo_url?: string | null
          email_domain?: string | null
          id?: string
          org_name?: string | null
          settings?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          custom_logo_url?: string | null
          email_domain?: string | null
          id?: string
          org_name?: string | null
          settings?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      parking_lot: {
        Row: {
          affected_capabilities: string[] | null
          affected_domains: string[] | null
          artifact_id: string | null
          conflict_ids: string[] | null
          dependency_ids: string[] | null
          estimated_effort: string | null
          id: string
          item_description: string | null
          item_name: string
          item_type: string
          metadata: Json | null
          parked_at: string | null
          parked_by: string
          priority_when_parked: string | null
          reactivation_criteria: string | null
          reason_parked: string
          review_date: string | null
          source_entity_id: string | null
          source_module: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          affected_capabilities?: string[] | null
          affected_domains?: string[] | null
          artifact_id?: string | null
          conflict_ids?: string[] | null
          dependency_ids?: string[] | null
          estimated_effort?: string | null
          id?: string
          item_description?: string | null
          item_name: string
          item_type: string
          metadata?: Json | null
          parked_at?: string | null
          parked_by: string
          priority_when_parked?: string | null
          reactivation_criteria?: string | null
          reason_parked: string
          review_date?: string | null
          source_entity_id?: string | null
          source_module?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          affected_capabilities?: string[] | null
          affected_domains?: string[] | null
          artifact_id?: string | null
          conflict_ids?: string[] | null
          dependency_ids?: string[] | null
          estimated_effort?: string | null
          id?: string
          item_description?: string | null
          item_name?: string
          item_type?: string
          metadata?: Json | null
          parked_at?: string | null
          parked_by?: string
          priority_when_parked?: string | null
          reactivation_criteria?: string | null
          reason_parked?: string
          review_date?: string | null
          source_entity_id?: string | null
          source_module?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parking_lot_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "architecture_artifacts"
            referencedColumns: ["id"]
          },
        ]
      }
      pcf_custom_items: {
        Row: {
          category: number
          created_at: string | null
          custom_id: string
          id: string
          level: number
          name: string
          parent_id: string
          short_desc: string | null
          sort_order: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: number
          created_at?: string | null
          custom_id: string
          id?: string
          level: number
          name: string
          parent_id: string
          short_desc?: string | null
          sort_order?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: number
          created_at?: string | null
          custom_id?: string
          id?: string
          level?: number
          name?: string
          parent_id?: string
          short_desc?: string | null
          sort_order?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pcf_customizations: {
        Row: {
          created_at: string | null
          custom_name: string | null
          id: string
          is_hidden: boolean | null
          new_parent_id: string | null
          original_parent_id: string | null
          pcf_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          custom_name?: string | null
          id?: string
          is_hidden?: boolean | null
          new_parent_id?: string | null
          original_parent_id?: string | null
          pcf_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          custom_name?: string | null
          id?: string
          is_hidden?: boolean | null
          new_parent_id?: string | null
          original_parent_id?: string | null
          pcf_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pm_acceptance_checklists: {
        Row: {
          checklist_category:
            | Database["public"]["Enums"]["pm_checklist_category_enum"]
            | null
          checklist_name: string
          checklist_notes: string | null
          created_at: string
          criteria: Json
          description: string | null
          id: string
          is_template: boolean
          project_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          checklist_category?:
            | Database["public"]["Enums"]["pm_checklist_category_enum"]
            | null
          checklist_name: string
          checklist_notes?: string | null
          created_at?: string
          criteria?: Json
          description?: string | null
          id?: string
          is_template?: boolean
          project_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          checklist_category?:
            | Database["public"]["Enums"]["pm_checklist_category_enum"]
            | null
          checklist_name?: string
          checklist_notes?: string | null
          created_at?: string
          criteria?: Json
          description?: string | null
          id?: string
          is_template?: boolean
          project_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_acceptance_checklists_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_acceptance_records: {
        Row: {
          acceptance_date: string | null
          acceptance_notes: string | null
          acceptance_status: Database["public"]["Enums"]["pm_acceptance_status_enum"]
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          checklist_id: string | null
          conditional_requirements: string | null
          created_at: string
          criteria_results: Json | null
          deliverable_description: string | null
          deliverable_name: string
          id: string
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          record_notes: string | null
          rejection_reason: string | null
          review_date: string | null
          sign_offs: Json | null
          submission_date: string | null
          updated_at: string
          user_id: string
          wbs_element_id: string | null
        }
        Insert: {
          acceptance_date?: string | null
          acceptance_notes?: string | null
          acceptance_status?: Database["public"]["Enums"]["pm_acceptance_status_enum"]
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          checklist_id?: string | null
          conditional_requirements?: string | null
          created_at?: string
          criteria_results?: Json | null
          deliverable_description?: string | null
          deliverable_name: string
          id?: string
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          record_notes?: string | null
          rejection_reason?: string | null
          review_date?: string | null
          sign_offs?: Json | null
          submission_date?: string | null
          updated_at?: string
          user_id: string
          wbs_element_id?: string | null
        }
        Update: {
          acceptance_date?: string | null
          acceptance_notes?: string | null
          acceptance_status?: Database["public"]["Enums"]["pm_acceptance_status_enum"]
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          checklist_id?: string | null
          conditional_requirements?: string | null
          created_at?: string
          criteria_results?: Json | null
          deliverable_description?: string | null
          deliverable_name?: string
          id?: string
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          record_notes?: string | null
          rejection_reason?: string | null
          review_date?: string | null
          sign_offs?: Json | null
          submission_date?: string | null
          updated_at?: string
          user_id?: string
          wbs_element_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_acceptance_records_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "pm_acceptance_checklists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_acceptance_records_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_acceptance_records_wbs_element_id_fkey"
            columns: ["wbs_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_change_log: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          alternatives_considered: string | null
          approved_by_id: string | null
          benefits_description: string | null
          change_category: Database["public"]["Enums"]["pm_change_category_enum"]
          change_description: string
          change_notes: string | null
          change_number: string | null
          change_status: Database["public"]["Enums"]["pm_change_status_enum"]
          change_title: string
          change_type: Database["public"]["Enums"]["pm_change_type_enum"]
          cost_impact_amount: number | null
          created_at: string
          decision_date: string | null
          decision_notes: string | null
          id: string
          implementation_date: string | null
          implementation_notes: string | null
          implementation_plan: string | null
          implemented_by_id: string | null
          incremented_cost_count: boolean
          incremented_schedule_count: boolean
          incremented_scope_count: boolean
          incremented_wbs_count: boolean
          issue_id: string | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          priority: Database["public"]["Enums"]["pm_change_priority_enum"]
          project_id: string
          quality_impact_description: string | null
          requested_by_id: string | null
          resource_impact_description: string | null
          reviewed_by_id: string | null
          reviewed_date: string | null
          risk_id: string | null
          risk_impact_description: string | null
          schedule_activity_id: string | null
          schedule_impact_days: number | null
          scope_impact_description: string | null
          submitted_date: string | null
          updated_at: string
          user_id: string
          wbs_element_id: string | null
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          alternatives_considered?: string | null
          approved_by_id?: string | null
          benefits_description?: string | null
          change_category: Database["public"]["Enums"]["pm_change_category_enum"]
          change_description: string
          change_notes?: string | null
          change_number?: string | null
          change_status?: Database["public"]["Enums"]["pm_change_status_enum"]
          change_title: string
          change_type: Database["public"]["Enums"]["pm_change_type_enum"]
          cost_impact_amount?: number | null
          created_at?: string
          decision_date?: string | null
          decision_notes?: string | null
          id?: string
          implementation_date?: string | null
          implementation_notes?: string | null
          implementation_plan?: string | null
          implemented_by_id?: string | null
          incremented_cost_count?: boolean
          incremented_schedule_count?: boolean
          incremented_scope_count?: boolean
          incremented_wbs_count?: boolean
          issue_id?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          priority?: Database["public"]["Enums"]["pm_change_priority_enum"]
          project_id: string
          quality_impact_description?: string | null
          requested_by_id?: string | null
          resource_impact_description?: string | null
          reviewed_by_id?: string | null
          reviewed_date?: string | null
          risk_id?: string | null
          risk_impact_description?: string | null
          schedule_activity_id?: string | null
          schedule_impact_days?: number | null
          scope_impact_description?: string | null
          submitted_date?: string | null
          updated_at?: string
          user_id: string
          wbs_element_id?: string | null
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          alternatives_considered?: string | null
          approved_by_id?: string | null
          benefits_description?: string | null
          change_category?: Database["public"]["Enums"]["pm_change_category_enum"]
          change_description?: string
          change_notes?: string | null
          change_number?: string | null
          change_status?: Database["public"]["Enums"]["pm_change_status_enum"]
          change_title?: string
          change_type?: Database["public"]["Enums"]["pm_change_type_enum"]
          cost_impact_amount?: number | null
          created_at?: string
          decision_date?: string | null
          decision_notes?: string | null
          id?: string
          implementation_date?: string | null
          implementation_notes?: string | null
          implementation_plan?: string | null
          implemented_by_id?: string | null
          incremented_cost_count?: boolean
          incremented_schedule_count?: boolean
          incremented_scope_count?: boolean
          incremented_wbs_count?: boolean
          issue_id?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          priority?: Database["public"]["Enums"]["pm_change_priority_enum"]
          project_id?: string
          quality_impact_description?: string | null
          requested_by_id?: string | null
          resource_impact_description?: string | null
          reviewed_by_id?: string | null
          reviewed_date?: string | null
          risk_id?: string | null
          risk_impact_description?: string | null
          schedule_activity_id?: string | null
          schedule_impact_days?: number | null
          scope_impact_description?: string | null
          submitted_date?: string | null
          updated_at?: string
          user_id?: string
          wbs_element_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_change_log_approved_by_id_fkey"
            columns: ["approved_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_change_log_implemented_by_id_fkey"
            columns: ["implemented_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_change_log_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "pm_issues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_change_log_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_change_log_requested_by_id_fkey"
            columns: ["requested_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_change_log_reviewed_by_id_fkey"
            columns: ["reviewed_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_change_log_risk_id_fkey"
            columns: ["risk_id"]
            isOneToOne: false
            referencedRelation: "pm_risks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_change_log_schedule_activity_id_fkey"
            columns: ["schedule_activity_id"]
            isOneToOne: false
            referencedRelation: "pm_schedule_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_change_log_wbs_element_id_fkey"
            columns: ["wbs_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_closure_report: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          change_summary: string | null
          closure_notes: string | null
          closure_status: Database["public"]["Enums"]["pm_closure_status_enum"]
          created_at: string
          deliverables_summary: string | null
          executive_summary: string | null
          final_snapshot_aggregated_at: string | null
          final_snapshot_data: Json | null
          id: string
          issues_summary: string | null
          lessons_learned_summary: string | null
          objectives_assessment: string | null
          open_issues_disposition: string | null
          open_risks_disposition: string | null
          performance_summary: string | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          post_project_actions: string | null
          project_end_date: string | null
          project_id: string
          project_start_date: string | null
          report_date: string | null
          risks_summary: string | null
          sponsor_id: string | null
          sponsor_sign_off_date: string | null
          sponsor_sign_off_notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          change_summary?: string | null
          closure_notes?: string | null
          closure_status?: Database["public"]["Enums"]["pm_closure_status_enum"]
          created_at?: string
          deliverables_summary?: string | null
          executive_summary?: string | null
          final_snapshot_aggregated_at?: string | null
          final_snapshot_data?: Json | null
          id?: string
          issues_summary?: string | null
          lessons_learned_summary?: string | null
          objectives_assessment?: string | null
          open_issues_disposition?: string | null
          open_risks_disposition?: string | null
          performance_summary?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          post_project_actions?: string | null
          project_end_date?: string | null
          project_id: string
          project_start_date?: string | null
          report_date?: string | null
          risks_summary?: string | null
          sponsor_id?: string | null
          sponsor_sign_off_date?: string | null
          sponsor_sign_off_notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          change_summary?: string | null
          closure_notes?: string | null
          closure_status?: Database["public"]["Enums"]["pm_closure_status_enum"]
          created_at?: string
          deliverables_summary?: string | null
          executive_summary?: string | null
          final_snapshot_aggregated_at?: string | null
          final_snapshot_data?: Json | null
          id?: string
          issues_summary?: string | null
          lessons_learned_summary?: string | null
          objectives_assessment?: string | null
          open_issues_disposition?: string | null
          open_risks_disposition?: string | null
          performance_summary?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          post_project_actions?: string | null
          project_end_date?: string | null
          project_id?: string
          project_start_date?: string | null
          report_date?: string | null
          risks_summary?: string | null
          sponsor_id?: string | null
          sponsor_sign_off_date?: string | null
          sponsor_sign_off_notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_closure_report_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_closure_report_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_comm_plan_entries: {
        Row: {
          audience_type: Database["public"]["Enums"]["pm_comm_audience_type_enum"]
          channel: Database["public"]["Enums"]["pm_comm_channel_enum"]
          content_description: string
          created_at: string
          delivery_count: number
          derived_from_seed: boolean
          distribution_list: Json | null
          entry_notes: string | null
          entry_title: string
          format: Database["public"]["Enums"]["pm_comm_format_enum"]
          frequency: Database["public"]["Enums"]["pm_comm_frequency_enum"]
          id: string
          is_active: boolean
          last_delivered_date: string | null
          next_scheduled_date: string | null
          plan_id: string
          project_id: string
          responsible_id: string | null
          reviewer_id: string | null
          stakeholder_group_name: string | null
          stakeholder_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          audience_type?: Database["public"]["Enums"]["pm_comm_audience_type_enum"]
          channel: Database["public"]["Enums"]["pm_comm_channel_enum"]
          content_description: string
          created_at?: string
          delivery_count?: number
          derived_from_seed?: boolean
          distribution_list?: Json | null
          entry_notes?: string | null
          entry_title: string
          format: Database["public"]["Enums"]["pm_comm_format_enum"]
          frequency: Database["public"]["Enums"]["pm_comm_frequency_enum"]
          id?: string
          is_active?: boolean
          last_delivered_date?: string | null
          next_scheduled_date?: string | null
          plan_id: string
          project_id: string
          responsible_id?: string | null
          reviewer_id?: string | null
          stakeholder_group_name?: string | null
          stakeholder_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          audience_type?: Database["public"]["Enums"]["pm_comm_audience_type_enum"]
          channel?: Database["public"]["Enums"]["pm_comm_channel_enum"]
          content_description?: string
          created_at?: string
          delivery_count?: number
          derived_from_seed?: boolean
          distribution_list?: Json | null
          entry_notes?: string | null
          entry_title?: string
          format?: Database["public"]["Enums"]["pm_comm_format_enum"]
          frequency?: Database["public"]["Enums"]["pm_comm_frequency_enum"]
          id?: string
          is_active?: boolean
          last_delivered_date?: string | null
          next_scheduled_date?: string | null
          plan_id?: string
          project_id?: string
          responsible_id?: string | null
          reviewer_id?: string | null
          stakeholder_group_name?: string | null
          stakeholder_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_comm_plan_entries_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "pm_communication_plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_comm_plan_entries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_comm_plan_entries_responsible_id_fkey"
            columns: ["responsible_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_comm_plan_entries_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_comm_plan_entries_stakeholder_id_fkey"
            columns: ["stakeholder_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_communication_plan: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          approval_date: string | null
          approved_by_id: string | null
          baseline_date: string | null
          communications_approach: string | null
          confidentiality_guidelines: string | null
          created_at: string
          escalation_path: Json | null
          id: string
          information_storage_method: string | null
          language_and_accessibility: string | null
          meeting_cadence: Json | null
          plan_change_count: number
          plan_notes: string | null
          plan_status: Database["public"]["Enums"]["pm_comm_plan_status_enum"]
          plan_title: string
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          reporting_structure: string | null
          seed_plan_id: string | null
          stakeholder_matrix_id: string | null
          total_entries: number
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_date?: string | null
          approved_by_id?: string | null
          baseline_date?: string | null
          communications_approach?: string | null
          confidentiality_guidelines?: string | null
          created_at?: string
          escalation_path?: Json | null
          id?: string
          information_storage_method?: string | null
          language_and_accessibility?: string | null
          meeting_cadence?: Json | null
          plan_change_count?: number
          plan_notes?: string | null
          plan_status?: Database["public"]["Enums"]["pm_comm_plan_status_enum"]
          plan_title: string
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          reporting_structure?: string | null
          seed_plan_id?: string | null
          stakeholder_matrix_id?: string | null
          total_entries?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_date?: string | null
          approved_by_id?: string | null
          baseline_date?: string | null
          communications_approach?: string | null
          confidentiality_guidelines?: string | null
          created_at?: string
          escalation_path?: Json | null
          id?: string
          information_storage_method?: string | null
          language_and_accessibility?: string | null
          meeting_cadence?: Json | null
          plan_change_count?: number
          plan_notes?: string | null
          plan_status?: Database["public"]["Enums"]["pm_comm_plan_status_enum"]
          plan_title?: string
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          reporting_structure?: string | null
          seed_plan_id?: string | null
          stakeholder_matrix_id?: string | null
          total_entries?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_communication_plan_approved_by_id_fkey"
            columns: ["approved_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_communication_plan_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_communication_plan_seed_plan_id_fkey"
            columns: ["seed_plan_id"]
            isOneToOne: false
            referencedRelation: "pm_communication_plan_seed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_communication_plan_stakeholder_matrix_id_fkey"
            columns: ["stakeholder_matrix_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_matrix"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_communication_plan_seed: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          communication_entries: Json
          created_at: string
          escalation_path: Json | null
          general_notes: string | null
          id: string
          meeting_cadence: Json | null
          plan_purpose: string | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          reporting_period_start: string | null
          superseded_by_plan_id: string | null
          total_entries: number
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          communication_entries?: Json
          created_at?: string
          escalation_path?: Json | null
          general_notes?: string | null
          id?: string
          meeting_cadence?: Json | null
          plan_purpose?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          reporting_period_start?: string | null
          superseded_by_plan_id?: string | null
          total_entries?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          communication_entries?: Json
          created_at?: string
          escalation_path?: Json | null
          general_notes?: string | null
          id?: string
          meeting_cadence?: Json | null
          plan_purpose?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          reporting_period_start?: string | null
          superseded_by_plan_id?: string | null
          total_entries?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_pm_comm_seed_superseded"
            columns: ["superseded_by_plan_id"]
            isOneToOne: false
            referencedRelation: "pm_communication_plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_communication_plan_seed_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_cost_baseline: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          approval_date: string | null
          approved_by_id: string | null
          assumptions: string | null
          baseline_change_count: number
          baseline_date: string | null
          baseline_notes: string | null
          baseline_status: Database["public"]["Enums"]["pm_cost_baseline_status_enum"]
          baseline_title: string
          budget_at_completion: number
          contingency_percentage: number | null
          contingency_reserve: number
          cost_basis_summary: string | null
          created_at: string
          currency_code: string
          exclusions: string | null
          id: string
          management_reserve: number
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          research_assist_notes: string | null
          resource_cost_last_synced_at: string | null
          resource_cost_total: number
          resource_plan_id: string | null
          schedule_id: string | null
          total_direct_cost: number
          total_project_budget: number
          updated_at: string
          user_id: string
          wbs_id: string | null
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_date?: string | null
          approved_by_id?: string | null
          assumptions?: string | null
          baseline_change_count?: number
          baseline_date?: string | null
          baseline_notes?: string | null
          baseline_status?: Database["public"]["Enums"]["pm_cost_baseline_status_enum"]
          baseline_title: string
          budget_at_completion?: number
          contingency_percentage?: number | null
          contingency_reserve?: number
          cost_basis_summary?: string | null
          created_at?: string
          currency_code?: string
          exclusions?: string | null
          id?: string
          management_reserve?: number
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          research_assist_notes?: string | null
          resource_cost_last_synced_at?: string | null
          resource_cost_total?: number
          resource_plan_id?: string | null
          schedule_id?: string | null
          total_direct_cost?: number
          total_project_budget?: number
          updated_at?: string
          user_id: string
          wbs_id?: string | null
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_date?: string | null
          approved_by_id?: string | null
          assumptions?: string | null
          baseline_change_count?: number
          baseline_date?: string | null
          baseline_notes?: string | null
          baseline_status?: Database["public"]["Enums"]["pm_cost_baseline_status_enum"]
          baseline_title?: string
          budget_at_completion?: number
          contingency_percentage?: number | null
          contingency_reserve?: number
          cost_basis_summary?: string | null
          created_at?: string
          currency_code?: string
          exclusions?: string | null
          id?: string
          management_reserve?: number
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          research_assist_notes?: string | null
          resource_cost_last_synced_at?: string | null
          resource_cost_total?: number
          resource_plan_id?: string | null
          schedule_id?: string | null
          total_direct_cost?: number
          total_project_budget?: number
          updated_at?: string
          user_id?: string
          wbs_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_cost_baseline_approved_by_id_fkey"
            columns: ["approved_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_cost_baseline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_cost_baseline_resource_plan_id_fkey"
            columns: ["resource_plan_id"]
            isOneToOne: false
            referencedRelation: "pm_resource_plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_cost_baseline_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "pm_project_schedule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_cost_baseline_wbs_id_fkey"
            columns: ["wbs_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_cost_baseline_elements: {
        Row: {
          baseline_cost: number | null
          baseline_id: string
          basis_of_estimate: string | null
          cost_category: Database["public"]["Enums"]["pm_cost_category_enum"]
          cost_notes: string | null
          created_at: string
          direct_cost_adjustment: number
          element_contingency: number
          element_direct_cost: number
          element_name: string
          element_total_cost: number
          estimate_confidence_level: number | null
          estimate_type: Database["public"]["Enums"]["pm_estimate_type_enum"]
          id: string
          most_likely_cost: number | null
          optimistic_cost: number | null
          pessimistic_cost: number | null
          project_id: string
          resource_cost: number
          time_phased_spend: Json | null
          updated_at: string
          user_id: string
          wbs_code: string | null
          wbs_element_id: string | null
        }
        Insert: {
          baseline_cost?: number | null
          baseline_id: string
          basis_of_estimate?: string | null
          cost_category?: Database["public"]["Enums"]["pm_cost_category_enum"]
          cost_notes?: string | null
          created_at?: string
          direct_cost_adjustment?: number
          element_contingency?: number
          element_direct_cost?: number
          element_name: string
          element_total_cost?: number
          estimate_confidence_level?: number | null
          estimate_type?: Database["public"]["Enums"]["pm_estimate_type_enum"]
          id?: string
          most_likely_cost?: number | null
          optimistic_cost?: number | null
          pessimistic_cost?: number | null
          project_id: string
          resource_cost?: number
          time_phased_spend?: Json | null
          updated_at?: string
          user_id: string
          wbs_code?: string | null
          wbs_element_id?: string | null
        }
        Update: {
          baseline_cost?: number | null
          baseline_id?: string
          basis_of_estimate?: string | null
          cost_category?: Database["public"]["Enums"]["pm_cost_category_enum"]
          cost_notes?: string | null
          created_at?: string
          direct_cost_adjustment?: number
          element_contingency?: number
          element_direct_cost?: number
          element_name?: string
          element_total_cost?: number
          estimate_confidence_level?: number | null
          estimate_type?: Database["public"]["Enums"]["pm_estimate_type_enum"]
          id?: string
          most_likely_cost?: number | null
          optimistic_cost?: number | null
          pessimistic_cost?: number | null
          project_id?: string
          resource_cost?: number
          time_phased_spend?: Json | null
          updated_at?: string
          user_id?: string
          wbs_code?: string | null
          wbs_element_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_cost_baseline_elements_baseline_id_fkey"
            columns: ["baseline_id"]
            isOneToOne: false
            referencedRelation: "pm_cost_baseline"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_cost_baseline_elements_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_cost_baseline_elements_wbs_element_id_fkey"
            columns: ["wbs_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_decisions: {
        Row: {
          actual_decision_date: string | null
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          alternatives_rejected: string | null
          assumptions_made: string | null
          background: string | null
          change_request_ref: string | null
          constraints_considered: string | null
          cost_impact_amount: number | null
          created_at: string | null
          decided_by_id: string | null
          decision_category:
            | Database["public"]["Enums"]["pm_decision_category_enum"]
            | null
          decision_date: string | null
          decision_id: string
          decision_made: string | null
          decision_maker_id: string | null
          decision_maker_name: string | null
          decision_owner_id: string | null
          decision_rationale: string | null
          decision_status: Database["public"]["Enums"]["pm_decision_status_enum"]
          description: string | null
          effective_date: string | null
          id: string
          impact_summary: string | null
          lessons_learned: string | null
          notes: string | null
          options_considered: Json | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          proposed_date: string | null
          rationale: string | null
          related_issue_ids: string[] | null
          related_risk_ids: string[] | null
          review_date: string | null
          risk_impact_description: string | null
          schedule_activity_id: string | null
          schedule_impact_days: number | null
          scope_impact_description: string | null
          stakeholders_consulted: string[] | null
          status: Database["public"]["Enums"]["pm_decision_status"]
          superseded_by_id: string | null
          tags: string[] | null
          target_decision_date: string | null
          title: string
          updated_at: string | null
          user_id: string
          wbs_element_id: string | null
        }
        Insert: {
          actual_decision_date?: string | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          alternatives_rejected?: string | null
          assumptions_made?: string | null
          background?: string | null
          change_request_ref?: string | null
          constraints_considered?: string | null
          cost_impact_amount?: number | null
          created_at?: string | null
          decided_by_id?: string | null
          decision_category?:
            | Database["public"]["Enums"]["pm_decision_category_enum"]
            | null
          decision_date?: string | null
          decision_id: string
          decision_made?: string | null
          decision_maker_id?: string | null
          decision_maker_name?: string | null
          decision_owner_id?: string | null
          decision_rationale?: string | null
          decision_status?: Database["public"]["Enums"]["pm_decision_status_enum"]
          description?: string | null
          effective_date?: string | null
          id?: string
          impact_summary?: string | null
          lessons_learned?: string | null
          notes?: string | null
          options_considered?: Json | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          proposed_date?: string | null
          rationale?: string | null
          related_issue_ids?: string[] | null
          related_risk_ids?: string[] | null
          review_date?: string | null
          risk_impact_description?: string | null
          schedule_activity_id?: string | null
          schedule_impact_days?: number | null
          scope_impact_description?: string | null
          stakeholders_consulted?: string[] | null
          status?: Database["public"]["Enums"]["pm_decision_status"]
          superseded_by_id?: string | null
          tags?: string[] | null
          target_decision_date?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          wbs_element_id?: string | null
        }
        Update: {
          actual_decision_date?: string | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          alternatives_rejected?: string | null
          assumptions_made?: string | null
          background?: string | null
          change_request_ref?: string | null
          constraints_considered?: string | null
          cost_impact_amount?: number | null
          created_at?: string | null
          decided_by_id?: string | null
          decision_category?:
            | Database["public"]["Enums"]["pm_decision_category_enum"]
            | null
          decision_date?: string | null
          decision_id?: string
          decision_made?: string | null
          decision_maker_id?: string | null
          decision_maker_name?: string | null
          decision_owner_id?: string | null
          decision_rationale?: string | null
          decision_status?: Database["public"]["Enums"]["pm_decision_status_enum"]
          description?: string | null
          effective_date?: string | null
          id?: string
          impact_summary?: string | null
          lessons_learned?: string | null
          notes?: string | null
          options_considered?: Json | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          proposed_date?: string | null
          rationale?: string | null
          related_issue_ids?: string[] | null
          related_risk_ids?: string[] | null
          review_date?: string | null
          risk_impact_description?: string | null
          schedule_activity_id?: string | null
          schedule_impact_days?: number | null
          scope_impact_description?: string | null
          stakeholders_consulted?: string[] | null
          status?: Database["public"]["Enums"]["pm_decision_status"]
          superseded_by_id?: string | null
          tags?: string[] | null
          target_decision_date?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          wbs_element_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_pm_decisions_superseded_by"
            columns: ["superseded_by_id"]
            isOneToOne: false
            referencedRelation: "pm_decisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_decisions_decided_by_id_fkey"
            columns: ["decided_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_decisions_decision_maker_id_fkey"
            columns: ["decision_maker_id"]
            isOneToOne: false
            referencedRelation: "requirement_stakeholders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_decisions_decision_owner_id_fkey"
            columns: ["decision_owner_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_decisions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_decisions_schedule_activity_id_fkey"
            columns: ["schedule_activity_id"]
            isOneToOne: false
            referencedRelation: "pm_schedule_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_decisions_wbs_element_id_fkey"
            columns: ["wbs_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_evm_snapshots: {
        Row: {
          ac: number | null
          approved_at: string | null
          bac: number | null
          computation_notes: string | null
          computed_at: string | null
          cpi: number | null
          created_at: string
          cv: number | null
          data_date: string
          eac: number | null
          etc: number | null
          ev: number | null
          id: string
          is_approved: boolean
          percent_complete: number | null
          project_id: string
          pv: number | null
          schedule_variance_days: number | null
          snapshot_notes: string | null
          snapshot_type: Database["public"]["Enums"]["pm_evm_snapshot_type_enum"]
          spi: number | null
          sv: number | null
          tcpi: number | null
          updated_at: string
          user_id: string
          vac: number | null
        }
        Insert: {
          ac?: number | null
          approved_at?: string | null
          bac?: number | null
          computation_notes?: string | null
          computed_at?: string | null
          cpi?: number | null
          created_at?: string
          cv?: number | null
          data_date: string
          eac?: number | null
          etc?: number | null
          ev?: number | null
          id?: string
          is_approved?: boolean
          percent_complete?: number | null
          project_id: string
          pv?: number | null
          schedule_variance_days?: number | null
          snapshot_notes?: string | null
          snapshot_type?: Database["public"]["Enums"]["pm_evm_snapshot_type_enum"]
          spi?: number | null
          sv?: number | null
          tcpi?: number | null
          updated_at?: string
          user_id: string
          vac?: number | null
        }
        Update: {
          ac?: number | null
          approved_at?: string | null
          bac?: number | null
          computation_notes?: string | null
          computed_at?: string | null
          cpi?: number | null
          created_at?: string
          cv?: number | null
          data_date?: string
          eac?: number | null
          etc?: number | null
          ev?: number | null
          id?: string
          is_approved?: boolean
          percent_complete?: number | null
          project_id?: string
          pv?: number | null
          schedule_variance_days?: number | null
          snapshot_notes?: string | null
          snapshot_type?: Database["public"]["Enums"]["pm_evm_snapshot_type_enum"]
          spi?: number | null
          sv?: number | null
          tcpi?: number | null
          updated_at?: string
          user_id?: string
          vac?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_evm_snapshots_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_external_links: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_primary: boolean | null
          last_accessed_at: string | null
          link_type: Database["public"]["Enums"]["pm_link_type"]
          name: string
          project_id: string
          updated_at: string | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_primary?: boolean | null
          last_accessed_at?: string | null
          link_type?: Database["public"]["Enums"]["pm_link_type"]
          name: string
          project_id: string
          updated_at?: string | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_primary?: boolean | null
          last_accessed_at?: string | null
          link_type?: Database["public"]["Enums"]["pm_link_type"]
          name?: string
          project_id?: string
          updated_at?: string | null
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_external_links_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_forecasts: {
        Row: {
          ac: number | null
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          approved_at: string | null
          bac: number | null
          cpi: number | null
          created_at: string
          eac: number | null
          etc: number | null
          ev: number | null
          evm_snapshot_id: string | null
          forecast_completion_date: string | null
          forecast_confidence:
            | Database["public"]["Enums"]["pm_forecast_confidence_enum"]
            | null
          forecast_date: string
          forecast_method: Database["public"]["Enums"]["pm_forecast_method_enum"]
          forecast_narrative: string | null
          forecast_notes: string | null
          forecast_status: Database["public"]["Enums"]["pm_forecast_status_enum"]
          id: string
          is_current: boolean
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          recommended_actions: string | null
          reestimate_rationale: string | null
          risk_factors: string | null
          schedule_forecast_narrative: string | null
          schedule_variance_days: number | null
          superseded_at: string | null
          superseded_by_id: string | null
          trend_analysis: string | null
          updated_at: string
          user_id: string
          vac: number | null
        }
        Insert: {
          ac?: number | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approved_at?: string | null
          bac?: number | null
          cpi?: number | null
          created_at?: string
          eac?: number | null
          etc?: number | null
          ev?: number | null
          evm_snapshot_id?: string | null
          forecast_completion_date?: string | null
          forecast_confidence?:
            | Database["public"]["Enums"]["pm_forecast_confidence_enum"]
            | null
          forecast_date?: string
          forecast_method: Database["public"]["Enums"]["pm_forecast_method_enum"]
          forecast_narrative?: string | null
          forecast_notes?: string | null
          forecast_status?: Database["public"]["Enums"]["pm_forecast_status_enum"]
          id?: string
          is_current?: boolean
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          recommended_actions?: string | null
          reestimate_rationale?: string | null
          risk_factors?: string | null
          schedule_forecast_narrative?: string | null
          schedule_variance_days?: number | null
          superseded_at?: string | null
          superseded_by_id?: string | null
          trend_analysis?: string | null
          updated_at?: string
          user_id: string
          vac?: number | null
        }
        Update: {
          ac?: number | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approved_at?: string | null
          bac?: number | null
          cpi?: number | null
          created_at?: string
          eac?: number | null
          etc?: number | null
          ev?: number | null
          evm_snapshot_id?: string | null
          forecast_completion_date?: string | null
          forecast_confidence?:
            | Database["public"]["Enums"]["pm_forecast_confidence_enum"]
            | null
          forecast_date?: string
          forecast_method?: Database["public"]["Enums"]["pm_forecast_method_enum"]
          forecast_narrative?: string | null
          forecast_notes?: string | null
          forecast_status?: Database["public"]["Enums"]["pm_forecast_status_enum"]
          id?: string
          is_current?: boolean
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          recommended_actions?: string | null
          reestimate_rationale?: string | null
          risk_factors?: string | null
          schedule_forecast_narrative?: string | null
          schedule_variance_days?: number | null
          superseded_at?: string | null
          superseded_by_id?: string | null
          trend_analysis?: string | null
          updated_at?: string
          user_id?: string
          vac?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_pm_forecasts_superseded_by"
            columns: ["superseded_by_id"]
            isOneToOne: false
            referencedRelation: "pm_forecasts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_forecasts_evm_snapshot_id_fkey"
            columns: ["evm_snapshot_id"]
            isOneToOne: false
            referencedRelation: "pm_evm_snapshots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_forecasts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_issues: {
        Row: {
          actual_resolution_date: string | null
          affected_areas: string[] | null
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          assigned_to_id: string | null
          assignee_id: string | null
          assignee_name: string | null
          change_request_ref: string | null
          cost_impact_amount: number | null
          created_at: string | null
          description: string | null
          escalated: boolean
          escalated_at: string | null
          escalated_to: string | null
          escalated_to_id: string | null
          escalation_date: string | null
          escalation_reason: string | null
          escalation_response: string | null
          id: string
          impact_description: string | null
          is_escalated: boolean | null
          issue_category:
            | Database["public"]["Enums"]["pm_issue_category_enum"]
            | null
          issue_id: string
          lessons_learned: string | null
          notes: string | null
          owner_id: string | null
          owner_name: string | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          priority: Database["public"]["Enums"]["pm_issue_priority"]
          project_id: string
          reported_date: string | null
          resolution: string | null
          resolution_date: string | null
          resolution_description: string | null
          resolution_status: Database["public"]["Enums"]["pm_issue_resolution_status_enum"]
          resolved_by_id: string | null
          risk_id: string | null
          schedule_activity_id: string | null
          schedule_impact_days: number | null
          severity: Database["public"]["Enums"]["pm_issue_severity_enum"] | null
          source_risk_id: string | null
          status: Database["public"]["Enums"]["pm_issue_status"]
          tags: string[] | null
          target_resolution_date: string | null
          title: string
          updated_at: string | null
          user_id: string
          wbs_element_id: string | null
        }
        Insert: {
          actual_resolution_date?: string | null
          affected_areas?: string[] | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          assigned_to_id?: string | null
          assignee_id?: string | null
          assignee_name?: string | null
          change_request_ref?: string | null
          cost_impact_amount?: number | null
          created_at?: string | null
          description?: string | null
          escalated?: boolean
          escalated_at?: string | null
          escalated_to?: string | null
          escalated_to_id?: string | null
          escalation_date?: string | null
          escalation_reason?: string | null
          escalation_response?: string | null
          id?: string
          impact_description?: string | null
          is_escalated?: boolean | null
          issue_category?:
            | Database["public"]["Enums"]["pm_issue_category_enum"]
            | null
          issue_id: string
          lessons_learned?: string | null
          notes?: string | null
          owner_id?: string | null
          owner_name?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          priority?: Database["public"]["Enums"]["pm_issue_priority"]
          project_id: string
          reported_date?: string | null
          resolution?: string | null
          resolution_date?: string | null
          resolution_description?: string | null
          resolution_status?: Database["public"]["Enums"]["pm_issue_resolution_status_enum"]
          resolved_by_id?: string | null
          risk_id?: string | null
          schedule_activity_id?: string | null
          schedule_impact_days?: number | null
          severity?:
            | Database["public"]["Enums"]["pm_issue_severity_enum"]
            | null
          source_risk_id?: string | null
          status?: Database["public"]["Enums"]["pm_issue_status"]
          tags?: string[] | null
          target_resolution_date?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          wbs_element_id?: string | null
        }
        Update: {
          actual_resolution_date?: string | null
          affected_areas?: string[] | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          assigned_to_id?: string | null
          assignee_id?: string | null
          assignee_name?: string | null
          change_request_ref?: string | null
          cost_impact_amount?: number | null
          created_at?: string | null
          description?: string | null
          escalated?: boolean
          escalated_at?: string | null
          escalated_to?: string | null
          escalated_to_id?: string | null
          escalation_date?: string | null
          escalation_reason?: string | null
          escalation_response?: string | null
          id?: string
          impact_description?: string | null
          is_escalated?: boolean | null
          issue_category?:
            | Database["public"]["Enums"]["pm_issue_category_enum"]
            | null
          issue_id?: string
          lessons_learned?: string | null
          notes?: string | null
          owner_id?: string | null
          owner_name?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          priority?: Database["public"]["Enums"]["pm_issue_priority"]
          project_id?: string
          reported_date?: string | null
          resolution?: string | null
          resolution_date?: string | null
          resolution_description?: string | null
          resolution_status?: Database["public"]["Enums"]["pm_issue_resolution_status_enum"]
          resolved_by_id?: string | null
          risk_id?: string | null
          schedule_activity_id?: string | null
          schedule_impact_days?: number | null
          severity?:
            | Database["public"]["Enums"]["pm_issue_severity_enum"]
            | null
          source_risk_id?: string | null
          status?: Database["public"]["Enums"]["pm_issue_status"]
          tags?: string[] | null
          target_resolution_date?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          wbs_element_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_issues_assigned_to_id_fkey"
            columns: ["assigned_to_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_issues_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "requirement_stakeholders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_issues_escalated_to_id_fkey"
            columns: ["escalated_to_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_issues_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "requirement_stakeholders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_issues_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_issues_resolved_by_id_fkey"
            columns: ["resolved_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_issues_risk_id_fkey"
            columns: ["risk_id"]
            isOneToOne: false
            referencedRelation: "pm_risks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_issues_schedule_activity_id_fkey"
            columns: ["schedule_activity_id"]
            isOneToOne: false
            referencedRelation: "pm_schedule_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_issues_source_risk_id_fkey"
            columns: ["source_risk_id"]
            isOneToOne: false
            referencedRelation: "pm_risks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_issues_wbs_element_id_fkey"
            columns: ["wbs_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_lessons_learned: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          created_at: string
          id: string
          impact_area: string | null
          lesson_category: Database["public"]["Enums"]["pm_lesson_category_enum"]
          lesson_notes: string | null
          lesson_status: Database["public"]["Enums"]["pm_lesson_status_enum"]
          lesson_title: string
          perplexity_queried_at: string | null
          perplexity_research: Json | null
          phase: string | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          recommendation: string | null
          root_cause: string | null
          source_record_id: string | null
          source_type: Database["public"]["Enums"]["pm_lesson_source_type_enum"]
          updated_at: string
          user_id: string
          wbs_element_id: string | null
          what_didnt_work: string | null
          what_happened: string | null
          what_worked: string | null
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          created_at?: string
          id?: string
          impact_area?: string | null
          lesson_category: Database["public"]["Enums"]["pm_lesson_category_enum"]
          lesson_notes?: string | null
          lesson_status?: Database["public"]["Enums"]["pm_lesson_status_enum"]
          lesson_title: string
          perplexity_queried_at?: string | null
          perplexity_research?: Json | null
          phase?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          recommendation?: string | null
          root_cause?: string | null
          source_record_id?: string | null
          source_type?: Database["public"]["Enums"]["pm_lesson_source_type_enum"]
          updated_at?: string
          user_id: string
          wbs_element_id?: string | null
          what_didnt_work?: string | null
          what_happened?: string | null
          what_worked?: string | null
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          created_at?: string
          id?: string
          impact_area?: string | null
          lesson_category?: Database["public"]["Enums"]["pm_lesson_category_enum"]
          lesson_notes?: string | null
          lesson_status?: Database["public"]["Enums"]["pm_lesson_status_enum"]
          lesson_title?: string
          perplexity_queried_at?: string | null
          perplexity_research?: Json | null
          phase?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          recommendation?: string | null
          root_cause?: string | null
          source_record_id?: string | null
          source_type?: Database["public"]["Enums"]["pm_lesson_source_type_enum"]
          updated_at?: string
          user_id?: string
          wbs_element_id?: string | null
          what_didnt_work?: string | null
          what_happened?: string | null
          what_worked?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_lessons_learned_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_lessons_learned_wbs_element_id_fkey"
            columns: ["wbs_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_plan: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          approval_date: string | null
          approved_by_id: string | null
          baseline_date: string | null
          change_management_approach: string | null
          charter_id: string | null
          comm_plan_id: string | null
          comm_plan_seed_id: string | null
          cost_baseline_id: string | null
          created_at: string
          environment_profile_id: string | null
          id: string
          knowledge_management_approach: string | null
          lessons_learned_approach: string | null
          lifecycle: Database["public"]["Enums"]["pm_lifecycle_enum"] | null
          methodology: Database["public"]["Enums"]["pm_methodology_enum"] | null
          overall_pm_approach: string | null
          overall_readiness_percentage: number | null
          performance_measurement_approach: string | null
          plan_change_count: number
          plan_notes: string | null
          plan_status: Database["public"]["Enums"]["pm_plan_status_enum"]
          plan_title: string
          plan_version: number
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          procurement_approach: string | null
          project_id: string
          quality_management_approach: string | null
          raci_chart_id: string | null
          resource_plan_id: string | null
          schedule_id: string | null
          scope_statement_id: string | null
          stakeholder_engagement_approach: string | null
          subsidiary_plan_readiness: Json | null
          tailoring_notes: string | null
          updated_at: string
          user_id: string
          version_history: Json | null
          wbs_id: string | null
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_date?: string | null
          approved_by_id?: string | null
          baseline_date?: string | null
          change_management_approach?: string | null
          charter_id?: string | null
          comm_plan_id?: string | null
          comm_plan_seed_id?: string | null
          cost_baseline_id?: string | null
          created_at?: string
          environment_profile_id?: string | null
          id?: string
          knowledge_management_approach?: string | null
          lessons_learned_approach?: string | null
          lifecycle?: Database["public"]["Enums"]["pm_lifecycle_enum"] | null
          methodology?:
            | Database["public"]["Enums"]["pm_methodology_enum"]
            | null
          overall_pm_approach?: string | null
          overall_readiness_percentage?: number | null
          performance_measurement_approach?: string | null
          plan_change_count?: number
          plan_notes?: string | null
          plan_status?: Database["public"]["Enums"]["pm_plan_status_enum"]
          plan_title: string
          plan_version?: number
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          procurement_approach?: string | null
          project_id: string
          quality_management_approach?: string | null
          raci_chart_id?: string | null
          resource_plan_id?: string | null
          schedule_id?: string | null
          scope_statement_id?: string | null
          stakeholder_engagement_approach?: string | null
          subsidiary_plan_readiness?: Json | null
          tailoring_notes?: string | null
          updated_at?: string
          user_id: string
          version_history?: Json | null
          wbs_id?: string | null
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_date?: string | null
          approved_by_id?: string | null
          baseline_date?: string | null
          change_management_approach?: string | null
          charter_id?: string | null
          comm_plan_id?: string | null
          comm_plan_seed_id?: string | null
          cost_baseline_id?: string | null
          created_at?: string
          environment_profile_id?: string | null
          id?: string
          knowledge_management_approach?: string | null
          lessons_learned_approach?: string | null
          lifecycle?: Database["public"]["Enums"]["pm_lifecycle_enum"] | null
          methodology?:
            | Database["public"]["Enums"]["pm_methodology_enum"]
            | null
          overall_pm_approach?: string | null
          overall_readiness_percentage?: number | null
          performance_measurement_approach?: string | null
          plan_change_count?: number
          plan_notes?: string | null
          plan_status?: Database["public"]["Enums"]["pm_plan_status_enum"]
          plan_title?: string
          plan_version?: number
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          procurement_approach?: string | null
          project_id?: string
          quality_management_approach?: string | null
          raci_chart_id?: string | null
          resource_plan_id?: string | null
          schedule_id?: string | null
          scope_statement_id?: string | null
          stakeholder_engagement_approach?: string | null
          subsidiary_plan_readiness?: Json | null
          tailoring_notes?: string | null
          updated_at?: string
          user_id?: string
          version_history?: Json | null
          wbs_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_plan_approved_by_id_fkey"
            columns: ["approved_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_plan_charter_id_fkey"
            columns: ["charter_id"]
            isOneToOne: false
            referencedRelation: "pm_project_charter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_plan_comm_plan_id_fkey"
            columns: ["comm_plan_id"]
            isOneToOne: false
            referencedRelation: "pm_communication_plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_plan_comm_plan_seed_id_fkey"
            columns: ["comm_plan_seed_id"]
            isOneToOne: false
            referencedRelation: "pm_communication_plan_seed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_plan_cost_baseline_id_fkey"
            columns: ["cost_baseline_id"]
            isOneToOne: false
            referencedRelation: "pm_cost_baseline"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_plan_environment_profile_id_fkey"
            columns: ["environment_profile_id"]
            isOneToOne: false
            referencedRelation: "pm_project_environment_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_plan_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_plan_raci_chart_id_fkey"
            columns: ["raci_chart_id"]
            isOneToOne: false
            referencedRelation: "pm_raci_chart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_plan_resource_plan_id_fkey"
            columns: ["resource_plan_id"]
            isOneToOne: false
            referencedRelation: "pm_resource_plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_plan_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "pm_project_schedule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_plan_scope_statement_id_fkey"
            columns: ["scope_statement_id"]
            isOneToOne: false
            referencedRelation: "pm_scope_statement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_plan_wbs_id_fkey"
            columns: ["wbs_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_project_charter: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          approval_notes: string | null
          approved_at: string | null
          approved_by_id: string | null
          budget_currency: string | null
          budget_estimate: number | null
          budget_notes: string | null
          business_need: string
          charter_status: Database["public"]["Enums"]["pm_charter_status_enum"]
          charter_title: string
          created_at: string
          environment_profile_id: string | null
          high_level_assumptions: Json
          high_level_constraints: Json
          high_level_risks: Json
          high_level_scope: string
          id: string
          in_scope_summary: string | null
          key_milestones: Json
          key_stakeholder_ids: Json
          objectives: Json
          opportunity_statement: string | null
          out_of_scope_summary: string | null
          pm_id: string | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          problem_statement: string | null
          project_id: string
          project_name: string
          project_number: string | null
          sponsor_id: string | null
          strategic_alignment: string | null
          strategic_priority_ref: string | null
          submitted_for_review_at: string | null
          success_criteria: Json
          target_end_date: string | null
          target_start_date: string | null
          updated_at: string
          user_id: string
          version_history: Json
          version_number: number
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_notes?: string | null
          approved_at?: string | null
          approved_by_id?: string | null
          budget_currency?: string | null
          budget_estimate?: number | null
          budget_notes?: string | null
          business_need: string
          charter_status?: Database["public"]["Enums"]["pm_charter_status_enum"]
          charter_title: string
          created_at?: string
          environment_profile_id?: string | null
          high_level_assumptions?: Json
          high_level_constraints?: Json
          high_level_risks?: Json
          high_level_scope: string
          id?: string
          in_scope_summary?: string | null
          key_milestones?: Json
          key_stakeholder_ids?: Json
          objectives?: Json
          opportunity_statement?: string | null
          out_of_scope_summary?: string | null
          pm_id?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          problem_statement?: string | null
          project_id: string
          project_name: string
          project_number?: string | null
          sponsor_id?: string | null
          strategic_alignment?: string | null
          strategic_priority_ref?: string | null
          submitted_for_review_at?: string | null
          success_criteria?: Json
          target_end_date?: string | null
          target_start_date?: string | null
          updated_at?: string
          user_id: string
          version_history?: Json
          version_number?: number
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_notes?: string | null
          approved_at?: string | null
          approved_by_id?: string | null
          budget_currency?: string | null
          budget_estimate?: number | null
          budget_notes?: string | null
          business_need?: string
          charter_status?: Database["public"]["Enums"]["pm_charter_status_enum"]
          charter_title?: string
          created_at?: string
          environment_profile_id?: string | null
          high_level_assumptions?: Json
          high_level_constraints?: Json
          high_level_risks?: Json
          high_level_scope?: string
          id?: string
          in_scope_summary?: string | null
          key_milestones?: Json
          key_stakeholder_ids?: Json
          objectives?: Json
          opportunity_statement?: string | null
          out_of_scope_summary?: string | null
          pm_id?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          problem_statement?: string | null
          project_id?: string
          project_name?: string
          project_number?: string | null
          sponsor_id?: string | null
          strategic_alignment?: string | null
          strategic_priority_ref?: string | null
          submitted_for_review_at?: string | null
          success_criteria?: Json
          target_end_date?: string | null
          target_start_date?: string | null
          updated_at?: string
          user_id?: string
          version_history?: Json
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "pm_project_charter_approved_by_id_fkey"
            columns: ["approved_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_project_charter_environment_profile_id_fkey"
            columns: ["environment_profile_id"]
            isOneToOne: false
            referencedRelation: "pm_project_environment_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_project_charter_pm_id_fkey"
            columns: ["pm_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_project_charter_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_project_charter_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_project_environment_profile: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          applicable_standards: Json | null
          assumptions: Json
          constraints: Json
          created_at: string
          department: string | null
          external_dependencies: Json
          governance_structure:
            | Database["public"]["Enums"]["pm_governance_structure_enum"]
            | null
          id: string
          industry: string | null
          iteration_length_days: number | null
          lifecycle_type:
            | Database["public"]["Enums"]["pm_lifecycle_enum"]
            | null
          methodology: Database["public"]["Enums"]["pm_methodology_enum"]
          methodology_notes: string | null
          methodology_rationale: string | null
          organization_name: string | null
          organizational_culture_notes: string | null
          organizational_process_assets: Json | null
          pestle_analysis: Json | null
          pm_authority_level:
            | Database["public"]["Enums"]["pm_authority_level_enum"]
            | null
          pm_maturity_level:
            | Database["public"]["Enums"]["pm_maturity_level_enum"]
            | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          project_size_category:
            | Database["public"]["Enums"]["pm_project_size_enum"]
            | null
          project_type: string | null
          research_assist_last_updated: string | null
          research_assist_notes: string | null
          sector: Database["public"]["Enums"]["pm_sector_enum"] | null
          sponsor_engagement_level:
            | Database["public"]["Enums"]["pm_engagement_level_enum"]
            | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          applicable_standards?: Json | null
          assumptions?: Json
          constraints?: Json
          created_at?: string
          department?: string | null
          external_dependencies?: Json
          governance_structure?:
            | Database["public"]["Enums"]["pm_governance_structure_enum"]
            | null
          id?: string
          industry?: string | null
          iteration_length_days?: number | null
          lifecycle_type?:
            | Database["public"]["Enums"]["pm_lifecycle_enum"]
            | null
          methodology: Database["public"]["Enums"]["pm_methodology_enum"]
          methodology_notes?: string | null
          methodology_rationale?: string | null
          organization_name?: string | null
          organizational_culture_notes?: string | null
          organizational_process_assets?: Json | null
          pestle_analysis?: Json | null
          pm_authority_level?:
            | Database["public"]["Enums"]["pm_authority_level_enum"]
            | null
          pm_maturity_level?:
            | Database["public"]["Enums"]["pm_maturity_level_enum"]
            | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          project_size_category?:
            | Database["public"]["Enums"]["pm_project_size_enum"]
            | null
          project_type?: string | null
          research_assist_last_updated?: string | null
          research_assist_notes?: string | null
          sector?: Database["public"]["Enums"]["pm_sector_enum"] | null
          sponsor_engagement_level?:
            | Database["public"]["Enums"]["pm_engagement_level_enum"]
            | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          applicable_standards?: Json | null
          assumptions?: Json
          constraints?: Json
          created_at?: string
          department?: string | null
          external_dependencies?: Json
          governance_structure?:
            | Database["public"]["Enums"]["pm_governance_structure_enum"]
            | null
          id?: string
          industry?: string | null
          iteration_length_days?: number | null
          lifecycle_type?:
            | Database["public"]["Enums"]["pm_lifecycle_enum"]
            | null
          methodology?: Database["public"]["Enums"]["pm_methodology_enum"]
          methodology_notes?: string | null
          methodology_rationale?: string | null
          organization_name?: string | null
          organizational_culture_notes?: string | null
          organizational_process_assets?: Json | null
          pestle_analysis?: Json | null
          pm_authority_level?:
            | Database["public"]["Enums"]["pm_authority_level_enum"]
            | null
          pm_maturity_level?:
            | Database["public"]["Enums"]["pm_maturity_level_enum"]
            | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          project_size_category?:
            | Database["public"]["Enums"]["pm_project_size_enum"]
            | null
          project_type?: string | null
          research_assist_last_updated?: string | null
          research_assist_notes?: string | null
          sector?: Database["public"]["Enums"]["pm_sector_enum"] | null
          sponsor_engagement_level?:
            | Database["public"]["Enums"]["pm_engagement_level_enum"]
            | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_project_environment_profile_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_project_schedule: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          baseline_date: string | null
          baseline_finish_date: string | null
          baseline_start_date: string | null
          created_at: string
          critical_path_duration_days: number | null
          id: string
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          schedule_assumptions: string | null
          schedule_change_count: number
          schedule_notes: string | null
          schedule_status: Database["public"]["Enums"]["pm_schedule_status_enum"]
          schedule_title: string
          scheduled_finish_date: string | null
          scheduled_start_date: string | null
          scope_statement_id: string | null
          total_activities: number
          total_float_threshold_days: number
          total_milestones: number
          updated_at: string
          user_id: string
          wbs_id: string | null
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          baseline_date?: string | null
          baseline_finish_date?: string | null
          baseline_start_date?: string | null
          created_at?: string
          critical_path_duration_days?: number | null
          id?: string
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          schedule_assumptions?: string | null
          schedule_change_count?: number
          schedule_notes?: string | null
          schedule_status?: Database["public"]["Enums"]["pm_schedule_status_enum"]
          schedule_title: string
          scheduled_finish_date?: string | null
          scheduled_start_date?: string | null
          scope_statement_id?: string | null
          total_activities?: number
          total_float_threshold_days?: number
          total_milestones?: number
          updated_at?: string
          user_id: string
          wbs_id?: string | null
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          baseline_date?: string | null
          baseline_finish_date?: string | null
          baseline_start_date?: string | null
          created_at?: string
          critical_path_duration_days?: number | null
          id?: string
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          schedule_assumptions?: string | null
          schedule_change_count?: number
          schedule_notes?: string | null
          schedule_status?: Database["public"]["Enums"]["pm_schedule_status_enum"]
          schedule_title?: string
          scheduled_finish_date?: string | null
          scheduled_start_date?: string | null
          scope_statement_id?: string | null
          total_activities?: number
          total_float_threshold_days?: number
          total_milestones?: number
          updated_at?: string
          user_id?: string
          wbs_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_project_schedule_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_project_schedule_scope_statement_id_fkey"
            columns: ["scope_statement_id"]
            isOneToOne: false
            referencedRelation: "pm_scope_statement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_project_schedule_wbs_id_fkey"
            columns: ["wbs_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_project_stakeholders: {
        Row: {
          created_at: string | null
          id: string
          is_accountable: boolean | null
          is_consulted: boolean | null
          is_informed: boolean | null
          is_responsible: boolean | null
          project_id: string
          project_role: string | null
          stakeholder_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_accountable?: boolean | null
          is_consulted?: boolean | null
          is_informed?: boolean | null
          is_responsible?: boolean | null
          project_id: string
          project_role?: string | null
          stakeholder_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_accountable?: boolean | null
          is_consulted?: boolean | null
          is_informed?: boolean | null
          is_responsible?: boolean | null
          project_id?: string
          project_role?: string | null
          stakeholder_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_project_stakeholders_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_project_stakeholders_stakeholder_id_fkey"
            columns: ["stakeholder_id"]
            isOneToOne: false
            referencedRelation: "requirement_stakeholders"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_projects: {
        Row: {
          actual_end_date: string | null
          created_at: string | null
          custom_fields: Json | null
          decision_count: number | null
          description: string | null
          id: string
          initiative_id: string | null
          issue_count: number | null
          name: string
          open_issue_count: number | null
          open_risk_count: number | null
          project_code: string | null
          project_manager: string | null
          risk_count: number | null
          sponsor: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["pm_project_status"]
          tags: string[] | null
          target_end_date: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_end_date?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          decision_count?: number | null
          description?: string | null
          id?: string
          initiative_id?: string | null
          issue_count?: number | null
          name: string
          open_issue_count?: number | null
          open_risk_count?: number | null
          project_code?: string | null
          project_manager?: string | null
          risk_count?: number | null
          sponsor?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["pm_project_status"]
          tags?: string[] | null
          target_end_date?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_end_date?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          decision_count?: number | null
          description?: string | null
          id?: string
          initiative_id?: string | null
          issue_count?: number | null
          name?: string
          open_issue_count?: number | null
          open_risk_count?: number | null
          project_code?: string | null
          project_manager?: string | null
          risk_count?: number | null
          sponsor?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["pm_project_status"]
          tags?: string[] | null
          target_end_date?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pm_raci_chart: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          created_at: string
          has_accountability_gaps: boolean
          id: string
          is_current: boolean
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          scope_note: string | null
          total_tasks: number
          updated_at: string
          user_id: string
          validation_notes: string | null
          version_notes: string | null
          version_number: number
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          created_at?: string
          has_accountability_gaps?: boolean
          id?: string
          is_current?: boolean
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          scope_note?: string | null
          total_tasks?: number
          updated_at?: string
          user_id: string
          validation_notes?: string | null
          version_notes?: string | null
          version_number?: number
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          created_at?: string
          has_accountability_gaps?: boolean
          id?: string
          is_current?: boolean
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          scope_note?: string | null
          total_tasks?: number
          updated_at?: string
          user_id?: string
          validation_notes?: string | null
          version_notes?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "pm_raci_chart_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_raci_entries: {
        Row: {
          chart_id: string
          created_at: string
          id: string
          notes: string | null
          phase: string | null
          project_id: string
          raci_role: Database["public"]["Enums"]["pm_raci_role_enum"]
          stakeholder_id: string | null
          stakeholder_label: string | null
          task_category:
            | Database["public"]["Enums"]["pm_raci_task_category_enum"]
            | null
          task_description: string | null
          task_name: string
          task_order: number
          updated_at: string
          user_id: string
        }
        Insert: {
          chart_id: string
          created_at?: string
          id?: string
          notes?: string | null
          phase?: string | null
          project_id: string
          raci_role: Database["public"]["Enums"]["pm_raci_role_enum"]
          stakeholder_id?: string | null
          stakeholder_label?: string | null
          task_category?:
            | Database["public"]["Enums"]["pm_raci_task_category_enum"]
            | null
          task_description?: string | null
          task_name: string
          task_order?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          chart_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          phase?: string | null
          project_id?: string
          raci_role?: Database["public"]["Enums"]["pm_raci_role_enum"]
          stakeholder_id?: string | null
          stakeholder_label?: string | null
          task_category?:
            | Database["public"]["Enums"]["pm_raci_task_category_enum"]
            | null
          task_description?: string | null
          task_name?: string
          task_order?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_raci_entries_chart_id_fkey"
            columns: ["chart_id"]
            isOneToOne: false
            referencedRelation: "pm_raci_chart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_raci_entries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_raci_entries_stakeholder_id_fkey"
            columns: ["stakeholder_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_resource_assignments: {
        Row: {
          activity_id: string | null
          actual_cost: number | null
          actual_finish_date: string | null
          actual_hours: number | null
          actual_start_date: string | null
          allocation_percentage: number | null
          allocation_status: Database["public"]["Enums"]["pm_resource_allocation_status_enum"]
          assignment_notes: string | null
          baseline_cost: number | null
          baseline_finish_date: string | null
          baseline_hours: number | null
          baseline_start_date: string | null
          created_at: string
          hourly_rate: number | null
          id: string
          plan_id: string
          planned_cost: number | null
          planned_finish_date: string | null
          planned_hours: number | null
          planned_start_date: string | null
          project_id: string
          resource_name_override: string | null
          resource_role: string
          resource_type: Database["public"]["Enums"]["pm_resource_type_enum"]
          skills_required: Json | null
          stakeholder_id: string | null
          updated_at: string
          user_id: string
          wbs_element_id: string | null
        }
        Insert: {
          activity_id?: string | null
          actual_cost?: number | null
          actual_finish_date?: string | null
          actual_hours?: number | null
          actual_start_date?: string | null
          allocation_percentage?: number | null
          allocation_status?: Database["public"]["Enums"]["pm_resource_allocation_status_enum"]
          assignment_notes?: string | null
          baseline_cost?: number | null
          baseline_finish_date?: string | null
          baseline_hours?: number | null
          baseline_start_date?: string | null
          created_at?: string
          hourly_rate?: number | null
          id?: string
          plan_id: string
          planned_cost?: number | null
          planned_finish_date?: string | null
          planned_hours?: number | null
          planned_start_date?: string | null
          project_id: string
          resource_name_override?: string | null
          resource_role: string
          resource_type?: Database["public"]["Enums"]["pm_resource_type_enum"]
          skills_required?: Json | null
          stakeholder_id?: string | null
          updated_at?: string
          user_id: string
          wbs_element_id?: string | null
        }
        Update: {
          activity_id?: string | null
          actual_cost?: number | null
          actual_finish_date?: string | null
          actual_hours?: number | null
          actual_start_date?: string | null
          allocation_percentage?: number | null
          allocation_status?: Database["public"]["Enums"]["pm_resource_allocation_status_enum"]
          assignment_notes?: string | null
          baseline_cost?: number | null
          baseline_finish_date?: string | null
          baseline_hours?: number | null
          baseline_start_date?: string | null
          created_at?: string
          hourly_rate?: number | null
          id?: string
          plan_id?: string
          planned_cost?: number | null
          planned_finish_date?: string | null
          planned_hours?: number | null
          planned_start_date?: string | null
          project_id?: string
          resource_name_override?: string | null
          resource_role?: string
          resource_type?: Database["public"]["Enums"]["pm_resource_type_enum"]
          skills_required?: Json | null
          stakeholder_id?: string | null
          updated_at?: string
          user_id?: string
          wbs_element_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_resource_assignments_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "pm_schedule_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_resource_assignments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "pm_resource_plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_resource_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_resource_assignments_stakeholder_id_fkey"
            columns: ["stakeholder_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_resource_assignments_wbs_element_id_fkey"
            columns: ["wbs_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_resource_plan: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          approval_date: string | null
          approved_by_id: string | null
          baseline_date: string | null
          compliance_and_regulations: string | null
          created_at: string
          id: string
          performance_management_approach: string | null
          plan_change_count: number
          plan_notes: string | null
          plan_status: Database["public"]["Enums"]["pm_resource_plan_status_enum"]
          plan_title: string
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          recognition_and_rewards: string | null
          resource_acquisition_approach: string | null
          resource_calendar_notes: string | null
          resource_leveling_approach: string | null
          resource_release_criteria: string | null
          schedule_id: string | null
          team_development_approach: string | null
          total_assignments: number
          total_planned_cost: number
          total_planned_hours: number
          updated_at: string
          user_id: string
          wbs_id: string | null
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_date?: string | null
          approved_by_id?: string | null
          baseline_date?: string | null
          compliance_and_regulations?: string | null
          created_at?: string
          id?: string
          performance_management_approach?: string | null
          plan_change_count?: number
          plan_notes?: string | null
          plan_status?: Database["public"]["Enums"]["pm_resource_plan_status_enum"]
          plan_title: string
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          recognition_and_rewards?: string | null
          resource_acquisition_approach?: string | null
          resource_calendar_notes?: string | null
          resource_leveling_approach?: string | null
          resource_release_criteria?: string | null
          schedule_id?: string | null
          team_development_approach?: string | null
          total_assignments?: number
          total_planned_cost?: number
          total_planned_hours?: number
          updated_at?: string
          user_id: string
          wbs_id?: string | null
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_date?: string | null
          approved_by_id?: string | null
          baseline_date?: string | null
          compliance_and_regulations?: string | null
          created_at?: string
          id?: string
          performance_management_approach?: string | null
          plan_change_count?: number
          plan_notes?: string | null
          plan_status?: Database["public"]["Enums"]["pm_resource_plan_status_enum"]
          plan_title?: string
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          recognition_and_rewards?: string | null
          resource_acquisition_approach?: string | null
          resource_calendar_notes?: string | null
          resource_leveling_approach?: string | null
          resource_release_criteria?: string | null
          schedule_id?: string | null
          team_development_approach?: string | null
          total_assignments?: number
          total_planned_cost?: number
          total_planned_hours?: number
          updated_at?: string
          user_id?: string
          wbs_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_resource_plan_approved_by_id_fkey"
            columns: ["approved_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_resource_plan_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_resource_plan_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "pm_project_schedule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_resource_plan_wbs_id_fkey"
            columns: ["wbs_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_risk_responses: {
        Row: {
          actual_completion_date: string | null
          cost_of_response: number | null
          created_at: string
          effectiveness_rating: number | null
          id: string
          project_id: string
          response_description: string
          response_notes: string | null
          response_owner_id: string | null
          response_status: Database["public"]["Enums"]["pm_risk_response_status_enum"]
          response_type: Database["public"]["Enums"]["pm_risk_response_type_enum"]
          risk_id: string
          target_completion_date: string | null
          trigger_condition: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_completion_date?: string | null
          cost_of_response?: number | null
          created_at?: string
          effectiveness_rating?: number | null
          id?: string
          project_id: string
          response_description: string
          response_notes?: string | null
          response_owner_id?: string | null
          response_status?: Database["public"]["Enums"]["pm_risk_response_status_enum"]
          response_type?: Database["public"]["Enums"]["pm_risk_response_type_enum"]
          risk_id: string
          target_completion_date?: string | null
          trigger_condition?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_completion_date?: string | null
          cost_of_response?: number | null
          created_at?: string
          effectiveness_rating?: number | null
          id?: string
          project_id?: string
          response_description?: string
          response_notes?: string | null
          response_owner_id?: string | null
          response_status?: Database["public"]["Enums"]["pm_risk_response_status_enum"]
          response_type?: Database["public"]["Enums"]["pm_risk_response_type_enum"]
          risk_id?: string
          target_completion_date?: string | null
          trigger_condition?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_risk_responses_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_risk_responses_response_owner_id_fkey"
            columns: ["response_owner_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_risk_responses_risk_id_fkey"
            columns: ["risk_id"]
            isOneToOne: false
            referencedRelation: "pm_risks"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_risks: {
        Row: {
          actual_resolution_date: string | null
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          category: Database["public"]["Enums"]["pm_risk_category"]
          contingency_plan: string | null
          contingency_reserve_allocated: number | null
          cost_impact_amount: number | null
          created_at: string | null
          description: string | null
          id: string
          identified_date: string | null
          impact: number
          mitigation_plan: string | null
          notes: string | null
          owner_id: string | null
          owner_name: string | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          probability: number
          project_id: string
          research_assist_used: boolean
          residual_impact: number | null
          residual_probability: number | null
          residual_risk_score: number | null
          response_strategy: string | null
          risk_id: string
          risk_owner_id: string | null
          risk_score: number | null
          risk_trigger: string | null
          schedule_activity_id: string | null
          schedule_impact_days: number | null
          secondary_risk_notes: string | null
          status: Database["public"]["Enums"]["pm_risk_status"]
          tags: string[] | null
          target_resolution_date: string | null
          title: string
          triggered_issue_id: string | null
          updated_at: string | null
          user_id: string
          wbs_element_id: string | null
        }
        Insert: {
          actual_resolution_date?: string | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          category?: Database["public"]["Enums"]["pm_risk_category"]
          contingency_plan?: string | null
          contingency_reserve_allocated?: number | null
          cost_impact_amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          identified_date?: string | null
          impact?: number
          mitigation_plan?: string | null
          notes?: string | null
          owner_id?: string | null
          owner_name?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          probability?: number
          project_id: string
          research_assist_used?: boolean
          residual_impact?: number | null
          residual_probability?: number | null
          residual_risk_score?: number | null
          response_strategy?: string | null
          risk_id: string
          risk_owner_id?: string | null
          risk_score?: number | null
          risk_trigger?: string | null
          schedule_activity_id?: string | null
          schedule_impact_days?: number | null
          secondary_risk_notes?: string | null
          status?: Database["public"]["Enums"]["pm_risk_status"]
          tags?: string[] | null
          target_resolution_date?: string | null
          title: string
          triggered_issue_id?: string | null
          updated_at?: string | null
          user_id: string
          wbs_element_id?: string | null
        }
        Update: {
          actual_resolution_date?: string | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          category?: Database["public"]["Enums"]["pm_risk_category"]
          contingency_plan?: string | null
          contingency_reserve_allocated?: number | null
          cost_impact_amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          identified_date?: string | null
          impact?: number
          mitigation_plan?: string | null
          notes?: string | null
          owner_id?: string | null
          owner_name?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          probability?: number
          project_id?: string
          research_assist_used?: boolean
          residual_impact?: number | null
          residual_probability?: number | null
          residual_risk_score?: number | null
          response_strategy?: string | null
          risk_id?: string
          risk_owner_id?: string | null
          risk_score?: number | null
          risk_trigger?: string | null
          schedule_activity_id?: string | null
          schedule_impact_days?: number | null
          secondary_risk_notes?: string | null
          status?: Database["public"]["Enums"]["pm_risk_status"]
          tags?: string[] | null
          target_resolution_date?: string | null
          title?: string
          triggered_issue_id?: string | null
          updated_at?: string | null
          user_id?: string
          wbs_element_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_risks_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "requirement_stakeholders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_risks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_risks_risk_owner_id_fkey"
            columns: ["risk_owner_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_risks_schedule_activity_id_fkey"
            columns: ["schedule_activity_id"]
            isOneToOne: false
            referencedRelation: "pm_schedule_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_risks_wbs_element_id_fkey"
            columns: ["wbs_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_schedule_activities: {
        Row: {
          activity_description: string | null
          activity_name: string
          activity_order: number
          activity_type: Database["public"]["Enums"]["pm_schedule_activity_type_enum"]
          actual_cost: number | null
          actual_finish_date: string | null
          actual_start_date: string | null
          assigned_to_id: string | null
          baseline_cost: number | null
          baseline_duration_days: number | null
          baseline_finish_date: string | null
          baseline_start_date: string | null
          completion_percentage: number
          completion_status: Database["public"]["Enums"]["pm_deliverable_status_enum"]
          constraint_date: string | null
          constraint_type: Database["public"]["Enums"]["pm_activity_constraint_enum"]
          created_at: string
          duration_days: number | null
          early_finish_date: string | null
          early_start_date: string | null
          free_float_days: number | null
          id: string
          is_critical_path: boolean
          late_finish_date: string | null
          late_start_date: string | null
          parent_activity_id: string | null
          planned_cost: number | null
          planned_finish_date: string | null
          planned_start_date: string | null
          planned_value_at_date: number | null
          project_id: string
          schedule_id: string
          total_float_days: number | null
          updated_at: string
          user_id: string
          variance_notes: string | null
          wbs_element_id: string | null
        }
        Insert: {
          activity_description?: string | null
          activity_name: string
          activity_order?: number
          activity_type?: Database["public"]["Enums"]["pm_schedule_activity_type_enum"]
          actual_cost?: number | null
          actual_finish_date?: string | null
          actual_start_date?: string | null
          assigned_to_id?: string | null
          baseline_cost?: number | null
          baseline_duration_days?: number | null
          baseline_finish_date?: string | null
          baseline_start_date?: string | null
          completion_percentage?: number
          completion_status?: Database["public"]["Enums"]["pm_deliverable_status_enum"]
          constraint_date?: string | null
          constraint_type?: Database["public"]["Enums"]["pm_activity_constraint_enum"]
          created_at?: string
          duration_days?: number | null
          early_finish_date?: string | null
          early_start_date?: string | null
          free_float_days?: number | null
          id?: string
          is_critical_path?: boolean
          late_finish_date?: string | null
          late_start_date?: string | null
          parent_activity_id?: string | null
          planned_cost?: number | null
          planned_finish_date?: string | null
          planned_start_date?: string | null
          planned_value_at_date?: number | null
          project_id: string
          schedule_id: string
          total_float_days?: number | null
          updated_at?: string
          user_id: string
          variance_notes?: string | null
          wbs_element_id?: string | null
        }
        Update: {
          activity_description?: string | null
          activity_name?: string
          activity_order?: number
          activity_type?: Database["public"]["Enums"]["pm_schedule_activity_type_enum"]
          actual_cost?: number | null
          actual_finish_date?: string | null
          actual_start_date?: string | null
          assigned_to_id?: string | null
          baseline_cost?: number | null
          baseline_duration_days?: number | null
          baseline_finish_date?: string | null
          baseline_start_date?: string | null
          completion_percentage?: number
          completion_status?: Database["public"]["Enums"]["pm_deliverable_status_enum"]
          constraint_date?: string | null
          constraint_type?: Database["public"]["Enums"]["pm_activity_constraint_enum"]
          created_at?: string
          duration_days?: number | null
          early_finish_date?: string | null
          early_start_date?: string | null
          free_float_days?: number | null
          id?: string
          is_critical_path?: boolean
          late_finish_date?: string | null
          late_start_date?: string | null
          parent_activity_id?: string | null
          planned_cost?: number | null
          planned_finish_date?: string | null
          planned_start_date?: string | null
          planned_value_at_date?: number | null
          project_id?: string
          schedule_id?: string
          total_float_days?: number | null
          updated_at?: string
          user_id?: string
          variance_notes?: string | null
          wbs_element_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_schedule_activities_assigned_to_id_fkey"
            columns: ["assigned_to_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_schedule_activities_parent_activity_id_fkey"
            columns: ["parent_activity_id"]
            isOneToOne: false
            referencedRelation: "pm_schedule_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_schedule_activities_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_schedule_activities_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "pm_project_schedule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_schedule_activities_wbs_element_id_fkey"
            columns: ["wbs_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_schedule_dependencies: {
        Row: {
          created_at: string
          dependency_type: Database["public"]["Enums"]["pm_dependency_type_enum"]
          id: string
          lag_days: number
          predecessor_id: string
          project_id: string
          schedule_id: string
          successor_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dependency_type?: Database["public"]["Enums"]["pm_dependency_type_enum"]
          id?: string
          lag_days?: number
          predecessor_id: string
          project_id: string
          schedule_id: string
          successor_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dependency_type?: Database["public"]["Enums"]["pm_dependency_type_enum"]
          id?: string
          lag_days?: number
          predecessor_id?: string
          project_id?: string
          schedule_id?: string
          successor_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_schedule_dependencies_predecessor_id_fkey"
            columns: ["predecessor_id"]
            isOneToOne: false
            referencedRelation: "pm_schedule_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_schedule_dependencies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_schedule_dependencies_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "pm_project_schedule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_schedule_dependencies_successor_id_fkey"
            columns: ["successor_id"]
            isOneToOne: false
            referencedRelation: "pm_schedule_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_scope_deliverables: {
        Row: {
          acceptance_criteria: Json
          completion_notes: string | null
          completion_percentage: number
          completion_status: Database["public"]["Enums"]["pm_deliverable_status_enum"]
          created_at: string
          deliverable_description: string | null
          deliverable_name: string
          deliverable_order: number
          deliverable_type: Database["public"]["Enums"]["pm_deliverable_type_enum"]
          id: string
          is_milestone_deliverable: boolean
          owner_id: string | null
          phase: string | null
          priority:
            | Database["public"]["Enums"]["pm_deliverable_priority_enum"]
            | null
          project_id: string
          scope_statement_id: string
          target_completion_date: string | null
          updated_at: string
          user_id: string
          wbs_code: string | null
          wbs_element_id: string | null
        }
        Insert: {
          acceptance_criteria?: Json
          completion_notes?: string | null
          completion_percentage?: number
          completion_status?: Database["public"]["Enums"]["pm_deliverable_status_enum"]
          created_at?: string
          deliverable_description?: string | null
          deliverable_name: string
          deliverable_order?: number
          deliverable_type: Database["public"]["Enums"]["pm_deliverable_type_enum"]
          id?: string
          is_milestone_deliverable?: boolean
          owner_id?: string | null
          phase?: string | null
          priority?:
            | Database["public"]["Enums"]["pm_deliverable_priority_enum"]
            | null
          project_id: string
          scope_statement_id: string
          target_completion_date?: string | null
          updated_at?: string
          user_id: string
          wbs_code?: string | null
          wbs_element_id?: string | null
        }
        Update: {
          acceptance_criteria?: Json
          completion_notes?: string | null
          completion_percentage?: number
          completion_status?: Database["public"]["Enums"]["pm_deliverable_status_enum"]
          created_at?: string
          deliverable_description?: string | null
          deliverable_name?: string
          deliverable_order?: number
          deliverable_type?: Database["public"]["Enums"]["pm_deliverable_type_enum"]
          id?: string
          is_milestone_deliverable?: boolean
          owner_id?: string | null
          phase?: string | null
          priority?:
            | Database["public"]["Enums"]["pm_deliverable_priority_enum"]
            | null
          project_id?: string
          scope_statement_id?: string
          target_completion_date?: string | null
          updated_at?: string
          user_id?: string
          wbs_code?: string | null
          wbs_element_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_pm_scope_deliv_wbs_element"
            columns: ["wbs_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_scope_deliverables_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_scope_deliverables_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_scope_deliverables_scope_statement_id_fkey"
            columns: ["scope_statement_id"]
            isOneToOne: false
            referencedRelation: "pm_scope_statement"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_scope_statement: {
        Row: {
          acceptance_process: string | null
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          approval_notes: string | null
          approved_at: string | null
          approved_by_id: string | null
          assumptions: Json
          baseline_date: string | null
          charter_id: string | null
          constraints: Json
          created_at: string
          exclusions_narrative: string | null
          id: string
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_boundaries: string | null
          project_id: string
          project_objectives_summary: string | null
          scope_change_count: number
          scope_description: string
          scope_statement_title: string
          scope_status: Database["public"]["Enums"]["pm_scope_status_enum"]
          submitted_for_review_at: string | null
          total_deliverables: number
          updated_at: string
          user_id: string
          version_history: Json
          version_number: number
        }
        Insert: {
          acceptance_process?: string | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_notes?: string | null
          approved_at?: string | null
          approved_by_id?: string | null
          assumptions?: Json
          baseline_date?: string | null
          charter_id?: string | null
          constraints?: Json
          created_at?: string
          exclusions_narrative?: string | null
          id?: string
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_boundaries?: string | null
          project_id: string
          project_objectives_summary?: string | null
          scope_change_count?: number
          scope_description: string
          scope_statement_title: string
          scope_status?: Database["public"]["Enums"]["pm_scope_status_enum"]
          submitted_for_review_at?: string | null
          total_deliverables?: number
          updated_at?: string
          user_id: string
          version_history?: Json
          version_number?: number
        }
        Update: {
          acceptance_process?: string | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          approval_notes?: string | null
          approved_at?: string | null
          approved_by_id?: string | null
          assumptions?: Json
          baseline_date?: string | null
          charter_id?: string | null
          constraints?: Json
          created_at?: string
          exclusions_narrative?: string | null
          id?: string
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_boundaries?: string | null
          project_id?: string
          project_objectives_summary?: string | null
          scope_change_count?: number
          scope_description?: string
          scope_statement_title?: string
          scope_status?: Database["public"]["Enums"]["pm_scope_status_enum"]
          submitted_for_review_at?: string | null
          total_deliverables?: number
          updated_at?: string
          user_id?: string
          version_history?: Json
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "pm_scope_statement_approved_by_id_fkey"
            columns: ["approved_by_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_scope_statement_charter_id_fkey"
            columns: ["charter_id"]
            isOneToOne: false
            referencedRelation: "pm_project_charter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_scope_statement_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_stakeholder_matrix: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          created_at: string
          engagement_strategy_summary: string | null
          id: string
          is_current: boolean
          keep_informed_strategy: string | null
          keep_satisfied_strategy: string | null
          manage_closely_strategy: string | null
          matrix_snapshot: Json
          monitor_strategy: string | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          snapshot_date: string
          snapshot_name: string
          total_stakeholders: number
          updated_at: string
          user_id: string
          version_number: number
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          created_at?: string
          engagement_strategy_summary?: string | null
          id?: string
          is_current?: boolean
          keep_informed_strategy?: string | null
          keep_satisfied_strategy?: string | null
          manage_closely_strategy?: string | null
          matrix_snapshot?: Json
          monitor_strategy?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          snapshot_date?: string
          snapshot_name: string
          total_stakeholders?: number
          updated_at?: string
          user_id: string
          version_number?: number
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          created_at?: string
          engagement_strategy_summary?: string | null
          id?: string
          is_current?: boolean
          keep_informed_strategy?: string | null
          keep_satisfied_strategy?: string | null
          manage_closely_strategy?: string | null
          matrix_snapshot?: Json
          monitor_strategy?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          snapshot_date?: string
          snapshot_name?: string
          total_stakeholders?: number
          updated_at?: string
          user_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "pm_stakeholder_matrix_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_stakeholder_register: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          ba_elicitation_notes: string | null
          ba_survey_recommended: boolean
          business_hours_end: string | null
          business_hours_start: string | null
          country: string | null
          created_at: string
          current_sentiment:
            | Database["public"]["Enums"]["pm_stakeholder_sentiment_enum"]
            | null
          elicitation_method_recommended:
            | Database["public"]["Enums"]["pm_elicitation_method_enum"]
            | null
          elicitation_notes: string | null
          elicitation_priority:
            | Database["public"]["Enums"]["pm_uncertainty_enum"]
            | null
          email: string | null
          id: string
          interest_level: number
          known_blackout_dates: Json | null
          language: string | null
          likely_requirements: string | null
          name: string
          organization: string | null
          phone: string | null
          planned_absences: Json | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          power_interest_quadrant: string | null
          power_level: number
          preferred_channel:
            | Database["public"]["Enums"]["pm_comm_channel_enum"]
            | null
          preferred_format:
            | Database["public"]["Enums"]["pm_comm_format_enum"]
            | null
          preferred_frequency:
            | Database["public"]["Enums"]["pm_comm_frequency_enum"]
            | null
          primary_interest: string | null
          project_id: string
          project_role: string | null
          requirements_uncertainty:
            | Database["public"]["Enums"]["pm_uncertainty_enum"]
            | null
          sentiment_last_assessed: string | null
          sentiment_notes: string | null
          stakeholder_type: Database["public"]["Enums"]["pm_stakeholder_type_enum"]
          time_zone: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          ba_elicitation_notes?: string | null
          ba_survey_recommended?: boolean
          business_hours_end?: string | null
          business_hours_start?: string | null
          country?: string | null
          created_at?: string
          current_sentiment?:
            | Database["public"]["Enums"]["pm_stakeholder_sentiment_enum"]
            | null
          elicitation_method_recommended?:
            | Database["public"]["Enums"]["pm_elicitation_method_enum"]
            | null
          elicitation_notes?: string | null
          elicitation_priority?:
            | Database["public"]["Enums"]["pm_uncertainty_enum"]
            | null
          email?: string | null
          id?: string
          interest_level: number
          known_blackout_dates?: Json | null
          language?: string | null
          likely_requirements?: string | null
          name: string
          organization?: string | null
          phone?: string | null
          planned_absences?: Json | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          power_interest_quadrant?: string | null
          power_level: number
          preferred_channel?:
            | Database["public"]["Enums"]["pm_comm_channel_enum"]
            | null
          preferred_format?:
            | Database["public"]["Enums"]["pm_comm_format_enum"]
            | null
          preferred_frequency?:
            | Database["public"]["Enums"]["pm_comm_frequency_enum"]
            | null
          primary_interest?: string | null
          project_id: string
          project_role?: string | null
          requirements_uncertainty?:
            | Database["public"]["Enums"]["pm_uncertainty_enum"]
            | null
          sentiment_last_assessed?: string | null
          sentiment_notes?: string | null
          stakeholder_type: Database["public"]["Enums"]["pm_stakeholder_type_enum"]
          time_zone?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          ba_elicitation_notes?: string | null
          ba_survey_recommended?: boolean
          business_hours_end?: string | null
          business_hours_start?: string | null
          country?: string | null
          created_at?: string
          current_sentiment?:
            | Database["public"]["Enums"]["pm_stakeholder_sentiment_enum"]
            | null
          elicitation_method_recommended?:
            | Database["public"]["Enums"]["pm_elicitation_method_enum"]
            | null
          elicitation_notes?: string | null
          elicitation_priority?:
            | Database["public"]["Enums"]["pm_uncertainty_enum"]
            | null
          email?: string | null
          id?: string
          interest_level?: number
          known_blackout_dates?: Json | null
          language?: string | null
          likely_requirements?: string | null
          name?: string
          organization?: string | null
          phone?: string | null
          planned_absences?: Json | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          power_interest_quadrant?: string | null
          power_level?: number
          preferred_channel?:
            | Database["public"]["Enums"]["pm_comm_channel_enum"]
            | null
          preferred_format?:
            | Database["public"]["Enums"]["pm_comm_format_enum"]
            | null
          preferred_frequency?:
            | Database["public"]["Enums"]["pm_comm_frequency_enum"]
            | null
          primary_interest?: string | null
          project_id?: string
          project_role?: string | null
          requirements_uncertainty?:
            | Database["public"]["Enums"]["pm_uncertainty_enum"]
            | null
          sentiment_last_assessed?: string | null
          sentiment_notes?: string | null
          stakeholder_type?: Database["public"]["Enums"]["pm_stakeholder_type_enum"]
          time_zone?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_stakeholder_register_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_status_reports: {
        Row: {
          accomplishments_this_period: string | null
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          budget_narrative: string | null
          changes_summary: string | null
          cost_health:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          created_at: string
          distributed_at: string | null
          distributed_to: string[] | null
          executive_summary: string | null
          id: string
          issues_summary: string | null
          overall_health:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          period_end: string | null
          period_start: string | null
          planned_next_period: string | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          report_cadence:
            | Database["public"]["Enums"]["pm_report_cadence_enum"]
            | null
          report_date: string | null
          report_notes: string | null
          report_number: string | null
          report_status: Database["public"]["Enums"]["pm_report_status_enum"]
          risk_health:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          risks_summary: string | null
          schedule_health:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          schedule_narrative: string | null
          scope_health:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          snapshot_aggregated_at: string | null
          snapshot_data: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          accomplishments_this_period?: string | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          budget_narrative?: string | null
          changes_summary?: string | null
          cost_health?:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          created_at?: string
          distributed_at?: string | null
          distributed_to?: string[] | null
          executive_summary?: string | null
          id?: string
          issues_summary?: string | null
          overall_health?:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          period_end?: string | null
          period_start?: string | null
          planned_next_period?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          report_cadence?:
            | Database["public"]["Enums"]["pm_report_cadence_enum"]
            | null
          report_date?: string | null
          report_notes?: string | null
          report_number?: string | null
          report_status?: Database["public"]["Enums"]["pm_report_status_enum"]
          risk_health?:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          risks_summary?: string | null
          schedule_health?:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          schedule_narrative?: string | null
          scope_health?:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          snapshot_aggregated_at?: string | null
          snapshot_data?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          accomplishments_this_period?: string | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          budget_narrative?: string | null
          changes_summary?: string | null
          cost_health?:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          created_at?: string
          distributed_at?: string | null
          distributed_to?: string[] | null
          executive_summary?: string | null
          id?: string
          issues_summary?: string | null
          overall_health?:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          period_end?: string | null
          period_start?: string | null
          planned_next_period?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          report_cadence?:
            | Database["public"]["Enums"]["pm_report_cadence_enum"]
            | null
          report_date?: string | null
          report_notes?: string | null
          report_number?: string | null
          report_status?: Database["public"]["Enums"]["pm_report_status_enum"]
          risk_health?:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          risks_summary?: string | null
          schedule_health?:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          schedule_narrative?: string | null
          scope_health?:
            | Database["public"]["Enums"]["pm_health_status_enum"]
            | null
          snapshot_aggregated_at?: string | null
          snapshot_data?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_status_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_variance_analyses: {
        Row: {
          acceptance_rationale: string | null
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          analysis_date: string
          contributing_factors: string | null
          corrective_action_owner: string | null
          corrective_action_plan: string | null
          cpi_value: number | null
          created_at: string
          cv_value: number | null
          evm_snapshot_id: string | null
          id: string
          impact_assessment: string | null
          lessons_learned: string | null
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          resolution_notes: string | null
          resolution_status: Database["public"]["Enums"]["pm_variance_resolution_enum"]
          resolved_at: string | null
          root_cause: string | null
          spi_value: number | null
          sv_value: number | null
          target_resolution_date: string | null
          updated_at: string
          user_id: string
          variance_amount: number | null
          variance_description: string | null
          variance_notes: string | null
          variance_percent: number | null
          variance_severity: Database["public"]["Enums"]["pm_variance_severity_enum"]
          variance_type: Database["public"]["Enums"]["pm_variance_type_enum"]
          wbs_element_id: string | null
        }
        Insert: {
          acceptance_rationale?: string | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          analysis_date?: string
          contributing_factors?: string | null
          corrective_action_owner?: string | null
          corrective_action_plan?: string | null
          cpi_value?: number | null
          created_at?: string
          cv_value?: number | null
          evm_snapshot_id?: string | null
          id?: string
          impact_assessment?: string | null
          lessons_learned?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          resolution_notes?: string | null
          resolution_status?: Database["public"]["Enums"]["pm_variance_resolution_enum"]
          resolved_at?: string | null
          root_cause?: string | null
          spi_value?: number | null
          sv_value?: number | null
          target_resolution_date?: string | null
          updated_at?: string
          user_id: string
          variance_amount?: number | null
          variance_description?: string | null
          variance_notes?: string | null
          variance_percent?: number | null
          variance_severity?: Database["public"]["Enums"]["pm_variance_severity_enum"]
          variance_type: Database["public"]["Enums"]["pm_variance_type_enum"]
          wbs_element_id?: string | null
        }
        Update: {
          acceptance_rationale?: string | null
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          analysis_date?: string
          contributing_factors?: string | null
          corrective_action_owner?: string | null
          corrective_action_plan?: string | null
          cpi_value?: number | null
          created_at?: string
          cv_value?: number | null
          evm_snapshot_id?: string | null
          id?: string
          impact_assessment?: string | null
          lessons_learned?: string | null
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          resolution_notes?: string | null
          resolution_status?: Database["public"]["Enums"]["pm_variance_resolution_enum"]
          resolved_at?: string | null
          root_cause?: string | null
          spi_value?: number | null
          sv_value?: number | null
          target_resolution_date?: string | null
          updated_at?: string
          user_id?: string
          variance_amount?: number | null
          variance_description?: string | null
          variance_notes?: string | null
          variance_percent?: number | null
          variance_severity?: Database["public"]["Enums"]["pm_variance_severity_enum"]
          variance_type?: Database["public"]["Enums"]["pm_variance_type_enum"]
          wbs_element_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_variance_analyses_evm_snapshot_id_fkey"
            columns: ["evm_snapshot_id"]
            isOneToOne: false
            referencedRelation: "pm_evm_snapshots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_variance_analyses_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_variance_analyses_wbs_element_id_fkey"
            columns: ["wbs_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_wbs: {
        Row: {
          ai_draft: Json | null
          ai_draft_generated_at: string | null
          baseline_date: string | null
          created_at: string
          id: string
          max_depth: number
          pm_review_notes: string | null
          pm_reviewed: boolean
          pm_reviewed_at: string | null
          project_id: string
          scope_statement_id: string | null
          total_elements: number
          total_work_packages: number
          updated_at: string
          user_id: string
          wbs_change_count: number
          wbs_dictionary_notes: string | null
          wbs_status: Database["public"]["Enums"]["pm_wbs_status_enum"]
          wbs_title: string
        }
        Insert: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          baseline_date?: string | null
          created_at?: string
          id?: string
          max_depth?: number
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id: string
          scope_statement_id?: string | null
          total_elements?: number
          total_work_packages?: number
          updated_at?: string
          user_id: string
          wbs_change_count?: number
          wbs_dictionary_notes?: string | null
          wbs_status?: Database["public"]["Enums"]["pm_wbs_status_enum"]
          wbs_title: string
        }
        Update: {
          ai_draft?: Json | null
          ai_draft_generated_at?: string | null
          baseline_date?: string | null
          created_at?: string
          id?: string
          max_depth?: number
          pm_review_notes?: string | null
          pm_reviewed?: boolean
          pm_reviewed_at?: string | null
          project_id?: string
          scope_statement_id?: string | null
          total_elements?: number
          total_work_packages?: number
          updated_at?: string
          user_id?: string
          wbs_change_count?: number
          wbs_dictionary_notes?: string | null
          wbs_status?: Database["public"]["Enums"]["pm_wbs_status_enum"]
          wbs_title?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_wbs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_wbs_scope_statement_id_fkey"
            columns: ["scope_statement_id"]
            isOneToOne: false
            referencedRelation: "pm_scope_statement"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_wbs_elements: {
        Row: {
          actual_cost: number | null
          actual_end_date: string | null
          actual_start_date: string | null
          assigned_to_id: string | null
          completion_percentage: number
          completion_status: Database["public"]["Enums"]["pm_deliverable_status_enum"]
          cost_account: string | null
          created_at: string
          deliverable_id: string | null
          dictionary_entry: string | null
          element_description: string | null
          element_name: string
          element_order: number
          element_type: Database["public"]["Enums"]["pm_wbs_element_type_enum"]
          id: string
          is_critical_path: boolean
          level: number
          parent_element_id: string | null
          planned_cost: number | null
          planned_duration_days: number | null
          planned_end_date: string | null
          planned_start_date: string | null
          project_id: string
          updated_at: string
          user_id: string
          wbs_code: string
          wbs_id: string
        }
        Insert: {
          actual_cost?: number | null
          actual_end_date?: string | null
          actual_start_date?: string | null
          assigned_to_id?: string | null
          completion_percentage?: number
          completion_status?: Database["public"]["Enums"]["pm_deliverable_status_enum"]
          cost_account?: string | null
          created_at?: string
          deliverable_id?: string | null
          dictionary_entry?: string | null
          element_description?: string | null
          element_name: string
          element_order?: number
          element_type: Database["public"]["Enums"]["pm_wbs_element_type_enum"]
          id?: string
          is_critical_path?: boolean
          level: number
          parent_element_id?: string | null
          planned_cost?: number | null
          planned_duration_days?: number | null
          planned_end_date?: string | null
          planned_start_date?: string | null
          project_id: string
          updated_at?: string
          user_id: string
          wbs_code: string
          wbs_id: string
        }
        Update: {
          actual_cost?: number | null
          actual_end_date?: string | null
          actual_start_date?: string | null
          assigned_to_id?: string | null
          completion_percentage?: number
          completion_status?: Database["public"]["Enums"]["pm_deliverable_status_enum"]
          cost_account?: string | null
          created_at?: string
          deliverable_id?: string | null
          dictionary_entry?: string | null
          element_description?: string | null
          element_name?: string
          element_order?: number
          element_type?: Database["public"]["Enums"]["pm_wbs_element_type_enum"]
          id?: string
          is_critical_path?: boolean
          level?: number
          parent_element_id?: string | null
          planned_cost?: number | null
          planned_duration_days?: number | null
          planned_end_date?: string | null
          planned_start_date?: string | null
          project_id?: string
          updated_at?: string
          user_id?: string
          wbs_code?: string
          wbs_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_wbs_elements_assigned_to_id_fkey"
            columns: ["assigned_to_id"]
            isOneToOne: false
            referencedRelation: "pm_stakeholder_register"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_wbs_elements_deliverable_id_fkey"
            columns: ["deliverable_id"]
            isOneToOne: false
            referencedRelation: "pm_scope_deliverables"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_wbs_elements_parent_element_id_fkey"
            columns: ["parent_element_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs_elements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_wbs_elements_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "pm_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_wbs_elements_wbs_id_fkey"
            columns: ["wbs_id"]
            isOneToOne: false
            referencedRelation: "pm_wbs"
            referencedColumns: ["id"]
          },
        ]
      }
      principle_compliance: {
        Row: {
          artifact_id: string | null
          assessed_at: string | null
          assessed_by: string | null
          compliance_status: string
          exception_expiry: string | null
          exception_reason: string | null
          id: string
          principle_id: string | null
        }
        Insert: {
          artifact_id?: string | null
          assessed_at?: string | null
          assessed_by?: string | null
          compliance_status: string
          exception_expiry?: string | null
          exception_reason?: string | null
          id?: string
          principle_id?: string | null
        }
        Update: {
          artifact_id?: string | null
          assessed_at?: string | null
          assessed_by?: string | null
          compliance_status?: string
          exception_expiry?: string | null
          exception_reason?: string | null
          id?: string
          principle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "principle_compliance_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "architecture_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "principle_compliance_principle_id_fkey"
            columns: ["principle_id"]
            isOneToOne: false
            referencedRelation: "architecture_principles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          clerk_user_id: string
          created_at: string
          current_belt: Database["public"]["Enums"]["belt_level"]
          display_name: string
          email: string | null
          id: string
          total_xp: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          clerk_user_id: string
          created_at?: string
          current_belt?: Database["public"]["Enums"]["belt_level"]
          display_name?: string
          email?: string | null
          id?: string
          total_xp?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          clerk_user_id?: string
          created_at?: string
          current_belt?: Database["public"]["Enums"]["belt_level"]
          display_name?: string
          email?: string | null
          id?: string
          total_xp?: number
          updated_at?: string
        }
        Relationships: []
      }
      requirement_baselines: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          description: string | null
          id: string
          is_approved: boolean | null
          name: string
          priority_breakdown: Json | null
          requirements_count: number | null
          requirements_snapshot: Json
          status_breakdown: Json | null
          type_breakdown: Json | null
          user_id: string
          version: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_approved?: boolean | null
          name: string
          priority_breakdown?: Json | null
          requirements_count?: number | null
          requirements_snapshot: Json
          status_breakdown?: Json | null
          type_breakdown?: Json | null
          user_id: string
          version: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_approved?: boolean | null
          name?: string
          priority_breakdown?: Json | null
          requirements_count?: number | null
          requirements_snapshot?: Json
          status_breakdown?: Json | null
          type_breakdown?: Json | null
          user_id?: string
          version?: string
        }
        Relationships: []
      }
      requirement_comments: {
        Row: {
          comment_type: string | null
          content: string
          created_at: string | null
          id: string
          is_resolved: boolean | null
          mentions: string[] | null
          parent_comment_id: string | null
          referenced_requirements: string[] | null
          requirement_id: string
          resolved_at: string | null
          resolved_by: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment_type?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_resolved?: boolean | null
          mentions?: string[] | null
          parent_comment_id?: string | null
          referenced_requirements?: string[] | null
          requirement_id: string
          resolved_at?: string | null
          resolved_by?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment_type?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_resolved?: boolean | null
          mentions?: string[] | null
          parent_comment_id?: string | null
          referenced_requirements?: string[] | null
          requirement_id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "requirement_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "requirement_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requirement_comments_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      requirement_gap_links: {
        Row: {
          capability_impact: Json | null
          created_at: string | null
          gap_artifact_id: string | null
          id: string
          link_type: string
          requirement_artifact_id: string | null
          status: string | null
        }
        Insert: {
          capability_impact?: Json | null
          created_at?: string | null
          gap_artifact_id?: string | null
          id?: string
          link_type: string
          requirement_artifact_id?: string | null
          status?: string | null
        }
        Update: {
          capability_impact?: Json | null
          created_at?: string | null
          gap_artifact_id?: string | null
          id?: string
          link_type?: string
          requirement_artifact_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requirement_gap_links_gap_artifact_id_fkey"
            columns: ["gap_artifact_id"]
            isOneToOne: false
            referencedRelation: "architecture_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requirement_gap_links_requirement_artifact_id_fkey"
            columns: ["requirement_artifact_id"]
            isOneToOne: false
            referencedRelation: "architecture_artifacts"
            referencedColumns: ["id"]
          },
        ]
      }
      requirement_history: {
        Row: {
          change_summary: string | null
          change_type: string
          changed_at: string | null
          changed_by: string
          changed_fields: string[] | null
          id: string
          new_values: Json | null
          previous_values: Json | null
          requirement_id: string
          snapshot: Json
          user_id: string
          version: number
        }
        Insert: {
          change_summary?: string | null
          change_type: string
          changed_at?: string | null
          changed_by: string
          changed_fields?: string[] | null
          id?: string
          new_values?: Json | null
          previous_values?: Json | null
          requirement_id: string
          snapshot: Json
          user_id: string
          version: number
        }
        Update: {
          change_summary?: string | null
          change_type?: string
          changed_at?: string | null
          changed_by?: string
          changed_fields?: string[] | null
          id?: string
          new_values?: Json | null
          previous_values?: Json | null
          requirement_id?: string
          snapshot?: Json
          user_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "requirement_history_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      requirement_import_sessions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          processed_items: number | null
          processing_options: Json | null
          requirements_created: number | null
          source_type: string
          status: string
          total_items: number | null
          traces_created: number | null
          updated_at: string | null
          user_id: string
          voc_requirement_ids: string[] | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          processed_items?: number | null
          processing_options?: Json | null
          requirements_created?: number | null
          source_type?: string
          status?: string
          total_items?: number | null
          traces_created?: number | null
          updated_at?: string | null
          user_id: string
          voc_requirement_ids?: string[] | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          processed_items?: number | null
          processing_options?: Json | null
          requirements_created?: number | null
          source_type?: string
          status?: string
          total_items?: number | null
          traces_created?: number | null
          updated_at?: string | null
          user_id?: string
          voc_requirement_ids?: string[] | null
        }
        Relationships: []
      }
      requirement_stakeholders: {
        Row: {
          communication_preference: string | null
          created_at: string | null
          email: string | null
          id: string
          influence_level: string | null
          interest_level: string | null
          is_active: boolean | null
          name: string
          notes: string | null
          organization: string | null
          phone: string | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          communication_preference?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          influence_level?: string | null
          interest_level?: string | null
          is_active?: boolean | null
          name: string
          notes?: string | null
          organization?: string | null
          phone?: string | null
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          communication_preference?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          influence_level?: string | null
          interest_level?: string | null
          is_active?: boolean | null
          name?: string
          notes?: string | null
          organization?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      requirement_traces: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_verified: boolean | null
          requirement_id: string
          target_external_id: string | null
          target_id: string
          target_title: string | null
          target_type: Database["public"]["Enums"]["trace_target_type"]
          trace_type: Database["public"]["Enums"]["trace_type"]
          updated_at: string | null
          user_id: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          requirement_id: string
          target_external_id?: string | null
          target_id: string
          target_title?: string | null
          target_type: Database["public"]["Enums"]["trace_target_type"]
          trace_type: Database["public"]["Enums"]["trace_type"]
          updated_at?: string | null
          user_id: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          requirement_id?: string
          target_external_id?: string | null
          target_id?: string
          target_title?: string | null
          target_type?: Database["public"]["Enums"]["trace_target_type"]
          trace_type?: Database["public"]["Enums"]["trace_type"]
          updated_at?: string | null
          user_id?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requirement_traces_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      requirements: {
        Row: {
          acceptance_criteria: Json | null
          ai_confidence:
            | Database["public"]["Enums"]["ai_confidence_level"]
            | null
          ai_model_version: string | null
          approved_at: string | null
          approved_by: string | null
          assigned_to: string | null
          complexity: Database["public"]["Enums"]["complexity_level"] | null
          conflicts_with: string[] | null
          created_at: string | null
          custom_fields: Json | null
          depends_on: string[] | null
          description: string
          domain_category: Database["public"]["Enums"]["domain_category"] | null
          estimated_effort: string | null
          id: string
          import_session_id: string | null
          is_ai_generated: boolean | null
          nfr_category: Database["public"]["Enums"]["nfr_category"] | null
          original_ai_suggestion: Json | null
          owner_id: string | null
          parent_id: string | null
          priority_moscow: Database["public"]["Enums"]["moscow_priority"] | null
          rationale: string | null
          requirement_id: string
          requirement_type: Database["public"]["Enums"]["requirement_type"]
          risk_level: Database["public"]["Enums"]["risk_level"] | null
          source_voc_analysis_ids: string[] | null
          source_voc_feedback_ids: string[] | null
          source_voc_requirement_id: string | null
          status: Database["public"]["Enums"]["requirement_status"]
          tags: string[] | null
          target_release: string | null
          title: string
          updated_at: string | null
          user_id: string
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at: string | null
          verified_by: string | null
          version: number | null
        }
        Insert: {
          acceptance_criteria?: Json | null
          ai_confidence?:
            | Database["public"]["Enums"]["ai_confidence_level"]
            | null
          ai_model_version?: string | null
          approved_at?: string | null
          approved_by?: string | null
          assigned_to?: string | null
          complexity?: Database["public"]["Enums"]["complexity_level"] | null
          conflicts_with?: string[] | null
          created_at?: string | null
          custom_fields?: Json | null
          depends_on?: string[] | null
          description: string
          domain_category?:
            | Database["public"]["Enums"]["domain_category"]
            | null
          estimated_effort?: string | null
          id?: string
          import_session_id?: string | null
          is_ai_generated?: boolean | null
          nfr_category?: Database["public"]["Enums"]["nfr_category"] | null
          original_ai_suggestion?: Json | null
          owner_id?: string | null
          parent_id?: string | null
          priority_moscow?:
            | Database["public"]["Enums"]["moscow_priority"]
            | null
          rationale?: string | null
          requirement_id: string
          requirement_type?: Database["public"]["Enums"]["requirement_type"]
          risk_level?: Database["public"]["Enums"]["risk_level"] | null
          source_voc_analysis_ids?: string[] | null
          source_voc_feedback_ids?: string[] | null
          source_voc_requirement_id?: string | null
          status?: Database["public"]["Enums"]["requirement_status"]
          tags?: string[] | null
          target_release?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          verified_by?: string | null
          version?: number | null
        }
        Update: {
          acceptance_criteria?: Json | null
          ai_confidence?:
            | Database["public"]["Enums"]["ai_confidence_level"]
            | null
          ai_model_version?: string | null
          approved_at?: string | null
          approved_by?: string | null
          assigned_to?: string | null
          complexity?: Database["public"]["Enums"]["complexity_level"] | null
          conflicts_with?: string[] | null
          created_at?: string | null
          custom_fields?: Json | null
          depends_on?: string[] | null
          description?: string
          domain_category?:
            | Database["public"]["Enums"]["domain_category"]
            | null
          estimated_effort?: string | null
          id?: string
          import_session_id?: string | null
          is_ai_generated?: boolean | null
          nfr_category?: Database["public"]["Enums"]["nfr_category"] | null
          original_ai_suggestion?: Json | null
          owner_id?: string | null
          parent_id?: string | null
          priority_moscow?:
            | Database["public"]["Enums"]["moscow_priority"]
            | null
          rationale?: string | null
          requirement_id?: string
          requirement_type?: Database["public"]["Enums"]["requirement_type"]
          risk_level?: Database["public"]["Enums"]["risk_level"] | null
          source_voc_analysis_ids?: string[] | null
          source_voc_feedback_ids?: string[] | null
          source_voc_requirement_id?: string | null
          status?: Database["public"]["Enums"]["requirement_status"]
          tags?: string[] | null
          target_release?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          verified_by?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "requirements_import_session_id_fkey"
            columns: ["import_session_id"]
            isOneToOne: false
            referencedRelation: "requirement_import_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requirements_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "requirement_stakeholders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requirements_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      scenarios: {
        Row: {
          belt_level: Database["public"]["Enums"]["belt_level"]
          config: Json
          created_at: string
          description: string | null
          id: string
          is_default: boolean
          name: string
          station_count: number
          target_metrics: Json | null
        }
        Insert: {
          belt_level: Database["public"]["Enums"]["belt_level"]
          config: Json
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean
          name: string
          station_count?: number
          target_metrics?: Json | null
        }
        Update: {
          belt_level?: Database["public"]["Enums"]["belt_level"]
          config?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean
          name?: string
          station_count?: number
          target_metrics?: Json | null
        }
        Relationships: []
      }
      scores: {
        Row: {
          belt_level: Database["public"]["Enums"]["belt_level"]
          bonuses: Json
          cohort_id: string | null
          created_at: string
          customer_satisfaction: number
          flow_efficiency: number
          id: string
          lead_time_reduction: number
          penalties: Json
          profile_id: string
          replay_hash: string | null
          scenario_id: string
          session_id: string
          stability_index: number
          total_score: number
          total_ticks: number
          wip_reduction: number
        }
        Insert: {
          belt_level: Database["public"]["Enums"]["belt_level"]
          bonuses?: Json
          cohort_id?: string | null
          created_at?: string
          customer_satisfaction?: number
          flow_efficiency?: number
          id?: string
          lead_time_reduction?: number
          penalties?: Json
          profile_id: string
          replay_hash?: string | null
          scenario_id: string
          session_id: string
          stability_index?: number
          total_score?: number
          total_ticks?: number
          wip_reduction?: number
        }
        Update: {
          belt_level?: Database["public"]["Enums"]["belt_level"]
          bonuses?: Json
          cohort_id?: string | null
          created_at?: string
          customer_satisfaction?: number
          flow_efficiency?: number
          id?: string
          lead_time_reduction?: number
          penalties?: Json
          profile_id?: string
          replay_hash?: string | null
          scenario_id?: string
          session_id?: string
          stability_index?: number
          total_score?: number
          total_ticks?: number
          wip_reduction?: number
        }
        Relationships: [
          {
            foreignKeyName: "scores_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "scenarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "simulation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      simulation_sessions: {
        Row: {
          actions_log: Json
          belt_level: Database["public"]["Enums"]["belt_level"]
          cohort_id: string | null
          completed_at: string | null
          current_tick: number
          id: string
          profile_id: string
          scenario_id: string
          seed: string
          sim_state: Json
          started_at: string
          status: Database["public"]["Enums"]["session_status"]
          updated_at: string
        }
        Insert: {
          actions_log?: Json
          belt_level: Database["public"]["Enums"]["belt_level"]
          cohort_id?: string | null
          completed_at?: string | null
          current_tick?: number
          id?: string
          profile_id: string
          scenario_id: string
          seed: string
          sim_state: Json
          started_at?: string
          status?: Database["public"]["Enums"]["session_status"]
          updated_at?: string
        }
        Update: {
          actions_log?: Json
          belt_level?: Database["public"]["Enums"]["belt_level"]
          cohort_id?: string | null
          completed_at?: string | null
          current_tick?: number
          id?: string
          profile_id?: string
          scenario_id?: string
          seed?: string
          sim_state?: Json
          started_at?: string
          status?: Database["public"]["Enums"]["session_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "simulation_sessions_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulation_sessions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulation_sessions_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      strategic_priorities: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          sort_order: number | null
          updated_at: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          sort_order?: number | null
          updated_at?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          sort_order?: number | null
          updated_at?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      voc_analyses: {
        Row: {
          ai_confidence: string | null
          ai_model_version: string | null
          analysis_method: string | null
          assigned_to: string | null
          created_at: string | null
          feedback_id: string | null
          id: string
          import_session_id: string | null
          is_ai_generated: boolean | null
          notes: string | null
          original_ai_suggestion: Json | null
          root_cause_summary: string | null
          source_feedback_ids: string[] | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
          whys: Json | null
        }
        Insert: {
          ai_confidence?: string | null
          ai_model_version?: string | null
          analysis_method?: string | null
          assigned_to?: string | null
          created_at?: string | null
          feedback_id?: string | null
          id?: string
          import_session_id?: string | null
          is_ai_generated?: boolean | null
          notes?: string | null
          original_ai_suggestion?: Json | null
          root_cause_summary?: string | null
          source_feedback_ids?: string[] | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          whys?: Json | null
        }
        Update: {
          ai_confidence?: string | null
          ai_model_version?: string | null
          analysis_method?: string | null
          assigned_to?: string | null
          created_at?: string | null
          feedback_id?: string | null
          id?: string
          import_session_id?: string | null
          is_ai_generated?: boolean | null
          notes?: string | null
          original_ai_suggestion?: Json | null
          root_cause_summary?: string | null
          source_feedback_ids?: string[] | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          whys?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_analyses_import_session"
            columns: ["import_session_id"]
            isOneToOne: false
            referencedRelation: "voc_import_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voc_analyses_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "voc_feedback"
            referencedColumns: ["id"]
          },
        ]
      }
      voc_entries: {
        Row: {
          created_at: string
          customer_name: string
          graduated_analysis_id: string | null
          graduated_at: string | null
          graduated_feedback_id: string | null
          graduated_requirement_id: string | null
          id: string
          measurable_requirement: string
          raw_feedback: string | null
          skipped_optional: boolean
          underlying_need: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          customer_name?: string
          graduated_analysis_id?: string | null
          graduated_at?: string | null
          graduated_feedback_id?: string | null
          graduated_requirement_id?: string | null
          id?: string
          measurable_requirement?: string
          raw_feedback?: string | null
          skipped_optional?: boolean
          underlying_need?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          customer_name?: string
          graduated_analysis_id?: string | null
          graduated_at?: string | null
          graduated_feedback_id?: string | null
          graduated_requirement_id?: string | null
          id?: string
          measurable_requirement?: string
          raw_feedback?: string | null
          skipped_optional?: boolean
          underlying_need?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      voc_feedback: {
        Row: {
          ai_confidence: string | null
          ai_model_version: string | null
          category: string | null
          contact_info: string | null
          created_at: string | null
          customer_segment: string | null
          date_received: string | null
          id: string
          import_session_id: string | null
          is_ai_generated: boolean | null
          lab_context: Json | null
          original_ai_suggestion: string | null
          sentiment: string | null
          source: string | null
          source_details: string | null
          tags: string[] | null
          theme_id: string | null
          updated_at: string | null
          user_id: string
          verbatim: string
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          ai_confidence?: string | null
          ai_model_version?: string | null
          category?: string | null
          contact_info?: string | null
          created_at?: string | null
          customer_segment?: string | null
          date_received?: string | null
          id?: string
          import_session_id?: string | null
          is_ai_generated?: boolean | null
          lab_context?: Json | null
          original_ai_suggestion?: string | null
          sentiment?: string | null
          source?: string | null
          source_details?: string | null
          tags?: string[] | null
          theme_id?: string | null
          updated_at?: string | null
          user_id: string
          verbatim: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          ai_confidence?: string | null
          ai_model_version?: string | null
          category?: string | null
          contact_info?: string | null
          created_at?: string | null
          customer_segment?: string | null
          date_received?: string | null
          id?: string
          import_session_id?: string | null
          is_ai_generated?: boolean | null
          lab_context?: Json | null
          original_ai_suggestion?: string | null
          sentiment?: string | null
          source?: string | null
          source_details?: string | null
          tags?: string[] | null
          theme_id?: string | null
          updated_at?: string | null
          user_id?: string
          verbatim?: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_feedback_import_session"
            columns: ["import_session_id"]
            isOneToOne: false
            referencedRelation: "voc_import_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voc_feedback_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "voc_themes"
            referencedColumns: ["id"]
          },
        ]
      }
      voc_feedback_analysis_links: {
        Row: {
          analysis_id: string | null
          created_at: string | null
          feedback_id: string | null
          id: string
        }
        Insert: {
          analysis_id?: string | null
          created_at?: string | null
          feedback_id?: string | null
          id?: string
        }
        Update: {
          analysis_id?: string | null
          created_at?: string | null
          feedback_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voc_feedback_analysis_links_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "voc_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voc_feedback_analysis_links_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "voc_feedback"
            referencedColumns: ["id"]
          },
        ]
      }
      voc_import_sessions: {
        Row: {
          analysis_count: number | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          feedback_count: number | null
          id: string
          processed_items: number | null
          processing_options: Json | null
          raw_content: string | null
          requirement_count: number | null
          source_file_name: string | null
          source_type: string
          status: string | null
          total_items: number | null
          user_id: string
        }
        Insert: {
          analysis_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          feedback_count?: number | null
          id?: string
          processed_items?: number | null
          processing_options?: Json | null
          raw_content?: string | null
          requirement_count?: number | null
          source_file_name?: string | null
          source_type: string
          status?: string | null
          total_items?: number | null
          user_id: string
        }
        Update: {
          analysis_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          feedback_count?: number | null
          id?: string
          processed_items?: number | null
          processing_options?: Json | null
          raw_content?: string | null
          requirement_count?: number | null
          source_file_name?: string | null
          source_type?: string
          status?: string | null
          total_items?: number | null
          user_id?: string
        }
        Relationships: []
      }
      voc_lab_progress: {
        Row: {
          checkpoint_data: Json | null
          completed_at: string | null
          created_at: string | null
          id: string
          phase: string | null
          scenario_id: string | null
          started_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          checkpoint_data?: Json | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          phase?: string | null
          scenario_id?: string | null
          started_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          checkpoint_data?: Json | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          phase?: string | null
          scenario_id?: string | null
          started_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voc_lab_progress_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "voc_lab_scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      voc_lab_scenarios: {
        Row: {
          created_at: string | null
          customer_segments_hint: Json | null
          difficulty: string | null
          estimated_hours: number | null
          id: string
          industry: string | null
          instructor_id: string | null
          is_active: boolean | null
          learning_objectives: string[] | null
          problem_context: string | null
          seed_feedback_ids: string[] | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_segments_hint?: Json | null
          difficulty?: string | null
          estimated_hours?: number | null
          id?: string
          industry?: string | null
          instructor_id?: string | null
          is_active?: boolean | null
          learning_objectives?: string[] | null
          problem_context?: string | null
          seed_feedback_ids?: string[] | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_segments_hint?: Json | null
          difficulty?: string | null
          estimated_hours?: number | null
          id?: string
          industry?: string | null
          instructor_id?: string | null
          is_active?: boolean | null
          learning_objectives?: string[] | null
          problem_context?: string | null
          seed_feedback_ids?: string[] | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      voc_requirements: {
        Row: {
          acceptance_criteria: string[] | null
          ai_confidence: string | null
          ai_model_version: string | null
          created_at: string | null
          description: string | null
          id: string
          import_session_id: string | null
          is_ai_generated: boolean | null
          linked_initiative_id: string | null
          original_ai_suggestion: Json | null
          priority: string | null
          rationale: string | null
          source_analysis_ids: string[] | null
          source_feedback_ids: string[] | null
          status: string | null
          theme_id: string | null
          title: string
          type: string | null
          updated_at: string | null
          user_id: string
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          acceptance_criteria?: string[] | null
          ai_confidence?: string | null
          ai_model_version?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          import_session_id?: string | null
          is_ai_generated?: boolean | null
          linked_initiative_id?: string | null
          original_ai_suggestion?: Json | null
          priority?: string | null
          rationale?: string | null
          source_analysis_ids?: string[] | null
          source_feedback_ids?: string[] | null
          status?: string | null
          theme_id?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          acceptance_criteria?: string[] | null
          ai_confidence?: string | null
          ai_model_version?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          import_session_id?: string | null
          is_ai_generated?: boolean | null
          linked_initiative_id?: string | null
          original_ai_suggestion?: Json | null
          priority?: string | null
          rationale?: string | null
          source_analysis_ids?: string[] | null
          source_feedback_ids?: string[] | null
          status?: string | null
          theme_id?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_requirements_import_session"
            columns: ["import_session_id"]
            isOneToOne: false
            referencedRelation: "voc_import_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voc_requirements_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "voc_themes"
            referencedColumns: ["id"]
          },
        ]
      }
      voc_themes: {
        Row: {
          ai_confidence: string | null
          color: string
          created_at: string | null
          description: string | null
          id: string
          impact: string | null
          is_ai_generated: boolean | null
          keywords: string[] | null
          name: string
          owner: string | null
          problem_statement: string | null
          status: string | null
          trend: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_confidence?: string | null
          color?: string
          created_at?: string | null
          description?: string | null
          id?: string
          impact?: string | null
          is_ai_generated?: boolean | null
          keywords?: string[] | null
          name: string
          owner?: string | null
          problem_statement?: string | null
          status?: string | null
          trend?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_confidence?: string | null
          color?: string
          created_at?: string | null
          description?: string | null
          id?: string
          impact?: string | null
          is_ai_generated?: boolean | null
          keywords?: string[] | null
          name?: string
          owner?: string | null
          problem_statement?: string | null
          status?: string | null
          trend?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vsm_submissions: {
        Row: {
          accuracy_score: number | null
          belt_level: Database["public"]["Enums"]["belt_level"]
          feedback: Json | null
          id: string
          passed_gate: boolean
          profile_id: string
          session_id: string
          submitted_at: string
          vsm_data: Json
          vsm_type: string
        }
        Insert: {
          accuracy_score?: number | null
          belt_level: Database["public"]["Enums"]["belt_level"]
          feedback?: Json | null
          id?: string
          passed_gate?: boolean
          profile_id: string
          session_id: string
          submitted_at?: string
          vsm_data: Json
          vsm_type: string
        }
        Update: {
          accuracy_score?: number | null
          belt_level?: Database["public"]["Enums"]["belt_level"]
          feedback?: Json | null
          id?: string
          passed_gate?: boolean
          profile_id?: string
          session_id?: string
          submitted_at?: string
          vsm_data?: Json
          vsm_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "vsm_submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vsm_submissions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "simulation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      leaderboard_global: {
        Row: {
          avatar_url: string | null
          avg_score: number | null
          belt_level: Database["public"]["Enums"]["belt_level"] | null
          best_flow_efficiency: number | null
          best_lead_time_reduction: number | null
          best_score: number | null
          display_name: string | null
          profile_id: string | null
          run_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "scores_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      detect_capability_overlaps: {
        Args: { p_user_id: string }
        Returns: {
          artifact_ids: string[]
          capability_name: string
          initiative_count: number
          initiative_names: string[]
          pcf_id: string
        }[]
      }
      detect_cross_domain_artifacts: {
        Args: { p_user_id: string }
        Returns: {
          artifact_id: string
          artifact_name: string
          domain_count: number
          domains: string[]
          source_module: string
        }[]
      }
      refresh_leaderboard: { Args: never; Returns: undefined }
      scan_parking_lot_conflicts: {
        Args: { p_user_id: string }
        Returns: {
          active_artifact_id: string
          active_artifact_name: string
          overlapping_capabilities: string[]
          parked_item_id: string
          parked_item_name: string
        }[]
      }
    }
    Enums: {
      ai_confidence_level: "high" | "medium" | "low"
      belt_level: "white" | "yellow" | "green" | "black"
      complexity_level:
        | "trivial"
        | "simple"
        | "moderate"
        | "complex"
        | "very_complex"
      domain_category:
        | "business"
        | "technical"
        | "it"
        | "regulatory"
        | "operational"
        | "stakeholder"
        | "solution"
      moscow_priority: "must" | "should" | "could" | "wont"
      nfr_category:
        | "performance"
        | "security"
        | "usability"
        | "reliability"
        | "maintainability"
        | "portability"
        | "compatibility"
        | "functional_suitability"
      pm_acceptance_status_enum:
        | "pending"
        | "in_review"
        | "accepted"
        | "rejected"
        | "conditionally_accepted"
      pm_activity_constraint_enum:
        | "ASAP"
        | "ALAP"
        | "MSO"
        | "MFO"
        | "SNET"
        | "SNLT"
        | "FNET"
        | "FNLT"
      pm_authority_level_enum:
        | "coordinator"
        | "expediter"
        | "manager"
        | "director"
      pm_change_category_enum:
        | "corrective_action"
        | "preventive_action"
        | "defect_repair"
        | "update"
      pm_change_priority_enum: "critical" | "high" | "medium" | "low"
      pm_change_status_enum:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "implemented"
        | "cancelled"
      pm_change_type_enum:
        | "scope"
        | "schedule"
        | "cost"
        | "resource"
        | "quality"
        | "risk"
        | "technical"
        | "other"
      pm_charter_status_enum:
        | "draft"
        | "under_review"
        | "approved"
        | "rejected"
        | "superseded"
      pm_checklist_category_enum:
        | "software"
        | "document"
        | "training"
        | "infrastructure"
        | "service"
        | "hardware"
        | "process"
        | "other"
      pm_closure_status_enum: "draft" | "under_review" | "finalized"
      pm_comm_audience_type_enum:
        | "individual"
        | "group"
        | "all_stakeholders"
        | "external"
      pm_comm_channel_enum:
        | "email"
        | "slack"
        | "teams"
        | "phone"
        | "in_person"
        | "video"
      pm_comm_format_enum: "detailed" | "summary" | "visual" | "verbal"
      pm_comm_frequency_enum:
        | "daily"
        | "weekly"
        | "biweekly"
        | "monthly"
        | "as_needed"
      pm_comm_plan_status_enum: "draft" | "approved" | "baselined"
      pm_cost_baseline_status_enum: "draft" | "approved" | "baselined"
      pm_cost_category_enum:
        | "labor"
        | "equipment"
        | "materials"
        | "facilities"
        | "subcontract"
        | "travel"
        | "other"
        | "contingency"
      pm_decision_category_enum:
        | "technical"
        | "process"
        | "resource"
        | "scope"
        | "strategic"
        | "financial"
        | "vendor"
        | "other"
      pm_decision_status:
        | "proposed"
        | "under_review"
        | "approved"
        | "rejected"
        | "deferred"
        | "superseded"
      pm_decision_status_enum:
        | "proposed"
        | "under_discussion"
        | "deferred"
        | "approved"
        | "rejected"
        | "superseded"
      pm_deliverable_priority_enum: "critical" | "high" | "medium" | "low"
      pm_deliverable_status_enum:
        | "not_started"
        | "in_progress"
        | "under_review"
        | "accepted"
        | "rejected"
      pm_deliverable_type_enum:
        | "product"
        | "service"
        | "result"
        | "document"
        | "system"
        | "training"
        | "other"
      pm_dependency_type_enum: "FS" | "SS" | "FF" | "SF"
      pm_elicitation_method_enum:
        | "interview"
        | "survey"
        | "workshop"
        | "observation"
        | "document_analysis"
      pm_engagement_level_enum: "active" | "supportive" | "passive" | "absent"
      pm_estimate_type_enum:
        | "bottom_up"
        | "analogous"
        | "parametric"
        | "expert_judgment"
        | "three_point"
        | "vendor_quote"
      pm_evm_snapshot_type_enum:
        | "periodic"
        | "milestone"
        | "baseline"
        | "reforecast"
      pm_forecast_confidence_enum: "high" | "medium" | "low"
      pm_forecast_method_enum:
        | "cpi_based"
        | "cpi_spi_based"
        | "reestimate"
        | "management_estimate"
      pm_forecast_status_enum:
        | "draft"
        | "under_review"
        | "approved"
        | "superseded"
      pm_governance_structure_enum:
        | "functional"
        | "matrix_weak"
        | "matrix_balanced"
        | "matrix_strong"
        | "projectized"
      pm_health_status_enum: "green" | "yellow" | "red" | "on_hold"
      pm_issue_category_enum:
        | "technical"
        | "resource"
        | "scope"
        | "schedule"
        | "cost"
        | "quality"
        | "stakeholder"
        | "external"
        | "process"
      pm_issue_priority: "low" | "medium" | "high" | "critical"
      pm_issue_resolution_status_enum:
        | "open"
        | "in_progress"
        | "pending_review"
        | "resolved"
        | "escalated"
        | "withdrawn"
      pm_issue_severity_enum: "critical" | "high" | "medium" | "low"
      pm_issue_status:
        | "open"
        | "in_progress"
        | "blocked"
        | "resolved"
        | "closed"
      pm_lesson_category_enum:
        | "scope_management"
        | "schedule_management"
        | "cost_management"
        | "risk_management"
        | "stakeholder_management"
        | "team_management"
        | "procurement"
        | "quality"
        | "change_management"
        | "communication"
        | "technical"
        | "process"
        | "leadership"
        | "other"
      pm_lesson_source_type_enum:
        | "manual"
        | "issue"
        | "decision"
        | "variance"
        | "risk"
      pm_lesson_status_enum: "draft" | "validated" | "published"
      pm_lifecycle_enum:
        | "predictive"
        | "iterative"
        | "incremental"
        | "adaptive"
        | "hybrid"
      pm_link_type:
        | "smartsheet"
        | "jira"
        | "confluence"
        | "sharepoint"
        | "google_drive"
        | "github"
        | "other"
      pm_maturity_level_enum: "ad_hoc" | "defined" | "managed" | "optimizing"
      pm_methodology_enum:
        | "predictive"
        | "adaptive"
        | "hybrid"
        | "pmbok"
        | "prince2"
        | "safe"
        | "lean"
      pm_plan_status_enum: "draft" | "under_review" | "approved" | "baselined"
      pm_project_size_enum: "small" | "medium" | "large" | "enterprise"
      pm_project_status:
        | "draft"
        | "planning"
        | "active"
        | "on_hold"
        | "completed"
        | "cancelled"
      pm_raci_role_enum: "R" | "A" | "C" | "I"
      pm_raci_task_category_enum:
        | "deliverable"
        | "decision"
        | "process"
        | "milestone"
        | "governance"
        | "communication"
        | "other"
      pm_report_cadence_enum:
        | "weekly"
        | "biweekly"
        | "monthly"
        | "milestone"
        | "ad_hoc"
      pm_report_status_enum: "draft" | "under_review" | "distributed"
      pm_resource_allocation_status_enum:
        | "proposed"
        | "confirmed"
        | "on_hold"
        | "released"
      pm_resource_plan_status_enum: "draft" | "approved" | "baselined"
      pm_resource_type_enum: "human" | "equipment" | "material" | "facility"
      pm_risk_category:
        | "technical"
        | "schedule"
        | "cost"
        | "resource"
        | "scope"
        | "quality"
        | "external"
        | "organizational"
      pm_risk_response_status_enum:
        | "planned"
        | "in_progress"
        | "completed"
        | "cancelled"
      pm_risk_response_strategy_enum:
        | "mitigate"
        | "avoid"
        | "transfer"
        | "accept"
        | "escalate"
        | "exploit"
        | "enhance"
        | "share"
      pm_risk_response_type_enum:
        | "primary_response"
        | "contingency_plan"
        | "fallback_plan"
      pm_risk_status:
        | "identified"
        | "analyzing"
        | "mitigating"
        | "monitoring"
        | "closed"
        | "occurred"
      pm_schedule_activity_type_enum:
        | "task"
        | "milestone"
        | "summary_task"
        | "hammock"
      pm_schedule_status_enum: "draft" | "baselined"
      pm_scope_status_enum:
        | "draft"
        | "under_review"
        | "approved"
        | "rejected"
        | "baselined"
      pm_sector_enum: "public" | "private" | "nonprofit" | "hybrid"
      pm_sign_off_status_enum: "pending" | "approved" | "rejected" | "waived"
      pm_stakeholder_sentiment_enum:
        | "champion"
        | "supportive"
        | "neutral"
        | "resistant"
        | "blocker"
      pm_stakeholder_type_enum:
        | "internal"
        | "external"
        | "regulatory"
        | "vendor"
        | "sponsor"
        | "end_user"
        | "subject_matter_expert"
      pm_uncertainty_enum: "high" | "medium" | "low"
      pm_variance_resolution_enum:
        | "open"
        | "in_progress"
        | "resolved"
        | "accepted"
        | "closed"
      pm_variance_severity_enum: "low" | "medium" | "high" | "critical"
      pm_variance_type_enum: "cost" | "schedule" | "scope" | "combined"
      pm_wbs_element_type_enum: "summary" | "work_package"
      pm_wbs_status_enum: "draft" | "baselined"
      requirement_status:
        | "draft"
        | "under_review"
        | "approved"
        | "in_development"
        | "implemented"
        | "verified"
        | "obsolete"
        | "rejected"
      requirement_type:
        | "functional"
        | "non_functional"
        | "transitional"
        | "constraint"
        | "business_rule"
        | "interface"
        | "data"
      risk_level: "low" | "medium" | "high" | "critical"
      session_status: "active" | "paused" | "completed" | "abandoned"
      station_mode: "push" | "pull" | "fifo"
      trace_target_type:
        | "voc_feedback"
        | "voc_analysis"
        | "voc_requirement"
        | "requirement"
        | "stakeholder"
        | "regulation"
        | "feature"
        | "user_story"
        | "epic"
        | "test_case"
        | "document"
        | "external"
      trace_type:
        | "derives_from_voc_feedback"
        | "derives_from_voc_analysis"
        | "derives_from_voc_requirement"
        | "derives_from_stakeholder"
        | "derives_from_regulation"
        | "derives_from_requirement"
        | "implemented_by_feature"
        | "implemented_by_user_story"
        | "implemented_by_epic"
        | "verified_by_test_case"
        | "documented_in"
        | "related_to"
        | "conflicts_with"
        | "supersedes"
      verification_status: "pending" | "verified" | "rejected" | "modified"
      waste_type:
        | "defects"
        | "overproduction"
        | "waiting"
        | "non_utilized_talent"
        | "transportation"
        | "inventory"
        | "motion"
        | "extra_processing"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ai_confidence_level: ["high", "medium", "low"],
      belt_level: ["white", "yellow", "green", "black"],
      complexity_level: [
        "trivial",
        "simple",
        "moderate",
        "complex",
        "very_complex",
      ],
      domain_category: [
        "business",
        "technical",
        "it",
        "regulatory",
        "operational",
        "stakeholder",
        "solution",
      ],
      moscow_priority: ["must", "should", "could", "wont"],
      nfr_category: [
        "performance",
        "security",
        "usability",
        "reliability",
        "maintainability",
        "portability",
        "compatibility",
        "functional_suitability",
      ],
      pm_acceptance_status_enum: [
        "pending",
        "in_review",
        "accepted",
        "rejected",
        "conditionally_accepted",
      ],
      pm_activity_constraint_enum: [
        "ASAP",
        "ALAP",
        "MSO",
        "MFO",
        "SNET",
        "SNLT",
        "FNET",
        "FNLT",
      ],
      pm_authority_level_enum: [
        "coordinator",
        "expediter",
        "manager",
        "director",
      ],
      pm_change_category_enum: [
        "corrective_action",
        "preventive_action",
        "defect_repair",
        "update",
      ],
      pm_change_priority_enum: ["critical", "high", "medium", "low"],
      pm_change_status_enum: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "implemented",
        "cancelled",
      ],
      pm_change_type_enum: [
        "scope",
        "schedule",
        "cost",
        "resource",
        "quality",
        "risk",
        "technical",
        "other",
      ],
      pm_charter_status_enum: [
        "draft",
        "under_review",
        "approved",
        "rejected",
        "superseded",
      ],
      pm_checklist_category_enum: [
        "software",
        "document",
        "training",
        "infrastructure",
        "service",
        "hardware",
        "process",
        "other",
      ],
      pm_closure_status_enum: ["draft", "under_review", "finalized"],
      pm_comm_audience_type_enum: [
        "individual",
        "group",
        "all_stakeholders",
        "external",
      ],
      pm_comm_channel_enum: [
        "email",
        "slack",
        "teams",
        "phone",
        "in_person",
        "video",
      ],
      pm_comm_format_enum: ["detailed", "summary", "visual", "verbal"],
      pm_comm_frequency_enum: [
        "daily",
        "weekly",
        "biweekly",
        "monthly",
        "as_needed",
      ],
      pm_comm_plan_status_enum: ["draft", "approved", "baselined"],
      pm_cost_baseline_status_enum: ["draft", "approved", "baselined"],
      pm_cost_category_enum: [
        "labor",
        "equipment",
        "materials",
        "facilities",
        "subcontract",
        "travel",
        "other",
        "contingency",
      ],
      pm_decision_category_enum: [
        "technical",
        "process",
        "resource",
        "scope",
        "strategic",
        "financial",
        "vendor",
        "other",
      ],
      pm_decision_status: [
        "proposed",
        "under_review",
        "approved",
        "rejected",
        "deferred",
        "superseded",
      ],
      pm_decision_status_enum: [
        "proposed",
        "under_discussion",
        "deferred",
        "approved",
        "rejected",
        "superseded",
      ],
      pm_deliverable_priority_enum: ["critical", "high", "medium", "low"],
      pm_deliverable_status_enum: [
        "not_started",
        "in_progress",
        "under_review",
        "accepted",
        "rejected",
      ],
      pm_deliverable_type_enum: [
        "product",
        "service",
        "result",
        "document",
        "system",
        "training",
        "other",
      ],
      pm_dependency_type_enum: ["FS", "SS", "FF", "SF"],
      pm_elicitation_method_enum: [
        "interview",
        "survey",
        "workshop",
        "observation",
        "document_analysis",
      ],
      pm_engagement_level_enum: ["active", "supportive", "passive", "absent"],
      pm_estimate_type_enum: [
        "bottom_up",
        "analogous",
        "parametric",
        "expert_judgment",
        "three_point",
        "vendor_quote",
      ],
      pm_evm_snapshot_type_enum: [
        "periodic",
        "milestone",
        "baseline",
        "reforecast",
      ],
      pm_forecast_confidence_enum: ["high", "medium", "low"],
      pm_forecast_method_enum: [
        "cpi_based",
        "cpi_spi_based",
        "reestimate",
        "management_estimate",
      ],
      pm_forecast_status_enum: [
        "draft",
        "under_review",
        "approved",
        "superseded",
      ],
      pm_governance_structure_enum: [
        "functional",
        "matrix_weak",
        "matrix_balanced",
        "matrix_strong",
        "projectized",
      ],
      pm_health_status_enum: ["green", "yellow", "red", "on_hold"],
      pm_issue_category_enum: [
        "technical",
        "resource",
        "scope",
        "schedule",
        "cost",
        "quality",
        "stakeholder",
        "external",
        "process",
      ],
      pm_issue_priority: ["low", "medium", "high", "critical"],
      pm_issue_resolution_status_enum: [
        "open",
        "in_progress",
        "pending_review",
        "resolved",
        "escalated",
        "withdrawn",
      ],
      pm_issue_severity_enum: ["critical", "high", "medium", "low"],
      pm_issue_status: ["open", "in_progress", "blocked", "resolved", "closed"],
      pm_lesson_category_enum: [
        "scope_management",
        "schedule_management",
        "cost_management",
        "risk_management",
        "stakeholder_management",
        "team_management",
        "procurement",
        "quality",
        "change_management",
        "communication",
        "technical",
        "process",
        "leadership",
        "other",
      ],
      pm_lesson_source_type_enum: [
        "manual",
        "issue",
        "decision",
        "variance",
        "risk",
      ],
      pm_lesson_status_enum: ["draft", "validated", "published"],
      pm_lifecycle_enum: [
        "predictive",
        "iterative",
        "incremental",
        "adaptive",
        "hybrid",
      ],
      pm_link_type: [
        "smartsheet",
        "jira",
        "confluence",
        "sharepoint",
        "google_drive",
        "github",
        "other",
      ],
      pm_maturity_level_enum: ["ad_hoc", "defined", "managed", "optimizing"],
      pm_methodology_enum: [
        "predictive",
        "adaptive",
        "hybrid",
        "pmbok",
        "prince2",
        "safe",
        "lean",
      ],
      pm_plan_status_enum: ["draft", "under_review", "approved", "baselined"],
      pm_project_size_enum: ["small", "medium", "large", "enterprise"],
      pm_project_status: [
        "draft",
        "planning",
        "active",
        "on_hold",
        "completed",
        "cancelled",
      ],
      pm_raci_role_enum: ["R", "A", "C", "I"],
      pm_raci_task_category_enum: [
        "deliverable",
        "decision",
        "process",
        "milestone",
        "governance",
        "communication",
        "other",
      ],
      pm_report_cadence_enum: [
        "weekly",
        "biweekly",
        "monthly",
        "milestone",
        "ad_hoc",
      ],
      pm_report_status_enum: ["draft", "under_review", "distributed"],
      pm_resource_allocation_status_enum: [
        "proposed",
        "confirmed",
        "on_hold",
        "released",
      ],
      pm_resource_plan_status_enum: ["draft", "approved", "baselined"],
      pm_resource_type_enum: ["human", "equipment", "material", "facility"],
      pm_risk_category: [
        "technical",
        "schedule",
        "cost",
        "resource",
        "scope",
        "quality",
        "external",
        "organizational",
      ],
      pm_risk_response_status_enum: [
        "planned",
        "in_progress",
        "completed",
        "cancelled",
      ],
      pm_risk_response_strategy_enum: [
        "mitigate",
        "avoid",
        "transfer",
        "accept",
        "escalate",
        "exploit",
        "enhance",
        "share",
      ],
      pm_risk_response_type_enum: [
        "primary_response",
        "contingency_plan",
        "fallback_plan",
      ],
      pm_risk_status: [
        "identified",
        "analyzing",
        "mitigating",
        "monitoring",
        "closed",
        "occurred",
      ],
      pm_schedule_activity_type_enum: [
        "task",
        "milestone",
        "summary_task",
        "hammock",
      ],
      pm_schedule_status_enum: ["draft", "baselined"],
      pm_scope_status_enum: [
        "draft",
        "under_review",
        "approved",
        "rejected",
        "baselined",
      ],
      pm_sector_enum: ["public", "private", "nonprofit", "hybrid"],
      pm_sign_off_status_enum: ["pending", "approved", "rejected", "waived"],
      pm_stakeholder_sentiment_enum: [
        "champion",
        "supportive",
        "neutral",
        "resistant",
        "blocker",
      ],
      pm_stakeholder_type_enum: [
        "internal",
        "external",
        "regulatory",
        "vendor",
        "sponsor",
        "end_user",
        "subject_matter_expert",
      ],
      pm_uncertainty_enum: ["high", "medium", "low"],
      pm_variance_resolution_enum: [
        "open",
        "in_progress",
        "resolved",
        "accepted",
        "closed",
      ],
      pm_variance_severity_enum: ["low", "medium", "high", "critical"],
      pm_variance_type_enum: ["cost", "schedule", "scope", "combined"],
      pm_wbs_element_type_enum: ["summary", "work_package"],
      pm_wbs_status_enum: ["draft", "baselined"],
      requirement_status: [
        "draft",
        "under_review",
        "approved",
        "in_development",
        "implemented",
        "verified",
        "obsolete",
        "rejected",
      ],
      requirement_type: [
        "functional",
        "non_functional",
        "transitional",
        "constraint",
        "business_rule",
        "interface",
        "data",
      ],
      risk_level: ["low", "medium", "high", "critical"],
      session_status: ["active", "paused", "completed", "abandoned"],
      station_mode: ["push", "pull", "fifo"],
      trace_target_type: [
        "voc_feedback",
        "voc_analysis",
        "voc_requirement",
        "requirement",
        "stakeholder",
        "regulation",
        "feature",
        "user_story",
        "epic",
        "test_case",
        "document",
        "external",
      ],
      trace_type: [
        "derives_from_voc_feedback",
        "derives_from_voc_analysis",
        "derives_from_voc_requirement",
        "derives_from_stakeholder",
        "derives_from_regulation",
        "derives_from_requirement",
        "implemented_by_feature",
        "implemented_by_user_story",
        "implemented_by_epic",
        "verified_by_test_case",
        "documented_in",
        "related_to",
        "conflicts_with",
        "supersedes",
      ],
      verification_status: ["pending", "verified", "rejected", "modified"],
      waste_type: [
        "defects",
        "overproduction",
        "waiting",
        "non_utilized_talent",
        "transportation",
        "inventory",
        "motion",
        "extra_processing",
      ],
    },
  },
} as const
