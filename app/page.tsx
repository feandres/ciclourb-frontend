import Hero from "@/components/hero";
import Image from "next/image";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function HomePage() {
  const equipe = [
    {
      nome: "Mateus Barboza",
      cargo: "Estudante de Arquitetura e Urbanismo",
      foto: "/mateus.png",
      redes: [
        { icone: <FaInstagram />, url: "https://instagram.com" },
        { icone: <FaLinkedin />, url: "https://linkedin.com" },
      ],
    },
    {
      nome: "Beatriz",
      cargo: "Estudante de Arquitetura e Urbanismo",
      foto: "/beatriz.png",
      redes: [{ icone: <FaLinkedin />, url: "https://linkedin.com" }],
    },
    {
      nome: "Felipe Andrès",
      cargo: "Desenvolvedor de Software",
      foto: "/felipe.png",
      redes: [
        { icone: <FaGithub />, url: "https://github.com/feandres" },
        { icone: <FaLinkedin />, url: "https://linkedin.com/in/feandres50" },
      ],
    },
    {
      nome: "Marcos Estrela",
      cargo: "Desenvolvedor de Software",
      foto: "/marcos.png",
      redes: [
        { icone: <FaGithub />, url: "https://github.com" },
        { icone: <FaInstagram />, url: "https://instagram.com" },
      ],
    },
  ];

  const atividades = [
    {
      titulo: "Participação de Reuniões",
      texto: `Participação em reuniões e instâncias de diálogo com o poder público, visando ao monitoramento, acompanhamento e fiscalização das ações e políticas direcionadas à promoção da ciclomobilidade no município de Fortaleza.`,
      imagem: "/reuniao.jpeg",
      legenda:
        "Papo de Pedal realizado pela BICI (Bloomberg Initiative for Cycling Infrastructure) e Prefeitura Municipal de Fortaleza em abril de 2025",
    },
    {
      titulo: "Contagens Volumétricas de Ciclistas",
      texto: `Realização de contagens volumétricas e registros sistemáticos, com o objetivo de subsidiar o planejamento das infraestruturas cicloviárias e assegurar sua implantação por meio da documentação do fluxo de ciclistas.`,
      imagem: "/hero_1.jpg",
      legenda: "",
    },
    {
      titulo: "Pesquisas e Análises",
      texto: `Elaboração de análises e estudos técnicos sobre mobilidade urbana, com ênfase no contexto do município de Fortaleza, abrangendo seu planejamento urbano e as políticas públicas de transporte implementadas.`,
      imagem: "/hero_9.jpg",
      legenda: "",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E5]">
      <Hero imageUrl="/hero_3.jpg" />

      <section className="py-12 sm:py-20 px-4 sm:px-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#4D3A08] tracking-tight">
              Sobre Nós
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#79693F] to-[#4D3A08] mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#d6c9a3]/40 hover:shadow-3xl transition-shadow duration-500">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#4D3A08] mb-2">
                  Nossa Missão
                </h3>
                <p className="text-[#79693F]/80 text-sm">
                  Promovendo uma Fortaleza mais sustentável, segura e
                  democrática
                </p>
              </div>
            </div>

            <p className="text-[#79693F] leading-relaxed text-justify text-base sm:text-lg font-medium line-height-loose">
              O <span className="font-bold text-[#4D3A08]">Ciclourb</span> é uma
              Organização da Sociedade Civil composta por ciclistas,
              pesquisadores e demais atores engajados na promoção de uma
              Fortaleza mais sustentável, segura e democrática. Sua atuação
              concentra-se na{" "}
              <span className="font-bold text-[#4D3A08]">ciclomobilidade</span>,
              abrangendo também temas correlatos como{" "}
              <span className="font-bold text-[#4D3A08]">caminhabilidade</span>{" "}
              e{" "}
              <span className="font-bold text-[#4D3A08]">
                transporte público coletivo
              </span>
              , com enfoque em planejamento urbano, mobilidade sustentável e
              políticas públicas integradas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#4D3A08] tracking-tight">
              Nossa Equipe
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#79693F] to-[#4D3A08] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {equipe.map((membro, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-[#d6c9a3]/30 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 group hover:border-[#79693F]/50"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-full overflow-hidden bg-[#e8e0c7] flex items-center justify-center mx-auto mb-4 ring-4 ring-[#d6c9a3]/20 group-hover:ring-[#79693F]/30 transition-all">
                  <Image
                    src={membro.foto}
                    alt={membro.nome}
                    width={128}
                    height={128}
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#4D3A08] mb-2 group-hover:text-[#79693F] transition-colors">
                  {membro.nome}
                </h3>
                <p className="text-sm text-[#79693F] mb-4 font-medium leading-tight">
                  {membro.cargo}
                </p>
                <div className="flex justify-center space-x-3">
                  {membro.redes.map((rede, i) => (
                    <a
                      key={i}
                      href={rede.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#79693F] hover:text-[#4D3A08] transition-all duration-200 text-lg hover:scale-110 p-2 rounded-full hover:bg-[#FFF8E5] hover:shadow-md"
                    >
                      {rede.icone}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FFFBF0] to-[#FFF8E5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#4D3A08] tracking-tight">
              Projetos e Atividades
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#79693F] to-[#4D3A08] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-16">
            {atividades.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#d6c9a3]/40 hover:shadow-3xl transition-shadow duration-500"
              >
                <div
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    idx % 2 === 1 ? "md:grid-flow-col-dense" : ""
                  }`}
                >
                  <div className={idx % 2 === 1 ? "md:col-start-2" : ""}>
                    <div className="flex items-start gap-6 mb-6">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#4D3A08] mb-2 tracking-tight">
                          {item.titulo}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[#79693F] leading-relaxed text-justify text-base sm:text-lg font-medium line-height-loose mb-4">
                      {item.texto}
                    </p>
                    {item.legenda && (
                      <div className="bg-[#FFF8E5]/50 border-l-4 border-[#79693F] pl-4 py-2 rounded-r-lg">
                        <p className="text-sm text-[#79693F] italic font-medium">
                          {item.legenda}
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    className={`relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl border-2 border-[#d6c9a3]/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 group ${
                      idx % 2 === 1 ? "md:col-start-1" : ""
                    }`}
                  >
                    <Image
                      src={item.imagem}
                      alt={item.titulo}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
