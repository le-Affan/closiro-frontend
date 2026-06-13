import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-200",
  {
    variants: {
      variant: {
        default:
          "bg-primary-900 text-primary-50 border-none",
        secondary:
          "bg-secondary-500 text-secondary-900 border-none",
        destructive:
          "bg-error-500 text-error-50 border-none",
        warning: 
          "bg-white text-[#B5672A] border-[#B5672A] font-medium px-3",
        success:
          "bg-white text-[#298E2E] border-[#298E2E] font-medium px-3",
        inquiry:
          "bg-white text-[#B5672A] border-[#B5672A] font-medium px-3",
        outline: "text-neutral-900 border-neutral-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

function Chip({ className, variant, ...props }: ChipProps) {
  return (
    <div className={cn(chipVariants({ variant }), className)} {...props} />
  )
}

export { Chip, chipVariants }
