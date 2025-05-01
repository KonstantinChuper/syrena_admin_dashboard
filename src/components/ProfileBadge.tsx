import { Dot } from 'lucide-react'

interface ProfileBadgeProps {
  className?: string
  children: React.ReactNode
  isDot?: boolean
  variant?: 'green' | 'orange' | 'destructive' | 'pending'
}

export function ProfileBadge({
  children,
  className = '',
  isDot = false,
  variant = 'green'
}: ProfileBadgeProps) {
  const variantStyles = {
    green: {
      bg: 'bg-[#001A00]',
      text: 'text-[#008000]',
      border: 'border-[#FFFFFF26]'
    },
    orange: {
      bg: 'bg-[#662600]',
      text: 'text-primary',
      border: 'border-[#FFFFFF1A]'
    },
    destructive: {
      bg: 'bg-[#330000]',
      text: 'text-primary',
      border: 'border-[#FFFFFF26]'
    },
    pending: {
      bg: 'bg-[#330000]',
      text: 'text-primary',
      border: 'border-[#FFFFFF26]'
    }
  }

  const { bg, text, border } = variantStyles[variant]

  return (
    <div
      className={`${bg} ${text} ${border} ${
        isDot ? 'pl-0' : 'pl-3'
      } pr-3 py-0.5 rounded-xl flex items-center border w-fit ${className}`}
    >
      {isDot && <Dot className="h-6 w-6" />}
      <span>{children}</span>
    </div>
  )
}
