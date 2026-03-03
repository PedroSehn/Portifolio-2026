import type { PropsWithChildren } from 'react'

export default function Desktop({ children }: PropsWithChildren<{}>) {
  return (
    <main className="min-h-screen pb-[30px] bg-win-teal font-win px-[24px] pt-[20px] pr-[24px] pb-[30px] pl-[100px] flex flex-col gap-5">
      {children}
    </main>
  )
}
