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
      audio_conversions: {
        Row: {
          cost: number | null
          date: string | null
          duration: number | null
          id: number
          input_url: string | null
          model_id: number | null
          name: string | null
          options: Json | null
          result: Json | null
          user_id: string
        }
        Insert: {
          cost?: number | null
          date?: string | null
          duration?: number | null
          id?: number
          input_url?: string | null
          model_id?: number | null
          name?: string | null
          options?: Json | null
          result?: Json | null
          user_id: string
        }
        Update: {
          cost?: number | null
          date?: string | null
          duration?: number | null
          id?: number
          input_url?: string | null
          model_id?: number | null
          name?: string | null
          options?: Json | null
          result?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audio_conversions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audio_conversions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      covers: {
        Row: {
          created_at: string
          id: number
          is_default_for_song: boolean | null
          model_id: number
          song_id: number
          transpose: number | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_default_for_song?: boolean | null
          model_id: number
          song_id: number
          transpose?: number | null
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          is_default_for_song?: boolean | null
          model_id?: number
          song_id?: number
          transpose?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "covers_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "covers_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          }
        ]
      }
      memberships: {
        Row: {
          code: string | null
          created_at: string
          id: number
          invited_email: string | null
          organization_id: number
          role: number
          user_id: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: never
          invited_email?: string | null
          organization_id: number
          role: number
          user_id?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: never
          invited_email?: string | null
          organization_id?: number
          role?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "memberships_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      models: {
        Row: {
          age: Database["public"]["Enums"]["age"] | null
          audio_demo_url: string | null
          cost: number
          created_at: string | null
          created_by: string | null
          deleted: boolean | null
          description: string | null
          enabled: boolean | null
          f0: Json | null
          gender: Database["public"]["Enums"]["gender"] | null
          genre: Database["public"]["Enums"]["genre"] | null
          id: number
          image_url: string | null
          is_rvc: boolean | null
          job_id: number | null
          model_type: Database["public"]["Enums"]["model_type"] | null
          name: string | null
          parent_model_id: number | null
          public: boolean | null
          traits: Json[] | null
          voice_type: Database["public"]["Enums"]["voice_type_enum"] | null
        }
        Insert: {
          age?: Database["public"]["Enums"]["age"] | null
          audio_demo_url?: string | null
          cost?: number
          created_at?: string | null
          created_by?: string | null
          deleted?: boolean | null
          description?: string | null
          enabled?: boolean | null
          f0?: Json | null
          gender?: Database["public"]["Enums"]["gender"] | null
          genre?: Database["public"]["Enums"]["genre"] | null
          id?: number
          image_url?: string | null
          is_rvc?: boolean | null
          job_id?: number | null
          model_type?: Database["public"]["Enums"]["model_type"] | null
          name?: string | null
          parent_model_id?: number | null
          public?: boolean | null
          traits?: Json[] | null
          voice_type?: Database["public"]["Enums"]["voice_type_enum"] | null
        }
        Update: {
          age?: Database["public"]["Enums"]["age"] | null
          audio_demo_url?: string | null
          cost?: number
          created_at?: string | null
          created_by?: string | null
          deleted?: boolean | null
          description?: string | null
          enabled?: boolean | null
          f0?: Json | null
          gender?: Database["public"]["Enums"]["gender"] | null
          genre?: Database["public"]["Enums"]["genre"] | null
          id?: number
          image_url?: string | null
          is_rvc?: boolean | null
          job_id?: number | null
          model_type?: Database["public"]["Enums"]["model_type"] | null
          name?: string | null
          parent_model_id?: number | null
          public?: boolean | null
          traits?: Json[] | null
          voice_type?: Database["public"]["Enums"]["voice_type_enum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "models_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "models_parent_model_id_fkey"
            columns: ["parent_model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          }
        ]
      }
      organizations: {
        Row: {
          api_key: string | null
          created_at: string
          credits: number | null
          id: number
          logo_url: string | null
          name: string
          plugin_purchased: boolean | null
          slots: number | null
          user_ids: string[] | null
        }
        Insert: {
          api_key?: string | null
          created_at?: string
          credits?: number | null
          id?: never
          logo_url?: string | null
          name: string
          plugin_purchased?: boolean | null
          slots?: number | null
          user_ids?: string[] | null
        }
        Update: {
          api_key?: string | null
          created_at?: string
          credits?: number | null
          id?: never
          logo_url?: string | null
          name?: string
          plugin_purchased?: boolean | null
          slots?: number | null
          user_ids?: string[] | null
        }
        Relationships: []
      }
      organizations_subscriptions: {
        Row: {
          customer_id: string
          organization_id: number
          subscription_id: string | null
        }
        Insert: {
          customer_id: string
          organization_id: number
          subscription_id?: string | null
        }
        Update: {
          customer_id?: string
          organization_id?: number
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_subscriptions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: true
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          }
        ]
      }
      share_model: {
        Row: {
          created_at: string
          id: number
          model_id: number | null
          model_owner: string | null
          shared_user: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          model_id?: number | null
          model_owner?: string | null
          shared_user?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          model_id?: number | null
          model_owner?: string | null
          shared_user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "share_model_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "share_model_model_owner_fkey"
            columns: ["model_owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "share_model_shared_user_fkey"
            columns: ["shared_user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      songs: {
        Row: {
          art_cover_url: string | null
          artist_name: string
          config: Json | null
          created_at: string
          enabled: boolean | null
          id: number
          song_name: string
        }
        Insert: {
          art_cover_url?: string | null
          artist_name: string
          config?: Json | null
          created_at?: string
          enabled?: boolean | null
          id?: number
          song_name: string
        }
        Update: {
          art_cover_url?: string | null
          artist_name?: string
          config?: Json | null
          created_at?: string
          enabled?: boolean | null
          id?: number
          song_name?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string | null
          currency: string | null
          id: string
          interval: string | null
          interval_count: number | null
          period_ends_at: string | null
          period_starts_at: string | null
          price_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at: string | null
          trial_starts_at: string | null
        }
        Insert: {
          cancel_at_period_end: boolean
          created_at?: string | null
          currency?: string | null
          id: string
          interval?: string | null
          interval_count?: number | null
          period_ends_at?: string | null
          period_starts_at?: string | null
          price_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string | null
          trial_starts_at?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string | null
          currency?: string | null
          id?: string
          interval?: string | null
          interval_count?: number | null
          period_ends_at?: string | null
          period_starts_at?: string | null
          price_id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string | null
          trial_starts_at?: string | null
        }
        Relationships: []
      }
      user_model_permissions: {
        Row: {
          granted_at: string | null
          granted_by: string | null
          id: number
          minutes: number | null
          model_id: number | null
          permission_type: Database["public"]["Enums"]["permission_type"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          granted_at?: string | null
          granted_by?: string | null
          id?: number
          minutes?: number | null
          model_id?: number | null
          permission_type?:
            | Database["public"]["Enums"]["permission_type"]
            | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          granted_at?: string | null
          granted_by?: string | null
          id?: number
          minutes?: number | null
          model_id?: number | null
          permission_type?:
            | Database["public"]["Enums"]["permission_type"]
            | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_model_permissions_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_model_permissions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_model_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          api_key: string | null
          balance: number | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          neversea: boolean | null
          onboarded: boolean
          photo_url: string | null
          role: string | null
          user_name: string | null
        }
        Insert: {
          api_key?: string | null
          balance?: number | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          neversea?: boolean | null
          onboarded: boolean
          photo_url?: string | null
          role?: string | null
          user_name?: string | null
        }
        Update: {
          api_key?: string | null
          balance?: number | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          neversea?: boolean | null
          onboarded?: boolean
          photo_url?: string | null
          role?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_invite_to_organization: {
        Args: {
          invite_code: string
          invite_user_id: string
        }
        Returns: Json
      }
      can_update_user_role: {
        Args: {
          organization_id: number
          membership_id: number
        }
        Returns: boolean
      }
      create_new_organization: {
        Args: {
          org_name: string
          api_key: string
          credits: number
          user_id: string
          create_user?: boolean
        }
        Returns: number
      }
      current_user_is_member_of_organization: {
        Args: {
          organization_id: number
        }
        Returns: boolean
      }
      echo: {
        Args: {
          say: string
        }
        Returns: string
      }
      get_models: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          name: string
          description: string
          public: boolean
        }[]
      }
      get_organizations_for_authenticated_user: {
        Args: Record<PropertyKey, never>
        Returns: number[]
      }
      get_role_for_authenticated_user: {
        Args: {
          org_id: number
        }
        Returns: number
      }
      get_role_for_user: {
        Args: {
          membership_id: number
        }
        Returns: number
      }
      transfer_organization: {
        Args: {
          org_id: number
          target_user_membership_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      age: "child" | "young adult" | "adult"
      gender: "Male" | "Female"
      genre:
        | "pop"
        | "rock"
        | "hip-hop"
        | "r&b"
        | "country"
        | "jazz"
        | "classical"
        | "electronic"
        | "world"
        | "other"
      model_type: "starter" | "creator" | "pro"
      permission_type: "user" | "manager" | "admin"
      subscription_status:
        | "active"
        | "trialing"
        | "past_due"
        | "canceled"
        | "unpaid"
        | "incomplete"
        | "incomplete_expired"
        | "paused"
      vocal_traits: "nasal" | "powerful" | "emotive" | "dynamic" | "soulful"
      voice_type_enum:
        | "supermodel"
        | "neutral"
        | "curbing"
        | "overdrive"
        | "edge"
        | "speech"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
