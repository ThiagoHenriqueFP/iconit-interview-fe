import { api } from "../../../utils/api/axios";
import type { GetProduct } from "../../entities/product/get-product";
import { type Response } from "../../entities/response";

export class GetproductService {
  public static instance = new GetproductService();

  async perform() {
    const response = api
      .get<Response<GetProduct[]>>("/products")
      .then((data) => {
        return data.data;
      })
      .catch((err) => {
        throw new Error(err.toString())
      });

      return (await response).data
  }
}
