export type GetStockHistory = {
  id: number,
  movement: 'IN' | 'OUT',
  sellValue: number,
  sellDate: string,
  sellQuantity: number,
  totalValue: number,
  productCode: string
}