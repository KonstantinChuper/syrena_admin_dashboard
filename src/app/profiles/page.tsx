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
import { FounderProfileForm } from './components/ProfileForms/FounderProfileForm'
import { FounderProfileCard } from '@/app/profiles/components/ProfileCards/FounderProfileCard'
import { v4 as uuidv4 } from 'uuid'
import { FounderProfile, FounderFormValues } from '@/app/profiles/schemas/founder-schema'
import { InvestorProfile, InvestorFormValues } from '@/app/profiles/schemas/investor-schema'

import { formatForInvestorForm, formatForFounderForm, processFormSubmission } from './utils/utils'

type Profile = FounderProfile | InvestorProfile
type ProfileFormValues = FounderFormValues | InvestorFormValues

export default function ProfilesPage() {
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [currentProfileType, setCurrentProfileType] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('investors')

  const [investorProfiles, setInvestorProfiles] = useState<InvestorProfile[]>([
    {
      id: '1',
      firstName: 'Jane',
      lastName: 'Smith',
      type: 'Angel Investor',
      industry: ['AI & Machine Learning', 'Fintech & Insurtech'],
      fundingStage: ['Seed', 'Pre-Seed'],
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
      fundingStage: ['Series A'],
      groups: ['Impact-Driven Ventures'],
      preferredLocation: ['USA', 'Europe'],
      jobTitle: 'Managing Director',
      mobileNumber: '+44 7987 654321',
      linkedinUrl: 'https://uk.linkedin.com/in/michaeljohnson',
      fundingDeployed: '$10M-$50M',
      bio: 'Experienced VC focusing on B2B SaaS and cybersecurity. 15+ years of investment experience.'
    }
  ])

  const [founderProfiles, setFounderProfiles] = useState<FounderProfile[]>([
    {
      id: '3',
      firstName: 'Sarah',
      lastName: 'Williams',
      industry: ['HealthTech & MedTech', 'AI & Machine Learning'],
      fundingStage: 'Seed',
      groups: ['Female Founders', 'First-Time Founders'],
      preferredLocation: ['UK', 'Europe'],
      jobTitle: 'CEO',
      mobileNumber: '+44 7111 222333',
      linkedinUrl: 'https://uk.linkedin.com/in/sarahwilliams',
      fundingRequired: 'fdfdffd',
      bio: 'Founder of a health tech startup focused on preventative care using AI.',
      revenue: '£20k – £50k',
      closeDate: '3-6 months',
      // taxRelief: ['SEIS (Seed Enterprise Investment Scheme)', 'EIS (Enterprise Investment Scheme)'],
      customerGroups: ['B2B', 'B2C'],
      // productStage: 'MVP',
      companyName: 'HealthAI Ltd',
      chequesAccepted: ['£50k-£100k', '£100k-£200k'],
      currentFundingStage: 'Just started (spoke to leess than 5 funds)',
      yoyg: '100%+',
      profitability: 'Not yet profitable',
      websiteUrl: 'https://healthai.co.uk'
    },
    {
      id: '4',
      firstName: 'David',
      lastName: 'Chen',
      industry: ['Fintech & Insurtech', 'Enterprise SaaS'],
      fundingStage: 'Series A',
      groups: ['Female Founders', 'First-Time Founders'],
      preferredLocation: ['USA', 'Asia'],
      jobTitle: 'Co-Founder & CTO',
      mobileNumber: '+44 7444 555666',
      linkedinUrl: 'https://uk.linkedin.com/in/davidchen',
      fundingRequired: 'fdfdffd',
      bio: 'Technical co-founder with 10+ years of experience building scalable fintech solutions.',
      revenue: '£500k+',
      closeDate: '1-3 months',
      // fundraisingStage: 'Almost finished (have terms sheets)',
      // taxRelief: ['EIS (Enterprise Investment Scheme)'],
      customerGroups: ['B2B', 'B2C'],
      // productStage: 'Scaling',
      // Добавленные отсутствующие поля
      companyName: 'FinScaler Technologies',
      chequesAccepted: ['£20k – £50k'],
      currentFundingStage: 'Just started (spoke to leess than 5 funds)',
      yoyg: '75%',
      profitability: 'Profitable',
      websiteUrl: 'https://finscaler.com'
    }
  ])

  const handleAddEditProfile = (profileType: string) => {
    setIsEditing(false)
    setCurrentProfile(null)
    setCurrentProfileType(profileType)

    let defaultValues: Partial<Profile> = {
      id: 'temp_' + uuidv4()
    }

    if (profileType === 'founder') {
      defaultValues = {
        ...defaultValues,
        type: 'Founder & CEO'
      }
    } else if (profileType === 'investor') {
      defaultValues = {
        ...defaultValues,
        type: 'Angel Investor'
      }
    } else if (profileType === 'advisor') {
      defaultValues = {
        ...defaultValues,
        type: 'Advisor'
      }
    } else {
      defaultValues = {
        ...defaultValues,
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
      [...investorProfiles, ...founderProfiles].find((p) => p.id === profileId) || null
    )
    setDeleteDialogOpen(true)
  }

  const handleProfileSubmit = (values: ProfileFormValues) => {
    console.log('Submitting values:', values)
    if (isEditing && currentProfile) {
      const updatedProfile = { ...currentProfile, ...values }

      if (investorProfiles.some((p) => p.id === currentProfile.id)) {
        setInvestorProfiles(
          investorProfiles.map((p) =>
            p.id === currentProfile.id ? (updatedProfile as InvestorProfile) : p
          )
        )
      } else if (founderProfiles.some((p) => p.id === currentProfile.id)) {
        setFounderProfiles(
          founderProfiles.map((p) =>
            p.id === currentProfile.id ? (updatedProfile as FounderProfile) : p
          )
        )
      }
    } else {
      if (currentProfileType === 'investor') {
        const newInvestorProfile: InvestorProfile = {
          ...(values as InvestorFormValues),
          id: uuidv4()
        }
        setInvestorProfiles([...investorProfiles, newInvestorProfile])
      } else if (currentProfileType === 'founder') {
        const newFounderProfile: FounderProfile = {
          ...(values as FounderFormValues),
          id: uuidv4()
        }
        setFounderProfiles([...founderProfiles, newFounderProfile])
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
      }
      setDeleteDialogOpen(false)
    }
  }

  const getProfileTypeFromTab = (tab: string): string => {
    switch (tab) {
      case 'investors':
        return 'investor'
      case 'founders':
        return 'founder'
      case 'advisors':
        return 'advisor'
      case 'service-providers':
        return 'service-provider'
      default:
        return 'investor'
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Profile Management</h1>
        <Button
          onClick={() => handleAddEditProfile(getProfileTypeFromTab(activeTab))}
          className="flex items-center mt-6 bg-[#FF5F00]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Profile
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
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
                profile={profile as InvestorProfile}
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
        </TabsContent>

        <TabsContent value="founders" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {founderProfiles.map((profile) => (
              <FounderProfileCard
                key={profile.id}
                profile={profile as FounderProfile}
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
        </TabsContent>

        <TabsContent value="advisors" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-3 py-12 text-center">
              <p className="text-muted-foreground">No advisor profiles found.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="service-providers" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-3 py-12 text-center">
              <p className="text-muted-foreground">No service provider profiles found.</p>
            </div>
          </div>
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
              defaultValues={formatForInvestorForm(currentProfile as any)}
              onSubmit={(values) => {
                const processedValues = processFormSubmission(values, 'investor')
                handleProfileSubmit(processedValues)
              }}
              onCancel={() => setFormDialogOpen(false)}
              isEditing={isEditing}
            />
          )}

          {currentProfileType === 'founder' && (
            <FounderProfileForm
              defaultValues={
                formatForFounderForm(currentProfile as any) as Required<FounderFormValues>
              }
              onSubmit={(values) => {
                const processedValues = processFormSubmission(values, 'founder')
                handleProfileSubmit(processedValues)
              }}
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
