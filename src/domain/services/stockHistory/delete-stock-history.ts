import { api } from '../../../utils/api/axios';

export class DeleteStockHistory {
  public static instance = new DeleteStockHistory()

  async perform(id: number) {
    await api.delete(`/stock-histories/${id}`)
  }
}