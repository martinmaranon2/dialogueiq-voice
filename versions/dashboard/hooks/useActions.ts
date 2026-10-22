"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface Action {
  id: string
  clientId: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  dueDate: string
}

export function useActions(clientId?: string) {
  const [actions, setActions] = useState<Action[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchActions()
  }, [clientId])

  const fetchActions = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('actions')
        .select('*')
        .order('due_date', { ascending: true })

      if (clientId) {
        query = query.eq('client_id', clientId)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      // Transform database format to match our types
      const transformedActions: Action[] = data?.map(action => ({
        id: action.id,
        clientId: action.client_id,
        title: action.title,
        description: action.description,
        priority: action.priority,
        status: action.status,
        dueDate: action.due_date
      })) || []

      setActions(transformedActions)
    } catch (err) {
      console.error('Error fetching actions:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch actions')
    } finally {
      setLoading(false)
    }
  }

  const addAction = async (action: Omit<Action, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('actions')
        .insert({
          client_id: action.clientId,
          title: action.title,
          description: action.description,
          priority: action.priority,
          status: action.status,
          due_date: action.dueDate
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      // Add the new action to the state
      const newAction: Action = {
        id: data.id,
        clientId: data.client_id,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        dueDate: data.due_date
      }

      setActions(prev => [...prev, newAction])
      return newAction
    } catch (err) {
      console.error('Error adding action:', err)
      setError(err instanceof Error ? err.message : 'Failed to add action')
      throw err
    }
  }

  const updateAction = async (id: string, updates: Partial<Action>) => {
    try {
      const updateData: any = {}
      
      if (updates.clientId) updateData.client_id = updates.clientId
      if (updates.title) updateData.title = updates.title
      if (updates.description) updateData.description = updates.description
      if (updates.priority) updateData.priority = updates.priority
      if (updates.status) updateData.status = updates.status
      if (updates.dueDate) updateData.due_date = updates.dueDate

      const { data, error } = await supabase
        .from('actions')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw error
      }

      // Update the action in the state
      const updatedAction: Action = {
        id: data.id,
        clientId: data.client_id,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        dueDate: data.due_date
      }

      setActions(prev => 
        prev.map(action => action.id === id ? updatedAction : action)
      )

      return updatedAction
    } catch (err) {
      console.error('Error updating action:', err)
      setError(err instanceof Error ? err.message : 'Failed to update action')
      throw err
    }
  }

  const deleteAction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('actions')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

      // Remove the action from the state
      setActions(prev => prev.filter(action => action.id !== id))
    } catch (err) {
      console.error('Error deleting action:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete action')
      throw err
    }
  }

  const markActionComplete = async (id: string) => {
    return updateAction(id, { status: 'completed' })
  }

  const markActionInProgress = async (id: string) => {
    return updateAction(id, { status: 'in_progress' })
  }

  const cancelAction = async (id: string) => {
    return updateAction(id, { status: 'cancelled' })
  }

  // Get actions by status
  const getActionsByStatus = (status: Action['status']) => {
    return actions.filter(action => action.status === status)
  }

  // Get actions by priority
  const getActionsByPriority = (priority: Action['priority']) => {
    return actions.filter(action => action.priority === priority)
  }

  // Get overdue actions
  const getOverdueActions = () => {
    const today = new Date().toISOString().split('T')[0]
    return actions.filter(action => 
      action.dueDate < today && 
      (action.status === 'pending' || action.status === 'in_progress')
    )
  }

  // Get upcoming actions (due in next 7 days)
  const getUpcomingActions = () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    const todayStr = today.toISOString().split('T')[0]
    const nextWeekStr = nextWeek.toISOString().split('T')[0]
    
    return actions.filter(action => 
      action.dueDate >= todayStr && 
      action.dueDate <= nextWeekStr &&
      (action.status === 'pending' || action.status === 'in_progress')
    )
  }

  return {
    actions,
    loading,
    error,
    addAction,
    updateAction,
    deleteAction,
    markActionComplete,
    markActionInProgress,
    cancelAction,
    getActionsByStatus,
    getActionsByPriority,
    getOverdueActions,
    getUpcomingActions,
    refetch: fetchActions
  }
}