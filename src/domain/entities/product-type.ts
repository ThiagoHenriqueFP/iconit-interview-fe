export type ProductType = 'all' | 'electronic' | 'house_appliance' | 'furniture'
export const ProductTypeValue: Record<ProductType, number> = {
  all: -1,
  electronic: 0,
  house_appliance: 1,
  furniture :2
}