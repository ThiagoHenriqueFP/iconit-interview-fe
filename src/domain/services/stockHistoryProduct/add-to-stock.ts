import { api } from '../../../utils/api/axios'
import type { AddToStock } from '../../entities/stockHistoryProduct/add-to-stock'

export class AddToStockService implements IAddToStockService {
  public static instance = new AddToStockService()

  async perform(code: string, amount: number, supplierPrice?: number) {
    const data: AddToStock = {
      code,
      stockAmount: amount,
      supplierPrice
    }
    await api.post('/stock-history/products', data)
  }
}


interface IAddToStockService {
  perform(code: string, amount: number, supplierPrice?: number): void
}
