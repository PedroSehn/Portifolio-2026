interface ProgressBarProps {
  value: number
  animated?: boolean
}

export default function ProgressBar({ value, animated = false }: ProgressBarProps) {
  return (
    <div
      className="bg-white shadow-sunken h-[14px] overflow-hidden"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <span
        className="block h-full bg-progress transition-[width] duration-[1300ms]"
        style={{ width: animated ? `${value}%` : '0%' }}
      />
    </div>
  )
}
