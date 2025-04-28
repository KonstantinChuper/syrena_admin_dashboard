'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { MultiSelect } from '../Multiselect'
import {
  IndustriesList,
  FounderTypeList,
  FounderStageList,
  PreferredLocationList,
  GroupsToConnect,
  FounderRevenueOptions,
  ProfitabilityList,
  FounderCloseRound,
  CurrentFundingStage,
  TaxReliefOptions,
  CustomerGroupsList,
  ProductStageList,
  ChequesAcceptedList,
  InvestorGroup
} from '@/app/profiles/constants/profile-data'
import { FounderFormValues, founderSchema } from '@/app/profiles/schemas/founder-schema'

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
    resolver: zodResolver(founderSchema),
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
      imageUrl: defaultValues?.imageUrl || 'IMAGE-HERE',
      pitchDeckUrl: defaultValues?.pitchDeckUrl || 'PITCH-DECK-HERE',
      closeDate: defaultValues?.closeDate || '',
      customerGroups: defaultValues?.customerGroups || []
      // taxRelief: defaultValues?.taxRelief || [],
      // productStage: defaultValues?.productStage || ''
    }
  })

  const industryOptions = IndustriesList.map((item) => ({ label: item, value: item }))
  const customerGroupsOptions = CustomerGroupsList.map((item) => ({ label: item, value: item }))
  const locationOptions = PreferredLocationList.map((item) => ({ label: item, value: item }))
  // const taxReliefOptions = TaxReliefOptions.map((item) => ({ label: item, value: item }))
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
    console.log('FounderForm handleSubmit called with data:', values)
    console.log('Form validation state:', form.formState)
    if (values.jobTitle === 'Other (please specify)' && customType) {
      values.jobTitle = customType
    }
    onSubmit(values)
  }

  const { errors } = form.formState
  console.log('Form errors:', errors)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 overflow-y-auto scrollbar-hide"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="IMAGE URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pitchDeckUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pitchdeck</FormLabel>
                <FormControl>
                  <Input placeholder="PITCHDECK" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourcompany.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fundingRaised"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding Raised</FormLabel>
                <FormControl>
                  <Input placeholder="Enter amount raised" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fundingRequired"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding Required</FormLabel>
                <FormControl>
                  <Input placeholder="Enter amount required" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setShowCustomType(value === 'Other (please specify)')
                    if (value !== 'Other (please specify)') {
                      setCustomType('')
                    }
                  }}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
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
          {showCustomType && (
            <FormItem>
              <FormLabel>Specify Your Role</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your specific role"
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}

          <FormField
            control={form.control}
            name="fundingStage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding Stage</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={industryOptions as { label: string; value: string }[]}
                    placeholder="Select industries"
                    defaultValue={field.value}
                    onValueChange={(selected: string[]) => field.onChange(selected)}
                    variant="default"
                    maxCount={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="groups"
            render={({ field }) => {
              console.log('Field value for groups:', field.value)
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Groups to connect</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={InvestorGroupOptions}
                      placeholder="Select groups to connect"
                      defaultValue={field.value}
                      onValueChange={(selected: string[]) => {
                        console.log('Selected groups:', selected)
                        field.onChange(selected)
                      }}
                      variant="default"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="preferredLocation"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Preferred Location</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={locationOptions as { label: string; value: string }[]}
                    placeholder="Select locations"
                    defaultValue={field.value}
                    onValueChange={(selected: string[]) => field.onChange(selected)}
                    variant="default"
                    maxCount={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="revenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Revenue</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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

          <FormField
            control={form.control}
            name="profitability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profitability Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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

          <FormField
            control={form.control}
            name="closeDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Closing Date</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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

          {/* <FormField
            control={form.control}
            name="currentFundingStage"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Current Funding Stage</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={CurrentFundingStage.map((item) => ({ label: item, value: item }))}
                    placeholder="Select funding stages"
                    defaultValue={Array.isArray(field.value) ? field.value : []}
                    onValueChange={(selected: string[]) => field.onChange(selected)}
                    variant="default"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="currentFundingStage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Funding Stage</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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

          {/* <FormField
            control={form.control}
            name="taxRelief"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tax Relief</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={taxReliefOptions as { label: string; value: string }[]}
                    placeholder="Select tax relief options"
                    defaultValue={field.value}
                    onValueChange={(selected: string[]) => field.onChange(selected)}
                    variant="default"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="customerGroups"
            render={({ field }) => {
              console.log('Field value for customerGroups:', field.value)
              console.log('customerGroupsOptions:', customerGroupsOptions)

              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Customer Groups</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={customerGroupsOptions}
                      placeholder="Select customer groups"
                      defaultValue={field.value}
                      onValueChange={(selected: string[]) => {
                        console.log('Selected customer groups:', selected)
                        field.onChange(selected)
                      }}
                      variant="default"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          {/* <FormField
            control={form.control}
            name="productStage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Stage</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product stage" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ProductStageList.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="chequesAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Cheques Accepted</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={chequesAcceptedOptions}
                    placeholder="Select acceptable cheque sizes"
                    defaultValue={field.value}
                    onValueChange={(selected: string[]) => field.onChange(selected)}
                    variant="default"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yoyg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year-over-Year Growth</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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

          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="+44 123 456 7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about this person..."
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#FF5F00]">
            {isEditing ? 'Save Profile' : 'Add Profile'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
