'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

// Обновленный подход к типизации с использованием React.ComponentRef вместо ElementRef
const IntroTabs = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={cn('flex flex-col', className)} {...props} />
))
IntroTabs.displayName = 'IntroTabs'

const IntroTabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('flex w-full justify-center mb-6 bg-input p-1 rounded-lg gap-2', className)}
    {...props}
  />
))
IntroTabsList.displayName = 'IntroTabsList'

const IntroTabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex-1 px-3 py-2.5 text-sm font-medium rounded-md text-center',
      'border border-input bg-background hover:bg-accent/50 transition-colors',
      'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-none bg-input text-foreground-transparent',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer',
      className
    )}
    {...props}
  />
))
IntroTabsTrigger.displayName = 'IntroTabsTrigger'

const IntroTabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn('mt-2 outline-none', className)} {...props} />
))
IntroTabsContent.displayName = 'IntroTabsContent'

export { IntroTabs, IntroTabsList, IntroTabsTrigger, IntroTabsContent }
