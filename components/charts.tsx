export function ChartsSection() {
  return (
    <section className="py-12 container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Análises e Gráficos</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="bg-white h-64 rounded-lg shadow flex items-center justify-center text-gray-500">
          [Gráfico 1]
        </div>
        <div className="bg-white h-64 rounded-lg shadow flex items-center justify-center text-gray-500">
          [Gráfico 2]
        </div>
      </div>
    </section>
  );
}
