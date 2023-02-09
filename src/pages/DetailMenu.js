import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProductDetail } from "../utils/api/ProductApi";
import LogoBPD from "../assets/logoBPD.png";
import { IconButton, Typography } from "@mui/material";
import { IDRConvert } from "../utils/tools/IDRConvert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function DetailMenu() {
  const { id } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    GetProductDetail(id).then((res) => setData(res.data.data));
  }, []);

  return (
    <div>
      <SimpleGrid p="40" columns={2}>
        <Image
          src={data?.Pic || LogoBPD}
          alt="product-img"
          width="100%"
          height="50vh"
          objectFit="contain"
          borderRadius="10px"
        />
        <Box px="40">
          <IconButton onClick={() => window.location.replace("/menu")}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography fontSize="2em" fontWeight={700}>
            {data?.Product}
          </Typography>
          <Typography fontSize="1.2em" fontWeight={700}>
            {IDRConvert.format(data?.Price)}
          </Typography>
          <Typography pt="1em" fontSize="1.2em" fontWeight={600}>
            {data?.Description}
          </Typography>
        </Box>
      </SimpleGrid>
    </div>
  );
}
