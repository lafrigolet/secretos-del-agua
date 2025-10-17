import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

export default function ProductGrid({ products, learnmore }) {
  const [ref, isAnimated] = useInViewAnimation();
  
  return (
    <Box ref={ref} className={`${isAnimated ? "animate-slideUp" : "opacity-0"}`}>
      <Grid container spacing={0.2} justifyContent="center">
        {products.map((p, i) => (
          <Grid size={{ xs:6, sm:3, md:3 }} key={i} >
            <Box
              className="relative bg-secondary shadow-sm flex flex-col items-center text-center hover:shadow-md transition
                         max-h-[350px] sm:max-h-none overflow-hidden"
            >
              <div className="w-full overflow-hidden flex justify-center animate-fadeIn">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-[200%] max-w-none object-cover"
                />
              </div>

              {/* Gradient overlay layer */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/10 to-transparent" />

              <div className="absolute inset-0 flex flex-col pt-8 sm:pt-8 md:pt-8 lg:pt-16 px-2 sm:px-6 text-black">
                <Typography variant="h5" className="text-white">{p.title}</Typography>
                <Typography variant="body2" className="mb-3 text-gray-300">
                  {p.text}
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
                </div>
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
