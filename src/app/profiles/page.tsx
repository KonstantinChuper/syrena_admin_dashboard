'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { ProfileCard } from '@/app/profiles/components/ProfileCards/InvestorProfileCard'
import { InvestorProfileForm } from '@/app/profiles/components/ProfileForms/InvestorProfileForm'
import { FounderProfileCard } from '@/app/profiles/components/ProfileCards/FounderProfileCard'
import { v4 as uuidv4 } from 'uuid'
import { Profile, ProfileFormValues } from '@/app/profiles/schemas/profile-schema'
import { FounderProfileForm } from './components/ProfileForms/FounderProfileForm'

export default function ProfilesPage() {
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [currentProfileType, setCurrentProfileType] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)

  const [investorProfiles, setInvestorProfiles] = useState<Profile[]>([
    {
      id: '1',
      firstName: 'Jane',
      lastName: 'Smith',
      type: 'Angel Investor',
      industry: ['AI & Machine Learning', 'Fintech & Insurtech'],
      fundingStage: 'Seed',
      groups: ['Female Founders', 'First-Time Founders'],
      preferredLocation: ['UK', 'Europe'],
      jobTitle: 'Partner',
      mobileNumber: '+44 7123 456789',
      linkedinUrl: 'https://uk.linkedin.com/in/janesmith',
      fundingDeployed: '$2M-$5M',
      bio: 'Angel investor with focus on AI and fintech startups. Previously founded two successful tech companies.'
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Johnson',
      type: 'VC (Venture Capital Fund)',
      industry: ['Enterprise SaaS', 'Cybersecurity'],
      fundingStage: 'Series A',
      groups: ['Impact-Driven Ventures'],
      preferredLocation: ['USA', 'Europe'],
      jobTitle: 'Managing Director',
      mobileNumber: '+44 7987 654321',
      linkedinUrl: 'https://uk.linkedin.com/in/michaeljohnson',
      fundingDeployed: '$10M-$50M',
      bio: 'Experienced VC focusing on B2B SaaS and cybersecurity. 15+ years of investment experience.'
    }
  ])

  const [founderProfiles, setFounderProfiles] = useState<Profile[]>([
    {
      id: '3',
      firstName: 'Sarah',
      lastName: 'Williams',
      type: 'Founder & CEO',
      industry: ['HealthTech & MedTech', 'AI & Machine Learning'],
      fundingStage: 'Seed',
      groups: ['Female Founders', 'First-Time Founders'],
      preferredLocation: ['UK', 'Europe'],
      jobTitle: 'CEO',
      mobileNumber: '+44 7111 222333',
      linkedinUrl: 'https://uk.linkedin.com/in/sarahwilliams',
      fundingDeployed: '',
      bio: 'Founder of a health tech startup focused on preventative care using AI.',
      revenue: '£200k–500k', 
      ebitda: 'Breakeven', 
      closingTimeframe: '3-6 months', 
      fundraisingStage: 'In the middle', 
      taxRelief: ['SEIS (Seed Enterprise Investment Scheme)', 'EIS (Enterprise Investment Scheme)'], 
      customerGroups: ['B2B', 'B2C'], 
      productStage: 'MVP' 
    },
    {
      id: '4',
      firstName: 'David',
      lastName: 'Chen',
      type: 'Co-Founder & CTO',
      industry: ['Fintech & Insurtech', 'Enterprise SaaS'],
      fundingStage: 'Series A',
      groups: ['First-Time Founders'], 
      preferredLocation: ['USA', 'Asia'],
      jobTitle: 'Co-Founder & CTO',
      mobileNumber: '+44 7444 555666',
      linkedinUrl: 'https://uk.linkedin.com/in/davidchen',
      fundingDeployed: '',
      bio: 'Technical co-founder with 10+ years of experience building scalable fintech solutions.',
      revenue: '£500k+', 
      ebitda: 'Profitable', 
      closingTimeframe: '1-3 months', 
      fundraisingStage: 'Almost finished (have terms sheets)',
      taxRelief: ['EIS (Enterprise Investment Scheme)'], 
      customerGroups: ['Enterprise'],
      productStage: 'Scaling'
    }
  ])

  const [advisorProfiles, setAdvisorProfiles] = useState<Profile[]>([
    {
      id: '5',
      firstName: 'Robert',
      lastName: 'Thompson',
      type: 'Advisor',
      industry: ['E-Commerce & Retail', 'Consumer Products & DTC'],
      fundingStage: 'Series B',
      groups: [],
      preferredLocation: ['UK', 'Europe'],
      jobTitle: 'Board Member',
      mobileNumber: '+44 7777 888999',
      linkedinUrl: 'https://uk.linkedin.com/in/robertthompson',
      fundingDeployed: '',
      bio: 'E-commerce growth advisor with experience scaling multiple 8-figure businesses.'
    },
    {
      id: '6',
      firstName: 'Lisa',
      lastName: 'Garcia',
      type: 'Advisor',
      industry: ['Media, Entertainment & Gaming'],
      fundingStage: 'Seed',
      groups: [],
      preferredLocation: ['USA'],
      jobTitle: 'Marketing Advisor',
      mobileNumber: '+44 7000 111222',
      linkedinUrl: 'https://uk.linkedin.com/in/lisagarcia',
      fundingDeployed: '',
      bio: 'Former CMO at major gaming companies, now advising early-stage startups.'
    }
  ])

  const [serviceProviderProfiles, setServiceProviderProfiles] = useState<Profile[]>([
    {
      id: '7',
      firstName: 'Thomas',
      lastName: 'Wilson',
      type: 'Service Provider',
      industry: ['Legal & Compliance'],
      fundingStage: 'Pre-Seed',
      groups: [],
      preferredLocation: ['UK'],
      jobTitle: 'Attorney',
      mobileNumber: '+44 7333 444555',
      linkedinUrl: 'https://uk.linkedin.com/in/thomaswilson',
      fundingDeployed: '',
      bio: 'Startup lawyer specializing in fundraising and M&A transactions.'
    },
    {
      id: '8',
      firstName: 'Emily',
      lastName: 'Patel',
      type: 'Service Provider',
      industry: ['Finance & Accounting'],
      fundingStage: 'Seed',
      groups: [],
      preferredLocation: ['UK', 'Europe'],
      jobTitle: 'CFO Services',
      mobileNumber: '+44 7666 777888',
      linkedinUrl: 'https://uk.linkedin.com/in/emilypatel',
      fundingDeployed: '',
      bio: 'Fractional CFO helping startups with financial strategy and fundraising.'
    }
  ])

  const handleAddEditProfile = (profileType: string) => {
    setIsEditing(false)
    setCurrentProfile(null)
    setCurrentProfileType(profileType)

    let defaultValues: Partial<ProfileFormValues> = {}

    if (profileType === 'founder') {
      defaultValues = {
        type: 'Founder & CEO'
      }
    } else if (profileType === 'investor') {
      defaultValues = {
        type: 'Angel Investor'
      }
    } else if (profileType === 'advisor') {
      defaultValues = {
        type: 'Advisor'
      }
    } else {
      defaultValues = {
        type: 'Service Provider'
      }
    }

    setCurrentProfile(defaultValues as Profile)
    setFormDialogOpen(true)
  }

