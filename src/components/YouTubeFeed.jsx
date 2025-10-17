import React, { useEffect, useState, useRef } from "react";
import { Card, CardMedia, CircularProgress, Typography } from "@mui/material";

const RAPIDAPI_HOST = "youtube138.p.rapidapi.com";
const RAPIDAPI_KEY = "21acbc2bf1mshea35ed27b088d6ap1bd426jsn2d7e9b7bb153";

export default function YouTubeFeed({ playlist, scrollDirection = "left" }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const speedRef = useRef(0.05);
  const rafRef = useRef(null);
  const playersRef = useRef({}); 
  
  // 1. Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://${RAPIDAPI_HOST}/playlist/videos/?id=${playlist}&hl=en&gl=US`,
          {
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host": RAPIDAPI_HOST,
            },
          }
        );
        const data = await res.json();
        const items =
          data.contents
            ?.filter((item) => item.video)
            .map((item) => item.video)
            .slice(0, 10) || [];
        setVideos(items);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // 2. Continuous autoscroll (starts only when data is loaded)
  useEffect(() => {
    if (loading || videos.length === 0) return;

    const container = scrollRef.current;
    if (!container) return;

    let lastTimestamp = performance.now();

    const step = (timestamp) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const scrollSpeed = speedRef.current;
      if (scrollDirection === "left") {
        container.scrollLeft += scrollSpeed * delta;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      } else if (scrollDirection === "right") {
        container.scrollLeft -= scrollSpeed * delta;
        if (container.scrollLeft <= 0) {
          container.scrollLeft = container.scrollWidth / 2;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
  }, [videos, loading, scrollDirection]);

  // --- Hover handlers ---
  const handleMouseEnter = (idx) => {
    // stop carousel
    speedRef.current = 0;

    // play hovered video
    const player = playersRef.current[idx];
    if (player && player.playVideo) {
      player.playVideo();
    }
  };

  const handleMouseLeave = (idx) => {
    // pause video
    const player = playersRef.current[idx];
    if (player && player.pauseVideo) {
      player.pauseVideo();
    }

    // resume carousel
    speedRef.current = 0.05;
  };
  
  if (loading) return <CircularProgress className="m-10" />;
  if (videos.length === 0)
    return <Typography>No videos found in this playlist.</Typography>;

  // Duplicate videos for seamless infinite loop
  const loopedVideos = [...videos, ...videos, ...videos, ...videos];

  return (
    <div className="w-full flex flex-col items-start justify-center pt-4">
      <style>
        {`
          .scroll-container::-webkit-scrollbar { display: none; }
          .scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div ref={scrollRef} className="scroll-container w-full flex overflow-x-hidden space-x-4">
        {loopedVideos.map((video, idx) => (
          <Card
            key={`${video.videoId}-${idx}`}
            className="flex-shrink-0 w-80 md:w-96 shadow-lg"
            sx={{ borderRadius: 0 }}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            <div className="relative w-full" style={{ height: 200 }}>
              <iframe
                id={`yt-player-${idx}`}
                src={`https://www.youtube.com/embed/${video.videoId}?enablejsapi=1&rel=0&modestbranding=1&controls=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0`}
                title={video.title}
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                style={{ border: "none", borderRadius: 0 }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
