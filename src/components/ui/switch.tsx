'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const [checked, setChecked] = React.useState(props.checked || props.defaultChecked || false)

  React.useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked)
    }
  }, [props.checked])

  const handleCheckedChange = (isChecked: boolean) => {
    setChecked(isChecked)
    props.onCheckedChange?.(isChecked)
  }

  return (
    <div className="">
      <SwitchPrimitive.Root
        data-slot="switch"
        className={cn(
          'peer data-[state=checked]:bg-[#FF5F00] data-[state=unchecked]:bg-[#444343] focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.47rem] w-[3.44rem] shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer relative',
          className
        )}
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        onCheckedChange={handleCheckedChange}
        disabled={props.disabled}
      >
        {!checked && (
          <Minus
            className="absolute text-[#4d4b4b] left-[-0.05rem] z-10 transition-all duration-500 ease-in-out"
            size={24}
          />
        )}
        {checked && (
          <Plus
            className="absolute text-[#FF5F00] right-[0rem] z-10 transition-all duration-500 ease-in-out"
            size={24}
          />
        )}

        {!checked && (
          <span className="absolute text-[7.2px] text-[#FAFAFA] left-[1.7rem] z-10 font-semibold">
            OFF
          </span>
        )}
        {checked && (
          <span className="absolute text-[7.2px] text-[#FAFAFA] right-[1.7rem] z-10 font-semibold">
            ON
          </span>
        )}

        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={cn(
            'bg-white pointer-events-none block size-4 h-[1.35rem] w-[1.35rem] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[31px] data-[state=unchecked]:translate-x-[1px]'
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  )
}

export { Switch }
