'use client'

import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'
import { useRouter } from 'next/navigation'
import * as React from 'react'

type SheetProps = SheetPrimitive.Root.Props & {
  onDismiss?: () => void
}

export function IntercepetedSheet({ ...props }: SheetProps) {
  const router = useRouter()

  function onDismiss() {
    router.back()
  }

  return (
    <SheetPrimitive.Root
      data-slot="sheet"
      {...props}
      onOpenChange={(open, eventDetails) => {
        if (!open) {
          onDismiss?.()
        }

        props.onOpenChange?.(open, eventDetails)
      }}
    />
  )
}
