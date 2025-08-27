"use client";

import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            backgroundColor: "#4D3A08",
            color: "#FFF8E5",
            border: "none",
            borderRadius: "50%",
            width: "3rem",
            height: "3rem",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          ↑
        </button>
      )}
    </>
  );
}
