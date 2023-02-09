import { client } from "./BaseApi";

const TotalBySalesAPI = "/admin/graph/sales",
  ProductSalesAPI = "/admin/graph/product",
  SalesByDayAPI = "/admin/graph/sales/by-day",
  AllTransactionAPI = "/admin/transaction";

export async function GetTotalBySales(data) {
  return await client.get(TotalBySalesAPI, { params: data });
}

export async function GetProductSales(data) {
  return await client.get(ProductSalesAPI, { params: data });
}

export async function GetSalesByDay(data) {
  return await client.get(SalesByDayAPI, { params: data });
}

export async function GetAllTransaction() {
  return await client.get(AllTransactionAPI);
}
