"use client";

import React, { useEffect, useState } from "react";
import Hero from "@/components/hero";
import EvolucaoMalhaChart from "@/components/graficoMalha";
import EvolucaoMalhaAnoChart from "@/components/graficoMalhaAno";
import TabelaContagem from "@/components/tabelaContagem";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/services/api";

const COLORS = [
  "#4D3A08",
  "#79693F",
  "#D6C9A3",
  "#FFF8E5",
  "#FFFBF0",
  "#403500",
];

const timeUsingBike = [
  { name: "Menos de 6 meses", value: 9.9 },
  { name: "Entre 6 meses e 1 ano", value: 6.6 },
  { name: "Entre 1 ano e 2 anos", value: 7.6 },
  { name: "Entre 2 e 3 anos", value: 7.4 },
  { name: "Entre 4 e 5 anos", value: 4.5 },
  { name: "Mais de 5 anos", value: 4.3 },
];

const daysPerWeek = [
  { name: "1 dia", value: 0.8 },
  { name: "2 dias", value: 2.5 },
  { name: "3 dias", value: 5.1 },
  { name: "4 dias", value: 2.7 },
  { name: "5 dias", value: 21.2 },
  { name: "6 dias", value: 22.6 },
  { name: "7 dias", value: 45 },
];

const destinations = [
  { name: "Trabalho", value: 95.5 },
  { name: "Estudo", value: 78.9 },
  { name: "Compras", value: 89.3 },
  { name: "Lazer/Social", value: 88.1 },
  { name: "Estação Intermodal", value: 76.4 },
];

const tripTime = [
  { name: "Até 15 minutos", value: 11.3 },
  { name: "Mais de 15 até 30 minutos", value: 50.5 },
  { name: "Mais de 30 minutos", value: 38.2 },
];

const motivations = [
  { name: "Custo", value: 9.7 },
  { name: "Praticidade", value: 60.6 },
  { name: "Saúde", value: 25 },
  { name: "Meio Ambiente", value: 0.2 },
  { name: "Outros", value: 4.5 },
];

const improvements = [
  { name: "Educação no trânsito", value: 28.3 },
  { name: "Segurança pública", value: 14 },
  { name: "Arborização", value: 3.7 },
  { name: "Infraestrutura", value: 50.1 },
  { name: "Outros", value: 3.9 },
];

const combinedTransport = [
  { name: "Sim", value: 23 },
  { name: "Não", value: 77 },
];

const theft = [
  { name: "Sim", value: 36.6 },
  { name: "Não", value: 63.4 },
];

const harassment = [
  { name: "Sim", value: 36.7 },
  { name: "Não", value: 63.3 },
];

const incidents = [
  { name: "Sim", value: 25.5 },
  { name: "Não", value: 74.5 },
];

const income = [
  { name: "Sem Rendimento", value: 1.6 },
  { name: "Até 1 S.M.", value: 32 },
  { name: "Entre 1 e 2 S.M.", value: 34.9 },
  { name: "Entre 2 e 5 S.M.", value: 21.2 },
  { name: "Acima de 5 S.M.", value: 1.6 },
  { name: "Não sabe/não respondeu", value: 8.8 },
];

const education = [
  { name: "Sem instrução", value: 8.2 },
  { name: "Ensino Fundamental", value: 31.4 },
  { name: "Ensino Médio", value: 46 },
  { name: "Ensino Superior", value: 12.7 },
  { name: "Pós Graduação", value: 1.8 },
  { name: "Não sabe/não respondeu", value: 0 },
];

const ageGroups = [
  { name: "Até 19 anos", value: 7.4 },
  { name: "20 a 29 anos", value: 20.1 },
  { name: "30 a 39 anos", value: 21.4 },
  { name: "40 a 49 anos", value: 21.8 },
  { name: "50 a 59 anos", value: 18.7 },
  { name: "60 anos ou mais", value: 10.5 },
];

const race = [
  { name: "Branca", value: 20.7 },
  { name: "Preta", value: 21.8 },
  { name: "Parda", value: 55.9 },
  { name: "Indígena", value: 0.4 },
  { name: "Amarela", value: 1.2 },
  { name: "Não sabe/não respondeu", value: 0 },
];

interface Indicadores {
  [key: string]: number;
}

