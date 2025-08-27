"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface HeroProps {
  interval?: number; 
}

export default function Hero({ interval = 5000 }: HeroProps) {
  const totalSlides = 10;
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = Array.from({ length: totalSlides }, (_, i) =>
    i === 0 ? `/hero/hero.png` : `/hero/hero_${i}.jpg`
  );

  // Avança para o próximo slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  return (
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {slides.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Hero ${index + 1}`}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute bottom-20 left-20">
        <Image
          src="/logo_alt.png"
          alt="CicloUrb Logo"
          width={160}
          height={80}
          className="w-auto h-16 md:h-20 lg:h-40"
        />
      </div>
    </section>
  );
}
