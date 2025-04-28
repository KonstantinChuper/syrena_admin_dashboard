'use client'

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
  InvestorTypeList,
  InvestmentStageList,
  PreferredLocationList,
  InvestorGroup,
  InvestorJobTitleList
} from '@/app/profiles/constants/profile-data'
import { InvestorFormValues, investorSchema } from '@/app/profiles/schemas/investor-schema'

interface InvestorProfileFormProps {
  defaultValues?: Partial<InvestorFormValues>
  onSubmit: (values: InvestorFormValues) => void
  onCancel: () => void
  isEditing?: boolean
}

export function InvestorProfileForm({ defaultValues, onSubmit, onCancel, isEditing }: InvestorProfileFormProps) {
  const form = useForm<InvestorFormValues>({
    resolver: zodResolver(investorSchema),
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
      bio: defaultValues?.bio || ''
    }
  })

  const industryOptions = IndustriesList.map((item) => ({ label: item, value: item }))
  const groupsOptions = InvestorGroup.map((item) => ({ label: item, value: item }))
  const locationOptions = PreferredLocationList.map((item) => ({ label: item, value: item }))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
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

          <FormField
            control={form.control}
            name="fundingStage"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Funding Stage</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={InvestmentStageList.map((item) => ({ label: item, value: item }))}
                    placeholder="Select funding stages"
                    defaultValue={Array.isArray(field.value) ? field.value : []}
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
                    maxCount={2}
                  />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
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

          <FormField
            control={form.control}
            name="fundingDeployed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding Deployed</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. $1M-$5M" {...field} />
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
