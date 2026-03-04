import Window from '../ui/Window'

interface GifPreviewWindowProps {
  isActive?: boolean
  onActivate?: () => void
}

export default function GifPreviewWindow({ isActive = true, onActivate }: GifPreviewWindowProps) {
  return (
    <section aria-label="Gif preview">
      <Window
        icon="🖼️"
        title="Gif preview"
        isActive={isActive}
        onActivate={onActivate}
        className="w-[33%] min-w-[220px]"
        contentClassName="h-full px-6 py-5 bg-win95-silver"
      >
        <div className="flex h-full w-full items-center justify-center gifFrame">
          <div
            className="aspect-square h-[220px] w-[220px] max-w-full max-h-full rounded-sm border border-[#808080] bg-white"
            style={{ boxShadow: 'var(--sunken)' }}
          />
        </div>
      </Window>
    </section>
  )
}
