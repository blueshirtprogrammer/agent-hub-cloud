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
      property_listings: {
        Row: {
          address: string
          bathrooms: number | null
          bedrooms: number | null
          created_at: string | null
          id: string
          land_size: number | null
          listing_status: Database["public"]["Enums"]["listing_status"]
          occupancy_status: Database["public"]["Enums"]["occupancy_status"]
          parking: number | null
          price_guide: number | null
          seller_email: string
          seller_name: string
          seller_phone: string
          updated_at: string | null
        }
        Insert: {
          address: string
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string | null
          id?: string
          land_size?: number | null
          listing_status?: Database["public"]["Enums"]["listing_status"]
          occupancy_status?: Database["public"]["Enums"]["occupancy_status"]
          parking?: number | null
          price_guide?: number | null
          seller_email: string
          seller_name: string
          seller_phone: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string | null
          id?: string
          land_size?: number | null
          listing_status?: Database["public"]["Enums"]["listing_status"]
          occupancy_status?: Database["public"]["Enums"]["occupancy_status"]
          parking?: number | null
          price_guide?: number | null
          seller_email?: string
          seller_name?: string
          seller_phone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      property_offers: {
        Row: {
          amount: number
          buyer_id: string | null
          conditions: Json | null
          created_at: string | null
          expires_at: string | null
          id: string
          listing_id: string | null
          status: Database["public"]["Enums"]["offer_status"]
          updated_at: string | null
        }
        Insert: {
          amount: number
          buyer_id?: string | null
          conditions?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          listing_id?: string | null
          status?: Database["public"]["Enums"]["offer_status"]
          updated_at?: string | null
        }
        Update: {
          amount?: number
          buyer_id?: string | null
          conditions?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          listing_id?: string | null
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
          name: string
          required_tools: Json | null
          team_id: string | null
        }
        Insert: {
          capabilities?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          required_tools?: Json | null
          team_id?: string | null
        }
        Update: {
          capabilities?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          required_tools?: Json | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_roles_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team_configurations"
            referencedColumns: ["id"]
          },
        ]
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
      industry_sector:
        | "real_estate"
        | "finance"
        | "technology"
        | "healthcare"
        | "education"
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
