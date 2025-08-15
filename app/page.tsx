import { Hero } from "@/components/hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto text-justify leading-relaxed">
          <h2 className="text-2xl font-bold mb-4">Seção 1</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, ipsum a aliquam eleifend, justo nisi placerat libero, et
            porttitor nibh nulla in magna. Cras sed orci ac nunc egestas
            pretium. Vivamus a feugiat est, et viverra ligula.
          </p>
        </div>
      </section>

      <section className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto text-justify leading-relaxed">
          <h2 className="text-2xl font-bold mb-4">Seção 2</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, ipsum a aliquam eleifend, justo nisi placerat libero, et
            porttitor nibh nulla in magna. Cras sed orci ac nunc egestas
            pretium. Vivamus a feugiat est, et viverra ligula.
          </p>
        </div>
      </section>
    </>
  );
}
