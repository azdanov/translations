import { useEffect } from 'react'

export const useTitle = (title: string): void => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export default useTitle
