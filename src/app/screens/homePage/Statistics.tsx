import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <div className="static-frame">
      <Container>
        <Stack className="info">
          <Stack className="static-box" alignItems="center">
            <Box className="static-num">120+</Box>
            <Box className="static-text">Pets Available</Box>
          </Stack>
          <Divider height="100px" width="2px" bg="#E3C08D" />

          <Stack className="static-box" alignItems="center">
            <Box className="static-num">15</Box>
            <Box className="static-text">Pet Shops</Box>
          </Stack>
          <Divider height="100px" width="2px" bg="#E3C08D" />

          <Stack className="static-box" alignItems="center">
            <Box className="static-num">300+</Box>
            <Box className="static-text">Products</Box>
          </Stack>
          <Divider height="100px" width="2px" bg="#E3C08D" />

          <Stack className="static-box" alignItems="center">
            <Box className="static-num">500+</Box>
            <Box className="static-text">Happy Customers</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
