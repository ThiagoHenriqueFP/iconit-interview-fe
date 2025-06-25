import { api } from '../../../utils/api/axios';
import type { GetStockHistory } from '../../entities/stockHistory/get-stock-history';
import type { PostStockHistory } from '../../entities/stockHistory/post-stock-history';

export class UpdateStockHistory {
  public static instance = new UpdateStockHistory()

  async perform(id: number, stock: PostStockHistory) {
    const response = await api.put<GetStockHistory>(`/stock-histories/${id}`, stock)
    return response.data
  }
}