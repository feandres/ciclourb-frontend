export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 px-4 sm:flex-row">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Ciclourb. Todos os direitos reservados.
        </p>
        <div className="flex gap-4 text-sm text-gray-500">
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
          <a href="#">Github</a>
          <a href="https://www.instagram.com/ciclourb/">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
