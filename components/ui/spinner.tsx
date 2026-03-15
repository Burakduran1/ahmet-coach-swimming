import { Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  // undefined SVG props (size/width/height) DOM hatasi uretmesin diye filtrele
  const safeProps = Object.fromEntries(
    Object.entries(props).filter(([, v]) => v !== undefined)
  ) as React.ComponentProps<typeof Loader2Icon>
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...safeProps}
    />
  )
}

export { Spinner }
