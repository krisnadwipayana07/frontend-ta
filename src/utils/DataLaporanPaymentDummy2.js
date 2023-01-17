const data_by_payment2 = [
  {
    id: 1,
    payment_name: "Tunai",
    total: "0.5",
  },
  {
    id: 1,
    payment_name: "EDC",
    total: "0.4",
  },
  {
    id: 1,
    payment_name: "VA BPD Bali",
    total: "0.2",
  },
  {
    id: 1,
    payment_name: "Other",
    total: "0.3",
  },
  {
    id: 1,
    payment_name: "QRIS",
    total: "0.4",
  },
  {
    id: 1,
    payment_name: "QRIS Statis",
    total: "0.45",
  },
  {
    id: 1,
    payment_name: "Free Pass",
    total: "0.35",
  },
  {
    id: 1,
    payment_name: "Agen",
    total: "0.55",
  },
];

export const datasetLaporanpayment2 = {
  labels: [
    data_by_payment2[0].payment_name,
    data_by_payment2[1].payment_name,
    data_by_payment2[2].payment_name,
    data_by_payment2[3].payment_name,
    data_by_payment2[4].payment_name,
    data_by_payment2[5].payment_name,
    data_by_payment2[6].payment_name,
    data_by_payment2[7].payment_name,
  ],
  datasets: [
    {
      data: [
        parseFloat(data_by_payment2[0].total),
        parseFloat(data_by_payment2[1].total),
        parseFloat(data_by_payment2[2].total),
        parseFloat(data_by_payment2[3].total),
        parseFloat(data_by_payment2[4].total),
        parseFloat(data_by_payment2[5].total),
        parseFloat(data_by_payment2[6].total),
        parseFloat(data_by_payment2[7].total),
      ],
      backgroundColor: "#3D734D",
      barPercentage: 0.3,
    },
  ],
};
