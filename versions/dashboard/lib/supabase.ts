import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          name: string
          avatar: string
          initials: string
          email: string
          date_of_birth: string
          age: number
          marital_status: string
          risk_profile: string
          last_contact: string
          additional_info: string
          aum: string
          performance_ytd: string
          performance_one_year: string
          performance_three_year: string
          performance_five_year: string
          portfolio_equities: number
          portfolio_fixed_income: number
          portfolio_alternatives: number
          portfolio_cash: number
          sectors_technology: number
          sectors_healthcare: number
          sectors_financials: number
          sectors_consumer_discretionary: number
          sectors_industrials: number
          sectors_other: number
          recent_activity: string
          concerns: string[]
          opportunities: string[]
          retirement_goal: string
          retirement_progress: number
          retirement_age: number
          current_age: number
          tax_bracket: string
          tax_savings_opportunity: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          avatar?: string
          initials: string
          email: string
          date_of_birth: string
          age: number
          marital_status: string
          risk_profile: string
          last_contact: string
          additional_info: string
          aum: string
          performance_ytd: string
          performance_one_year: string
          performance_three_year: string
          performance_five_year: string
          portfolio_equities: number
          portfolio_fixed_income: number
          portfolio_alternatives: number
          portfolio_cash: number
          sectors_technology: number
          sectors_healthcare: number
          sectors_financials: number
          sectors_consumer_discretionary: number
          sectors_industrials: number
          sectors_other: number
          recent_activity: string
          concerns: string[]
          opportunities: string[]
          retirement_goal: string
          retirement_progress: number
          retirement_age: number
          current_age: number
          tax_bracket: string
          tax_savings_opportunity: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          avatar?: string
          initials?: string
          email?: string
          date_of_birth?: string
          age?: number
          marital_status?: string
          risk_profile?: string
          last_contact?: string
          additional_info?: string
          aum?: string
          performance_ytd?: string
          performance_one_year?: string
          performance_three_year?: string
          performance_five_year?: string
          portfolio_equities?: number
          portfolio_fixed_income?: number
          portfolio_alternatives?: number
          portfolio_cash?: number
          sectors_technology?: number
          sectors_healthcare?: number
          sectors_financials?: number
          sectors_consumer_discretionary?: number
          sectors_industrials?: number
          sectors_other?: number
          recent_activity?: string
          concerns?: string[]
          opportunities?: string[]
          retirement_goal?: string
          retirement_progress?: number
          retirement_age?: number
          current_age?: number
          tax_bracket?: string
          tax_savings_opportunity?: string
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          client_id: string
          date: string
          title: string
          summary: string
          transcript: string
          duration: string
          type: 'call' | 'meeting' | 'email'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          date: string
          title: string
          summary: string
          transcript: string
          duration: string
          type: 'call' | 'meeting' | 'email'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          date?: string
          title?: string
          summary?: string
          transcript?: string
          duration?: string
          type?: 'call' | 'meeting' | 'email'
          created_at?: string
          updated_at?: string
        }
      }
      actions: {
        Row: {
          id: string
          client_id: string
          title: string
          description: string
          priority: 'low' | 'medium' | 'high' | 'urgent'
          status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          due_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          title: string
          description: string
          priority: 'low' | 'medium' | 'high' | 'urgent'
          status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          due_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          title?: string
          description?: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          due_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      upcoming_events: {
        Row: {
          id: string
          client_id: string
          date: string
          title: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          date: string
          title: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          date?: string
          title?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}