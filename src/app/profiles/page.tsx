'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Plus, Search, SlidersHorizontal, FileDown } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
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
import { InvestorProfileForm } from '@/app/profiles/components/ProfileForms/InvestorProfileForm'
import { FounderProfileForm } from './components/ProfileForms/FounderProfileForm'
import { v4 as uuidv4 } from 'uuid'
import { FounderProfile, FounderFormValues } from '@/app/profiles/schemas/founder-schema'
import { InvestorProfile, InvestorFormValues } from '@/app/profiles/schemas/investor-schema'
import { ProfileTable } from './components/ProfileTable'
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
  const [searchQuery, setSearchQuery] = useState('')

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
      bio: 'Angel investor with focus on AI and fintech startups. Previously founded two successful tech companies.',
      email: 'jane.smith@investor.com',
      dateJoined: '15 Jan, 2023',
      creditsUsed: 42,
      isVisible: true,
      imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      introsMade: [
        {
          timestamp: '2025-03-15 10:30',
          sentTo: 'David Chen',
          status: 'Accepted',
          lastUpdate: '2025-03-16 14:25'
        },
        {
          timestamp: '2025-05-01 12:45',
          sentTo: 'Sarah Williams',
          status: 'Pending',
          lastUpdate: '2025-05-01 10:45'
        }
      ],
      introsReceived: [
        {
          timestamp: '2025-02-20 09:15',
          sentTo: 'Michael Johnson',
          status: 'Accepted',
          lastUpdate: '2025-02-21 11:30'
        }
      ]
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
      bio: 'Experienced VC focusing on B2B SaaS and cybersecurity. 15+ years of investment experience.',
      email: 'michael.johnson@venturecapital.com',
      dateJoined: '03 Mar, 2023',
      creditsUsed: 28,
      isVisible: true,
      imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
      introsMade: [
        {
          timestamp: '2025-04-10 13:00',
          sentTo: 'Alex Rodriguez',
          status: 'Rejected',
          lastUpdate: '2025-04-11 16:05'
        }
      ],
      introsReceived: [
        {
          timestamp: '2025-03-25 14:30',
          sentTo: 'Jane Smith',
          status: 'Accepted',
          lastUpdate: '2025-03-25 18:10'
        },
        {
          timestamp: '2025-04-15 11:20',
          sentTo: 'Robert Chen',
          status: 'Pending',
          lastUpdate: '2025-04-15 11:20'
        }
      ]
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
      revenue: '£0k – 50k',
      closeDate: '3-6 months',
      // taxRelief: ['SEIS (Seed Enterprise Investment Scheme)', 'EIS (Enterprise Investment Scheme)'],
      customerGroups: ['B2B', 'B2C'],
      // productStage: 'MVP',
      companyName: 'HealthAI Ltd',
      chequesAccepted: ['£50k-200k', '£100k-£200k'],
      currentFundingStage: 'Just started (spoke to leess than 5 funds)',
      yoyg: '100%+',
      profitability: 'Not yet profitable',
      websiteUrl: 'https://healthai.co.uk',
      email: 'sarah@healthai.co.uk',
      dateJoined: '22 Feb, 2023',
      creditsUsed: 35,
      isVisible: true,
      imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
      introsMade: [
        {
          timestamp: '2025-03-20 09:45',
          sentTo: 'Jane Smith',
          status: 'Pending',
          lastUpdate: '2025-03-20 09:45'
        }
      ],
      introsReceived: [
        {
          timestamp: '2025-02-15 16:30',
          sentTo: 'Jane Smith',
          status: 'Accepted',
          lastUpdate: '2025-02-16 10:20'
        },
        {
          timestamp: '2025-03-05 11:15',
          sentTo: 'Michael Johnson',
          status: 'Rejected',
          lastUpdate: '2025-03-07 09:30'
        }
      ]
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
      companyName: 'FinScaler Technologies',
      chequesAccepted: ['£20k – £50k'],
      currentFundingStage: 'Just started (spoke to leess than 5 funds)',
      yoyg: '75%',
      profitability: 'Profitable',
      websiteUrl: 'https://finscaler.com',
      email: 'david.chen@finscaler.com',
      dateJoined: '10 Apr, 2023',
      creditsUsed: 47,
      isVisible: true,
      imageUrl: 'https://randomuser.me/api/portraits/men/44.jpg',
      introsMade: [
        {
          timestamp: '2025-02-28 14:15',
          sentTo: 'Michael Johnson',
          status: 'Accepted',
          lastUpdate: '2025-03-01 10:45'
        },
        {
          timestamp: '2025-04-05 16:30',
          sentTo: 'Emily Zhang',
          status: 'Pending',
          lastUpdate: '2025-04-05 16:30'
        }
      ],
      introsReceived: [
        {
          timestamp: '2025-03-12 09:30',
          sentTo: 'Jane Smith',
          status: 'Accepted',
          lastUpdate: '2025-03-13 11:50'
        }
      ]
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

  const handleToggleVisibility = (profileId: string, isVisible: boolean) => {
    if (investorProfiles.some((p) => p.id === profileId)) {
      setInvestorProfiles(
        investorProfiles.map((profile) =>
          profile.id === profileId ? { ...profile, isVisible } : profile
        )
      )
    } else if (founderProfiles.some((p) => p.id === profileId)) {
      setFounderProfiles(
        founderProfiles.map((profile) =>
          profile.id === profileId ? { ...profile, isVisible } : profile
        )
      )
    }
  }
  
  const filteredInvestorProfiles = investorProfiles.filter(
    (profile) =>
      searchQuery === '' ||
      profile.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (profile.email && profile.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredFounderProfiles = founderProfiles.filter(
    (profile) =>
      searchQuery === '' ||
      profile.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (profile.email && profile.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getProfileCount = (activeTab: string) => {
    switch (activeTab) {
      case 'investors':
        return filteredInvestorProfiles.length
      case 'founders':
        return filteredFounderProfiles.length
      case 'advisors':
        return 0
      default:
        return 0
    }
  }

  

  return (
    <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Syrena users</h1>
        <Button
          onClick={() => handleAddEditProfile(getProfileTypeFromTab(activeTab))}
          className="flex items-center bg-primary px-5 py-3.5 font-semibold"
        >
          <Plus className="h-3 w-3" />
          Add new user
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-[-1.3px] ml-[1px]">
          <TabsTrigger value="investors">Investors</TabsTrigger>
          <TabsTrigger value="founders">Founders</TabsTrigger>
          <TabsTrigger value="advisors">Advisors</TabsTrigger>
        </TabsList>

        <div className="flex justify-between items-center p-6 border border-muted rounded-tr-lg">
          <div className="text-sm">
            {getProfileCount(activeTab) > 0
              ? searchQuery
                ? `Found ${getProfileCount(activeTab)} ${activeTab.replace(/s$/, '')}${
                    getProfileCount(activeTab) !== 1 ? 's' : ''
                  } for "${searchQuery}"`
                : `Showing 1-${getProfileCount(activeTab)} of ${getProfileCount(
                    activeTab
                  )} ${activeTab.replace(/s$/, '')}${getProfileCount(activeTab) !== 1 ? 's' : ''}`
              : searchQuery
              ? `No ${activeTab.replace(/s$/, '')}s found matching "${searchQuery}"`
              : `No ${activeTab.replace(/s$/, '')}s available`}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              Apply filters <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2 px-5 py-3">
              Export <FileDown className="h-4 w-4" />
            </Button>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-[42px] w-[200px] lg:w-[300px] pl-9 bg-input border-none focus-visible:ring-1 focus-visible:ring-neutral-700 focus-visible:border-none focus-visible:outline-none placeholder:text-muted-foreground"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground text-[#afafaf]" />
            </div>
          </div>
        </div>

        <TabsContent value="investors">
          <ProfileTable
            profiles={filteredInvestorProfiles}
            profileType="investors"
            onEdit={handleEditProfile}
            onToggleVisibility={handleToggleVisibility}
          />
        </TabsContent>

        <TabsContent value="founders">
          <ProfileTable
            profiles={filteredFounderProfiles}
            profileType="founders"
            onEdit={handleEditProfile}
            onToggleVisibility={handleToggleVisibility}
          />
        </TabsContent>

        <TabsContent value="advisors" className="mt-0">
          <ProfileTable profiles={[]} profileType="advisors" onEdit={handleEditProfile} />
        </TabsContent>
      </Tabs>

      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto px-10">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-primary text-xl">
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
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-primary"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
