import { ProductData } from 'types'
export interface Favourite {
  product: ProductData
  route: string
}

export function useFavourites() {
  function addFavourite(
    favourites: Favourite[],
    product?: ProductData,
    route?: string
  ) {
    if (product && route) {
      const newFav = { product, route }
      const newState = favourites.concat(newFav)
      return newState
    }
    return favourites
  }
  function removeFavourite(favourites: Favourite[], name?: string) {
    if (name) {
      favourites = favourites.filter(
        (item: Favourite) => item.product.tt_name !== name
      )
    }
    return favourites
  }
  return {
    addFavourite,
    removeFavourite
  }
}
