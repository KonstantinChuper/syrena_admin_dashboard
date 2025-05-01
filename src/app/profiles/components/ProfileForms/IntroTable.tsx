'use client'

import { useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react'
import { ProfileBadge } from '@/components/ProfileBadge'
import {
  IntroTabs,
  IntroTabsList,
  IntroTabsTrigger,
  IntroTabsContent
} from '@/components/ui/IntroTabs'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge } from '@/components/StatusBadge'

interface Intro {
  timestamp: string
  sentTo: string
  status: 'Pending' | 'Accepted' | 'Rejected'
  lastUpdate: string
}

interface IntroTableProps {
  introsMade: Intro[]
  introsReceived: Intro[]
}

export function IntroTable({ introsMade, introsReceived }: IntroTableProps) {
  const [timeFilter, setTimeFilter] = useState('all')

  const filterIntrosByTime = (intros: Intro[], filter: string) => {
    const now = new Date()
    const oneWeekAgo = new Date(now)
    oneWeekAgo.setDate(now.getDate() - 7)

    const oneMonthAgo = new Date(now)
    oneMonthAgo.setMonth(now.getMonth() - 1)

    return intros.filter((intro) => {
      const introDate = new Date(intro.timestamp)
      if (filter === 'week') {
        return introDate >= oneWeekAgo
      } else if (filter === 'month') {
        return introDate >= oneMonthAgo
      }
      return true
    })
  }

  const filteredIntrosMade = filterIntrosByTime(introsMade, timeFilter)
  const filteredIntrosReceived = filterIntrosByTime(introsReceived, timeFilter)

  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const currentYear = new Date().getFullYear()

  return (
    <div className="space-y-6">
      <IntroTabs defaultValue="sent" className="w-full">
        <IntroTabsList>
          <IntroTabsTrigger value="sent">Sent ({introsMade.length})</IntroTabsTrigger>
          <IntroTabsTrigger value="received">Received ({introsReceived.length})</IntroTabsTrigger>
        </IntroTabsList>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">
            {introsMade.length > 0 && (
              <>
                Showing {filteredIntrosMade.length} intros sent in {currentMonth} {currentYear}
              </>
            )}
          </h3>
          <Tabs defaultValue="all" onValueChange={setTimeFilter} className="w-auto">
            <TabsList className="bg-transparent p-0 h-auto flex gap-1">
              <TabsTrigger
                value="all"
                className="px-3 py-1 text-xs data-[state=active]:text-primary data-[state=active]:bg-amber-900 rounded-2xl border border-input data-[state=active]:border-none text-foreground-subtitle"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="week"
                className="px-3 py-1 text-xs data-[state=active]:text-primary data-[state=active]:bg-amber-900 rounded-2xl border border-input data-[state=active]:border-none text-foreground-subtitle"
              >
                This week
              </TabsTrigger>
              <TabsTrigger
                value="month"
                className="px-3 py-1 text-xs data-[state=active]:text-primary data-[state=active]:bg-amber-900 rounded-2xl border border-input data-[state=active]:border-none text-foreground-subtitle"
              >
                This month
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <IntroTabsContent value="sent">
          {filteredIntrosMade.length > 0 ? (
            <div className="border rounded-md overflow-hidden border-input">
              <Table
                aria-label="Sent Intros"
                classNames={{
                  wrapper: 'p-0',
                  th: 'bg-[#FFFFFF0F] text-foreground py-3 px-4 font-medium',
                  td: 'text-foreground px-4 py-4',
                  table: 'w-full'
                }}
              >
                <TableHeader>
                  <TableColumn>Time and date</TableColumn>
                  <TableColumn>Sent to</TableColumn>
                  <TableColumn>Status</TableColumn>
                  <TableColumn>Last update</TableColumn>
                </TableHeader>
                <TableBody>
                  {filteredIntrosMade.map((intro, index) => (
                    <TableRow key={index} className="border-b border-input">
                      <TableCell className="text-foreground-transparent">
                        {intro.timestamp}
                      </TableCell>
                      <TableCell>{intro.sentTo}</TableCell>
                      <TableCell>
                        <StatusBadge status={intro.status} timestamp={intro.timestamp} />
                      </TableCell>
                      <TableCell className="text-foreground-transparent">
                        {intro.lastUpdate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 border rounded-md border-input">
              <p className="text-muted-foreground">No intros sent yet.</p>
            </div>
          )}
        </IntroTabsContent>

        <IntroTabsContent value="received">
          {filteredIntrosReceived.length > 0 ? (
            <div className="border rounded-md overflow-hidden border-input">
              <Table
                aria-label="Received Intros"
                classNames={{
                  wrapper: 'p-0',
                  th: 'bg-[#FFFFFF0F] text-foreground py-3 px-4 font-medium',
                  td: 'text-foreground px-4 py-4',
                  table: 'w-full'
                }}
              >
                <TableHeader>
                  <TableColumn>Time and date</TableColumn>
                  <TableColumn>From</TableColumn>
                  <TableColumn>Status</TableColumn>
                  <TableColumn>Last update</TableColumn>
                </TableHeader>
                <TableBody>
                  {filteredIntrosReceived.map((intro, index) => (
                    <TableRow key={index} className="border-b border-input">
                      <TableCell className="text-foreground-transparent">
                        {intro.timestamp}
                      </TableCell>
                      <TableCell>{intro.sentTo}</TableCell>
                      <TableCell>
                        <StatusBadge status={intro.status} timestamp={intro.timestamp} />
                      </TableCell>
                      <TableCell className="text-foreground-transparent">
                        {intro.lastUpdate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 border rounded-md border-input">
              <p className="text-muted-foreground">No intros received yet.</p>
            </div>
          )}
        </IntroTabsContent>
      </IntroTabs>
    </div>
  )
}
