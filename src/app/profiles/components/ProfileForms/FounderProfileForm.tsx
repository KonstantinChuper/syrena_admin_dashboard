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
  FounderEbitdaOptions,
  FounderCloseRound,
  FundraisingStage,
  TaxReliefOptions,
  CustomerGroupsList,
  ProductStageList
} from '@/app/profiles/constants/profile-data'
import { ProfileFormValues, profileSchema } from '@/app/profiles/schemas/profile-schema'

interface FounderProfileFormProps {
  defaultValues?: Partial<ProfileFormValues>
  onSubmit: (values: ProfileFormValues) => void
  onCancel: () => void
  isEditing?: boolean
}

export function FounderProfileForm({
  defaultValues,
  onSubmit,
  onCancel,
  isEditing = false
}: FounderProfileFormProps) {
  const isCustomType = defaultValues?.type && !FounderTypeList.includes(defaultValues.type)
  const [showCustomType, setShowCustomType] = useState(
    isCustomType || defaultValues?.type === 'Other (please specify)'
  )
  const [customType, setCustomType] = useState(isCustomType ? defaultValues?.type || '' : '')
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: defaultValues?.firstName || '',
      lastName: defaultValues?.lastName || '',
      type: isCustomType ? 'Other (please specify)' : defaultValues?.type || '',
      industry: defaultValues?.industry || [],
      fundingStage: defaultValues?.fundingStage || '',
      groups: defaultValues?.groups || [],
      preferredLocation: defaultValues?.preferredLocation || [],
      jobTitle: defaultValues?.jobTitle || '',
      mobileNumber: defaultValues?.mobileNumber || '',
      linkedinUrl: defaultValues?.linkedinUrl || '',
      fundingDeployed: defaultValues?.fundingDeployed || '',
      bio: defaultValues?.bio || '',
      revenue: defaultValues?.revenue || '',
      ebitda: defaultValues?.ebitda || '',
      closingTimeframe: defaultValues?.closingTimeframe || '',
      fundraisingStage: defaultValues?.fundraisingStage || '',
      taxRelief: defaultValues?.taxRelief || [],
      customerGroups: defaultValues?.customerGroups || [],
      productStage: defaultValues?.productStage || ''
    }
  })

  const industryOptions = IndustriesList.map((item) => ({ label: item, value: item }))
  const groupsOptions = GroupsToConnect.map((item) => ({ label: item, value: item }))
  const locationOptions = PreferredLocationList.map((item) => ({ label: item, value: item }))
  const taxReliefOptions = TaxReliefOptions.map((item) => ({ label: item, value: item }))

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'type') {
        setShowCustomType(value.type === 'Other (please specify)')
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  const handleSubmit = (values: ProfileFormValues) => {
    if (values.type === 'Other (please specify)' && customType) {
      values.type = customType
    }
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 overflow-y-auto scrollbar-hide"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
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
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Groups</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={groupsOptions as { label: string; value: string }[]}
                    placeholder="Select groups"
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
            name="ebitda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>EBITDA Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select EBITDA status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FounderEbitdaOptions.map((option) => (
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
            name="closingTimeframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Closing Timeframe</FormLabel>
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

          <FormField
            control={form.control}
            name="fundraisingStage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fundraising Stage</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fundraising stage" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FundraisingStage.map((option) => (
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
          />

          <FormField
            control={form.control}
            name="customerGroups"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Customer Groups</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={CustomerGroupsList.map((item) => ({ label: item, value: item }))}
                    placeholder="Select customer groups"
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
