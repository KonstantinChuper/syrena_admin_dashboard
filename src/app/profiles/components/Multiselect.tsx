'use client'

import * as React from 'react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { cva, type VariantProps } from 'class-variance-authority'

const multiSelectVariants = cva('m-0.5 text-xs py-0.5 px-2', {
  variants: {
    variant: {
      default: 'bg-neutral-800 text-foreground hover:bg-neutral-700',
      secondary: 'bg-neutral-800 text-secondary-foreground hover:bg-neutral-700',
      destructive: 'bg-neutral-800 text-destructive-foreground hover:bg-neutral-700'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

interface MultiSelectProps extends VariantProps<typeof multiSelectVariants> {
  options: Option[]
  onValueChange: (value: string[]) => void
  defaultValue?: string[]
  placeholder?: string
  animation?: number
  maxCount?: number
  className?: string
}

export const MultiSelect = ({
  options,
  onValueChange,
  variant,
  defaultValue = [],
  placeholder = 'Select options',
  animation = 0,
  maxCount = 1,
  className
}: MultiSelectProps) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue)
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleOption = (val: string) => {
    const newValues = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val]
    setSelectedValues(newValues)
    onValueChange(newValues)
  }

  const handleClear = () => {
    setSelectedValues([])
    onValueChange([])
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'border-input flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none h-auto min-h-9 text-left',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            className
          )}
        >
          <div className="flex-1 truncate">
            {selectedValues.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1 max-h-20 overflow-y-auto scrollbar-hide">
                {selectedValues.slice(0, maxCount).map((val) => {
                  const option = options.find((o) => o.value === val)
                  return (
                    <Badge
                      key={val}
                      className={cn(multiSelectVariants({ variant }), 'flex items-center')}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {option?.label}
                    </Badge>
                  )
                })}
                {selectedValues.length > maxCount && (
                  <Badge className="opacity-75 text-xs">+{selectedValues.length - maxCount}</Badge>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronDownIcon className="size-4 opacity-50 flex-shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-0 bg-neutral-900 border rounded-md shadow-md"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandList className="max-h-60">
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup>
              {selectedValues.length > 0 && (
                <CommandItem onSelect={handleClear} className="text-destructive">
                  Clear all ({selectedValues.length})
                </CommandItem>
              )}
              {options.map((opt) => {
                const selected = selectedValues.includes(opt.value)
                return (
                  <CommandItem
                    key={opt.value}
                    onSelect={() => toggleOption(opt.value)}
                    className="relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none"
                  >
                    <span className="absolute right-2 flex size-3.5 items-center justify-center">
                      {selected && <CheckIcon className="size-4" />}
                    </span>
                    <span>{opt.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
