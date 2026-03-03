import { useEffect, useRef, useState } from 'react'

export function useProgressBar() {
  const ref = useRef<HTMLLIElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return { ref, animated }
}
