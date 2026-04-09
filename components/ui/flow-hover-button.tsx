import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  icon?: React.ReactNode
  children?: React.ReactNode
  variant?: 'primary' | 'outline-white' | 'outline-dark' | 'cta'
  href?: string
  full?: boolean
  lg?: boolean
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Props> = ({ icon, children, variant = 'primary', href, full, lg, ...props }) => {
  const base = cn(
    'relative cursor-pointer z-0 flex items-center justify-center gap-2 overflow-hidden rounded-[6px]',
    'border-2 font-semibold transition-all duration-300',
    'before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]',
    'before:rounded-[100%] before:transition-transform before:duration-700 before:content-[""]',
    'hover:scale-[1.02] hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-[0.98]',
    lg ? 'px-10 py-4 text-base' : 'px-[30px] py-[13px] text-[15px]',
    full && 'w-full',
    variant === 'primary' && 'bg-[var(--red)] border-[var(--red)] text-white before:bg-[var(--red-dark)] hover:bg-[var(--red-dark)] hover:border-[var(--red-dark)]',
    variant === 'outline-white' && 'bg-transparent border-white/50 text-white before:bg-white hover:text-[var(--dark)] hover:border-white',
    variant === 'outline-dark' && 'bg-transparent border-[var(--dark)] text-[var(--dark)] before:bg-[var(--dark)] hover:text-white',
    variant === 'cta' && 'bg-white border-white text-[var(--red)] before:bg-[var(--dark)] hover:text-white hover:border-[var(--dark)]',
    props.className
  )

  if (href) {
    return (
      <a href={href} className={base}>
        {icon && icon}
        <span>{children}</span>
      </a>
    )
  }

  return (
    <button className={base} {...props}>
      {icon && icon}
      <span>{children}</span>
    </button>
  )
}
