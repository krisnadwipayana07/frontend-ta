import { client } from "./BaseApi";

const auth = { Authorization: "Bearer " + localStorage.getItem("token") };

const transactionGraphAPI = "/v1/laporan/transaksi/graph",
  visitorGraphAPI = "/v1/laporan/pengunjung/graph",
  paymentGraphAPI = "/v1/laporan/pembayaran/graph";

export async function GetTransactionGraphRequest(data) {
  return await client.get(transactionGraphAPI, { params: data, headers: auth });
}
export async function GetVisitorGraphRequest(data) {
  return await client.get(visitorGraphAPI, { params: data, headers: auth });
}
export async function GetPaymentGraphRequest(data) {
  return await client.get(paymentGraphAPI, { params: data, headers: auth });
}
