"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Squares from "@/components/ui/bg-particles";
import Sidebar from "@/components/ui/sidebar";
import { DINEng } from "@/lib/fonts";

type Station = {
	id: number;
	title: string;
	subtitle: string;
};

const journeySteps: Station[] = [
	{ id: 1, title: "STATION 01", subtitle: "SELECT LAYOUT" },
	{ id: 2, title: "STATION 02", subtitle: "CAPTURE PHOTOS" },
	{ id: 3, title: "STATION 03", subtitle: "PHOTO GALLERY" },
	{ id: 4, title: "STATION 04", subtitle: "SHARE RESULTS" },
];

type ResultsView = "photo-strip" | "gallery-view";

function StationBadge({ children }: { children: React.ReactNode }) {
	return (
		<span className="relative inline-flex items-center justify-center px-10 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#39FF14]">
			<span className="absolute inset-0 border border-[#39FF14]/80" aria-hidden />
			<span className="absolute -top-1 -left-1 h-3 w-3 bg-[#39FF14]" aria-hidden />
			<span className="absolute -top-1 -right-1 h-3 w-3 bg-[#39FF14]" aria-hidden />
			<span className="absolute -bottom-1 -left-1 h-3 w-3 bg-[#39FF14]" aria-hidden />
			<span className="absolute -bottom-1 -right-1 h-3 w-3 bg-[#39FF14]" aria-hidden />
			<span className="relative tracking-[0.4em]">{children}</span>
		</span>
	);
}

function PillButton({
	active,
	children,
	onClick,
}: {
	active?: boolean;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={
				"inline-flex items-center justify-center gap-3 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] border transition " +
				(active
					? "bg-red-600 text-white border-red-500 shadow-[0_18px_40px_rgba(220,38,38,0.35)]"
					: "bg-neutral-900/70 text-neutral-200 border-neutral-800 hover:border-neutral-600")
			}
		>
			{children}
		</button>
	);
}

function CircleShareButton({
	label,
	accent,
}: {
	label: string;
	accent: "blue" | "red" | "sky" | "neutral";
}) {
	const accentStyle =
		accent === "blue"
			? { border: "border-blue-500", text: "text-blue-500" }
			: accent === "red"
				? { border: "border-rose-500", text: "text-rose-500" }
				: accent === "sky"
					? { border: "border-sky-400", text: "text-sky-400" }
					: { border: "border-neutral-700", text: "text-neutral-500" };

	return (
		<button type="button" className="flex flex-col items-center">
			<span
				className={
					"h-24 w-24 rounded-full border-[3px] bg-black/40 flex items-center justify-center text-base font-extrabold uppercase tracking-[0.12em] " +
					accentStyle.border +
					" " +
					accentStyle.text
				}
			>
				{label === "Facebook"
					? "FB"
					: label === "Instagram"
						? "IG"
						: label === "TikTok"
							? "TK"
							: label.slice(0, 2)}
			</span>
			<span
				className={
					"mt-5 inline-flex items-center justify-center border px-6 py-2 text-xs font-bold uppercase tracking-[0.18em] " +
					accentStyle.border +
					" " +
					accentStyle.text
				}
			>
				{label}
			</span>
		</button>
	);
}

function ResultsPreview({ view }: { view: ResultsView }) {
	const [now, setNow] = useState(() => new Date());

	useEffect(() => {
		const id = window.setInterval(() => setNow(new Date()), 60_000);
		return () => window.clearInterval(id);
	}, []);

	const dateLabel = useMemo(() => {
		return new Intl.DateTimeFormat("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(now);
	}, [now]);

	const grid = (
		<div className="grid grid-cols-1 gap-4">
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					key={index}
					className="relative aspect-[4/3] border-4 border-black bg-black overflow-hidden"
				>
					<div className="absolute inset-0 flex items-center justify-center px-6 text-center">
						<span className="text-white text-xs font-semibold uppercase tracking-[0.22em]">
							SLOT {String(index + 1).padStart(2, "0")} EMPTY
						</span>
					</div>
					<span className="absolute bottom-3 right-3 bg-yellow-400 border-2 border-black text-black text-[11px] font-extrabold px-3 py-1 font-dsdigi">
						{index + 1}
					</span>
				</div>
			))}
		</div>
	);

	if (view === "gallery-view") {
		return (
			<div className="w-full bg-[#121212] border border-neutral-800/70 px-6 py-8 shadow-[0_50px_120px_rgba(0,0,0,0.65)]">
				<div className="text-center text-xs uppercase tracking-[0.35em] text-neutral-400">
					Gallery View
				</div>
				<div className="mt-6">{grid}</div>
			</div>
		);
	}

	return (
		<div className="w-full bg-white border border-neutral-200 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
			<div className="px-6 pt-6 pb-5 text-center">
				<div className="text-3xl sm:text-4xl font-extrabold uppercase tracking-[0.12em] text-black">
					SNAPGRID STATION
				</div>
				<div className="mt-4 flex items-center justify-center gap-6">
					<span className="h-px w-16 bg-black" aria-hidden />
					<span className="text-[11px] font-bold uppercase tracking-[0.28em] text-black">
						ELEVATOR
					</span>
					<span className="h-px w-16 bg-black" aria-hidden />
				</div>
				<div className="mt-3 text-[11px] text-neutral-600">
					{dateLabel}
				</div>
				<div className="mt-8 h-1 bg-black" />
			</div>

			<div className="px-6 pb-6">{grid}</div>

			<div className="px-6 pb-6 text-center">
				<div className="h-1 bg-black" />
				<div className="mt-6 text-sm font-extrabold uppercase tracking-[0.18em] text-black">
					SNAPGRID.STATION
				</div>
				<div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
					DIGITAL PHOTOBOOTH EXPERIENCE  ARE YOU LOST IN THE CITY TOO?
				</div>
			</div>
		</div>
	);
}

