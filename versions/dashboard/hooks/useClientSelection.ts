"use client"

import { useState, useEffect } from "react"
import { useClients } from "./useClients"
import type { Client } from "@/types/client"

export function useClientSelection() {
  const [selectedClientId, setSelectedClientId] = useState<string>("")
  const [clientSearchQuery, setClientSearchQuery] = useState("")
  
  const { clients, loading, error } = useClients()

  // Set the first client as selected when clients are loaded
  useEffect(() => {
    if (clients.length > 0 && !selectedClientId) {
      setSelectedClientId(clients[0].id)
    }
  }, [clients, selectedClientId])

  const clientData = clients.find((client) => client.id === selectedClientId) || clients[0]

  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId)
  }

  // Sort clients alphabetically by last name
  const sortedClients = clients.slice().sort((a, b) => {
    const aLastName = a.name.split(" ").pop() || ""
    const bLastName = b.name.split(" ").pop() || ""
    return aLastName.localeCompare(bLastName)
  })

  const filteredClients = sortedClients.filter(
    (client) => clientSearchQuery === "" || client.name.toLowerCase().includes(clientSearchQuery.toLowerCase()),
  )

  return {
    selectedClientId,
    clientData,
    clientSearchQuery,
    filteredClients,
    handleClientChange,
    setClientSearchQuery,
    loading,
    error,
  }
}
