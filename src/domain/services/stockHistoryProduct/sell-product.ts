import { api } from '../../../utils/api/axios'
import type { SellProduct } from '../../entities/stockHistoryProduct/sell-product'

export class SellProductService {
  public static instance = new SellProductService()

 async perform(code: string, sellAmount: number, sellValue: number) {
     const data: SellProduct = {
       code,
       sellAmount,
       sellValue
     }
     await api.post('/stock-history/products/sell', data)
   }
}