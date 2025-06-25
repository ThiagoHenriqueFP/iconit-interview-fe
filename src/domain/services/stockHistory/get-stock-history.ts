import { api } from "../../../utils/api/axios";
import { ProductTypeValue, type ProductType } from '../../entities/product-type';
import type { Response } from "../../entities/response";
import type { GetStockHistory } from "../../entities/stockHistory/get-stock-history";

export class GetStockHistoryService {
  public static instance = new GetStockHistoryService();

  async perform(type: ProductType) {
    const url = type === 'all'
     ? "/stock-histories"
     : `/stock-history/products/${ProductTypeValue[type]}`
    const response = await api.get<Response<GetStockHistory[]>>(url);

    return response.data.data;
  }
}
