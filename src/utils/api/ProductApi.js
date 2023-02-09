import { client } from "./BaseApi";

export async function GetAllProduct() {
  return await client.get("/getData");
}
export async function GetProductDetail(id) {
  return await client.get("/getData/" + id);
}

export async function GetProductVisitGraph() {
  return await client.get("/admin/graph/product-visit");
}
