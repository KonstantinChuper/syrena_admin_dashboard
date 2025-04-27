'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash, Pencil } from 'lucide-react'
import { Profile } from '@/app/profiles/schemas/profile-schema'

interface ProfileCardProps {
  profile: Profile
  onEdit: (profile: Profile) => void
  onDelete: (profileId: string) => void
}

export function ProfileCard({ profile, onEdit, onDelete }: ProfileCardProps) {
  return (
    <Card className="overflow-hidden border border-border/40 bg-background/60 backdrop-blur-lg flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {profile.firstName} {profile.lastName}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(profile)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(profile.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>{profile.type}</CardDescription>
        {profile.fundingStage && (
          <Badge variant="outline" className="mt-1">
            {profile.fundingStage}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <div>
          <p className="text-sm font-medium mb-1">Job Title</p>
          <p className="text-sm">{profile.jobTitle}</p>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Industry</p>
          <div className="flex flex-wrap gap-1">
            {profile.industry.map((ind) => (
              <Badge key={ind} variant="outline" className="text-xs">
                {ind}
              </Badge>
            ))}
          </div>
        </div>

        {profile.fundingDeployed && (
          <div>
            <p className="text-sm font-medium mb-1">Funding Deployed</p>
            <p className="text-sm">{profile.fundingDeployed}</p>
          </div>
        )}

        {profile.preferredLocation && profile.preferredLocation.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Preferred Location</p>
            <div className="flex flex-wrap gap-1">
              {profile.preferredLocation.map((loc) => (
                <Badge key={loc} variant="outline" className="text-xs">
                  {loc}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {profile.groups && profile.groups.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Groups</p>
            <div className="flex flex-wrap gap-1">
              {profile.groups.map((group) => (
                <Badge key={group} variant="secondary" className="text-xs">
                  {group}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {profile.bio && (
          <div>
            <p className="text-sm font-medium mb-1">Bio</p>
            <p className="text-sm text-muted-foreground line-clamp-3">{profile.bio}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/20 px-6 py-3">
        <div className="flex w-full justify-between">
          <p className="text-xs text-muted-foreground">{profile.mobileNumber}</p>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline"
          >
            LinkedIn Profile
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}
