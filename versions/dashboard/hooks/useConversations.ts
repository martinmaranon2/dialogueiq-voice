"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Conversation } from '@/types/client'

export function useConversations(clientId?: string) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchConversations()
  }, [clientId])

  const fetchConversations = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('conversations')
        .select('*')
        .order('date', { ascending: false })

      if (clientId) {
        query = query.eq('client_id', clientId)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      // Transform database format to match our types
      const transformedConversations: Conversation[] = data?.map(conv => ({
        id: conv.id,
        clientId: conv.client_id,
        date: conv.date,
        title: conv.title,
        summary: conv.summary,
        transcript: conv.transcript,
        duration: conv.duration,
        type: conv.type
      })) || []

      setConversations(transformedConversations)
    } catch (err) {
      console.error('Error fetching conversations:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch conversations')
    } finally {
      setLoading(false)
    }
  }

  const addConversation = async (conversation: Omit<Conversation, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          client_id: conversation.clientId,
          date: conversation.date,
          title: conversation.title,
          summary: conversation.summary,
          transcript: conversation.transcript,
          duration: conversation.duration,
          type: conversation.type
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      // Add the new conversation to the state
      const newConversation: Conversation = {
        id: data.id,
        clientId: data.client_id,
        date: data.date,
        title: data.title,
        summary: data.summary,
        transcript: data.transcript,
        duration: data.duration,
        type: data.type
      }

      setConversations(prev => [newConversation, ...prev])
      return newConversation
    } catch (err) {
      console.error('Error adding conversation:', err)
      setError(err instanceof Error ? err.message : 'Failed to add conversation')
      throw err
    }
  }

  const updateConversation = async (id: string, updates: Partial<Conversation>) => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .update({
          ...(updates.clientId && { client_id: updates.clientId }),
          ...(updates.date && { date: updates.date }),
          ...(updates.title && { title: updates.title }),
          ...(updates.summary && { summary: updates.summary }),
          ...(updates.transcript && { transcript: updates.transcript }),
          ...(updates.duration && { duration: updates.duration }),
          ...(updates.type && { type: updates.type })
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw error
      }

      // Update the conversation in the state
      const updatedConversation: Conversation = {
        id: data.id,
        clientId: data.client_id,
        date: data.date,
        title: data.title,
        summary: data.summary,
        transcript: data.transcript,
        duration: data.duration,
        type: data.type
      }

      setConversations(prev => 
        prev.map(conv => conv.id === id ? updatedConversation : conv)
      )

      return updatedConversation
    } catch (err) {
      console.error('Error updating conversation:', err)
      setError(err instanceof Error ? err.message : 'Failed to update conversation')
      throw err
    }
  }

  const deleteConversation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

      // Remove the conversation from the state
      setConversations(prev => prev.filter(conv => conv.id !== id))
    } catch (err) {
      console.error('Error deleting conversation:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete conversation')
      throw err
    }
  }

  return {
    conversations,
    loading,
    error,
    addConversation,
    updateConversation,
    deleteConversation,
    refetch: fetchConversations
  }
}