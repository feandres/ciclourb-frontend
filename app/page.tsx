import { Hero } from "@/components/hero";
import Image from "next/image";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function HomePage() {
  const equipe = [
    {
      nome: "Mateus Barboza",
      cargo: "Arquiteto e Urbanista",
      foto: "/mateus.png",
      redes: [
        { icone: <FaInstagram />, url: "https://instagram.com" },
        { icone: <FaLinkedin />, url: "https://linkedin.com" },
      ],
    },
    {
      nome: "Beatriz",
      cargo: "Arquiteta e Urbanista",
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

  return (
    <>
      <Hero />

      <section className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto text-justify leading-relaxed">
          <h2 className="text-2xl font-bold mb-4">Sobre Nós</h2>
          <p className="text-gray-700">
            O Ciclourb é uma Organização da Sociedade Civil composta por
            ciclistas, pesquisadores e demais atores engajados na promoção de
            uma Fortaleza mais sustentável, segura e democrática. Sua atuação
            concentra-se na ciclomobilidade, abrangendo também temas correlatos
            como caminhabilidade e transporte público coletivo, com enfoque em
            planejamento urbano, mobilidade sustentável e políticas públicas
            integradas.
          </p>
        </div>
      </section>

      <section className="container mx-auto py-12 px-4">
        <div>
          <h2 className="text-2xl font-bold mb-8">Nossa Equipe</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {equipe.map((membro, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="w-32 h-32 relative rounded-full overflow-hidden">
                  <Image
                    src={membro.foto}
                    alt={membro.nome}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{membro.nome}</h3>
                  <p className="text-gray-500 text-sm">{membro.cargo}</p>
                </div>
                <div className="flex space-x-3">
                  {membro.redes.map((rede, i) => (
                    <a
                      key={i}
                      href={rede.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 text-xl"
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

      <section className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-4">Participação em Atividades</h2>
        <div className="max-w-3xl mx-auto text-justify leading-relaxed">
          <h3 className="text-2xl font-bold mb-4">Participação de Reuniões</h3>
          <p className="text-gray-700">
            Participação em reuniões e instâncias de diálogo com o poder
            público, visando ao monitoramento, acompanhamento e fiscalização das
            ações e políticas direcionadas à promoção da ciclomobilidade no
            município de Fortaleza.
          </p>
        </div>
      </section>
    </>
  );
}