export default function GridResultsPage() {
	const router = useRouter();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isDesktop, setIsDesktop] = useState(true);
	const [view, setView] = useState<ResultsView>("photo-strip");
	const previewWidthClass = view === "gallery-view" ? "max-w-3xl" : "max-w-4xl";

	useEffect(() => {
		const handleResize = () => {
			const desktop = window.innerWidth >= 1000;
			setIsDesktop(desktop);
			setIsSidebarOpen(desktop);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (!isDesktop) {
			document.body.style.overflow = isSidebarOpen ? "hidden" : "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isSidebarOpen, isDesktop]);

	const handlePrint = () => {
		if (typeof window === "undefined") return;
		window.print();
	};

	const handleShare = async () => {
		if (typeof window === "undefined") return;
		const url = window.location.href;
		try {
			if (navigator.share) {
				await navigator.share({ title: "SnapGrid Results", url });
				return;
			}
			await navigator.clipboard.writeText(url);
		} catch {
			// no-op
		}
	};

	return (
		<div className="min-h-screen flex bg-[#070707] text-gray-100">
			{!isDesktop && !isSidebarOpen && (
				<button
					aria-label="Open navigation"
					aria-controls="main-navigation"
					aria-expanded={isSidebarOpen}
					onClick={() => setIsSidebarOpen(true)}
					className="fixed top-4 left-4 z-40 p-2"
				>
					<div className="w-8 h-8 flex flex-col items-center justify-center gap-1.5">
						<span className="block h-0.5 w-6 bg-yellow-400" />
						<span className="block h-0.5 w-6 bg-yellow-400" />
						<span className="block h-0.5 w-6 bg-yellow-400" />
					</div>
				</button>
			)}

			<Sidebar
				stations={journeySteps}
				activeStationId={4}
				indicatorPalette={["#39FF14", "#39FF14", "#39FF14", "#FF1D25"]}
				isOpen={isSidebarOpen}
				isDesktop={isDesktop}
				onToggle={() => setIsSidebarOpen((v) => !v)}
				onClose={() => setIsSidebarOpen(false)}
			/>

			<main className="relative flex-1 px-6 py-10 sm:px-10 lg:px-16 overflow-hidden">
				{!isDesktop && isSidebarOpen && (
					<div
						className="fixed inset-0 z-20 bg-black/40"
						onClick={() => setIsSidebarOpen(false)}
					/>
				)}

				<div className="absolute inset-0 pointer-events-none">
					<Squares
						speed={0.6}
						squareSize={52}
						direction="diagonal"
						borderColor="rgba(255,255,255,0.04)"
						hoverFillColor="rgba(255,255,255,0.03)"
					/>
				</div>

				<div className="relative z-10 max-w-6xl mx-auto">
					<div className="text-center">
						<StationBadge>Station 04</StationBadge>
						<h1
							className={`mt-8 flex items-center justify-center gap-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase ${DINEng.className}`}
						>
							<span className="tracking-[0.03em] text-white">Share</span>
							<span className="tracking-[0.03em] text-[#39FF14]">Results</span>
						</h1>
						<p
							className="mt-2 text-sm sm:text-base text-gray-400 tracking-[0.10em]"
							style={{ fontFamily: "TT Firs Neue Trial Var Roman, sans-serif" }}
						>
							Your journey is complete. Download or share your memories.
						</p>
						<div className="mt-6 flex items-center justify-center">
							<span className="inline-flex items-center justify-center gap-4 px-10 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] border border-[#39FF14]/70 text-[#39FF14] bg-black/35">
								<span className="h-3 w-3 rounded-full bg-[#39FF14]" aria-hidden />
								Journey Completed
							</span>
						</div>

						<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
							<PillButton
								active={view === "photo-strip"}
								onClick={() => setView("photo-strip")}
							>
								<Image
									src="/results-icons/PHOTO%20STRIP%20ICON.png"
									alt=""
									width={18}
									height={18}
									className="h-[18px] w-[18px]"
									aria-hidden
								/>
								PHOTO STRIP
							</PillButton>
							<PillButton
								active={view === "gallery-view"}
								onClick={() => setView("gallery-view")}
							>
								<Image
									src="/results-icons/GALLERY%20VIEW%20ICON.png"
									alt=""
									width={18}
									height={18}
									className="h-[18px] w-[18px]"
									aria-hidden
								/>
								GALLERY VIEW
							</PillButton>
						</div>
					</div>

					<section className="mt-12">
						<div className={`mx-auto w-full ${previewWidthClass}`}>
							<ResultsPreview view={view} />
						</div>
					</section>

					<div className={`mt-10 mx-auto w-full ${previewWidthClass}`}>
						<div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
							<button
								type="button"
								className="flex h-16 w-full flex-1 items-center justify-center gap-4 bg-yellow-400 px-10 text-xs font-semibold uppercase tracking-[0.32em] text-black shadow-[0_20px_45px_rgba(250,204,21,0.25)] transition hover:bg-yellow-300"
								// Visual-only for now: capture step doesn’t persist a renderable asset yet
								onClick={() => {
									// no-op
								}}
							>
								<Image
									src="/results-icons/DOWNLOAD%20ICON.png"
									alt=""
									width={18}
									height={18}
									className="h-[18px] w-[18px]"
									aria-hidden
								/>
								DOWNLOAD
							</button>
							<button
								type="button"
								className="flex h-16 w-full flex-1 items-center justify-center gap-4 bg-sky-500 px-10 text-xs font-semibold uppercase tracking-[0.32em] text-white shadow-[0_20px_45px_rgba(14,165,233,0.25)] transition hover:bg-sky-400"
								onClick={handleShare}
							>
								<Image
									src="/results-icons/SHARE%20ICON.png"
									alt=""
									width={18}
									height={18}
									className="h-[18px] w-[18px]"
									aria-hidden
								/>
								SHARE
							</button>
							<button
								type="button"
								className="flex h-16 w-full flex-1 items-center justify-center gap-4 bg-neutral-800 px-10 text-xs font-semibold uppercase tracking-[0.32em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition hover:bg-neutral-700"
								onClick={handlePrint}
							>
								<Image
									src="/results-icons/PRINT%20ICON.png"
									alt=""
									width={18}
									height={18}
									className="h-[18px] w-[18px]"
									aria-hidden
								/>
								PRINT
							</button>
						</div>
					</div>

					<section className="mt-14">
						<div className="mx-auto max-w-4xl bg-[#0e0e0e] border border-neutral-800/70 px-6 py-10 shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
							<div className="text-center">
								<div className="text-3xl sm:text-3xl font-bold uppercase tracking-[0.03em] text-sky-400">
									Share on Transit Lines
								</div>
								<div className="mt-2 text-base font-bold uppercase tracking-[0.03em] text-neutral-500">
									Choose your destination
								</div>
							</div>

							<div className="mt-10 flex flex-wrap items-center justify-center gap-12">
								<CircleShareButton
									label="Facebook"
									accent="blue"
								/>
								<CircleShareButton
									label="Instagram"
									accent="red"
								/>
								<CircleShareButton
									label="Twitter"
									accent="sky"
								/>
								<CircleShareButton
									label="TikTok"
									accent="neutral"
								/>
							</div>

							<div className="mt-10 flex items-center justify-center">
								<div className="inline-flex items-center justify-center gap-4 border border-neutral-700/80 bg-black/20 px-10 py-3">
									<span className="h-2.5 w-2.5 rounded-full bg-[#39FF14]" />
									<span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
										All Lines Operational
									</span>
								</div>
							</div>
						</div>
					</section>

					<div className="mt-12 flex items-center justify-center">
						<button
							type="button"
							className="flex items-center justify-center gap-4 bg-red-600 px-14 py-6 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-[0_20px_45px_rgba(220,38,38,0.45)] hover:bg-red-500 transition"
							onClick={() => router.push("/")}
						>
							<Image
								src="/results-icons/START%20NEW%20JOURNEY%20ICON.png"
								alt=""
								width={18}
								height={18}
								className="h-[18px] w-[18px]"
								aria-hidden
							/>
							Start New Journey
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
