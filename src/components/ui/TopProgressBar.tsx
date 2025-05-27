"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import NProgress from "nprogress"

NProgress.configure({ showSpinner: false })

const TopProgressBar = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  useEffect(() => {
    const handleAnchorClick = (event: Event) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href
      const currentUrl = location.href
      if (targetUrl !== currentUrl) {
        NProgress.start()
      }
    }

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a[href]")
      anchorElements.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick))
    }

    const mutationObserver = new MutationObserver(handleMutation)
    mutationObserver.observe(document, { childList: true, subtree: true })

    return () => mutationObserver.disconnect()
  }, [])

  return null
}

export default TopProgressBar
