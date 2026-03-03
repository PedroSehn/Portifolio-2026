import type { ReactNode } from 'react'

interface GroupBoxProps {
  legend: string
  children: ReactNode
}

export default function GroupBox({ legend, children }: GroupBoxProps) {
  return (
    <fieldset className="relative border border-win-dark shadow-groupbox pt-4 px-3 pb-3">
      <legend className="bg-win-gray px-1 text-[11px] font-bold">{legend}</legend>
      {children}
    </fieldset>
  )
}
