import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoBPD from "../assets/logoBPD.png";
import { GetAllProduct } from "../utils/api/ProductApi";

export default function Menu() {
  const [data, setData] = useState();

  useEffect(() => {
    GetAllProduct().then((res) => setData(res.data.data));
  }, []);

  console.log(data);
  return (
    <Box p="40">
      <SimpleGrid columns={[3]} spacing={10}>
        {data?.map((item, key) => (
          <Link to={"/menu/" + item.ID} style={{ textDecoration: "none" }}>
            <Paper key={key} sx={{ boxShadow: 5 }}>
              <Box w="full">
                <Image
                  src={item.Pic || LogoBPD}
                  alt="product-img"
                  width="100%"
                  height="40vh"
                  objectFit="cover"
                />
                <Text pb="10" fontWeight={700} textAlign="center">
                  {item.Product}
                </Text>
              </Box>
            </Paper>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}
