import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  id: string
}

export default function Textarea({ label, className = '', id, ...props }: TextareaProps) {
  return (
    <label htmlFor={id} className="text-[10px] text-win-darker flex flex-col gap-1">
      {label}
      <textarea
        id={id}
        className={`w-full bg-white shadow-sunken border border-transparent px-2 py-1 text-[11px] focus:outline focus:outline-1 focus:outline-black ${className}`}
        {...props}
      />
    </label>
  )
}
