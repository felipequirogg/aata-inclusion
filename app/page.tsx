import LogoArea from "./LogoArea";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16">
      <div className="max-w-xl w-full text-center">

        <LogoArea />

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-2 animate-dissolve [animation-delay:200ms]">
          Estamos trabajando en nuestro sitio web
        </h1>

        <p className="text-base sm:text-lg text-gray-500 leading-relaxed animate-dissolve [animation-delay:400ms]">
          Muy pronto vas a poder encontrar acá toda la información.
          <br className="hidden sm:block" />
          Mientras tanto, gracias por tu paciencia.
        </p>

      </div>
    </main>
  );
}
