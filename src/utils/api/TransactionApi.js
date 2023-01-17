import { client } from "./BaseApi";

const TotalBySalesAPI = "/admin/graph/sales",
  ProductSalesAPI = "/admin/graph/product",
  SalesByDayAPI = "/admin/graph/sales/by-day",
  AllTransactionAPI = "/admin/transaction";

export async function GetTotalBySales() {
  return await client.get(TotalBySalesAPI);
}

export async function GetProductSales() {
  return await client.get(ProductSalesAPI);
}

export async function GetSalesByDay() {
  return await client.get(SalesByDayAPI);
}

export async function GetAllTransaction() {
  return await client.get(AllTransactionAPI);
}
