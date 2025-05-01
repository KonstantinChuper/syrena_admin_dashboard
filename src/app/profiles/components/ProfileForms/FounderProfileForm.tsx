'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
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
  FounderTypeList,
  FounderStageList,
  PreferredLocationList,
  FounderRevenueOptions,
  ProfitabilityList,
  FounderCloseRound,
  CurrentFundingStage,
  CustomerGroupsList,
  ChequesAcceptedList,
  InvestorGroup
} from '@/app/profiles/constants/profile-data'
import { FounderFormValues, founderSchema } from '@/app/profiles/schemas/founder-schema'
import { IntroTable } from './IntroTable'

interface FounderProfileFormProps {
  defaultValues?: FounderFormValues
  onSubmit: (values: FounderFormValues) => void
  onCancel: () => void
  isEditing?: boolean
}

export function FounderProfileForm({
  defaultValues,
  onSubmit,
  onCancel,
  isEditing = false
}: FounderProfileFormProps) {
  const isCustomType = defaultValues?.jobTitle && !FounderTypeList.includes(defaultValues.jobTitle)
  const [showCustomType, setShowCustomType] = useState(
    isCustomType || defaultValues?.jobTitle === 'Other (please specify)'
  )
  const [customType, setCustomType] = useState(isCustomType ? defaultValues?.jobTitle || '' : '')
  
  const form = useForm<FounderFormValues>({
    resolver: zodResolver(founderSchema) as any,
    defaultValues: {
      firstName: defaultValues?.firstName || '',
      lastName: defaultValues?.lastName || '',
      industry: defaultValues?.industry || [],
      preferredLocation: defaultValues?.preferredLocation || [],
      groups: defaultValues?.groups || [],
      mobileNumber: defaultValues?.mobileNumber || '',
      linkedinUrl: defaultValues?.linkedinUrl || '',
      jobTitle: isCustomType ? 'Other (please specify)' : defaultValues?.jobTitle || '',
      companyName: defaultValues?.companyName || '',
      websiteUrl: defaultValues?.websiteUrl || '',
      fundingRaised: defaultValues?.fundingRaised || '',
      fundingRequired: defaultValues?.fundingRequired || '',
      fundingStage: defaultValues?.fundingStage || '',
      chequesAccepted: defaultValues?.chequesAccepted || [],
      currentFundingStage: defaultValues?.currentFundingStage || '',
      revenue: defaultValues?.revenue || '',
      yoyg: defaultValues?.yoyg || '',
      profitability: defaultValues?.profitability || '',
      bio: defaultValues?.bio || '',
      imageUrl: defaultValues?.imageUrl || '',
      pitchDeckUrl: defaultValues?.pitchDeckUrl || '',
      closeDate: defaultValues?.closeDate || '',
      customerGroups: defaultValues?.customerGroups || [],
      isVisible: defaultValues?.isVisible ?? true,
      creditsUsed: defaultValues?.creditsUsed || 0,
      introsMade: defaultValues?.introsMade || [],
      introsReceived: defaultValues?.introsReceived || []
    }
  })

  const industryOptions = IndustriesList.map((item) => ({ label: item, value: item }))
  const customerGroupsOptions = CustomerGroupsList.map((item) => ({ label: item, value: item }))
  const locationOptions = PreferredLocationList.map((item) => ({ label: item, value: item }))
  const chequesAcceptedOptions = ChequesAcceptedList.map((item) => ({ label: item, value: item }))
  const InvestorGroupOptions = InvestorGroup.map((item) => ({ label: item, value: item }))

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'jobTitle') {
        setShowCustomType(value.jobTitle === 'Other (please specify)')
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  const handleSubmit = (values: FounderFormValues) => {
    if (values.jobTitle === 'Other (please specify)' && customType) {
      values.jobTitle = customType
    }
    onSubmit(values)
  }

  const fullName = `${form.watch('firstName') || 'New'} ${form.watch('lastName') || 'Founder'}`
  const companyName = form.watch('companyName') || 'No company'

  const introsMade = defaultValues?.introsMade || [];
  const introsReceived = defaultValues?.introsReceived || [];
  const creditHistory = [
    { date: '2025-01-15', amount: 10, reason: 'Profile creation' },
    { date: '2025-02-20', amount: 5, reason: 'Intro to investor' },
    { date: '2025-04-05', amount: 15, reason: 'Monthly subscription' }
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
              <p className="text-muted-foreground">{companyName}</p>
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

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Company Name</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Company Name"
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
              <div className="w-1/4 text-sm text-muted-foreground">Website URL</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="https://yourcompany.com"
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

            {/* Pitch Deck URL */}
            {/* <div className="flex items-center">
            <div className="w-1/4 text-sm text-muted-foreground">Pitch Deck URL</div>
            <div className="w-3/4">
              <FormField
                control={form.control}
                name="pitchDeckUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="URL to pitch deck"
                        {...field}
                        className="border-0 border-b border-muted focus-visible:ring-0 rounded-none px-0 bg-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div> */}

            <div className="flex items-center">
              <div className="w-1/4 text-sm text-muted-foreground">Job Title</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          setShowCustomType(value === 'Other (please specify)')
                          if (value !== 'Other (please specify)') {
                            setCustomType('')
                          }
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 border-b border-muted focus:ring-0 rounded-none px-0 bg-transparent">
                            <SelectValue placeholder="Select job title" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FounderTypeList.map((type) => (
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

            {showCustomType && (
              <div className="flex items-center">
                <div className="w-1/4 text-sm text-muted-foreground">Specify Role</div>
                <div className="w-3/4">
                  <Input
                    placeholder="Enter your specific role"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    className="border-0 border-b border-muted focus-visible:ring-0 rounded-none px-0 bg-transparent"
                  />
                </div>
              </div>
            )}

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
                          placeholder="+44 123 456 7890"
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
                          placeholder="https://linkedin.com/username"
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
              <div className="w-1/4 text-sm text-muted-foreground">Funding Raised</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="fundingRaised"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter amount raised"
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
              <div className="w-1/4 text-sm text-muted-foreground">Funding Required</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="fundingRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter amount required"
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
              <div className="w-1/4 text-sm text-muted-foreground">Funding Stage</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="fundingStage"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 border-b border-muted focus:ring-0 rounded-none px-0 bg-transparent">
                            <SelectValue placeholder="Select funding stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FounderStageList.map((stage) => (
                            <SelectItem key={stage} value={stage}>
                              {stage}
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
              <div className="w-1/4 text-sm text-muted-foreground">Current Funding Stage</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="currentFundingStage"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 border-b border-muted focus:ring-0 rounded-none px-0 bg-transparent">
                            <SelectValue placeholder="Select current funding stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CurrentFundingStage.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
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
              <div className="w-1/4 text-sm text-muted-foreground">Revenue</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="revenue"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 border-b border-muted focus:ring-0 rounded-none px-0 bg-transparent">
                            <SelectValue placeholder="Select revenue range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FounderRevenueOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
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
              <div className="w-1/4 text-sm text-muted-foreground">Profitability</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="profitability"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 border-b border-muted focus:ring-0 rounded-none px-0 bg-transparent">
                            <SelectValue placeholder="Select profitability status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ProfitabilityList.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
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
              <div className="w-1/4 text-sm text-muted-foreground">Closing Date</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="closeDate"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 border-b border-muted focus:ring-0 rounded-none px-0 bg-transparent">
                            <SelectValue placeholder="Select closing timeframe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FounderCloseRound.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
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
              <div className="w-1/4 text-sm text-muted-foreground">Year-over-Year Growth</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="yoyg"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 border-b border-muted focus:ring-0 rounded-none px-0 bg-transparent">
                            <SelectValue placeholder="Select YoY Growth" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {['0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%+'].map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
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
              <div className="w-1/4 text-sm text-muted-foreground">Industry</div>
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
              <div className="w-1/4 text-sm text-muted-foreground">Groups to connect</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="groups"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelect
                          options={InvestorGroupOptions}
                          placeholder="Select groups to connect"
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
              <div className="w-1/4 text-sm text-muted-foreground">Preferred Location</div>
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
                          maxCount={3}
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
              <div className="w-1/4 text-sm text-muted-foreground">Customer Groups</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="customerGroups"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelect
                          options={customerGroupsOptions}
                          placeholder="Select customer groups"
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
              <div className="w-1/4 text-sm text-muted-foreground">Cheques Accepted</div>
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="chequesAccepted"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelect
                          options={chequesAcceptedOptions}
                          placeholder="Select acceptable cheque sizes"
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

          <TabsContent value="intros">
            <IntroTable introsMade={introsMade} introsReceived={introsReceived} />
          </TabsContent>

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
