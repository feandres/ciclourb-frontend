import React from "react";
import { Download } from "lucide-react";

const Page = () => {
  const timelineData = [
    {
      year: 2007,
      title: "Desafio Intermodal 2007",
      image:
        "/desafio-intermodal/docs/Desafio Intermodal Fortaleza 2007 - Notícia [João Alfredo].pdf",
      downloadLink:
        "/desafio-intermodal/docs/Desafio Intermodal Fortaleza 2007 - Notícia [João Alfredo].pdf",
    },
    {
      year: 2013,
      title: "Desafio Intermodal 2013",
      image:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2013 - Gráfico [Ciclovida].pdf",
      downloadLink:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2013 - Gráfico [Ciclovida].pdf",
    },
    {
      year: 2014,
      title: "Desafio Intermodal 2014",
      image:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2014 - Gráfico [Ciclovida].pdf",
      downloadLink:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2014 - Gráfico [Ciclovida].pdf",
    },
    {
      year: 2015,
      title: "Desafio Intermodal 2015",
      image:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2015 - Gráfico [Ciclovida].pdf",
      downloadLink:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2015 - Gráfico [Ciclovida].pdf",
    },
    {
      year: 2016,
      title: "Desafio Intermodal 2016",
      image:
        "/desafio-intermodal/docs/Desafio Intermodal Fortaleza 2016 - Relatório [Ciclovida].pdf",
      downloadLink:
        "/desafio-intermodal/docs/Desafio Intermodal Fortaleza 2016 - Relatório [Ciclovida].pdf",
    },
    {
      year: 2017,
      title: "Desafio Intermodal 2017",
      image:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2017 - Relatório [Ciclovida].pdf",
      downloadLink:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2017 - Relatório [Ciclovida].pdf",
    },
    {
      year: 2018,
      title: "Desafio Intermodal 2018",
      image:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2018 - Relatório [Ciclovida].pdf",
      downloadLink:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2018 - Relatório [Ciclovida].pdf",
    },
    {
      year: 2019,
      title: "Desafio Intermodal 2019",
      image:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2019 - Relatório [Ciclovida].pdf",
      downloadLink:
        "/desafio-intermodal/docs/Desafio intermodal Fortaleza 2019 - Relatório [Ciclovida].pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E5]">
      <section
        className="relative w-full bg-[#54728C]"
        style={{ backgroundColor: "#54728C" }}
      >
        <div className="hidden md:block w-full" style={{ height: "400px" }}>
          <img
            src="/desafio-intermodal/hero/CAPA.png"
            alt="Desafio Intermodal - Fortaleza CE 9ª Edição"
            className="w-full h-full object-contain"
            style={{ maxWidth: "1920px", margin: "0 auto", display: "block" }}
          />
        </div>

        <div
          className="block md:hidden w-full justify-center items-center"
          style={{ minHeight: "300px" }}
        >
          <img
            src="/desafio-intermodal/hero/CAPA_MOBILE.png"
            alt="Desafio Intermodal - Fortaleza CE 9ª Edição Mobile"
            className="max-w-full h-auto object-contain"
            style={{ maxHeight: "80vh", width: "auto" }}
          />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{ color: "#244A6B" }}
          >
            Sobre
          </h2>

          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-8 text-white text-lg leading-relaxed text-justify"
              style={{ backgroundColor: "#54728C" }}
            >
              O Desafio Intermodal promovido em diversas cidades do Brasil e do
              mundo, tem como principal finalidade avaliar a eficiência dos
              diferentes modos de transporte em um trajeto específico durante o
              horário de pico. Para isso, são utilizados diversos meios de
              deslocamento como caminhada, bicicleta, ônibus, motocicleta,
              automóvel, entre outros, analisando o tempo total de viagem, o
              custo financeiro envolvido e a emissão de poluentes associada a
              cada alternativa de deslocamento.
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{ color: "#244A6B" }}
          >
            Aplicação
          </h2>

          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-8 text-white text-lg leading-relaxed"
              style={{ backgroundColor: "#54728C" }}
            >
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 flex-shrink-0">•</span>
                  <span>
                    O Desafio Intermodal deverá contar com pelo menos cinco
                    modos de transporte, com ao menos um participante por modo:
                    bicicleta, carro, motocicleta, ônibus e caminhada, podendo
                    outros modos como skate, patinete, assim como transportes
                    por aplicativo e de micromobilidade;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 flex-shrink-0">•</span>
                  <span>
                    O evento deverá contar com um ponto de apoio inicial e um
                    ponto de apoio final, que funcionarão de forma simultânea
                    durante sua realização;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 flex-shrink-0">•</span>
                  <span>
                    Neste ano o desafio deverá ocorrer no dia 18 de setembro, na
                    Semana da Mobilidade, celebrada anualmente em cidades de
                    todo o mundo. O percurso é de aproximadamente oito
                    quilômetros, com concentração na Praça da Imprensa, no
                    bairro Dionísio Torres, a partir das 17h, e o destino é o
                    Parque Rachel de Queiroz , no bairro Presidente Kennedy.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{ color: "#244A6B" }}
          >
            Orientações
          </h2>

          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-8 text-white text-lg leading-relaxed"
              style={{ backgroundColor: "#54728C" }}
            >
              <p className="mb-6 font-medium">Cada participante deverá:</p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 flex-shrink-0">•</span>
                  <span>
                    Iniciar o percurso a partir dos pontos de saída no mesmo
                    horário estabelecido;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 flex-shrink-0">•</span>
                  <span>
                    Ter conhecimento do uso do modo de transporte em que está
                    inscrito;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 flex-shrink-0">•</span>
                  <span>
                    Possuir o meio de transporte inscrito, no caso de modos
                    individuais em alguma parte do trajeto;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 flex-shrink-0">•</span>
                  <span>
                    Utilizar o aplicativo Strava para registrar o deslocamento;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 flex-shrink-0">•</span>
                  <span>
                    Respeitar o Código de Trânsito durante todo o percurso, de
                    acordo com as especificidades de cada modo;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 flex-shrink-0">•</span>
                  <span>
                    Escolher seus percursos de forma independente, da maneira
                    mais conveniente, sem violar o Código de Trânsito;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 flex-shrink-0">•</span>
                  <span>
                    Realizar o percurso em velocidade compatível com seu
                    deslocamento cotidiano, sem tentar alterar intencionalmente
                    o tempo de viagem para favorecer seu modo ou outro
                    participante.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "#244A6B" }}
            >
              Saiba mais
            </h3>
            <a
              href="/desafio-intermodal/docs/Desafio Intermodal 2025 - Fortaleza_CE_DOC.pdf"
              className="inline-block text-lg font-medium underline hover:no-underline transition-all"
              style={{ color: "#244A6B" }}
            >
              link para download
            </a>
          </div>

          <div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "#244A6B" }}
            >
              Inscrição
            </h3>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSer3O48acecgJMuYFnPNaCMtju0d-ei7kj1RLbduZwoTnD9MQ/viewform?usp=header"
              className="inline-block text-lg font-medium underline hover:no-underline transition-all"
              style={{ color: "#244A6B" }}
            >
              link para o formulário
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-16"
            style={{ color: "#244A6B" }}
          >
            Outras Edições
          </h2>

          <div className="relative overflow-x-auto">
            <div
              className="absolute top-8 left-0 right-0 h-1 rounded"
              style={{ backgroundColor: "#244A6B" }}
            ></div>

            <div className="flex justify-between items-start min-w-full gap-4 pb-4">
              {timelineData.map((item) => (
                <div
                  key={item.year}
                  className="flex flex-col items-center relative flex-shrink-0"
                  style={{ minWidth: "140px" }}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-lg z-10 mb-4"
                    style={{ backgroundColor: "#244A6B" }}
                  ></div>

                  <div
                    className="text-xl font-bold mb-4 whitespace-nowrap"
                    style={{ color: "#244A6B" }}
                  >
                    {item.year}
                  </div>

                  <div className="relative group mb-4">
                    <div className="w-24 h-32 bg-white border border-gray-200 rounded shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden">
                      <iframe
                        src={`${item.image}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full pointer-events-none"
                        style={{
                          transform: "scale(0.25)",
                          transformOrigin: "top left",
                          width: "400%",
                          height: "400%",
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <a
                    href={item.downloadLink}
                    className="text-xs font-medium underline hover:no-underline transition-all text-center"
                    style={{ color: "#244A6B" }}
                  >
                    download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full" style={{ backgroundColor: "#54728C" }}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Realização
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            <div className="flex-shrink-0">
              <img
                src="/desafio-intermodal/logos/ciclovida-logo.png"
                alt="Ciclo Vida"
                className="h-28 md:h-36 w-auto object-contain"
              />
            </div>

            <div className="flex-shrink-0">
              <img
                src="/desafio-intermodal/logos/ciclourb-logo-branca.png"
                alt="Ciclo URB"
                className="h-28 md:h-36 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
