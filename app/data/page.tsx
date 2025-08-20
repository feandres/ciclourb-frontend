import React from "react";
import Hero from "@/components/hero";
import EvolucaoMalhaChart from "@/components/graficoMalha";
import EvolucaoMalhaAnoChart from "@/components/graficoMalhaAno";
import TabelaContagem from "@/components/tabelaContagem";

async function fetchIndicadores() {
  const query = `
    query {
      dashboardIndicadores {
        nome
        valor
        unidade
      }
    }
  `;

  const res = await fetch("http://localhost:3001/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  const indicadores = json.data.dashboardIndicadores;

  const kmIndicadores: Record<string, number> = {};
  indicadores.forEach(({ nome, valor, unidade }: any) => {
    if (unidade === "m") {
      kmIndicadores[nome] = parseFloat((valor / 1000).toFixed(1));
    } else if (unidade === "unidades") {
      kmIndicadores[nome] = valor;
    }
  });

  return kmIndicadores;
}

export default async function DataPage() {
  const indicadores = await fetchIndicadores();

  const totalPorTipologia = [
    { nome: "Ciclorrotas", valor: indicadores["Ciclorrotas"] || 0 },
    {
      nome: "Passeios Compartilhados",
      valor: indicadores["Passeios Compartilhados"] || 0,
    },
    { nome: "Ciclofaixas", valor: indicadores["Ciclofaixas"] || 0 },
    { nome: "Ciclovias", valor: indicadores["Ciclovias"] || 0 },
  ];

  return (
    <>
      <Hero imageUrl="/hero_6.jpg" />

      {/* RESUMO */}
      <section className="w-full bg-[#403500] text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-10">Resumo</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 rounded-2xl p-4 shadow">
              <p className="text-base font-medium">Malha Cicloviária</p>
              <p className="text-3xl font-semibold mt-2">
                {indicadores["Malha Cicloviária"]} km
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 shadow">
              <p className="text-base font-medium">Estações Bicicletar</p>
              <p className="text-3xl font-semibold mt-2">
                {indicadores["Estações Bicicletar"]}
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 shadow">
              <p className="text-base font-medium">Malha Proposta PDCI</p>
              <p className="text-3xl font-semibold mt-2">
                {indicadores["Malha Proposta PDCI"]} km
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 shadow">
              <p className="text-base font-medium">Implantado Conforme PDCI</p>
              <p className="text-3xl font-semibold mt-2">
                {indicadores["Malha Implantada Conforme PDCI"]} km
              </p>
            </div>
          </div>
          <p className="text-xs mt-10 text-right opacity-80">
            Última atualização: XX/XX/XXXX
          </p>
        </div>
      </section>

      {/* TEXTO INTRODUTÓRIO */}
      <section className="w-full px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Malha Cicloviária Atualizada</h3>
          <p className="text-justify leading-relaxed text-gray-700">
            A malha cicloviária de Fortaleza é composta por quatro tipologias de
            infraestrutura: ciclovias, ciclofaixas, ciclorrotas e passeios
            compartilhados. As ciclovias correspondem a espaços segregados
            fisicamente, geralmente por canteiro; as ciclofaixas são demarcadas
            por pintura no leito viário, frequentemente acompanhadas de tachões e
            balizadores; as ciclorrotas configuram vias compartilhadas, com limite
            de velocidade de até 30 km/h; e os passeios compartilhados consistem
            em calçadas destinadas ao uso conjunto de pedestres e ciclistas. Essas
            tipologias foram implantadas de forma gradual ao longo dos anos, com
            variação na extensão de cada uma. O Observatório Cicloviário de
            Fortaleza, mantido pelo Ciclourb, realiza o monitoramento e registro
            sistemático dessas infraestruturas.
          </p>
        </div>
      </section>

      {/* GRAFICO POR ANO */}
      <section className="w-full px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Evolução da Malha por Ano</h2>
          <div className="rounded-2xl bg-white shadow p-4">
            <EvolucaoMalhaAnoChart apiUrl="http://localhost:3001/graphql" />
          </div>
        </div>
      </section>

      {/* GRAFICO POR TIPOLOGIA */}
      <section className="w-full px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Evolução da Malha por Tipologia</h2>
          <div className="rounded-2xl bg-white shadow p-4">
            <EvolucaoMalhaChart apiUrl="http://localhost:3001/graphql" />
          </div>
        </div>
      </section>

      {/* TOTAL POR TIPOLOGIA */}
      <section className="w-full px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-bold mb-8">Totais por Tipologia</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {totalPorTipologia.map(({ nome, valor }) => (
              <div
                key={nome}
                className="bg-white rounded-2xl p-4 shadow hover:shadow-md transition"
              >
                <p className="text-base font-medium">{nome}</p>
                <p className="text-3xl font-semibold mt-2">{valor} km</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABELA DE CONTAGEM */}
      <section className="w-full px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-bold mb-4">
            Contagens Volumétricas de Ciclistas
          </h3>
          <p className="text-justify leading-relaxed text-gray-700 mb-6">
            A tabulação dos dados de contagens tem como finalidade subsidiar o
            planejamento das infraestruturas cicloviárias e respaldar sua
            implantação e manutenção por meio do registro documentado do fluxo de
            ciclistas. As informações disponibilizadas em nossa plataforma são
            provenientes de levantamentos realizados pela Autarquia Municipal de
            Trânsito e Cidadania (AMC), pela Associação dos Ciclistas Urbanos de
            Fortaleza (Ciclovida) e pelo Ciclourb.
          </p>
          <div className="rounded-2xl bg-white shadow p-4 overflow-x-auto">
            <TabelaContagem />
          </div>
        </div>
      </section>

      {/* ANALISE PDCI */}
      <section className="w-full px-6 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4">
            Análise do Plano Diretor Cicloviário Integrado de Fortaleza/CE
          </h3>
          <p className="text-justify leading-relaxed text-gray-700">
            O Plano Cicloviário de Fortaleza tem como objetivo central fornecer à
            cidade os instrumentos e a infraestrutura necessários para a
            implantação de uma rede cicloviária integrada ao sistema de transporte
            público de passageiros e aos equipamentos urbanos, promovendo o uso de
            modos de transporte não motorizados. Nesse contexto, o Observatório
            Cicloviário de Fortaleza, mantido pelo Ciclourb, atua no monitoramento
            da execução do plano, bem como de suas alterações e eventuais
            incongruências, por meio da coleta de dados e da elaboração de análises
            técnicas.
          </p>
        </div>
      </section>
    </>
  );
}
