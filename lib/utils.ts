import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format number as Moroccan Dirham (DHS) using Western (Latin) digits.
// By default we show no decimal fraction; adjust fractionDigits if needed.
export function formatDhs(value: number, options?: { fractionDigits?: number }) {
  const fractionDigits = options?.fractionDigits ?? 0
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value) + ' DHS'
}
