import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

export default function SectionPromotion({ title, subtitle, image, learnmore, buy }) {
  const [ref, isAnimated] = useInViewAnimation();

  return (
    <Box
      ref={ref}
      className={`relative flex flex-col items-center mt-0.5 mb-0.5 text-center ${
        isAnimated ? "animate-slideUp" : "opacity-0"
      }`}
    >
      <div className="w-full overflow-hidden flex justify-center">
        <img
          src={image}
          alt={title}
          className="w-[300%] max-w-none object-cover"
        />
      </div>

      {/* Capa de degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/10 to-transparent" />

      <div className="absolute inset-0 flex flex-col py-16 px-6 text-black">
        <Typography variant="h2" className="font-semibold mb-2 text-gray-200">
          {title}
        </Typography>
        <Typography variant="body1" className="text-gray-300 mb-4">
          {subtitle}
        </Typography>

        {/* Botones con esquinas redondeadas */}
        <div className="flex gap-4 justify-center p-4">
          <Button
            variant="contained"
            color="primary"
            onClick={learnmore}
            sx={{ borderRadius: 12 }}
          >
            Aprender más
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={buy}
            sx={{ borderRadius: 12 }}
          >
            Comprar
          </Button>
        </div>
      </div>
    </Box>
  );
}
