"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Client } from "@/types/client"

interface DetailedCustomerInfoProps {
  client: Client
  isEnlarged: boolean
  onToggleEnlarge: () => void
  onActionClick: (prompt: string) => void
}

export function DetailedCustomerInfo({
  client,
  isEnlarged,
  onToggleEnlarge,
  onActionClick,
}: DetailedCustomerInfoProps) {
  return (
    <Card className="bg-white border-slate-200 shadow-md">
      <CardHeader className="pb-2 border-b border-slate-200">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base text-slate-900">Detailed Customer Info</CardTitle>
            <CardDescription className="text-slate-500">Comprehensive client profile</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleEnlarge}
            className="text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <span className="sr-only">Enlarge</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-sm pt-3 px-3">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium mb-1 text-[#e60000]">Professional Background</h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              <div className="text-slate-500">Occupation:</div>
              <div className="text-slate-900">
                {client.id === "1"
                  ? "Senior Executive, Tech Industry"
                  : client.id === "2"
                    ? "Retired CFO, Healthcare"
                    : "Business Owner, Manufacturing"}
              </div>
              <div className="text-slate-500">Education:</div>
              <div className="text-slate-900">
                {client.id === "1"
                  ? "MBA, Stanford University"
                  : client.id === "2"
                    ? "BS Finance, NYU"
                    : "MS Engineering, MIT"}
              </div>
              <div className="text-slate-500">Industry:</div>
              <div className="text-slate-900">
                {client.id === "1" ? "Technology" : client.id === "2" ? "Healthcare" : "Manufacturing"}
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div>
            <h4 className="font-medium mb-1 text-[#e60000]">Financial Preferences</h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              <div className="text-slate-500">Investment Style:</div>
              <div className="text-slate-900">
                {client.id === "1" ? "Growth-oriented" : client.id === "2" ? "Income-focused" : "Aggressive growth"}
              </div>
              <div className="text-slate-500">ESG Preference:</div>
              <div className="text-slate-900">
                {client.id === "1" ? "High priority" : client.id === "2" ? "Moderate interest" : "Low priority"}
              </div>
              <div className="text-slate-500">Liquidity Needs:</div>
              <div className="text-slate-900">{client.id === "1" ? "Medium" : client.id === "2" ? "High" : "Low"}</div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div>
            <h4 className="font-medium mb-1 text-[#e60000]">Communication Preferences</h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              <div className="text-slate-500">Preferred Contact:</div>
              <div className="text-slate-900">
                {client.id === "1" ? "Email" : client.id === "2" ? "Phone" : "In-person"}
              </div>
              <div className="text-slate-500">Meeting Frequency:</div>
              <div className="text-slate-900">
                {client.id === "1" ? "Quarterly" : client.id === "2" ? "Monthly" : "Bi-monthly"}
              </div>
              <div className="text-slate-500">Report Detail Level:</div>
              <div className="text-slate-900">
                {client.id === "1" ? "Detailed" : client.id === "2" ? "Summary" : "Comprehensive"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 mt-auto">
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-white border-slate-200 text-slate-900 hover:bg-slate-100"
          onClick={onToggleEnlarge}
        >
          View Full Profile
        </Button>
      </CardFooter>
    </Card>
  )
}
