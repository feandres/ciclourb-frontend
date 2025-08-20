import React from "react";
import Hero from "@/components/hero";

export default function DataPage() {
  return (
    <>
      <Hero imageUrl="/mateus.png" />

      

      <section className="w-full bg-[#403500] text-white px-6 py-10">
        <h2 className="text-lg font-bold mb-8">Resumo</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-xl font-medium">Malha Cicloviária</p>
            <p className="text-3xl font-semibold mt-2">501,7 km</p>
          </div>
          <div>
            <p className="text-xl font-medium">Estações Bicicletar</p>
            <p className="text-3xl font-semibold mt-2">253</p>
          </div>
          <div>
            <p className="text-xl font-medium">Malha Proposta PDCI</p>
            <p className="text-3xl font-semibold mt-2">438,6 km</p>
          </div>
          <div>
            <p className="text-xl font-medium">Implantado Conforme PDCI</p>
            <p className="text-3xl font-semibold mt-2">*</p>
          </div>
        </div>

        <p className="text-sm mt-8 text-right">
          Última atualização: XX/XX/XXXX
        </p>
      </section>

      <section className="w-full px-6 py-10">
        <h3 className="text-xl font-bold mb-4">Malha Cicloviária Atualizada</h3>
        <p className="text-justify leading-relaxed text-gray-800">
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
      </section>

      <section className="w-full px-6 py-10">
        <h3 className="text-xl font-bold mb-4">
          Contagens Volumétricas de Ciclistas
        </h3>
        <p className="text-justify leading-relaxed text-gray-800">
          A tabulação dos dados de contagens tem como finalidade subsidiar o
          planejamento das infraestruturas cicloviárias e respaldar sua
          implantação e manutenção por meio do registro documentado do fluxo de
          ciclistas. As informações disponibilizadas em nossa plataforma são
          provenientes de levantamentos realizados pela Autarquia Municipal de
          Trânsito e Cidadania (AMC), pela Associação dos Ciclistas Urbanos de
          Fortaleza (Ciclovida) e pelo Ciclourb.
        </p>
      </section>

      <section className="w-full px-6 py-10">
        <h3 className="text-xl font-bold mb-4">
          Análise do Plano Diretor Cicloviário Integrado de Fortaleza/CE
        </h3>
        <p className="text-justify leading-relaxed text-gray-800">
          O Plano Cicloviário de Fortaleza tem como objetivo central fornecer à
          cidade os instrumentos e a infraestrutura necessários para a
          implantação de uma rede cicloviária integrada ao sistema de transporte
          público de passageiros e aos equipamentos urbanos, promovendo o uso de
          modos de transporte não motorizados. Nesse contexto, o Observatório
          Cicloviário de Fortaleza, mantido pelo Ciclourb, atua no monitoramento
          da execução do plano, bem como de suas alterações e eventuais
          incongruências, por meio da coleta de dados e da elaboração de
          análises técnicas.
        </p>
      </section>
    </>
  );
}
