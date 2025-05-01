import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination'

interface PaginationControlProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function PaginationControl({
  currentPage,
  totalPages,
  onPageChange,
  className
}: PaginationControlProps) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    pages.push(1)

    if (totalPages <= maxVisiblePages) {
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const leftSiblingIndex = Math.max(2, currentPage - 1)
      const rightSiblingIndex = Math.min(totalPages - 1, currentPage + 1)

      const showLeftDots = leftSiblingIndex > 2
      const showRightDots = rightSiblingIndex < totalPages - 1

      if (showLeftDots && !showRightDots) {
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else if (!showLeftDots && showRightDots) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i)
        }
      } else if (showLeftDots && showRightDots) {
        pages.push(-1)
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i)
        }
        pages.push(-2)
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, idx) => {
          if (pageNumber === -1) {
            return (
              <PaginationItem key={`ellipsis-left-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }
          if (pageNumber === -2) {
            return (
              <PaginationItem key={`ellipsis-right-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={pageNumber === currentPage}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
