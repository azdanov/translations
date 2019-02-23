import { useEffect } from 'react'

export const useModal = (): void => {
  useEffect(() => {
    const body = document.querySelector('body')
    const modal = document.querySelector('#modal')
    // @ts-ignore
    body.style.cssText = 'overflow: hidden;'
    // @ts-ignore
    modal.style.cssText = 'z-index: 100;'

    return () => {
      // @ts-ignore
      body.style.cssText = 'overflow: initial;'
      // @ts-ignore
      modal.style.cssText = 'z-index: -1;'
    }
  }, [])
}
