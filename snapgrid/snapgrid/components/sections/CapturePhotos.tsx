"use client";
import React, { useState, useEffect, Suspense } from "react"; 
import { useSearchParams, useRouter } from 'next/navigation'; 
import Squares from '@/components/ui/bg-particles';
import Sidebar from '@/components/ui/sidebar';

import PhotoCaptureLayout from '@/components/ui/PhotoCaptureLayout';

//DATA: THE LAYOUT DEFINITIONS ---
const LAYOUT_CONFIGS: Record<string, { size: number; columns: number; title: string }> = {
  '1': { size: 4, columns: 2, title: 'SUBWAY 1' },     // 4-Cut
  '2': { size: 6, columns: 3, title: 'SUBWAY 2' },     // Doors
  '3': { size: 4, columns: 1, title: 'ELEVATOR' },     // Vertical Strip
  '4': { size: 6, columns: 2, title: 'TRANSIT' },      // Route Map
};

type Station = {
  id: number;
  title: string;
  subtitle?: string;
};

const journeySteps: Station[] = [
  { id: 1, title: "STATION 01", subtitle: "SELECT LAYOUT" },
  { id: 2, title: "STATION 02", subtitle: "CAPTURE PHOTOS" },
  { id: 3, title: "STATION 03", subtitle: "PHOTO GALLERY" },
  { id: 4, title: "STATION 04", subtitle: "SHARE RESULTS" },
];

function StationBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex items-center justify-center px-10 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#ff1414]">
      <span className="absolute inset-0 border border-[#ff1414]/80" aria-hidden />
      <span className="absolute -top-1 -left-1 h-3 w-3  bg-[#ff1414]" aria-hidden />
      <span className="absolute -top-1 -right-1 h-3 w-3  bg-[#ff1414]" aria-hidden />
      <span className="absolute -bottom-1 -left-1 h-3 w-3  bg-[#ff1414]" aria-hidden />
      <span className="absolute -bottom-1 -right-1 h-3 w-3 bg-[#ff1414]" aria-hidden />
      <span className="relative tracking-[0.4em]">{children}</span>
    </span>
  );
}


  function CapturePhotosContent() {
    const searchParams = useSearchParams();
    
    const currentStationId = searchParams.get('station') || '1';
    
    // Get the config based on the station ID
    const activeConfig = LAYOUT_CONFIGS[currentStationId] || LAYOUT_CONFIGS['1'];

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeStationId, setActiveStationId] = useState<number>(2); // 2 = Capture Step
    const [isDesktop, setIsDesktop] = useState<boolean>(true);

    useEffect(() => {
        const checkWidth = () => {
             const desktop = window.innerWidth >= 1000;
             setIsDesktop(desktop);
             if (desktop) setIsSidebarOpen(true);
             else setIsSidebarOpen(false);
        };
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    return (
      <div className="min-h-screen flex bg-[#0a0a0a] text-gray-100">
        {!isDesktop && !isSidebarOpen && (
             <button onClick={() => setIsSidebarOpen(true)} className="fixed top-4 left-4 z-40 p-2">
                 <div className="w-8 h-8 flex flex-col items-center justify-center gap-1.5">
                    <span className="block w-6 h-0.5 bg-yellow-400" />
                    <span className="block w-6 h-0.5 bg-yellow-400" />
                    <span className="block w-6 h-0.5 bg-yellow-400" />
                 </div>
             </button>
        )}

        <Sidebar
          stations={journeySteps}
          activeStationId={activeStationId}
          isOpen={isSidebarOpen}
          isDesktop={isDesktop}
          onClose={() => setIsSidebarOpen(false)}
          onSelect={(id) => setActiveStationId(id)}
          onToggle={() => setIsSidebarOpen((v) => !v)}
        />

        <main className="relative flex-1 p-12">
          <div className={`${(!isDesktop && isSidebarOpen) ? 'block' : 'hidden'} fixed inset-0 bg-black/40 z-20`} onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute inset-0 z-0 pointer-events-none">
             <Squares speed={0.5} squareSize={48} direction="diagonal" borderColor={'rgba(255,255,255,0.04)'} hoverFillColor={'rgba(255,255,255,0.02)'} />
          </div>

          <div className="relative max-w-6xl mx-auto z-10">
            <div className="text-center mb-8">
              <StationBadge>STATION 02</StationBadge>
              <h1 className="mt-6 tracking-tight">
                <p className="block text-4xl md:text-6xl font-normal leading-none">CAPTURE <span className="inline text-4xl md:text-6xl font-extrabold leading-none text-red-600">PHOTOS</span></p>
              </h1>

            
              <p className="mt-3 text-gray-400 flex items-center justify-center gap-3">
                 <span className="h-px w-8 bg-gray-600" />
                 0/{activeConfig.size} PHOTOS CAPTURED
                 <span className="h-px w-8 bg-gray-600" />
              </p>
            </div>

        <PhotoCaptureLayout config={activeConfig} />

          </div>
        </main>
      </div>
    );
}

export default function CapturePhotos() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading Station...</div>}>
      <CapturePhotosContent />
    </Suspense>
  );
}