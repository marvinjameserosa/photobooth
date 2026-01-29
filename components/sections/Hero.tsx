"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import BokehBackground from "@/components/ui/BokehBackground";
import Link from "next/link";

function CameraIcon() {
  return (
    <svg
      aria-hidden
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
  );
}

function ArrangeIcon() {
  return (
    <svg
      aria-hidden
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  );
}

function EnhanceIcon() {
  return (
    <svg
      aria-hidden
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      aria-hidden
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>
  );
}

const featureCards = [
  { title: "Capture", icon: <CameraIcon /> },
  { title: "Arrange", icon: <ArrangeIcon /> },
  { title: "Enhance", icon: <EnhanceIcon /> },
  { title: "Share", icon: <ShareIcon /> },
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden text-white">
      {/* Bokeh Background Effect */}
      <BokehBackground />

      {/* Bokeh Background Effect */}
      <BokehBackground />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-32">

        {/* Section Label */}
        <div className="section-label mb-6">
          SnapGrid Photobooth 2026
        </div>

        {/* Main Heading */}
        <div className={`text-center space-y-2 mb-8`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight max-w-4xl">
            Capture, create, and share your <span className="text-[#FF6B35]">memories.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`max-w-xl text-center mb-10`}>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Your personal photobooth experience. Choose from stunning layouts,
            capture moments, and create beautiful photo grids to share with friends.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link href="/grid-layout-selection">
            <Button size="lg" variant="primary">
              GET STARTED
            </Button>
          </Link>
          <Link href="#layouts">
            <Button size="lg" variant="secondary">
              VIEW LAYOUTS
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div id="features" className="grid w-full max-w-3xl gap-4 grid-cols-2 sm:grid-cols-4 mt-8">
          {featureCards.map((feature) => (
            <Card key={feature.title} icon={feature.icon} title={feature.title} />
          ))}
        </div>

        {/* Scroll Indicator */}
        <Link href="#layouts" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="section-label text-xs">Explore Layouts</span>
          <svg
            className="w-5 h-5 text-[#00CED1] animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>

      {/* Decorative Infinity Logo (Right Side) */}
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
        <svg
          width="280"
          height="180"
          viewBox="0 0 280 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroGrad" x1="70" y1="20" x2="320" y2="160">
              <stop offset="0%" stopColor="#00CED1" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#FF6B35" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}