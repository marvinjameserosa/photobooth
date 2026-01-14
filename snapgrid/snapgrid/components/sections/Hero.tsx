"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Squares from "../ui/bg-particles";
import { DINEng, TTFirsNeue, segmentA, segmentAbold } from "@/lib/fonts";
import Link from "next/link";


function FeatureIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={32}
      height={32}
      className="h-8 w-8"
      priority
    />
  );
}

function BusIcon() {
  return (
    <svg
      aria-hidden
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <rect height="12" rx="2" width="16" x="4" y="4" />
      <path d="M6 16h12" />
      <circle cx="9" cy="18" r="1" />
      <circle cx="15" cy="18" r="1" />
    </svg>
  );
}

const featureCards = [
  { title: "Capture", icon: <FeatureIcon src="/icons/camera%20(yellow).png" alt="Camera" /> },
  { title: "Arrange", icon: <FeatureIcon src="/icons/grid%20(yellow).png" alt="Grid" /> },
  { title: "Enhance", icon: <FeatureIcon src="/icons/flash.png" alt="Flash" /> },
  { title: "Share", icon: <FeatureIcon src="/icons/map%20(yellow).png" alt="Map" /> },
];

function formatStatusTimestamp(date: Date): string {
  const pad = (value: number) => value.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${year}-${month}-${day}`;
}

export default function Hero() {
  const [systemTimestamp, setSystemTimestamp] = useState<string>(() =>
    formatStatusTimestamp(new Date())
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSystemTimestamp(formatStatusTimestamp(new Date()));
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="relative isolate h-screen overflow-hidden bg-black text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,0,0,0.08)_0%,_rgba(0,0,0,0)_55%)]"
      />

      <div className="pointer-events-none absolute inset-0 opacity-30">
        <Squares
          direction="diagonal"
          speed={0.4}
          borderColor="rgba(255,255,255,0.07)"
          hoverFillColor="rgba(255,0,0,0.12)"
          squareSize={56}
        />
      </div>

      <div className="pointer-events-none absolute left-6 top-6 h-14 w-14 border-l-2 border-t-2 border-yellow-400/80" />
      <div className="pointer-events-none absolute right-6 top-6 h-14 w-14 border-r-2 border-t-2 border-yellow-400/80" />
      <div className="pointer-events-none absolute bottom-12 left-6 h-14 w-14 border-b-2 border-l-2 border-yellow-400/80" />
      <div className="pointer-events-none absolute bottom-12 right-6 h-14 w-14 border-b-2 border-r-2 border-yellow-400/80" />

      <div className="pointer-events-none absolute inset-x-12 top-1/2 h-px bg-white/5" />
      <div className="pointer-events-none absolute inset-y-12 left-1/2 w-px bg-white/5" />
      <div className="pointer-events-none absolute left-12 top-1/3 h-16 w-px bg-yellow-400/70" />
      <div className="pointer-events-none absolute right-12 bottom-1/4 h-16 w-px bg-yellow-400/70" />
      <div className="pointer-events-none absolute left-16 bottom-1/3 h-1 w-8 bg-red-500/80" />
      <div className="pointer-events-none absolute right-16 top-1/3 h-1 w-8 bg-red-500/80" />

      <div className="relative mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-between box-border px-6 py-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex items-center gap-4 rounded-sm border border-neutral-800 bg-neutral-900/70 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-neutral-300">
            <span className="flex items-center gap-2 text-green-500">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              System Online
            </span>
            <span className="h-3 w-px bg-neutral-700" />
            <span className="text-neutral-500">{systemTimestamp}</span>
          </div>

          <div className="font-dsdigi flex items-center gap-6 border-red-500 bg-red-600/95 px-4 py-2 text-xl uppercase tracking-[100rem]]">
            <span className="flex items-center">
              <BusIcon />
            </span>
            <span className="flex items-center gap-">
              <span>5 G</span>
            </span>
          </div>

          <div className={`${segmentAbold.className} space-y-2`}>
            <h1 className="text-15xl font-extrabold leading-[0.8] tracking-[0.01em] sm:text-8xl md:text-9xl">
              <span className="block tracking-normal text-white">SnapGrid</span>
              <span className="block tracking-normal text-yellow-400">Station</span>
            </h1>
          </div>
        </div>

        <div className={`${TTFirsNeue.className} relative mx-auto mt-8 w-full max-w-md`}>
          <span className="pointer-events-none absolute left-108 top-12.5 right-0 h-2.5 w-2.5 translate-x-1/2 translate-y-1/2 bg-red-600" />
          <span className="pointer-events-none absolute right-0 top-12.5 left-1.5 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 bg-red-600" />
          <span className="pointer-events-none absolute bottom-12.5 left-108 right-20 h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2 bg-red-600" />
          <span className="pointer-events-none absolute bottom-12.5 right-108 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-red-600" />
          <div className="border border-neutral-700 bg-neutral-900/75 px-10 py-5 text-center text-base tracking-[0.28em] text-neutral-400 shadow-[0_0_25px_rgba(255,0,0,0.08)]">
            <span className="whitespace-nowrap">Are you lost in the city too?</span>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col items-center justify-center gap-12">
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((feature) => (
              <Card key={feature.title} icon={feature.icon} title={feature.title} />
            ))}
          </div>

          <div className="font-dsdigi flex flex-col items-center gap-3 text-center">
            <div className="relative">
              <span className="pointer-events-none absolute inset-x-4 -bottom-6 h-12 -translate-y-1/2 rounded-full bg-red-500/45 blur-2xl" />
              <Link href={"/grid-layout-selection"}>
                <Button
                  size="lg"
                  className="relative z-10 border border-red-400/70 bg-red-600 px-12 py-3 text-white shadow-[0_0_40px_rgba(255,0,0,0.35)] hover:bg-red-500 !font-light tracking-[0.2em]"
                >
                  {"-> ENTER STATION ->"}
                </Button>
              </Link>
            </div>
            <p className={`${DINEng.className} text-[0.65rem] uppercase tracking-[0.35em] text-neutral-500`}>
              Press to begin your photo journey
            </p>
          </div>
        </div>

        
        <div className="relative w-full max-w-2xl self-center">
          <div className="relative z-10 flex w-full items-center justify-between gap-4 rounded-sm border border-neutral-800 bg-neutral-900/70 px-5 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-neutral-400">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 border border-red-600 bg-red-500 shadow-[0_0_12px_rgba(255,0,0,0.5)]" />
              Platform Ready
            </span>
            <span aria-hidden className="h-4 w-px bg-neutral-700" />
            <span>4 Layouts + Unlimited Memories</span>
          </div>
          <div className="absolute left-1/2 top-full h-3 w-[calc(100vw-3rem)] max-w-none -translate-x-1/2 bg-yellow-300/40 shadow-[0_0_40px_rgba(255,255,0,0.25)]" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/3 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(255,255,0,0.06)_0%,_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%223%22%20height%3D%223%22%20viewBox%3D%220%200%203%203%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%220.5%22%20fill%3D%22%23ff0000%22%20fill-opacity%3D%220.15%22/%3E%3C/svg%3E')] opacity-40" />
    </section>
  );
}