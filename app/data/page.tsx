// app/pages/dashboard/page.tsx
import React from 'react';
import {Hero} from '@/components/hero';

const DashboardPage: React.FC = () => {
  const malhaTotalKm = 120; 
  const malhaPorTipologia = [
    { tipologia: 'Ciclovia bidirecional', km: 50 },
    { tipologia: 'Ciclofaixa unidirecional', km: 30 },
    { tipologia: 'Passeio compartilhado', km: 20 },
    { tipologia: 'Ciclorrota', km: 20 },
  ];
  const zonas30TotalArea = 35; // km²

  return (

    <>
    
    <Hero />
    
    <div className="container mx-auto p-6 space-y-8">
      {/* Indicadores gerais */}
      <section className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded">
          Total km da malha: {malhaTotalKm} km
        </div>
        <div className="bg-white p-4 shadow rounded">
          Total área Zonas 30: {zonas30TotalArea} km²
        </div>
        <div className="bg-white p-4 shadow rounded">
          Malha por tipologia:
          <ul>
            {malhaPorTipologia.map(t => (
              <li key={t.tipologia}>
                {t.tipologia}: {t.km} km
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Placeholders de gráficos */}
      <section className="grid grid-cols-2 gap-6">
        <div className="bg-gray-100 h-64 flex items-center justify-center rounded shadow">
          Gráfico: % Planejamento vs % Realizado PDCI
        </div>
        <div className="bg-gray-100 h-64 flex items-center justify-center rounded shadow">
          Gráfico: Evolução da malha por tipologia por ano
        </div>
        <div className="bg-gray-100 h-64 flex items-center justify-center rounded shadow">
          Gráfico: Ciclistas por turno por ano
        </div>
        <div className="bg-gray-100 h-64 flex items-center justify-center rounded shadow">
          Tabela: Bicicletar - Pontos por bairro
        </div>
      </section>
    </div>
        </>

  );
};

export default DashboardPage;
