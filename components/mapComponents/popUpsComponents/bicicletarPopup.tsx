
export default function bicicletarPopup({ props }: { props: any }) {
  const vagas = props.vagas_atuais || props.vagas || props.capacidade || 0;
  const nome = props.nome || props.name || props.station_name || "Estação";
  const endereco = props.endereco || props.address || props.location || "";

  return (
    <div className="p-4 min-w-64 max-w-80">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <h3 className="font-bold text-gray-800 text-lg">{nome}</h3>
      </div>

      {endereco && (
        <div className="mb-3">
          <p className="text-sm text-gray-600">{endereco}</p>
        </div>
      )}

      <div className="bg-green-50 p-4 rounded-lg text-center">
        <div className="text-3xl font-bold text-green-600">{vagas}</div>
        <div className="text-sm text-green-700 font-medium">Total de Vagas</div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">Clique no mapa para fechar</p>
      </div>
    </div>
  );
}
