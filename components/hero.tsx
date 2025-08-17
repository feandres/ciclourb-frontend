import Image from "next/image";

interface HeroProps {
  imageUrl: string; 
}

export default function Hero({ imageUrl }: HeroProps) {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      <Image
        src={imageUrl}
        alt="Hero"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute bottom-1 left-6">
        <Image
          src="/logo_alt.png"
          alt="CicloUrb Logo"
          width={160}
          height={80}
          className="w-auto h-16 md:h-20 lg:h-80"
        />
      </div>
    </section>
  );
}
