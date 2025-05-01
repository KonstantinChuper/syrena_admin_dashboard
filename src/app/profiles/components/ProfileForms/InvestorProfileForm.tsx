'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MultiSelect } from '../ui/Multiselect'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { User } from 'lucide-react'
import {
  IndustriesList,
  InvestorTypeList,
  InvestmentStageList,
  PreferredLocationList,
  InvestorGroup,
  InvestorJobTitleList
} from '@/app/profiles/constants/profile-data'
import { InvestorFormValues, investorSchema } from '@/app/profiles/schemas/investor-schema'
import { IntroTable } from './IntroTable'

interface InvestorProfileFormProps {
  defaultValues?: Partial<InvestorFormValues>
  onSubmit: (values: InvestorFormValues) => void
  onCancel: () => void
  isEditing?: boolean
}

export function InvestorProfileForm({
  defaultValues,
  onSubmit,
  onCancel,
  isEditing
}: InvestorProfileFormProps) {
  const form = useForm<InvestorFormValues>({
    resolver: zodResolver(investorSchema) as any,
    defaultValues: {
      firstName: defaultValues?.firstName || '',
      lastName: defaultValues?.lastName || '',
      type: defaultValues?.type || '',
      industry: defaultValues?.industry || [],
      fundingStage: defaultValues?.fundingStage || [],
      groups: defaultValues?.groups || [],
      preferredLocation: defaultValues?.preferredLocation || [],
      jobTitle: defaultValues?.jobTitle || '',
      mobileNumber: defaultValues?.mobileNumber || '',
      linkedinUrl: defaultValues?.linkedinUrl || '',
      fundingDeployed: defaultValues?.fundingDeployed || '',
      bio: defaultValues?.bio || '',
      isVisible: defaultValues?.isVisible ?? true,
      imageUrl: defaultValues?.imageUrl || '',
      creditsUsed: defaultValues?.creditsUsed || 0,
      introsMade: defaultValues?.introsMade || [],
      introsReceived: defaultValues?.introsReceived || [],
      pitchDeckUrl: defaultValues?.pitchDeckUrl || '',
      email: defaultValues?.email || '',
      dateJoined: defaultValues?.dateJoined || ''
    }
  })

  const industryOptions = IndustriesList.map((item) => ({ label: item, value: item }))
  const groupsOptions = InvestorGroup.map((item) => ({ label: item, value: item }))
  const locationOptions = PreferredLocationList.map((item) => ({ label: item, value: item }))

  const fullName = `${form.watch('firstName') || 'New'} ${form.watch('lastName') || 'Investor'}`
  const jobTitle = form.watch('jobTitle') || 'No position'

  const introsMade = defaultValues?.introsMade || []
  const introsReceived = defaultValues?.introsReceived || []
  const creditHistory = [
    { date: '2025-01-15', amount: 10, reason: 'Profile creation' },
    { date: '2025-02-20', amount: 5, reason: 'Intro to founder' },
    { date: '2025-04-05', amount: 15, reason: 'Monthly subscription' }
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">
        <div className="flex items-start justify-between bg-muted/20 rounded-lg p-6">
          <div className="flex gap-5">
            <Avatar className="h-20 w-20">
              {defaultValues?.imageUrl ? (
                <AvatarImage src={defaultValues.imageUrl} alt={fullName} />
              ) : (
                <AvatarFallback className="bg-primary/10">
                  <User className="h-10 w-10 text-primary" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{fullName}</h2>
              <p className="text-muted-foreground">{jobTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm">Profile visibility</span>
            <FormField
              control={form.control}
              name="isVisible"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Tabs defaultValue="basic-details" className="w-full">
          <TabsList className="mb-8 border-b border-input w-full">
            <TabsTrigger value="basic-details">Basic Details</TabsTrigger>
            <TabsTrigger value="intros">Intros</TabsTrigger>
            <TabsTrigger value="credit-usage">Credit Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="basic-details" className="space-y-6">
            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Email</div>
              <div className="w-3/4">
                <Input
                  value={defaultValues?.email || 'investor@example.com'}
                  readOnly
                  className="border-0 border-b border-muted focus-visible:ring-0 rounded-none px-0 bg-transparent"
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">First Name</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          {...field}
                          className="border-0 border-b border-muted focus-visible:ring-0 rounded-none px-0 bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Last Name</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Last Name"
                          {...field}
                          className="border-0 border-b border-muted focus-visible:ring-0 rounded-none px-0 bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Остальные поля из Basic Details */}
            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Type</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-0 border-b border-muted focus:ring-0 rounded-none px-0 bg-transparent">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {InvestorTypeList.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Job Title</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-0 border-b border-muted focus:ring-0 rounded-none px-0 bg-transparent">
                            <SelectValue placeholder="Select job title" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {InvestorJobTitleList.map((title) => (
                            <SelectItem key={title} value={title}>
                              {title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Phone</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="(225) 555-0118"
                          {...field}
                          className="border-0 border-b border-muted focus-visible:ring-0 rounded-none px-0 bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">LinkedIn URL</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="LinkedIn URL"
                          {...field}
                          className="border-0 border-b border-muted focus-visible:ring-0 rounded-none px-0 bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Funding Deployed</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="fundingDeployed"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Funding Deployed"
                          {...field}
                          className="border-0 border-b border-muted focus-visible:ring-0 rounded-none px-0 bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Industries</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelect
                          options={industryOptions as { label: string; value: string }[]}
                          placeholder="Select industries"
                          defaultValue={field.value}
                          onValueChange={(selected: string[]) => field.onChange(selected)}
                          variant="default"
                          className="border-0 border-b border-muted rounded-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Groups</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="groups"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelect
                          options={groupsOptions as { label: string; value: string }[]}
                          placeholder="Select groups"
                          defaultValue={field.value}
                          onValueChange={(selected: string[]) => field.onChange(selected)}
                          variant="default"
                          className="border-0 border-b border-muted rounded-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Funding Stages</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="fundingStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelect
                          options={InvestmentStageList.map((item) => ({
                            label: item,
                            value: item
                          }))}
                          placeholder="Select funding stages"
                          defaultValue={Array.isArray(field.value) ? field.value : []}
                          onValueChange={(selected: string[]) => field.onChange(selected)}
                          variant="default"
                          maxCount={6}
                          className="border-0 border-b border-muted rounded-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Preferred Locations</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="preferredLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelect
                          options={locationOptions as { label: string; value: string }[]}
                          placeholder="Select locations"
                          defaultValue={field.value}
                          onValueChange={(selected: string[]) => field.onChange(selected)}
                          variant="default"
                          maxCount={6}
                          className="border-0 border-b border-muted rounded-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-1/4 text-sm text-muted-foreground pt-2">Bio</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Bio"
                          className="resize-none min-h-[100px] border-0 border-b border-muted focus-visible:ring-0 rounded-none bg-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>

          {/* Intros Tab */}
          <TabsContent value="intros">
            <IntroTable introsMade={introsMade} introsReceived={introsReceived} />
          </TabsContent>

          {/* Credit Usage Tab */}
          <TabsContent value="credit-usage">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Credit Usage History</h3>
                <div className="bg-primary/10 px-4 py-2 rounded-md">
                  <span className="text-sm font-medium">Current Balance: </span>
                  <span className="text-lg font-bold">
                    {form.watch('creditsUsed') || 0} credits
                  </span>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/20">
                    <tr>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditHistory.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-transparent' : 'bg-muted/10'}
                      >
                        <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="p-4">{item.amount} credits</td>
                        <td className="p-4">{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary">
            {isEditing ? 'Save Profile' : 'Add Profile'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
