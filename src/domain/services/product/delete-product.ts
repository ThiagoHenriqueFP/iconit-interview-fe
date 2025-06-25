import { api } from '../../../utils/api/axios';

export class DeleteProductService {
  public static instance = new DeleteProductService();

  async perform(code: string) {
    await api.delete(`/products/${code}`)
  }
}