async function fetchIndicadoresREST(): Promise<Indicadores> {
  const res = await api.get(`/dados/indicadores`);
  const indicadoresRaw = await res.data;

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIndicadores() {
      try {
        const data = await fetchIndicadoresREST();
        setIndicadores(data);
      } catch (error) {
        console.error("Erro ao buscar indicadores REST:", error);
      } finally {
        setLoading(false);
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
      <Hero />

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
              {
                href: "https://mobilidade.fortaleza.ce.gov.br/images/pdf/PDCI_FORTALEZA.pdf",
                text: "Download Plano Diretor",
                download: true,
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                download={item.download}
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

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  title: "Malha Cicloviária",
                  value: `${indicadores["Malha Cicloviária"]} km`,
                },
                {
                  title: "Estações Bicicletar",
                  value: indicadores["Estações Bicicletar"],
                },
                {
                  title: "Malha Proposta PDCI",
                  value: `${indicadores["Malha Proposta PDCI"]} km`,
                },
                {
                  title: "Implantado Conforme PDCI",
                  value: `${indicadores["Malha Implantada Conforme PDCI"]} km`,
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
          )}
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
              <EvolucaoMalhaChart />
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
              <TabelaContagem />{" "}
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

            <p className="text-[#79693F] leading-relaxed text-justify text-base sm:text-lg font-medium mb-10">
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

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FFF8E5] border-b-2 border-[#d6c9a3]">
                    <th className="px-4 py-2 text-[#4D3A08] font-bold">Tipo</th>
                    <th className="px-4 py-2 text-[#4D3A08] font-bold">
                      Anterior ao PDCI
                    </th>
                    <th className="px-4 py-2 text-[#4D3A08] font-bold">
                      Previsto conforme PDCI
                    </th>
                    <th className="px-4 py-2 text-[#4D3A08] font-bold">
                      Executado conforme PDCI
                    </th>
                    <th className="px-4 py-2 text-[#4D3A08] font-bold">
                      Existente
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      tipo: "Ciclofaixa",
                      anterior: 10.9,
                      previsto: 114.7,
                      executado: 77.7,
                      existente: 318.7,
                    },
                    {
                      tipo: "Ciclovia",
                      anterior: 74.7,
                      previsto: 206,
                      executado: 130.7,
                      existente: 158.9,
                    },
                    {
                      tipo: "Ciclorrota",
                      anterior: 0,
                      previsto: 122,
                      executado: 15.5,
                      existente: 16.5,
                    },
                    {
                      tipo: "Passeio Compartilhado",
                      anterior: 0,
                      previsto: 4.3,
                      executado: 3.3,
                      existente: 7.7,
                    },
                  ].map((row) => (
                    <tr key={row.tipo} className="border-b border-[#d6c9a3]">
                      <td className="px-4 py-2 font-semibold text-[#4D3A08]">
                        {row.tipo}
                      </td>
                      <td className="px-4 py-2">{row.anterior} km</td>
                      <td className="px-4 py-2">{row.previsto} km</td>
                      <td className="px-4 py-2">{row.executado} km</td>
                      <td className="px-4 py-2">{row.existente} km</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section
        id="perfil"
        className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FFFBF0] to-[#FFF8E5]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#4D3A08] tracking-tight">
              Pesquisa Perfil do Ciclista
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#79693F] to-[#4D3A08] mx-auto rounded-full mt-6"></div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#d6c9a3]/40 hover:shadow-3xl transition-shadow">
            <p className="text-[#79693F] leading-relaxed text-justify text-base sm:text-lg font-medium">
              A{" "}
              <span className="font-bold text-[#4D3A08]">
                Pesquisa Perfil do Ciclista
              </span>
              , realizada pela Transporte Ativo, pelo Laboratório de Mobilidade
              Sustentável (LabMob/UFRJ) e pelo Observatório das Metrópoles, e
              aplicada em Fortaleza pela Prefeitura Municipal, tem como
              principal objetivo realizar um levantamento de campo destinado a
              identificar as motivações, hábitos de deslocamento e
              características sociodemográficas dos ciclistas no contexto
              urbano.
              <br />
              <br />
              Os dados obtidos e analisados constituem insumos fundamentais para
              orientar a formulação de políticas públicas e outras iniciativas
              relacionadas ao tema, promovendo o transporte cicloviário na
              cidade com base em evidências e informações qualificadas.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-b from-[#FFFBF0] to-[#FFF8E5]">
        <div className="max-w-7xl mx-auto space-y-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Há quanto tempo utiliza a bicicleta como meio de transporte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={timeUsingBike}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4D3A08" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Quantos dias da semana costuma utilizar a bicicleta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={daysPerWeek}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#79693F" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Para quais destinos utiliza a bicicleta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={destinations}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#D6C9A3" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Tempo no trajeto mais frequente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={tripTime}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {tripTime.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Principal motivação para utilizar a bicicleta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={motivations}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {motivations.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                O que faria utilizar a bicicleta com mais frequência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={improvements}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {improvements.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Você já teve sua bicicleta, ou partes dela, furtada ou roubada?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={theft}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {theft.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Você já sofreu algum tipo de importunação ou assédio enquanto
                pedalava?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={harassment}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {harassment.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Nos últimos dois anos sofreu ou esteve envolvido em alguma
                ocorrência de trânsito enquanto pedalava?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={incidents}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {incidents.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Utiliza a bicicleta em combinação com outro modo de transporte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={combinedTransport}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {combinedTransport.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Experiências Negativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={[
                    { name: "Furto/Roubo", value: 36.6 },
                    { name: "Assédio", value: 36.7 },
                    { name: "Ocorrência de Trânsito", value: 25.5 },
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#403500" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Renda Mensal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={income}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {income.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Escolaridade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={education}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4D3A08" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Faixa Etária
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={ageGroups}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#79693F" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#4D3A08]">
                Cor ou Raça
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={race}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {race.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
