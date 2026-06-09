import { useMemo } from 'react'
import { products as hardcodedProducts } from '../data/products'

const useProducts = () => {
  return useMemo(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem('woodmart-products') || '[]'
      )
      const deleted = JSON.parse(
        localStorage.getItem('woodmart-deleted-products') || '[]'
      )
      const validSaved = Array.isArray(saved) ? saved : []
      const validDeleted = Array.isArray(deleted) ? deleted : []

      const filteredHardcoded = hardcodedProducts.filter(
        p => !validDeleted.includes(p.id)
      )

      return [...validSaved, ...filteredHardcoded]
    } catch (error) {
      console.error('useProducts error:', error)
      return hardcodedProducts || []
    }
  }, [])
}

export default useProducts
