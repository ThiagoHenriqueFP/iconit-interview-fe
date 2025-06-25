import { api } from '../../../utils/api/axios';
import type { SaveProduct } from '../../entities/product/post-product';

export class PostProductService {
  public static instance = new PostProductService();

  async perform(code: string, amount: number, supplierPrice: number, description: string, type: number) {
    const data: SaveProduct = {
      code,
      description,
      stockQuantity: amount,
      supplierPrice,
      type
    }
    const response = await api.post(`/products`, data)
    return response.data
  }
}