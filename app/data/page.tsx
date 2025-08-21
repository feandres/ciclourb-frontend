"use client";

import React, { useEffect, useState } from "react";
import Hero from "@/components/hero";
import EvolucaoMalhaChart from "@/components/graficoMalha";
import EvolucaoMalhaAnoChart from "@/components/graficoMalhaAno";
import TabelaContagem from "@/components/tabelaContagem";

interface Indicadores {
  [key: string]: number;
}

async function fetchIndicadoresREST(): Promise<Indicadores> {
  const res = await fetch("http://localhost:3001/dados/indicadores");
  const indicadoresRaw = await res.json();

  const kmIndicadores: Record<string, number> = {};
  indicadoresRaw.forEach(({ nome, valor, unidade }: any) => {
    if (unidade === "m") {
      kmIndicadores[nome] = parseFloat((valor / 1000).toFixed(1));
    } else if (unidade === "unidades") {
      kmIndicadores[nome] = valor;
    }
  });

  return kmIndicadores;
}

export default function DataPage() {
  const [indicadores, setIndicadores] = useState<Indicadores>({});

  useEffect(() => {
    async function loadIndicadores() {
      try {
        const data = await fetchIndicadoresREST();
        setIndicadores(data);
      } catch (error) {
        console.error("Erro ao buscar indicadores REST:", error);
      }
    }
    loadIndicadores();
  }, []);

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

      <section className="w-full bg-gradient-to-r from-[#FFF8E5] via-[#FFFBF0] to-[#FFF8E5] py-6 sm:py-12 border-b-2 border-[#d6c9a3] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-[#d6c9a3]/40">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#4D3A08] mb-4 tracking-tight flex items-center justify-center gap-2">
              Observatório Cicloviário de Fortaleza
            </h2>
            <p className="text-sm sm:text-base text-[#79693F] font-medium leading-relaxed text-justify">
              O Observatório Cicloviário de Fortaleza é uma iniciativa dedicada
              ao monitoramento da infraestrutura voltada para bicicletas,
              comparando o que foi planejado em políticas e diretrizes oficiais
              com o que, de fato, foi executado. A plataforma também reúne e
              organiza dados sobre o sistema de bicicletas compartilhadas da
              cidade (Bicicletar), o perfil dos ciclistas e outras informações
              relevantes para a mobilidade urbana por bicicleta. O Observatório
              Cicloviário de Fortaleza tem como principal inspiração o modelo
              desenvolvido pela AMECICIO (Associação Metropolitana de Ciclistas
              do Recife) na Região Metropolitana do Recife/PE.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm font-semibold">
            {[
              { href: "#malha", text: "Malha Cicloviária atual" },
              { href: "#contagens", text: "Contagens" },
              { href: "#analise", text: "Análise PDCI" },
              { href: "#perfil", text: "Perfil Nacional do Ciclista" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="bg-white/80 hover:bg-white text-[#79693F] hover:text-[#4D3A08] px-4 py-2 rounded-full transition-all duration-300 hover:shadow-md hover:scale-105 border border-[#d6c9a3]/30 hover:border-[#79693F]/50"
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="w-full bg-gradient-to-br from-[#403500] via-[#4D3A08] to-[#403500] text-[#FFF8E5] px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
              Resumo
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: "Malha Cicloviária",
                value: `${indicadores["Malha Cicloviária"]} km`,
                gradient: "from-green-400 to-green-600",
              },
              {
                title: "Estações Bicicletar",
                value: indicadores["Estações Bicicletar"],
                gradient: "from-blue-400 to-blue-600",
              },
              {
                title: "Malha Proposta PDCI",
                value: `${indicadores["Malha Proposta PDCI"]} km`,
                gradient: "from-purple-400 to-purple-600",
              },
              {
                title: "Implantado Conforme PDCI",
                value: `${indicadores["Malha Implantada Conforme PDCI"]} km`,
                gradient: "from-orange-400 to-orange-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-3xl group"
              >
                <p className="text-sm sm:text-base font-medium mb-3 text-[#FFF8E5]/90 leading-tight">
                  {item.title}
                </p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-[#FFF8E5] transition-colors">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/20 text-sm opacity-70">
            <span className="hidden sm:block font-medium">
              Observatório Cicloviário de Fortaleza
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              Última atualização: XX/XX/XXXX
            </span>
          </div>
        </div>
      </section>

      <section
        id="malha"
        className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FFF8E5] to-[#FFFBF0]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#4D3A08] tracking-tight">
              Malha Cicloviária Atualizada
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#79693F] to-[#4D3A08] mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#d6c9a3]/40 hover:shadow-3xl transition-shadow duration-500">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#4D3A08] mb-2">
                  Infraestrutura Integrada
                </h3>
              </div>
            </div>

            <p className="text-[#79693F] leading-relaxed text-justify text-base sm:text-lg font-medium line-height-loose">
              A malha cicloviária de Fortaleza é composta por quatro tipologias
              de infraestrutura:{" "}
              <span className="font-bold text-[#4D3A08]">ciclovias</span>,{" "}
              <span className="font-bold text-[#4D3A08]">ciclofaixas</span>,{" "}
              <span className="font-bold text-[#4D3A08]">ciclorrotas</span> e{" "}
              <span className="font-bold text-[#4D3A08]">
                passeios compartilhados
              </span>
              . As ciclovias correspondem a espaços segregados fisicamente,
              geralmente por canteiro; as ciclofaixas são demarcadas por pintura
              no leito viário, frequentemente acompanhadas de tachões e
              balizadores; as ciclorrotas configuram vias compartilhadas, com
              limite de velocidade de até 30 km/h; e os passeios compartilhados
              consistem em calçadas destinadas ao uso conjunto de pedestres e
              ciclistas. Essas tipologias foram implantadas de forma gradual ao
              longo dos anos, com variação na extensão de cada uma. O{" "}
              <span className="font-bold text-[#4D3A08]">
                Observatório Cicloviário de Fortaleza
              </span>
              , mantido pelo Ciclourb, realiza o monitoramento e registro
              sistemático dessas infraestruturas.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-r from-[#FFF8E5] via-[#FFFBF0] to-[#FFF8E5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#4D3A08]">
              Total por Tipologia
            </h2>
            <p className="text-[#79693F] text-lg">
              Distribuição da infraestrutura por tipo de via
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {totalPorTipologia.map(({ nome, valor }) => {
              return (
                <div
                  key={nome}
                  className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-[#d6c9a3]/30 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 group hover:border-[#79693F]/50"
                >
                  <p className="text-sm sm:text-base font-semibold text-[#4D3A08] mb-3 leading-tight">
                    {nome}
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#79693F] group-hover:text-[#4D3A08] transition-colors">
                    {valor} <span className="text-lg">km</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-b from-[#FFFBF0] to-[#FFF8E5]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#4D3A08]">
                Evolução da Malha por Ano
              </h2>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-[#d6c9a3]/40 hover:shadow-3xl transition-shadow">
              <EvolucaoMalhaAnoChart />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#4D3A08]">
                Evolução da Malha por Tipologia
              </h2>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-[#d6c9a3]/40 hover:shadow-3xl transition-shadow">
              <EvolucaoMalhaChart  />
            </div>
          </div>
        </div>
      </section>

      <section
        id="contagens"
        className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-[#FFF8E5] to-[#FFFBF0]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#4D3A08] tracking-tight">
              Contagens Volumétricas de Ciclistas
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#79693F] to-[#4D3A08] mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#d6c9a3]/40 mb-12 hover:shadow-3xl transition-shadow">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#4D3A08] mb-2">
                  Metodologia de Coleta
                </h3>
                <p className="text-[#79693F]/80 text-sm">
                  Dados coletados por instituições especializadas
                </p>
              </div>
            </div>

            <p className="text-[#79693F] leading-relaxed text-justify text-base sm:text-lg font-medium">
              A tabulação dos dados de contagens tem como finalidade subsidiar o
              planejamento das infraestruturas cicloviárias e respaldar sua
              implantação e manutenção por meio do registro documentado do fluxo
              de ciclistas. As informações disponibilizadas em nossa plataforma
              são provenientes de levantamentos realizados pela{" "}
              <span className="font-bold text-[#4D3A08]">
                Autarquia Municipal de Trânsito e Cidadania (AMC)
              </span>
              , pela{" "}
              <span className="font-bold text-[#4D3A08]">
                Associação dos Ciclistas Urbanos de Fortaleza (Ciclovida)
              </span>{" "}
              e pelo <span className="font-bold text-[#4D3A08]">Ciclourb</span>.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-[#d6c9a3]/40 overflow-hidden hover:shadow-3xl transition-shadow">
            <div className="bg-gradient-to-r from-[#4D3A08] to-[#79693F] p-6 text-center">
              <h3 className="text-xl font-bold text-white flex items-center justify-center gap-3">
                Dados de Contagem
              </h3>
            </div>
            <div className="p-6 sm:p-8 overflow-x-auto">
              <TabelaContagem apiUrl="http://localhost:3001/contagem" />{" "}
            </div>
          </div>
        </div>
      </section>

      <section
        id="analise"
        className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FFFBF0] to-[#FFF8E5]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#4D3A08] tracking-tight">
              Análise do Plano Diretor Cicloviário Integrado
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#79693F] to-[#4D3A08] mx-auto rounded-full mt-6"></div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#d6c9a3]/40 hover:shadow-3xl transition-shadow">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#4D3A08] mb-2">
                  Objetivo e Monitoramento
                </h3>
              </div>
            </div>

            <p className="text-[#79693F] leading-relaxed text-justify text-base sm:text-lg font-medium">
              O{" "}
              <span className="font-bold text-[#4D3A08]">
                Plano Cicloviário de Fortaleza
              </span>{" "}
              tem como objetivo central fornecer à cidade os instrumentos e a
              infraestrutura necessários para a implantação de uma rede
              cicloviária integrada ao sistema de transporte público de
              passageiros e aos equipamentos urbanos, promovendo o uso de modos
              de transporte não motorizados. Nesse contexto, o{" "}
              <span className="font-bold text-[#4D3A08]">
                Observatório Cicloviário de Fortaleza
              </span>
              , mantido pelo Ciclourb, atua no monitoramento da execução do
              plano, bem como de suas alterações e eventuais incongruências, por
              meio da coleta de dados e da elaboração de análises técnicas.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
