import React from "react";
import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box className="bg-black text-gray-300 py-2 text-sm flex justify-center">
      <Typography variant="body2">
        Secretos del Agua | Compras y soporte
      </Typography>
    </Box>
  );
}
