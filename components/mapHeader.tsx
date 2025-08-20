'use client';

import { useFilterContext } from "@/contexts/FilterContext"

export default function MapHeader() {

  const { filters, setFilters } = useFilterContext();

  return (
    <header className="fixed z-10 p-4 w-full bg-white/75">
      <div className="flex justify-between items-center">
        <a href="/home" className="">
          <img
            src="/logo.png"
            alt="Ciclourb Logo"
            className="h-10 md:h-12 lg:h-14 transition-opacity hover:opacity-80"
            />
        </a>
        <nav className="hidden md:block">
          <select
            className="p-2 m-2"
            value={filters.sentido}
            onChange={(e) => setFilters({ ...filters, sentido: e.target.value })}
            >
            <option value="">Sentido</option>
            <option value="Bidirecional">Bidirecional</option>
            <option value="Unidirecional">Unidirecional</option>
          </select>

          <select
            className="p-2 m-2"
            value={filters.prazo}
            onChange={(e) => setFilters({ ...filters, prazo: e.target.value })}
            >
            <option value="">Prazo</option>
            <option value="Curto">Curto</option>
            <option value="Médio">Médio</option>
            <option value="Longo">Longo</option>
          </select>

          <select
            className="p-2 m-2"
            value={filters.executado}
            onChange={(e) => setFilters({ ...filters, executado: e.target.value })}
            >
            <option value="">Executado</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>

          <select
            className="p-2 m-2"
            value={filters.dentro_do_prazo}
            onChange={(e) => setFilters({ ...filters, dentro_do_prazo: e.target.value })}
            >
            <option value="">Dentro do Prazo</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
          <select
            className="p-2 m-2"
            value={filters.ano}
            onChange={(e) => setFilters({ ...filters, ano: e.target.value })}
            >
            <option value="">Ano</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2007">2007</option>
            <option value="2004">2004</option>
            <option value="2000">2000</option>
          </select>
        </nav>
      </div>
    </header>
  )
}

