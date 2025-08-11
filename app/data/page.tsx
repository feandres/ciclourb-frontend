"use client";

import { Indicators } from "@/components/indicators";
import { ChartsSection } from "@/components/charts";

export default function DataPage() {

  return (
    <div className="flex flex-col">

      <Indicators />

      <ChartsSection />

      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Sobre o projeto</h2>
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris.
        </p>
      </section>
    </div>
  );
}
