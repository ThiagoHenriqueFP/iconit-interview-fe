import { api } from '../../../utils/api/axios';
import type { SaveProduct } from '../../entities/product/post-product';

export class UpdateproductService {
  public static instance = new UpdateproductService();

  async perform(code: string, amount: number, supplierPrice: number, description: string, type: number) {
    const data: SaveProduct = {
      code,
      description,
      stockQuantity: amount,
      supplierPrice,
      type
    }
    await api.put(`/products/${code}`, data)
  }
}