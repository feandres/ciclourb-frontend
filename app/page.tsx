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
      legenda:
        "Análise técnica do Plano Diretor Cicloviário do município de Fortaleza.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero imageUrl="/hero_3.jpg" />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Sobre Nós</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-justify text-lg">
              O Ciclourb é uma Organização da Sociedade Civil composta por
              ciclistas, pesquisadores e demais atores engajados na promoção de
              uma Fortaleza mais sustentável, segura e democrática. Sua atuação
              concentra-se na ciclomobilidade, abrangendo também temas
              correlatos como caminhabilidade e transporte público coletivo, com
              enfoque em planejamento urbano, mobilidade sustentável e políticas
              públicas integradas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 text-center">
            Nossa Equipe
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {equipe.map((membro, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-24 h-24 relative rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <Image
                    src={membro.foto}
                    alt={membro.nome}
                    width={96}
                    height={96}
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {membro.nome}
                  </h3>
                  <p className="text-gray-600 text-sm">{membro.cargo}</p>
                </div>
                <div className="flex space-x-3 pt-2">
                  {membro.redes.map((rede, i) => (
                    <a
                      key={i}
                      href={rede.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-green-600 text-lg transition-colors duration-200"
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

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            Projetos e Atividades
          </h2>
          <div className="space-y-12">
            {atividades.map((item, idx) => (
              <div
                key={idx}
                className={`grid md:grid-cols-2 gap-8 items-center p-8 bg-white rounded-lg shadow-sm border border-gray-100 ${
                  idx % 2 === 1 ? "md:grid-flow-col-dense" : ""
                }`}
              >
                <div className={idx % 2 === 1 ? "md:col-start-2" : ""}>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {item.titulo}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-justify mb-3">
                    {item.texto}
                  </p>
                  {item.legenda && (
                    <p className="text-sm text-gray-500 italic">
                      {item.legenda}
                    </p>
                  )}
                </div>
                <div
                  className={`relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 ${
                    idx % 2 === 1 ? "md:col-start-1" : ""
                  }`}
                >
                  <Image
                    src={item.imagem}
                    alt={item.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
