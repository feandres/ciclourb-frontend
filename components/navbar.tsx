export function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="text-lg font-bold">Ciclourb</div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm font-medium hover:underline">
            Início
          </a>
          <a href="/data" className="text-sm font-medium hover:underline">
            Dados
          </a>
          <a href="/map" className="text-sm font-medium hover:underline">
            Mapa
          </a>
          <a href="/info" className="text-sm font-medium hover:underline">
            Sobre
          </a>
        </div>
      </nav>
    </header>
  );
}
