import { FaInstagram, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#4D3A08] via-[#403500] to-[#4D3A08] text-[#FFF8E5] border-t-2 border-[#79693F]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 sm:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#79693F] to-[#FFF8E5] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-[#4D3A08] font-bold text-lg">C</span>
              </div>
              <h3 className="text-xl font-bold text-white">Ciclourb</h3>
            </div>
            <p className="text-[#FFF8E5]/80 text-sm leading-relaxed">
              Organização da Sociedade Civil promovendo mobilidade sustentável,
              planejamento urbano e políticas públicas integradas em Fortaleza.
            </p>
            <div className="flex items-center gap-2 text-[#FFF8E5]/70 text-sm">
              <FaMapMarkerAlt className="text-[#79693F]" />
              <span>Fortaleza, Ceará - Brasil</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-4">Contato</h4>
            <div className="space-y-3">
              <a
                href="mailto:contato@ciclourb.org"
                className="flex items-center gap-3 text-[#FFF8E5]/80 hover:text-white transition-colors duration-200 text-sm group"
              >
                <div className="w-8 h-8 bg-[#79693F]/20 rounded-full flex items-center justify-center group-hover:bg-[#79693F]/30 transition-colors">
                  <FaEnvelope className="text-[#79693F] text-sm" />
                </div>
                <span>ciclourbfortaleza@gmail.com</span>
              </a>
              <a
                href="https://www.instagram.com/ciclourb/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#FFF8E5]/80 hover:text-white transition-colors duration-200 text-sm group"
              >
                <div className="w-8 h-8 bg-[#79693F]/20 rounded-full flex items-center justify-center group-hover:bg-[#79693F]/30 transition-colors">
                  <FaInstagram className="text-[#79693F] text-sm" />
                </div>
                <span>@ciclourb</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 text-[#FFF8E5]/70">
              <span>&copy; {new Date().getFullYear()} Ciclourb.</span>
              <span className="hidden sm:inline">•</span>
              <span>Todos os direitos reservados.</span>
            </div>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-white/5">
            <p className="text-xs text-[#FFF8E5]/50">
              Observatório Cicloviário desenvolvido pela equipe Ciclourb
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
