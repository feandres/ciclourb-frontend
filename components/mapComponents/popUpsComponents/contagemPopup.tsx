import { useState } from "react";

function PopupContent({ props }: { props: any }) {
  const ciclistas_por_min = props.ciclistas_por_min || 0;
  const realizador = props.realizador || "";
  const masculino = props.masculino || 0;
  const feminino = props.feminino || 0;
  const total = props.total || 0;
  const nome = props.nome || props.name || props.local || "Estação";
  const turno = props.turno || "";
  const ano = props.ano || 0;

  return (
    <div className="p-4 min-w-64 max-w-80">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <h3 className="font-bold text-gray-800 text-lg">{nome} - {turno} - {ano}</h3>
      </div>
      <div className="flex justify-between">
        {realizador && (
          <h4 className="font-semibold text-gray-800 text-md">
            Realizador: {realizador}
          </h4>
        )}
        <h4 className="font-semibold text-gray-800 text-md">
          Ciclistas por minuto: {ciclistas_por_min}
        </h4>
      </div>

      <div className="w-full gap-2 flex">
        <div className="bg-blue-50 p-4 rounded-lg text-center w-1/3">
          <div className="text-3xl font-bold text-blue-600">{masculino}</div>
          <div className="text-sm text-blue-700 font-medium">Masculino</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center w-1/3">
          <div className="text-3xl font-bold text-blue-600">{feminino}</div>
          <div className="text-sm text-blue-700 font-medium">Feminino</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center w-1/3">
          <div className="text-3xl font-bold text-blue-600">{total}</div>
          <div className="text-sm text-blue-700 font-medium">Total</div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">Clique no mapa para fechar</p>
      </div>
    </div>
  );
}


export default function ContagemPopup({ contagens }: { contagens: any }) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contagens?.length);
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + contagens?.length) % contagens?.length);
  }

  return (
    <div className="relative mx-auto min-w-72 max-w-96 overflow-hidden ">
      <button
          onClick={prevImage}
          className="w-6 h-6 absolute -left-1 top-1/2 z-10"
        >
        &#10094;
      </button>
      
      <PopupContent props={contagens[currentIndex].properties}/>
      
      <button
          onClick={nextImage}
          className="w-6 h-6 absolute -right-1 top-1/2 z-10"
        >
        &#10095;
      </button>
    </div>
  )
}

