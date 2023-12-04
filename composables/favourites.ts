import { ProductData } from 'types'
export interface Favourite {
  product: ProductData
  route: string
}

export function useFavourites() {
  const favourites = useState<Favourite[]>('favourites', () => [])

  /**
   * Adds a product to the list of favourite products
   * @param product
   * @param route
   */
  function addFavourite(product: ProductData, route: string) {
    const newFav = { product, route }
    favourites.value.push(newFav)
  }
  /**
   * Removes the product from the list of favourite products
   * @param name
   */
  function removeFavourite(name?: string) {
    if (name) {
      favourites.value = favourites.value.filter(
        (item: Favourite) => item.product.tt_name !== name
      )
    }
  }
  return {
    addFavourite,
    removeFavourite,
    favourites
  }
}
