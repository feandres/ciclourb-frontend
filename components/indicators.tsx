export function Indicators() {
  const mockData = [
    { label: "Total de ciclovias", value: 128 },
    { label: "Ciclistas/dia", value: 5400 },
    { label: "Cidades mapeadas", value: 12 },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 grid gap-6 sm:grid-cols-3">
        {mockData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-6 text-center"
          >
            <p className="text-3xl font-bold">{item.value}</p>
            <p className="mt-2 text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
