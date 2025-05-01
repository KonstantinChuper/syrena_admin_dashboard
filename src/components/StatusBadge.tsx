'use client'

import { ProfileBadge } from '@/components/ProfileBadge'

interface StatusBadgeProps {
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Expired'
  timestamp: string
  className?: string
}

export function StatusBadge({ status, timestamp, className }: StatusBadgeProps) {
  // Функция для расчета оставшегося времени (24 часа с момента создания)
  const getRemainingTime = (timestamp: string): string => {
    const introDate = new Date(timestamp)
    const expiryDate = new Date(introDate)
    expiryDate.setHours(expiryDate.getHours() + 24)

    const now = new Date()

    if (now > expiryDate) {
      return 'Expired'
    }
    const diff = expiryDate.getTime() - now.getTime()
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
    if (hoursLeft < 1) {
      const minutesLeft = Math.floor(diff / (1000 * 60))
      return `${minutesLeft}m left`
    }

    return `${hoursLeft}h left`
  }

  const getVariant = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'green'
      case 'Rejected':
      case 'Expired':
        return 'destructive'
      case 'Pending':
      default:
        return 'pending'
    }
  }

  const showDot = status !== 'Pending'
  const statusText = status === 'Pending' ? `Pending | ${getRemainingTime(timestamp)}` : status

  return (
    <ProfileBadge isDot={showDot} variant={getVariant(status)} className={className}>
      {statusText}
    </ProfileBadge>
  )
}