const handleEditProfile = (profile: Profile) => {
  setIsEditing(true)
  setCurrentProfile(profile)

  if ('revenue' in profile || 'ebitda' in profile || profile.type.includes('Founder')) {
    setCurrentProfileType('founder')
  } else if (
    profile.type.includes('Investor') ||
    profile.type.includes('VC') ||
    profile.type.includes('Angel')
  ) {
    setCurrentProfileType('investor')
  } else if (profile.type.includes('Advisor')) {
    setCurrentProfileType('advisor')
  } else {
    setCurrentProfileType('service-provider')
  }

  setFormDialogOpen(true)
}

  const handleDeleteConfirm = (profileId: string) => {
    setCurrentProfile(
      [
        ...investorProfiles,
        ...founderProfiles,
        ...advisorProfiles,
        ...serviceProviderProfiles
      ].find((p) => p.id === profileId) || null
    )
    setDeleteDialogOpen(true)
  }

  const handleProfileSubmit = (values: ProfileFormValues) => {
    if (isEditing && currentProfile) {
      const updatedProfile = { ...currentProfile, ...values }

      if (investorProfiles.some((p) => p.id === currentProfile.id)) {
        setInvestorProfiles(
          investorProfiles.map((p) => (p.id === currentProfile.id ? updatedProfile : p))
        )
      } else if (founderProfiles.some((p) => p.id === currentProfile.id)) {
        setFounderProfiles(
          founderProfiles.map((p) => (p.id === currentProfile.id ? updatedProfile : p))
        )
      } else if (advisorProfiles.some((p) => p.id === currentProfile.id)) {
        setAdvisorProfiles(
          advisorProfiles.map((p) => (p.id === currentProfile.id ? updatedProfile : p))
        )
      } else if (serviceProviderProfiles.some((p) => p.id === currentProfile.id)) {
        setServiceProviderProfiles(
          serviceProviderProfiles.map((p) => (p.id === currentProfile.id ? updatedProfile : p))
        )
      }
    } else {
      const newProfile: Profile = {
        ...values,
        id: uuidv4()
      }

      switch (currentProfileType) {
        case 'investor':
          setInvestorProfiles([...investorProfiles, newProfile])
          break
        case 'founder':
          setFounderProfiles([...founderProfiles, newProfile])
          break
        case 'advisor':
          setAdvisorProfiles([...advisorProfiles, newProfile])
          break
        case 'service-provider':
          setServiceProviderProfiles([...serviceProviderProfiles, newProfile])
          break
      }
    }

    setFormDialogOpen(false)
  }

  const handleDeleteProfile = () => {
    if (currentProfile) {
      if (investorProfiles.some((p) => p.id === currentProfile.id)) {
        setInvestorProfiles(investorProfiles.filter((p) => p.id !== currentProfile.id))
      } else if (founderProfiles.some((p) => p.id === currentProfile.id)) {
        setFounderProfiles(founderProfiles.filter((p) => p.id !== currentProfile.id))
      } else if (advisorProfiles.some((p) => p.id === currentProfile.id)) {
        setAdvisorProfiles(advisorProfiles.filter((p) => p.id !== currentProfile.id))
      } else if (serviceProviderProfiles.some((p) => p.id === currentProfile.id)) {
        setServiceProviderProfiles(
          serviceProviderProfiles.filter((p) => p.id !== currentProfile.id)
        )
      }

      setDeleteDialogOpen(false)
    }
  }

  console.log('Rendering FounderProfileForm with:', {
    isEditing: isEditing,
    currentProfile: currentProfile,
    currentProfileType: currentProfileType
  })

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Profile Management</h1>
      </div>

      <Tabs defaultValue="investors">
        <TabsList className="grid grid-cols-4 mb-8 w-full">
          <TabsTrigger value="investors">Investors</TabsTrigger>
          <TabsTrigger value="founders">Founders</TabsTrigger>
          <TabsTrigger value="advisors">Advisors</TabsTrigger>
          <TabsTrigger value="service-providers">Service Providers</TabsTrigger>
        </TabsList>

        <TabsContent value="investors" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investorProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onEdit={handleEditProfile}
                onDelete={handleDeleteConfirm}
              />
            ))}
            {investorProfiles.length === 0 && (
              <div className="col-span-3 py-12 text-center">
                <p className="text-muted-foreground">No investor profiles found.</p>
              </div>
            )}
          </div>

          <Button
            onClick={() => handleAddEditProfile('investor')}
            className="flex items-center mt-6 bg-[#FF5F00]"
          >
            Add New Profile
            <Plus className="mr-2 h-4 w-4" />
          </Button>
        </TabsContent>

        <TabsContent value="founders" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {founderProfiles.map((profile) => (
              <FounderProfileCard
                key={profile.id}
                profile={profile}
                onEdit={handleEditProfile}
                onDelete={handleDeleteConfirm}
              />
            ))}
            {founderProfiles.length === 0 && (
              <div className="col-span-3 py-12 text-center">
                <p className="text-muted-foreground">No founder profiles found.</p>
              </div>
            )}
          </div>
          <Button
            onClick={() => handleAddEditProfile('founder')}
            className="flex items-center mt-6 bg-[#FF5F00]"
          >
            Add New Profile
            <Plus className="mr-2 h-4 w-4" />
          </Button>
        </TabsContent>

        <TabsContent value="advisors" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisorProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onEdit={handleEditProfile}
                onDelete={handleDeleteConfirm}
              />
            ))}
            {advisorProfiles.length === 0 && (
              <div className="col-span-3 py-12 text-center">
                <p className="text-muted-foreground">No advisor profiles found.</p>
              </div>
            )}
          </div>
          <Button
            onClick={() => handleAddEditProfile('advisor')}
            className="flex items-center mt-6 bg-[#FF5F00]"
          >
            Add New Profile
            <Plus className="mr-2 h-4 w-4" />
          </Button>
        </TabsContent>

        <TabsContent value="service-providers" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceProviderProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onEdit={handleEditProfile}
                onDelete={handleDeleteConfirm}
              />
            ))}
            {serviceProviderProfiles.length === 0 && (
              <div className="col-span-3 py-12 text-center">
                <p className="text-muted-foreground">No service provider profiles found.</p>
              </div>
            )}
          </div>
          <Button
            onClick={() => handleAddEditProfile('service-provider')}
            className="flex items-center mt-6 bg-[#FF5F00]"
          >
            Add New Profile
            <Plus className="mr-2 h-4 w-4" />
          </Button>
        </TabsContent>
      </Tabs>

      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto scrollbar-hide">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-[#FF5F00] text-xl">
              {isEditing ? 'Edit Profile' : 'Add New Profile'}
            </DialogTitle>
          </DialogHeader>
          {currentProfileType === 'investor' && (
            <InvestorProfileForm
              defaultValues={currentProfile || undefined}
              onSubmit={handleProfileSubmit}
              onCancel={() => setFormDialogOpen(false)}
              isEditing={isEditing}
            />
          )}

          {currentProfileType === 'founder' && (
            <FounderProfileForm
              defaultValues={currentProfile || undefined}
              onSubmit={handleProfileSubmit}
              onCancel={() => setFormDialogOpen(false)}
              isEditing={isEditing}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this profile? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProfile}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-[#FF5F00]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
