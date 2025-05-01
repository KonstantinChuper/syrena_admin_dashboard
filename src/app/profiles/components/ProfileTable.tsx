'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react'
import { Gem } from 'lucide-react'
import { FounderProfile } from '../schemas/founder-schema'
import { InvestorProfile } from '../schemas/investor-schema'
import { ProfileBadge } from '@/app/profiles/components/ui/ProfileBadge'
import { getDisplayName } from '@/app/profiles/utils/utils'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { PaginationControl } from './ui/PaginationControl'

type Profile = FounderProfile | InvestorProfile

interface ProfileTableProps {
  profiles: Profile[]
  profileType: string
  onEdit: (profile: Profile) => void
  onToggleVisibility?: (profileId: string, isVisible: boolean) => void
}

export function ProfileTable({
  profiles,
  profileType,
  onEdit,
  onToggleVisibility
}: ProfileTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10
  const totalPages = Math.ceil(profiles.length / rowsPerPage)
  // const currentProfiles = profiles.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const handleToggleVisibility = (profile: Profile, checked: boolean) => {
    if (onToggleVisibility) {
      onToggleVisibility(profile.id, checked)
    }
  }

  const handleRowClick = (profile: Profile) => {
    onEdit(profile)
  }

  return (
    <div className="flex flex-col w-full justify-between">
      <Table
        isStriped
        aria-label={`${getDisplayName(profileType)} Profiles Table`}
        classNames={{
          wrapper: 'p-0 [&_th]:!rounded-none',
          thead: '!rounded-none',
          th: 'bg-primary-dark text-foreground border border-white/10 py-[12px] px-[20px]',
          td: 'text-foreground border border-white/10 px-[20px] max-w-[200px] break-all',
          table: '!rounded-none',
          base: '[&_tr[aria-hidden=true]]:!h-0 [&_tr[aria-hidden=true]]:!m-0'
        }}
      >
        <TableHeader className="rounded-none">
          <TableColumn className="text-start font-medium">S/N</TableColumn>
          <TableColumn className="text-start font-medium">First Name</TableColumn>
          <TableColumn className="text-start font-medium">Last Name</TableColumn>
          <TableColumn className="text-start font-medium">Email</TableColumn>
          <TableColumn className="text-start font-medium max-w-[80px]">Phone</TableColumn>
          <TableColumn className="text-start font-medium min-w-[140px]">Date joined</TableColumn>
          <TableColumn className="text-start font-medium">Credits used</TableColumn>
          <TableColumn className="text-start font-medium min-w-[140px]">User type</TableColumn>
          <TableColumn className="text-start font-medium">Profile visibility</TableColumn>
        </TableHeader>
        <TableBody>
          {profiles.map((profile, index) => (
            <TableRow
              key={profile.id}
              onClick={() => handleRowClick(profile)}
              className={`cursor-pointer hover:bg-primary/5 transition-colors ${
                index % 2 === 0 ? 'bg-transparent' : 'bg-[#ffffff10]'
              }`}
            >
              <TableCell className="font-medium py-4">{profile.id}</TableCell>
              <TableCell className="font-medium">{profile.firstName}</TableCell>
              <TableCell className="font-medium">{profile.lastName}</TableCell>
              <TableCell className="font-light text-foreground-transparent">
                {profile.email || '-'}
              </TableCell>
              <TableCell className="font-light text-foreground-transparent">
                {profile.mobileNumber}
              </TableCell>
              <TableCell className="font-light text-foreground-transparent">
                {profile.dateJoined || '01 Jan, 2023'}
              </TableCell>
              <TableCell className="text-center">
                <ProfileBadge variant="orange">
                  <div className="flex items-center">
                    <Gem className="h-3.5 w-3.5 mr-1" /> {profile.creditsUsed || 0}
                  </div>
                </ProfileBadge>
              </TableCell>
              <TableCell>
                <ProfileBadge isDot={true}>{getDisplayName(profileType)}</ProfileBadge>
              </TableCell>
              <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                <Switch
                  checked={profile.isVisible}
                  onCheckedChange={(checked) => handleToggleVisibility(profile, checked)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* {totalPages > 1 && ( */}
      <div className="w-full pt-6">
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {/* )} */}
    </div>
  )
}
