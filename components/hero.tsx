export function Hero() {
  return (
    <section
      className="relative h-[500px] flex items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/hero.png')", 
      }}
    >
      <div className="bg-black/50 absolute inset-0" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Bem-vindo ao Ciclourb
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Plataforma de análise e visualização de dados cicloviários.
        </p>
      </div>
    </section>
  );
}
