export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16">
      <div className="max-w-xl w-full text-center">

        {/* Logo area — reemplazar con <Image> cuando tengamos los logos */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <span className="text-3xl font-bold tracking-tight text-gray-900">
            AATA Inclusion
          </span>
        </div>

        <div className="w-14 h-1 bg-gray-900 rounded-full mx-auto mb-10" />

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug mb-6">
          Estamos trabajando en nuestro sitio web
        </h1>

        <p className="text-lg text-gray-500 leading-relaxed">
          Muy pronto vas a poder encontrar acá toda la información.
          <br className="hidden sm:block" />
          Mientras tanto, gracias por tu paciencia.
        </p>

      </div>
    </main>
  );
}
