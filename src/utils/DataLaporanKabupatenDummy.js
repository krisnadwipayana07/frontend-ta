const data_kabupaten = [
  {
    id: 1,
    kabupaten: "Badung",
    total: "0.5",
  },
  {
    id: 1,
    kabupaten: "Bangli",
    total: "0.4",
  },
  {
    id: 1,
    kabupaten: "Buleleng",
    total: "0.2",
  },
  {
    id: 1,
    kabupaten: "Gianyar",
    total: "0.3",
  },
  {
    id: 1,
    kabupaten: "Jembrana",
    total: "0.4",
  },
  {
    id: 1,
    kabupaten: "Karangasem",
    total: "0.45",
  },
  {
    id: 1,
    kabupaten: "Klungkung",
    total: "0.35",
  },
  {
    id: 1,
    kabupaten: "Tabanan",
    total: "0.55",
  },
  {
    id: 1,
    kabupaten: "Denpasar",
    total: "0.39",
  },
  {
    id: 1,
    kabupaten: "Mataram",
    total: "0.47",
  },
  {
    id: 1,
    kabupaten: "Penyebrangan",
    total: "0.29",
  },
  {
    id: 1,
    kabupaten: "Kawalan",
    total: "0.5",
  },
];

export const datasetLaporanKabupaten = {
  labels: [
    data_kabupaten[0].kabupaten,
    data_kabupaten[1].kabupaten,
    data_kabupaten[2].kabupaten,
    data_kabupaten[3].kabupaten,
    data_kabupaten[4].kabupaten,
    data_kabupaten[5].kabupaten,
    data_kabupaten[6].kabupaten,
    data_kabupaten[7].kabupaten,
    data_kabupaten[8].kabupaten,
    data_kabupaten[9].kabupaten,
    data_kabupaten[10].kabupaten,
    data_kabupaten[11].kabupaten,
  ],
  datasets: [
    {
      data: [
        parseFloat(data_kabupaten[0].total),
        parseFloat(data_kabupaten[1].total),
        parseFloat(data_kabupaten[2].total),
        parseFloat(data_kabupaten[3].total),
        parseFloat(data_kabupaten[4].total),
        parseFloat(data_kabupaten[5].total),
        parseFloat(data_kabupaten[6].total),
        parseFloat(data_kabupaten[7].total),
        parseFloat(data_kabupaten[8].total),
        parseFloat(data_kabupaten[9].total),
        parseFloat(data_kabupaten[10].total),
        parseFloat(data_kabupaten[11].total),
      ],
      backgroundColor: "#3D734D",
      barPercentage: 0.5,
    },
  ],
};
