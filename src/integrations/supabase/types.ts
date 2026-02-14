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
      bookings: {
        Row: {
          adults: number
          booking_ref: string
          children: number | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          notes: string | null
          paid_amount: number | null
          payment_status: string | null
          pricing_option_id: string | null
          status: string | null
          total_amount: number
          tour_date: string
          tour_id: string
          updated_at: string
        }
        Insert: {
          adults?: number
          booking_ref: string
          children?: number | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          paid_amount?: number | null
          payment_status?: string | null
          pricing_option_id?: string | null
          status?: string | null
          total_amount: number
          tour_date: string
          tour_id: string
          updated_at?: string
        }
        Update: {
          adults?: number
          booking_ref?: string
          children?: number | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          paid_amount?: number | null
          payment_status?: string | null
          pricing_option_id?: string | null
          status?: string | null
          total_amount?: number
          tour_date?: string
          tour_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_pricing_option_id_fkey"
            columns: ["pricing_option_id"]
            isOneToOne: false
            referencedRelation: "tour_pricing_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          image: string | null
          name: string
          slug: string
          tour_count: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image?: string | null
          name: string
          slug: string
          tour_count?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image?: string | null
          name?: string
          slug?: string
          tour_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      holidays: {
        Row: {
          bookings: number
          created_at: string
          description: string | null
          duration: string
          id: string
          image: string | null
          name: string
          price: number
          status: string
          updated_at: string
        }
        Insert: {
          bookings?: number
          created_at?: string
          description?: string | null
          duration: string
          id?: string
          image?: string | null
          name: string
          price?: number
          status?: string
          updated_at?: string
        }
        Update: {
          bookings?: number
          created_at?: string
          description?: string | null
          duration?: string
          id?: string
          image?: string | null
          name?: string
          price?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      hotels: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image: string | null
          location: string
          name: string
          price: number
          rating: number
          rooms: number
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          location: string
          name: string
          price?: number
          rating?: number
          rooms?: number
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          location?: string
          name?: string
          price?: number
          rating?: number
          rooms?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          country: string | null
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      rent_cars: {
        Row: {
          created_at: string
          description: string | null
          fuel: string
          id: string
          image: string | null
          name: string
          price: number
          seats: number
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          fuel?: string
          id?: string
          image?: string | null
          name: string
          price?: number
          seats?: number
          status?: string
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          fuel?: string
          id?: string
          image?: string | null
          name?: string
          price?: number
          seats?: number
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author_avatar: string | null
          author_name: string
          booking_id: string | null
          comment: string
          created_at: string
          helpful_count: number | null
          id: string
          rating: number
          status: string | null
          title: string | null
          tour_id: string
        }
        Insert: {
          author_avatar?: string | null
          author_name: string
          booking_id?: string | null
          comment: string
          created_at?: string
          helpful_count?: number | null
          id?: string
          rating: number
          status?: string | null
          title?: string | null
          tour_id: string
        }
        Update: {
          author_avatar?: string | null
          author_name?: string
          booking_id?: string | null
          comment?: string
          created_at?: string
          helpful_count?: number | null
          id?: string
          rating?: number
          status?: string | null
          title?: string | null
          tour_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      things_to_do: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image: string | null
          is_featured: boolean
          location: string
          name: string
          price: number
          rating: number
          status: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          is_featured?: boolean
          location?: string
          name: string
          price?: number
          rating?: number
          status?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          is_featured?: boolean
          location?: string
          name?: string
          price?: number
          rating?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      tour_pricing_options: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          original_price: number | null
          price: number
          quantity: string | null
          sort_order: number | null
          tour_id: string
          transfer_option: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          original_price?: number | null
          price: number
          quantity?: string | null
          sort_order?: number | null
          tour_id: string
          transfer_option?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          original_price?: number | null
          price?: number
          quantity?: string | null
          sort_order?: number | null
          tour_id?: string
          transfer_option?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tour_pricing_options_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      tours: {
        Row: {
          activity_timing_items: Json
          activity_timing_title: string | null
          banner_image_url: string | null
          booking_count: number | null
          category_id: string | null
          child_age_adult_label: string | null
          child_age_child_label: string | null
          child_age_infant_label: string | null
          created_at: string
          description: string | null
          disable_add_to_cart: boolean
          discount_percent: number | null
          dropback_time: string | null
          duration: string
          duration_unit: string
          enable_faqs: boolean
          excludes: string[] | null
          featured_availability: string
          group_size: string | null
          highlights: string[] | null
          homepage_image_url: string | null
          homepage_top_abudhabi: boolean
          homepage_top_dubai: boolean
          id: string
          images: string[] | null
          includes: string[] | null
          information_blocks: Json
          is_bestseller: boolean | null
          is_featured: boolean | null
          itinerary: Json | null
          location_id: string | null
          main_image: string | null
          max_people: number | null
          min_people: number | null
          mobile_feature_image_url: string | null
          original_price: number | null
          pickup_time: string | null
          price: number
          rating: number | null
          related_tour_ids: string[]
          review_count: number | null
          seo_meta_description: string | null
          seo_meta_keyword: string | null
          seo_meta_tag: string | null
          seo_meta_title: string | null
          short_description: string | null
          slug: string
          status: string | null
          title: string
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          activity_timing_items?: Json
          activity_timing_title?: string | null
          banner_image_url?: string | null
          booking_count?: number | null
          category_id?: string | null
          child_age_adult_label?: string | null
          child_age_child_label?: string | null
          child_age_infant_label?: string | null
          created_at?: string
          description?: string | null
          disable_add_to_cart?: boolean
          discount_percent?: number | null
          dropback_time?: string | null
          duration: string
          duration_unit?: string
          enable_faqs?: boolean
          excludes?: string[] | null
          featured_availability?: string
          group_size?: string | null
          highlights?: string[] | null
          homepage_image_url?: string | null
          homepage_top_abudhabi?: boolean
          homepage_top_dubai?: boolean
          id?: string
          images?: string[] | null
          includes?: string[] | null
          information_blocks?: Json
          is_bestseller?: boolean | null
          is_featured?: boolean | null
          itinerary?: Json | null
          location_id?: string | null
          main_image?: string | null
          max_people?: number | null
          min_people?: number | null
          mobile_feature_image_url?: string | null
          original_price?: number | null
          pickup_time?: string | null
          price: number
          rating?: number | null
          related_tour_ids?: string[]
          review_count?: number | null
          seo_meta_description?: string | null
          seo_meta_keyword?: string | null
          seo_meta_tag?: string | null
          seo_meta_title?: string | null
          short_description?: string | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          activity_timing_items?: Json
          activity_timing_title?: string | null
          banner_image_url?: string | null
          booking_count?: number | null
          category_id?: string | null
          child_age_adult_label?: string | null
          child_age_child_label?: string | null
          child_age_infant_label?: string | null
          created_at?: string
          description?: string | null
          disable_add_to_cart?: boolean
          discount_percent?: number | null
          dropback_time?: string | null
          duration?: string
          duration_unit?: string
          enable_faqs?: boolean
          excludes?: string[] | null
          featured_availability?: string
          group_size?: string | null
          highlights?: string[] | null
          homepage_image_url?: string | null
          homepage_top_abudhabi?: boolean
          homepage_top_dubai?: boolean
          id?: string
          images?: string[] | null
          includes?: string[] | null
          information_blocks?: Json
          is_bestseller?: boolean | null
          is_featured?: boolean | null
          itinerary?: Json | null
          location_id?: string | null
          main_image?: string | null
          max_people?: number | null
          min_people?: number | null
          mobile_feature_image_url?: string | null
          original_price?: number | null
          pickup_time?: string | null
          price?: number
          rating?: number | null
          related_tour_ids?: string[]
          review_count?: number | null
          seo_meta_description?: string | null
          seo_meta_keyword?: string | null
          seo_meta_tag?: string | null
          seo_meta_title?: string | null
          short_description?: string | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tours_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tours_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
