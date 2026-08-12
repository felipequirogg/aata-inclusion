"use client";

import Image from "next/image";

export default function LogoArea() {
  return (
    <div
      className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-6 sm:gap-6 mb-10 sm:mb-12 animate-dissolve [animation-delay:0ms] relative select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <Image
        src="/logo-aata.svg"
        alt=""
        width={320}
        height={94}
        priority
        draggable={false}
        className="w-[160px] sm:w-[240px] md:w-[320px] h-auto"
      />
      <div className="hidden sm:block w-px h-16 md:h-20 bg-gray-300 shrink-0" />
      <Image
        src="/logo-aatai.svg"
        alt=""
        width={320}
        height={76}
        priority
        draggable={false}
        className="w-[150px] sm:w-[230px] md:w-[320px] h-auto"
      />
      <div className="absolute inset-0" onContextMenu={(e) => e.preventDefault()} />
    </div>
  );
}
