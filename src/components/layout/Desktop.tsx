import type { PropsWithChildren } from 'react'

export default function Desktop({ children }: PropsWithChildren<{}>) {
  return (
    <main className="min-h-screen bg-win-teal font-win px-[24px] pt-[20px] pr-[24px] pb-[50px] pl-[24px] md:pl-[100px] flex flex-col gap-5">
      <div className="w-full md:max-w-[1200px] md:mx-auto flex flex-col gap-5 h-full">
        {children}
      </div>
    </main>
  )
}
