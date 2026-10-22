"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Client } from '@/types/client'

export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('clients')
        .select(`
          *,
          conversations:conversations(*),
          upcoming_events:upcoming_events(*)
        `)
        .order('name', { ascending: true })

      if (error) {
        throw error
      }

      // Transform database format to match our types
      const transformedClients: Client[] = data?.map(client => ({
        id: client.id,
        name: client.name,
        avatar: client.avatar,
        initials: client.initials,
        email: client.email,
        dateOfBirth: client.date_of_birth,
        age: client.age,
        maritalStatus: client.marital_status,
        riskProfile: client.risk_profile,
        lastContact: client.last_contact,
        additionalInfo: client.additional_info,
        aum: client.aum,
        performance: {
          ytd: client.performance_ytd,
          oneYear: client.performance_one_year,
          threeYear: client.performance_three_year,
          fiveYear: client.performance_five_year,
        },
        portfolio: {
          equities: client.portfolio_equities,
          fixedIncome: client.portfolio_fixed_income,
          alternatives: client.portfolio_alternatives,
          cash: client.portfolio_cash,
        },
        sectors: {
          technology: client.sectors_technology,
          healthcare: client.sectors_healthcare,
          financials: client.sectors_financials,
          consumerDiscretionary: client.sectors_consumer_discretionary,
          industrials: client.sectors_industrials,
          other: client.sectors_other,
        },
        recentActivity: client.recent_activity,
        concerns: client.concerns,
        opportunities: client.opportunities,
        retirementGoal: client.retirement_goal,
        retirementProgress: client.retirement_progress,
        retirementAge: client.retirement_age,
        currentAge: client.current_age,
        taxBracket: client.tax_bracket,
        taxSavingsOpportunity: client.tax_savings_opportunity,
        upcomingEvents: (client.upcoming_events && Array.isArray(client.upcoming_events)) 
          ? client.upcoming_events.map(event => ({
              date: event.date,
              title: event.title,
            }))
          : [],
        conversations: client.conversations?.map(conv => ({
          id: conv.id,
          clientId: conv.client_id,
          date: conv.date,
          title: conv.title,
          summary: conv.summary,
          transcript: conv.transcript,
          duration: conv.duration,
          type: conv.type,
        })) || [],
      })) || []

      setClients(transformedClients)
    } catch (err) {
      console.error('Error fetching clients:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch clients')
    } finally {
      setLoading(false)
    }
  }

  const getClientById = async (id: string): Promise<Client | null> => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select(`
          *,
          conversations:conversations(*),
          upcoming_events:upcoming_events(*)
        `)
        .eq('id', id)
        .single()

      if (error) {
        throw error
      }

      if (!data) return null

      // Transform database format to match our types
      const transformedClient: Client = {
        id: data.id,
        name: data.name,
        avatar: data.avatar,
        initials: data.initials,
        email: data.email,
        dateOfBirth: data.date_of_birth,
        age: data.age,
        maritalStatus: data.marital_status,
        riskProfile: data.risk_profile,
        lastContact: data.last_contact,
        additionalInfo: data.additional_info,
        aum: data.aum,
        performance: {
          ytd: data.performance_ytd,
          oneYear: data.performance_one_year,
          threeYear: data.performance_three_year,
          fiveYear: data.performance_five_year,
        },
        portfolio: {
          equities: data.portfolio_equities,
          fixedIncome: data.portfolio_fixed_income,
          alternatives: data.portfolio_alternatives,
          cash: data.portfolio_cash,
        },
        sectors: {
          technology: data.sectors_technology,
          healthcare: data.sectors_healthcare,
          financials: data.sectors_financials,
          consumerDiscretionary: data.sectors_consumer_discretionary,
          industrials: data.sectors_industrials,
          other: data.sectors_other,
        },
        recentActivity: data.recent_activity,
        concerns: data.concerns,
        opportunities: data.opportunities,
        retirementGoal: data.retirement_goal,
        retirementProgress: data.retirement_progress,
        retirementAge: data.retirement_age,
        currentAge: data.current_age,
        taxBracket: data.tax_bracket,
        taxSavingsOpportunity: data.tax_savings_opportunity,
        upcomingEvents: (data.upcoming_events && Array.isArray(data.upcoming_events)) 
          ? data.upcoming_events.map(event => ({
              date: event.date,
              title: event.title,
            }))
          : [],
        conversations: data.conversations?.map(conv => ({
          id: conv.id,
          clientId: conv.client_id,
          date: conv.date,
          title: conv.title,
          summary: conv.summary,
          transcript: conv.transcript,
          duration: conv.duration,
          type: conv.type,
        })) || [],
      }

      return transformedClient
    } catch (err) {
      console.error('Error fetching client:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch client')
      return null
    }
  }

  const addClient = async (client: Omit<Client, 'id' | 'conversations' | 'upcomingEvents'>) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert({
          name: client.name,
          avatar: client.avatar,
          initials: client.initials,
          email: client.email,
          date_of_birth: client.dateOfBirth,
          age: client.age,
          marital_status: client.maritalStatus,
          risk_profile: client.riskProfile,
          last_contact: client.lastContact,
          additional_info: client.additionalInfo,
          aum: client.aum,
          performance_ytd: client.performance.ytd,
          performance_one_year: client.performance.oneYear,
          performance_three_year: client.performance.threeYear,
          performance_five_year: client.performance.fiveYear,
          portfolio_equities: client.portfolio.equities,
          portfolio_fixed_income: client.portfolio.fixedIncome,
          portfolio_alternatives: client.portfolio.alternatives,
          portfolio_cash: client.portfolio.cash,
          sectors_technology: client.sectors.technology,
          sectors_healthcare: client.sectors.healthcare,
          sectors_financials: client.sectors.financials,
          sectors_consumer_discretionary: client.sectors.consumerDiscretionary,
          sectors_industrials: client.sectors.industrials,
          sectors_other: client.sectors.other,
          recent_activity: client.recentActivity,
          concerns: client.concerns,
          opportunities: client.opportunities,
          retirement_goal: client.retirementGoal,
          retirement_progress: client.retirementProgress,
          retirement_age: client.retirementAge,
          current_age: client.currentAge,
          tax_bracket: client.taxBracket,
          tax_savings_opportunity: client.taxSavingsOpportunity,
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      // Add the new client to the state
      const newClient: Client = {
        id: data.id,
        name: data.name,
        avatar: data.avatar,
        initials: data.initials,
        email: data.email,
        dateOfBirth: data.date_of_birth,
        age: data.age,
        maritalStatus: data.marital_status,
        riskProfile: data.risk_profile,
        lastContact: data.last_contact,
        additionalInfo: data.additional_info,
        aum: data.aum,
        performance: {
          ytd: data.performance_ytd,
          oneYear: data.performance_one_year,
          threeYear: data.performance_three_year,
          fiveYear: data.performance_five_year,
        },
        portfolio: {
          equities: data.portfolio_equities,
          fixedIncome: data.portfolio_fixed_income,
          alternatives: data.portfolio_alternatives,
          cash: data.portfolio_cash,
        },
        sectors: {
          technology: data.sectors_technology,
          healthcare: data.sectors_healthcare,
          financials: data.sectors_financials,
          consumerDiscretionary: data.sectors_consumer_discretionary,
          industrials: data.sectors_industrials,
          other: data.sectors_other,
        },
        recentActivity: data.recent_activity,
        concerns: data.concerns,
        opportunities: data.opportunities,
        retirementGoal: data.retirement_goal,
        retirementProgress: data.retirement_progress,
        retirementAge: data.retirement_age,
        currentAge: data.current_age,
        taxBracket: data.tax_bracket,
        taxSavingsOpportunity: data.tax_savings_opportunity,
        upcomingEvents: [],
        conversations: [],
      }

      setClients(prev => [...prev, newClient])
      return newClient
    } catch (err) {
      console.error('Error adding client:', err)
      setError(err instanceof Error ? err.message : 'Failed to add client')
      throw err
    }
  }

  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      const updateData: any = {}
      
      if (updates.name) updateData.name = updates.name
      if (updates.avatar) updateData.avatar = updates.avatar
      if (updates.initials) updateData.initials = updates.initials
      if (updates.email) updateData.email = updates.email
      if (updates.dateOfBirth) updateData.date_of_birth = updates.dateOfBirth
      if (updates.age) updateData.age = updates.age
      if (updates.maritalStatus) updateData.marital_status = updates.maritalStatus
      if (updates.riskProfile) updateData.risk_profile = updates.riskProfile
      if (updates.lastContact) updateData.last_contact = updates.lastContact
      if (updates.additionalInfo) updateData.additional_info = updates.additionalInfo
      if (updates.aum) updateData.aum = updates.aum
      if (updates.performance) {
        updateData.performance_ytd = updates.performance.ytd
        updateData.performance_one_year = updates.performance.oneYear
        updateData.performance_three_year = updates.performance.threeYear
        updateData.performance_five_year = updates.performance.fiveYear
      }
      if (updates.portfolio) {
        updateData.portfolio_equities = updates.portfolio.equities
        updateData.portfolio_fixed_income = updates.portfolio.fixedIncome
        updateData.portfolio_alternatives = updates.portfolio.alternatives
        updateData.portfolio_cash = updates.portfolio.cash
      }
      if (updates.sectors) {
        updateData.sectors_technology = updates.sectors.technology
        updateData.sectors_healthcare = updates.sectors.healthcare
        updateData.sectors_financials = updates.sectors.financials
        updateData.sectors_consumer_discretionary = updates.sectors.consumerDiscretionary
        updateData.sectors_industrials = updates.sectors.industrials
        updateData.sectors_other = updates.sectors.other
      }
      if (updates.recentActivity) updateData.recent_activity = updates.recentActivity
      if (updates.concerns) updateData.concerns = updates.concerns
      if (updates.opportunities) updateData.opportunities = updates.opportunities
      if (updates.retirementGoal) updateData.retirement_goal = updates.retirementGoal
      if (updates.retirementProgress) updateData.retirement_progress = updates.retirementProgress
      if (updates.retirementAge) updateData.retirement_age = updates.retirementAge
      if (updates.currentAge) updateData.current_age = updates.currentAge
      if (updates.taxBracket) updateData.tax_bracket = updates.taxBracket
      if (updates.taxSavingsOpportunity) updateData.tax_savings_opportunity = updates.taxSavingsOpportunity

      const { data, error } = await supabase
        .from('clients')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw error
      }

      // Update the client in the state
      setClients(prev => 
        prev.map(client => 
          client.id === id 
            ? { ...client, ...updates }
            : client
        )
      )

      return data
    } catch (err) {
      console.error('Error updating client:', err)
      setError(err instanceof Error ? err.message : 'Failed to update client')
      throw err
    }
  }

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

      // Remove the client from the state
      setClients(prev => prev.filter(client => client.id !== id))
    } catch (err) {
      console.error('Error deleting client:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete client')
      throw err
    }
  }

  return {
    clients,
    loading,
    error,
    getClientById,
    addClient,
    updateClient,
    deleteClient,
    refetch: fetchClients
  }
}