import React, { useEffect, useState, useRef } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

import InstagramIcon from "@mui/icons-material/Instagram"; // MUI icon for logo
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const RAPIDAPI_HOST = "instagram120.p.rapidapi.com";
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY

const InstagramFeed = ({ username = "nasa" }) => {
  const [ref, isAnimated] = useInViewAnimation();
  const [posts, setPosts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  const videoRefs = useRef([]);

  // Fetch public Instagram posts (only 10)
  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://${RAPIDAPI_HOST}/api/instagram/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": RAPIDAPI_HOST,
          "x-rapidapi-key": RAPIDAPI_KEY,
        },
        body: JSON.stringify({ username, maxId: "" }),
      });

      const res = await response.json();
      const edges = res?.result?.edges || [];

      const formattedPosts = edges.map(({ node }) => ({
        id: node.id,
        username: node.user?.username,
        caption: node.caption?.text,
        video: node.video_versions?.[0]?.url || null,
        image:
          node.image_versions2?.candidates?.[0]?.url ||
          node.carousel_media?.[0]?.image_versions2?.candidates?.[0]?.url,
      })).filter((p) => p.video).slice(0, 10);

      // Determine columns by screen width
      const cols = window.innerWidth < 768 ? 3 : 5;
      const count = Math.floor(formattedPosts.length / cols) * cols;
      
      setPosts(formattedPosts.slice(0, count));
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  // Observe videos for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = videoRefs.current.findIndex((v) => v === entry.target);
          const video = entry.target;
          if (!video) return;

          if (entry.isIntersecting) {
            // Pause others, play current
            videoRefs.current.forEach((v, i) => {
              if (v && i !== index) {
                v.pause();
                v.currentTime = 0;
              }
            });
            setActiveIndex(index);
            video.muted = !soundEnabled;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [posts, soundEnabled]);

  // Auto-play next video
  const handleVideoEnd = (index) => {
    const nextIndex = (index + 1) % videoRefs.current.length;
    const nextVideo = videoRefs.current[nextIndex];
    if (nextVideo) {
      setActiveIndex(nextIndex);
      nextVideo.scrollIntoView({ behavior: "smooth", block: "center" });
      nextVideo.muted = !soundEnabled;
      setTimeout(() => nextVideo.play().catch(() => {}), 300);
    }
  };

  // User clicks another video
  const handleVideoClick = (index) => {
    if (activeIndex === index) return;
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index) {
        v.pause();
        v.currentTime = 0;
      }
    });
    setActiveIndex(index);
    const selected = videoRefs.current[index];
    if (selected) {
      selected.muted = !soundEnabled;
      selected.play().catch(() => {});
      selected.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Toggle audio for active video
  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const newState = !prev;
      const v = videoRefs.current[activeIndex];
      if (v) v.muted = !newState;
      return newState;
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [username]);

  // ------------------ RENDER ------------------
  return (
    <div ref={ref} className={`p-0 bg-gray-100 ${isAnimated ? "animate-slideUp" : "opacity-0"}`}>
      <div
        className="
          grid
          grid-cols-3
          sm:grid-cols-3
          md:grid-cols-5
          lg:grid-cols-5
          gap-0.5
        "
      >
        {posts.map((post, index) => {
          const isExpanded = expandedPost === index; // Track which card is expanded

          return (
            <Card
              key={post.id}
              elevation={0}
              className="bg-primary relative overflow-hidden rounded-none"
              sx={{ borderRadius: 0, boxShadow: "none" }}
            >
              <div className="relative w-full bg-primary">
                {/* --- Overlay Icons --- */}
                <div className="absolute top-2 left-2 z-20 text-white p-1">
                  <InstagramIcon fontSize="small" />
                </div>

                {activeIndex === index && (
                  <button
                    onClick={toggleSound}
                    className="absolute top-2 right-2 z-20 text-white bg-primary/40 rounded-full p-1 hover:bg-primary/60"
                  >
                    {soundEnabled ? (
                      <VolumeUpIcon fontSize="small" />
                    ) : (
                      <VolumeOffIcon fontSize="small" />
                    )}
                  </button>
                )}

                {/* --- Video or Image --- */}
                {post.video ? (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={post.video}
                    playsInline
                    controls={false}
                    muted={!soundEnabled}
                    className="w-full h-auto block cursor-pointer"
                    onClick={() => handleVideoClick(index)}
                    onEnded={() => handleVideoEnd(index)}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    image={post.image}
                    alt={post.caption}
                    className="w-full h-auto block"
                    sx={{ borderRadius: 0 }}
                  />
                )}

                {/* --- Overlayed Caption --- */}
                <CardContent
                  onClick={() =>
                    setExpandedPost(isExpanded ? null : index)
                  } // toggle expanded state
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    background: isExpanded
                      ? "rgba(0,0,0,0.8)"
                      : "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                    color: "white",
                    padding: "8px 10px",
                    borderRadius: 0,
                    zIndex: 10,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    maxHeight: isExpanded ? "100%" : "6rem",
                    overflowY: isExpanded ? "auto" : "hidden",
                  }}
                >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.8rem",
                    lineHeight: 1.4,
                    whiteSpace: "pre-line",
                    transition: "all 0.3s ease",
                    display: isExpanded ? "block" : "-webkit-box",
                    WebkitLineClamp: isExpanded ? "unset" : 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {isExpanded
                   ? post.caption
                   : post.caption?.slice(0, 150) || ""}
                </Typography>

                {!isExpanded && post.caption?.length > 150 && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.8rem",
                    }}
                    className="text-gray-300 mt-1 italic"
                  >
                    ...ver más
                  </Typography>
                )}
                </CardContent>
              </div>
            </Card>
        );
                  })}
      </div>
    </div>
)};

export default InstagramFeed;
