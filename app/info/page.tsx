import Image from "next/image";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function SobreNosPage() {
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
    <section className="container mx-auto px-4 py-12 space-y-16">
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

      <div>
        <h2 className="text-2xl font-bold mb-6">Desenvolvimento do Projeto</h2>
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          efficitur volutpat nunc, ut laoreet sem facilisis et. Nam et risus sed
          erat fermentum viverra. Ut dignissim leo sed velit faucibus interdum.
          Suspendisse potenti. Nulla facilisi. Duis consequat fermentum orci, et
          accumsan nunc blandit ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          efficitur volutpat nunc, ut laoreet sem facilisis et. Nam et risus sed
          erat fermentum viverra. Ut dignissim leo sed velit faucibus interdum.
          Suspendisse potenti. Nulla facilisi. Duis consequat fermentum orci, et
          accumsan nunc blandit ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          efficitur volutpat nunc, ut laoreet sem facilisis et. Nam et risus sed
          erat fermentum viverra. Ut dignissim leo sed velit faucibus interdum.
          Suspendisse potenti. Nulla facilisi. Duis consequat fermentum orci, et
          accumsan nunc blandit ac.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          efficitur volutpat nunc, ut laoreet sem facilisis et. Nam et risus sed
          erat fermentum viverra. Ut dignissim leo sed velit faucibus interdum.
          Suspendisse potenti. Nulla facilisi. Duis consequat fermentum orci, et
          accumsan nunc blandit ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          efficitur volutpat nunc, ut laoreet sem facilisis et. Nam et risus sed
          erat fermentum viverra. Ut dignissim leo sed velit faucibus interdum.
          Suspendisse potenti. Nulla facilisi. Duis consequat fermentum orci, et
          accumsan nunc blandit ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          efficitur volutpat nunc, ut laoreet sem facilisis et. Nam et risus sed
          erat fermentum viverra. Ut dignissim leo sed velit faucibus interdum.
          Suspendisse potenti. Nulla facilisi. Duis consequat fermentum orci, et
          accumsan nunc blandit ac.
        </p>
      </div>


    </section>
  );
}
