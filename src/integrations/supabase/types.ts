export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agents: {
        Row: {
          capabilities: Json | null
          created_at: string | null
          id: string
          last_active: string | null
          name: string
          role: string
          status: string | null
        }
        Insert: {
          capabilities?: Json | null
          created_at?: string | null
          id?: string
          last_active?: string | null
          name: string
          role: string
          status?: string | null
        }
        Update: {
          capabilities?: Json | null
          created_at?: string | null
          id?: string
          last_active?: string | null
          name?: string
          role?: string
          status?: string | null
        }
        Relationships: []
      }
      business_context: {
        Row: {
          created_at: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_sector"]
          region: string
          specific_context: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_sector"]
          region: string
          specific_context?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_sector"]
          region?: string
          specific_context?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      communication_templates: {
        Row: {
          content: string
          created_at: string | null
          id: string
          subject: string
          type: string
          updated_at: string | null
          variables: Json | null
          workflow_stage: Database["public"]["Enums"]["workflow_stage"] | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          subject: string
          type: string
          updated_at?: string | null
          variables?: Json | null
          workflow_stage?: Database["public"]["Enums"]["workflow_stage"] | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          subject?: string
          type?: string
          updated_at?: string | null
          variables?: Json | null
          workflow_stage?: Database["public"]["Enums"]["workflow_stage"] | null
        }
        Relationships: []
      }
      document_analysis: {
        Row: {
          analysis_result: Json | null
          created_at: string | null
          file_name: string
          file_path: string
          id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          analysis_result?: Json | null
          created_at?: string | null
          file_name: string
          file_path: string
          id?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          analysis_result?: Json | null
          created_at?: string | null
          file_name?: string
          file_path?: string
          id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      industry_templates: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_sector"]
          name: string
          template_data: Json
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          industry: Database["public"]["Enums"]["industry_sector"]
          name: string
          template_data?: Json
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_sector"]
          name?: string
          template_data?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      integration_configurations: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_enabled: boolean | null
          metadata: Json | null
          name: string
          type: Database["public"]["Enums"]["integration_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          metadata?: Json | null
          name: string
          type: Database["public"]["Enums"]["integration_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          metadata?: Json | null
          name?: string
          type?: Database["public"]["Enums"]["integration_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      knowledge_base: {
        Row: {
          confidence: number | null
          content: Json
          created_at: string | null
          id: string
          source_session_id: string | null
          topic: string
          verified: boolean | null
        }
        Insert: {
          confidence?: number | null
          content: Json
          created_at?: string | null
          id?: string
          source_session_id?: string | null
          topic: string
          verified?: boolean | null
        }
        Update: {
          confidence?: number | null
          content?: Json
          created_at?: string | null
          id?: string
          source_session_id?: string | null
          topic?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_base_source_session_id_fkey"
            columns: ["source_session_id"]
            isOneToOne: false
            referencedRelation: "scraping_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_documents: {
        Row: {
          document_type: string
          file_path: string
          id: string
          listing_id: string | null
          metadata: Json | null
          status: string | null
          uploaded_at: string | null
        }
        Insert: {
          document_type: string
          file_path: string
          id?: string
          listing_id?: string | null
          metadata?: Json | null
          status?: string | null
          uploaded_at?: string | null
        }
        Update: {
          document_type?: string
          file_path?: string
          id?: string
          listing_id?: string | null
          metadata?: Json | null
          status?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_documents_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_notifications: {
        Row: {
          content: string
          id: string
          listing_id: string | null
          metadata: Json | null
          notification_type: string
          read_at: string | null
          recipient_id: string | null
          recipient_type: string
          sent_at: string | null
        }
        Insert: {
          content: string
          id?: string
          listing_id?: string | null
          metadata?: Json | null
          notification_type: string
          read_at?: string | null
          recipient_id?: string | null
          recipient_type: string
          sent_at?: string | null
        }
        Update: {
          content?: string
          id?: string
          listing_id?: string | null
          metadata?: Json | null
          notification_type?: string
          read_at?: string | null
          recipient_id?: string | null
          recipient_type?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_notifications_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          due_date: string | null
          id: string
          listing_id: string | null
          metadata: Json | null
          status: string | null
          task_type: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          listing_id?: string | null
          metadata?: Json | null
          status?: string | null
          task_type: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          listing_id?: string | null
          metadata?: Json | null
          status?: string | null
          task_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_tasks_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_workflow_stages: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          listing_id: string | null
          required_documents: Json | null
          stage_name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
          required_documents?: Json | null
          stage_name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
          required_documents?: Json | null
          stage_name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_workflow_stages_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      offer_system_configurations: {
        Row: {
          backup_offers_enabled: boolean | null
          created_at: string | null
          id: string
          is_on_market: boolean | null
          listing_id: string | null
          standard_conditions: Json | null
          timer_end_date: string | null
          updated_at: string | null
        }
        Insert: {
          backup_offers_enabled?: boolean | null
          created_at?: string | null
          id?: string
          is_on_market?: boolean | null
          listing_id?: string | null
          standard_conditions?: Json | null
          timer_end_date?: string | null
          updated_at?: string | null
        }
        Update: {
          backup_offers_enabled?: boolean | null
          created_at?: string | null
          id?: string
          is_on_market?: boolean | null
          listing_id?: string | null
          standard_conditions?: Json | null
          timer_end_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offer_system_configurations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      open_home_schedules: {
        Row: {
          created_at: string | null
          current_registrations: number | null
          duration_minutes: number | null
          id: string
          listing_id: string | null
          max_attendees: number | null
          scheduled_time: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_registrations?: number | null
          duration_minutes?: number | null
          id?: string
          listing_id?: string | null
          max_attendees?: number | null
          scheduled_time: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_registrations?: number | null
          duration_minutes?: number | null
          id?: string
          listing_id?: string | null
          max_attendees?: number | null
          scheduled_time?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "open_home_schedules_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      photography_bookings: {
        Row: {
          created_at: string | null
          id: string
          listing_id: string | null
          photo_urls: string[] | null
          photographer_name: string | null
          scheduled_time: string
          status: string | null
          updated_at: string | null
          virtual_tour_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          listing_id?: string | null
          photo_urls?: string[] | null
          photographer_name?: string | null
          scheduled_time: string
          status?: string | null
          updated_at?: string | null
          virtual_tour_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          listing_id?: string | null
          photo_urls?: string[] | null
          photographer_name?: string | null
          scheduled_time?: string
          status?: string | null
          updated_at?: string | null
          virtual_tour_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photography_bookings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      property_listings: {
        Row: {
          address: string
          bathrooms: number | null
          bedrooms: number | null
          created_at: string | null
          flyer_url: string | null
          id: string
          is_tenanted: boolean | null
          land_size: number | null
          listing_status: Database["public"]["Enums"]["listing_status"]
          marketing_copy: string | null
          occupancy_status: Database["public"]["Enums"]["occupancy_status"]
          on_market_price: number | null
          parking: number | null
          price_guide: number | null
          property_manager_details: Json | null
          seller_email: string
          seller_name: string
          seller_phone: string
          tenant_contact_details: Json | null
          timer_end_date: string | null
          updated_at: string | null
          workflow_stage: Database["public"]["Enums"]["workflow_stage"] | null
        }
        Insert: {
          address: string
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string | null
          flyer_url?: string | null
          id?: string
          is_tenanted?: boolean | null
          land_size?: number | null
          listing_status?: Database["public"]["Enums"]["listing_status"]
          marketing_copy?: string | null
          occupancy_status?: Database["public"]["Enums"]["occupancy_status"]
          on_market_price?: number | null
          parking?: number | null
          price_guide?: number | null
          property_manager_details?: Json | null
          seller_email: string
          seller_name: string
          seller_phone: string
          tenant_contact_details?: Json | null
          timer_end_date?: string | null
          updated_at?: string | null
          workflow_stage?: Database["public"]["Enums"]["workflow_stage"] | null
        }
        Update: {
          address?: string
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string | null
          flyer_url?: string | null
          id?: string
          is_tenanted?: boolean | null
          land_size?: number | null
          listing_status?: Database["public"]["Enums"]["listing_status"]
          marketing_copy?: string | null
          occupancy_status?: Database["public"]["Enums"]["occupancy_status"]
          on_market_price?: number | null
          parking?: number | null
          price_guide?: number | null
          property_manager_details?: Json | null
          seller_email?: string
          seller_name?: string
          seller_phone?: string
          tenant_contact_details?: Json | null
          timer_end_date?: string | null
          updated_at?: string | null
          workflow_stage?: Database["public"]["Enums"]["workflow_stage"] | null
        }
        Relationships: []
      }
      property_offers: {
        Row: {
          amount: number
          building_pest_days: number | null
          buyer_id: string | null
          conditions: Json | null
          created_at: string | null
          expires_at: string | null
          finance_days: number | null
          id: string
          is_backup_offer: boolean | null
          listing_id: string | null
          special_conditions: Json | null
          status: Database["public"]["Enums"]["offer_status"]
          updated_at: string | null
        }
        Insert: {
          amount: number
          building_pest_days?: number | null
          buyer_id?: string | null
          conditions?: Json | null
          created_at?: string | null
          expires_at?: string | null
          finance_days?: number | null
          id?: string
          is_backup_offer?: boolean | null
          listing_id?: string | null
          special_conditions?: Json | null
          status?: Database["public"]["Enums"]["offer_status"]
          updated_at?: string | null
        }
        Update: {
          amount?: number
          building_pest_days?: number | null
          buyer_id?: string | null
          conditions?: Json | null
          created_at?: string | null
          expires_at?: string | null
          finance_days?: number | null
          id?: string
          is_backup_offer?: boolean | null
          listing_id?: string | null
          special_conditions?: Json | null
          status?: Database["public"]["Enums"]["offer_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_offers_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      property_viewings: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          id: string
          listing_id: string | null
          max_attendees: number | null
          scheduled_time: string
          status: string | null
          viewing_type: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          listing_id?: string | null
          max_attendees?: number | null
          scheduled_time: string
          status?: string | null
          viewing_type: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          listing_id?: string | null
          max_attendees?: number | null
          scheduled_time?: string
          status?: string | null
          viewing_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_viewings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      scraping_sessions: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          screenshots: string[] | null
          status: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          screenshots?: string[] | null
          status?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          screenshots?: string[] | null
          status?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_configurations: {
        Row: {
          active: boolean | null
          api_keys: Json | null
          billing_tier: Database["public"]["Enums"]["billing_tier"] | null
          compute_credits: number | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          requirements: Json | null
          server_hours: number | null
          tools_and_integrations: Json | null
        }
        Insert: {
          active?: boolean | null
          api_keys?: Json | null
          billing_tier?: Database["public"]["Enums"]["billing_tier"] | null
          compute_credits?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          requirements?: Json | null
          server_hours?: number | null
          tools_and_integrations?: Json | null
        }
        Update: {
          active?: boolean | null
          api_keys?: Json | null
          billing_tier?: Database["public"]["Enums"]["billing_tier"] | null
          compute_credits?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          requirements?: Json | null
          server_hours?: number | null
          tools_and_integrations?: Json | null
        }
        Relationships: []
      }
      team_roles: {
        Row: {
          capabilities: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_leadership: boolean | null
          max_assignments: number | null
          name: string
          permissions: Json | null
          priority: number | null
          reporting_to: string | null
          required_tools: Json | null
          team_id: string | null
        }
        Insert: {
          capabilities?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_leadership?: boolean | null
          max_assignments?: number | null
          name: string
          permissions?: Json | null
          priority?: number | null
          reporting_to?: string | null
          required_tools?: Json | null
          team_id?: string | null
        }
        Update: {
          capabilities?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_leadership?: boolean | null
          max_assignments?: number | null
          name?: string
          permissions?: Json | null
          priority?: number | null
          reporting_to?: string | null
          required_tools?: Json | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_roles_reporting_to_fkey"
            columns: ["reporting_to"]
            isOneToOne: false
            referencedRelation: "team_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_roles_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_assignments: {
        Row: {
          agent_id: string | null
          assigned_by: string | null
          created_at: string | null
          id: string
          status: string | null
          tool_id: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          tool_id?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          tool_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_assignments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_assignments_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_assignments_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tools: {
        Row: {
          capabilities: Json | null
          configuration: Json | null
          created_at: string | null
          description: string | null
          id: string
          integration_id: string | null
          name: string
          status: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          capabilities?: Json | null
          configuration?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          integration_id?: string | null
          name: string
          status?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          capabilities?: Json | null
          configuration?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          integration_id?: string | null
          name?: string
          status?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tools_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integration_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      ux_analysis: {
        Row: {
          analysis_result: Json
          context: string | null
          created_at: string | null
          id: string
          screenshot_timestamp: string | null
        }
        Insert: {
          analysis_result?: Json
          context?: string | null
          created_at?: string | null
          id?: string
          screenshot_timestamp?: string | null
        }
        Update: {
          analysis_result?: Json
          context?: string | null
          created_at?: string | null
          id?: string
          screenshot_timestamp?: string | null
        }
        Relationships: []
      }
      workflow_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          required_documents: Json
          stages: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          required_documents?: Json
          stages?: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          required_documents?: Json
          stages?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      billing_tier: "basic" | "pro" | "enterprise"
      document_requirement_status:
        | "pending"
        | "received"
        | "verified"
        | "not_required"
      document_type:
        | "form_6"
        | "rates_notice"
        | "tenancy_agreement"
        | "key_record"
        | "title_search"
        | "contract_draft"
        | "form_9"
        | "form_10"
        | "property_report"
      industry_sector:
        | "real_estate"
        | "finance"
        | "technology"
        | "healthcare"
        | "education"
      integration_type: "crm" | "property_portal" | "calendar" | "automation"
      listing_status:
        | "draft"
        | "pending_documents"
        | "pending_photos"
        | "active"
        | "under_contract"
        | "settled"
        | "withdrawn"
      occupancy_status: "vacant" | "tenanted"
      offer_status:
        | "pending"
        | "accepted"
        | "rejected"
        | "negotiating"
        | "backup"
        | "expired"
      workflow_stage:
        | "initial_contact"
        | "document_collection"
        | "photo_scheduling"
        | "marketing_prep"
        | "active_listing"
        | "offer_management"
        | "under_contract"
        | "settlement_prep"
        | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
