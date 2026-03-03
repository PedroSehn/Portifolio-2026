import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}

export default function Input({ label, className = '', id, ...props }: InputProps) {
  return (
    <label htmlFor={id} className="text-[10px] text-win-darker flex flex-col gap-1">
      {label}
      <input
        id={id}
        className={`w-full bg-white shadow-sunken border border-transparent px-2 py-1 text-[11px] focus:outline focus:outline-1 focus:outline-black ${className}`}
        {...props}
      />
    </label>
  )
}
