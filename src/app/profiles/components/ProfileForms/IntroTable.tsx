'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react'
import { ProfileBadge } from '@/app/profiles/components/ui/ProfileBadge'

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
  return (
    <div className="space-y-6">
      <Tabs defaultValue="sent" className="w-full">
        <TabsList className="w-fit mb-4">
          <TabsTrigger value="sent">Sent ({introsMade.length})</TabsTrigger>
          <TabsTrigger value="received">Received ({introsReceived.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="sent">
          {introsMade.length > 0 ? (
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
                  {introsMade.map((intro, index) => (
                    <TableRow key={index} className="border-b border-input">
                      <TableCell className="text-foreground-transparent">
                        {intro.timestamp}
                      </TableCell>
                      <TableCell>{intro.sentTo}</TableCell>
                      <TableCell>
                        <ProfileBadge
                          isDot={true}
                          variant={
                            intro.status === 'Accepted'
                              ? 'green'
                              : intro.status === 'Rejected'
                              ? 'destructive'
                              : 'pending'
                          }
                        >
                          {intro.status}
                        </ProfileBadge>
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
            <div className="text-center py-8 border rounded-md">
              <p className="text-muted-foreground">No intros sent yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="received">
          {introsReceived.length > 0 ? (
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
                  <TableColumn>From</TableColumn>
                  <TableColumn>Status</TableColumn>
                  <TableColumn>Last update</TableColumn>
                </TableHeader>
                <TableBody>
                  {introsReceived.map((intro, index) => (
                    <TableRow key={index} className="border-b border-input">
                      <TableCell>{intro.timestamp}</TableCell>
                      <TableCell>{intro.sentTo}</TableCell>
                      <TableCell>
                        <ProfileBadge
                          isDot={true}
                          variant={
                            intro.status === 'Accepted'
                              ? 'green'
                              : intro.status === 'Rejected'
                              ? 'destructive'
                              : 'orange'
                          }
                        >
                          {intro.status}
                        </ProfileBadge>
                      </TableCell>
                      <TableCell>{intro.lastUpdate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 border rounded-md">
              <p className="text-muted-foreground">No intros received yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
