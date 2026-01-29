"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import BokehBackground from "@/components/ui/BokehBackground";
import Sidebar from "@/components/ui/sidebar";
import StationNavbar from "@/components/ui/StationNavbar";
import StatusBottomBar from "@/components/ui/StatusBottomBar";

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
		<span className="relative inline-flex items-center justify-center px-10 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#00CED1]">
			<span className="absolute inset-0 border border-[#00CED1]/60 rounded-lg" aria-hidden />
			<span className="absolute -top-1 -left-1 h-3 w-3 bg-[#00CED1] rounded-sm" aria-hidden />
			<span className="absolute -top-1 -right-1 h-3 w-3 bg-[#00CED1] rounded-sm" aria-hidden />
			<span className="absolute -bottom-1 -left-1 h-3 w-3 bg-[#00CED1] rounded-sm" aria-hidden />
			<span className="absolute -bottom-1 -right-1 h-3 w-3 bg-[#00CED1] rounded-sm" aria-hidden />
			<span className="relative tracking-[0.3em]">{children}</span>
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
				"inline-flex items-center justify-center gap-3 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] rounded-full transition " +
				(active
					? "bg-[#00CED1] text-white shadow-[0_18px_40px_rgba(0,206,209,0.35)]"
					: "bg-[rgba(13,27,42,0.7)] text-gray-300 border border-[rgba(0,206,209,0.3)] hover:border-[#00CED1]")
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
	accent: "blue" | "orange" | "teal" | "neutral";
}) {
	const accentStyle =
		accent === "blue"
			? { border: "border-blue-500", text: "text-blue-500", bg: "bg-blue-500/10" }
			: accent === "orange"
				? { border: "border-[#FF6B35]", text: "text-[#FF6B35]", bg: "bg-[#FF6B35]/10" }
				: accent === "teal"
					? { border: "border-[#00CED1]", text: "text-[#00CED1]", bg: "bg-[#00CED1]/10" }
					: { border: "border-neutral-600", text: "text-neutral-400", bg: "bg-neutral-800/50" };

	return (
		<button type="button" className="flex flex-col items-center group">
			<span
				className={
					"h-20 w-20 rounded-full border-2 flex items-center justify-center text-base font-extrabold uppercase tracking-[0.12em] transition group-hover:scale-105 " +
					accentStyle.border +
					" " +
					accentStyle.text +
					" " +
					accentStyle.bg
				}
			>
				{label === "Facebook"
					? "FB"
					: label === "Instagram"
						? "IG"
						: label === "TikTok"
							? "TK"
							: label === "Twitter"
								? "X"
								: label.slice(0, 2)}
			</span>
			<span
				className={
					"mt-3 text-xs font-medium uppercase tracking-[0.15em] " +
					accentStyle.text
				}
			>
				{label}
			</span>
		</button>
	);
}

function ResultsPreview({
	view,
	photos,
	config,
	previewRef
}: {
	view: ResultsView;
	photos: (string | null)[];
	config: { size: number; columns: number; title: string } | null;
	previewRef: React.RefObject<HTMLDivElement | null>;
}) {
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

	const size = config?.size || 4;
	const columns = config?.columns || 2;
	const title = config?.title || "SUBWAY 1";

	const grid = (
		<div
			className="grid gap-4"
			style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
		>
			{Array.from({ length: size }).map((_, index) => (
				<div
					key={index}
					className="relative aspect-square border-4 border-[rgba(0,206,209,0.3)] bg-[rgba(13,27,42,0.8)] overflow-hidden rounded-lg"
				>
					{photos[index] ? (
						/* eslint-disable-next-line @next/next/no-img-element */
						<img src={photos[index]!} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
					) : (
						<div className="absolute inset-0 flex items-center justify-center px-6 text-center">
							<span className="text-white text-xs font-semibold uppercase tracking-[0.22em]">
								SLOT {String(index + 1).padStart(2, "0")} EMPTY
							</span>
						</div>
					)}
					<span className="absolute bottom-2 right-2 bg-[#00CED1] border-2 border-[rgba(13,27,42,0.8)] text-[#0d1b2a] text-[11px] font-extrabold px-2 py-0.5 rounded">
						{index + 1}
					</span>
				</div>
			))}
		</div>
	);

	if (view === "gallery-view") {
		return (
			<div ref={previewRef} className="w-full bg-[rgba(13,27,42,0.7)] border border-[rgba(0,206,209,0.2)] px-6 py-8 rounded-xl backdrop-blur-sm shadow-[0_50px_120px_rgba(0,0,0,0.65)]">
				<div className="text-center text-xs uppercase tracking-[0.35em] text-[#00CED1]">
					Gallery View
				</div>
				<div className="mt-6">{grid}</div>
			</div>
		);
	}

	return (
		<div ref={previewRef} className="w-full bg-white border border-neutral-200 shadow-[0_30px_90px_rgba(0,0,0,0.55)] rounded-lg overflow-hidden">
			<div className="px-10 pt-10 pb-6 text-center bg-linear-to-b from-[#00CED1]/10 to-transparent">
				<div className="text-3xl sm:text-4xl font-extrabold uppercase tracking-[0.08em] text-[#0d1b2a]">
					SNAPGRID
				</div>
				<div className="mt-4 flex items-center justify-center gap-6">
					<span className="h-px w-16 bg-[#00CED1]" aria-hidden />
					<span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#0d1b2a]">
						{title}
					</span>
					<span className="h-px w-16 bg-[#00CED1]" aria-hidden />
				</div>
				<div className="mt-3 text-[11px] text-neutral-600">
					{dateLabel}
				</div>
				<div className="mt-6 h-1 bg-linear-to-r from-[#00CED1] to-[#FF6B35] rounded" />
			</div>

			<div className="px-10 pb-10">{grid}</div>

			<div className="px-10 pb-10 text-center">
				<div className="h-1 bg-linear-to-r from-[#00CED1] to-[#FF6B35] rounded" />
				<div className="mt-6 text-sm font-extrabold uppercase tracking-[0.18em] text-[#0d1b2a]">
					SNAPGRID.STATION
				</div>
				<div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
					Digital Photobooth Experience
				</div>
			</div>
		</div>
	);
}

export default function GridResultsPage() {
	const router = useRouter();
	const [view, setView] = useState<ResultsView>("photo-strip");
	const previewRef = useRef<HTMLDivElement>(null);

	const [photos] = useState<(string | null)[]>(() => {
		if (typeof window === 'undefined') return [];
		const stored = sessionStorage.getItem('photobooth_photos');
		return stored ? JSON.parse(stored) : [];
	});

	const [config] = useState<{ size: number; columns: number; title: string } | null>(() => {
		if (typeof window === 'undefined') return null;
		const stored = sessionStorage.getItem('photobooth_config');
		return stored ? JSON.parse(stored) : null;
	});

	const previewWidthClass = view === "gallery-view" ? "max-w-2xl" : "max-w-lg";

	const handlePrint = () => {
		if (typeof window === "undefined") return;
		window.print();
	};

	const handleDownload = async () => {
		if (!previewRef.current) return;

		try {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			const size = config?.size || 4;
			const columns = config?.columns || 2;
			const rows = Math.ceil(size / columns);

			// High resolution configuration
			const cellSize = 600;
			const gap = 32;
			const paddingX = 80;
			const headerHeight = 220;
			const footerHeight = 140;
			const contentHeight = (rows * cellSize) + ((rows - 1) * gap);

			canvas.width = (columns * cellSize) + ((columns - 1) * gap) + (paddingX * 2);
			canvas.height = headerHeight + contentHeight + footerHeight;

			// 1. Background (White)
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// 2. Header Gradient (Light Teal to Transparent)
			const headerGradient = ctx.createLinearGradient(0, 0, 0, headerHeight);
			headerGradient.addColorStop(0, 'rgba(0, 206, 209, 0.1)');
			headerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
			ctx.fillStyle = headerGradient;
			ctx.fillRect(0, 0, canvas.width, headerHeight);

			// 3. Header Content
			ctx.textAlign = 'center';

			// "SNAPGRID"
			ctx.fillStyle = '#0d1b2a';
			ctx.font = '900 72px Arial, sans-serif';
			ctx.fillText('SNAPGRID', canvas.width / 2, 80);

			// Decoration Lines & Title
			const title = (config?.title || "SUBWAY 1").toUpperCase();
			ctx.font = 'bold 28px Arial, sans-serif';
			// Calculate text width to position lines
			const titleWidth = ctx.measureText(title).width;
			const lineLength = 80;
			const lineGap = 30;

			// Middle vertical align for title line
			const titleY = 135;

			ctx.fillText(title, canvas.width / 2, titleY + 8); // optical adjustment

			ctx.beginPath();
			ctx.strokeStyle = '#00CED1';
			ctx.lineWidth = 3;
			// Left Line
			ctx.moveTo(canvas.width / 2 - titleWidth / 2 - lineGap - lineLength, titleY);
			ctx.lineTo(canvas.width / 2 - titleWidth / 2 - lineGap, titleY);
			// Right Line
			ctx.moveTo(canvas.width / 2 + titleWidth / 2 + lineGap, titleY);
			ctx.lineTo(canvas.width / 2 + titleWidth / 2 + lineGap + lineLength, titleY);
			ctx.stroke();

			// Date
			const now = new Date();
			const dateStr = new Intl.DateTimeFormat("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			}).format(now);

			ctx.fillStyle = '#525252';
			ctx.font = '20px Arial, sans-serif';
			ctx.fillText(dateStr, canvas.width / 2, 180);

			// Gradient Line Separator
			const separatorY = 210;
			const lineGradient = ctx.createLinearGradient(paddingX, 0, canvas.width - paddingX, 0);
			lineGradient.addColorStop(0, '#00CED1');
			lineGradient.addColorStop(1, '#FF6B35');

			ctx.fillStyle = lineGradient;
			ctx.fillRect(paddingX, separatorY, canvas.width - (paddingX * 2), 6);


			// 4. Photo Grid
			const gridStartY = headerHeight + 20;

			for (let i = 0; i < size; i++) {
				const col = i % columns;
				const row = Math.floor(i / columns);
				const x = paddingX + col * (cellSize + gap);
				const y = gridStartY + row * (cellSize + gap);

				// Slot Background
				ctx.fillStyle = '#0d1b2a';
				ctx.fillRect(x, y, cellSize, cellSize);

				if (photos[i]) {
					const img = new window.Image();
					img.crossOrigin = 'anonymous';
					img.src = photos[i]!;
					await new Promise((resolve) => {
						img.onload = resolve;
						img.onerror = resolve;
					});

					// Draw Image (Cover fit)
					// Assuming photos are roughly square or we want to stretch/crop. 
					// Simple drawImage fits to rect.
					ctx.drawImage(img, x, y, cellSize, cellSize);
				} else {
					// Empty Slot
					ctx.fillStyle = 'rgba(0,206,209,0.1)';
					ctx.fillRect(x, y, cellSize, cellSize);

					ctx.fillStyle = '#ffffff';
					ctx.font = 'bold 24px Arial, sans-serif';
					ctx.fillText(`SLOT ${String(i + 1).padStart(2, "0")} EMPTY`, x + cellSize / 2, y + cellSize / 2);
				}

				// Inner Border Overlay (to match CSS border)
				// CSS was border-4 border-teal/30. Scaling up 2x -> 8px
				ctx.strokeStyle = 'rgba(0,206,209,0.3)';
				ctx.lineWidth = 12;
				ctx.strokeRect(x, y, cellSize, cellSize);

				// Number Badge
				const badgeSize = 50;
				const badgeMargin = 16;
				const badgeX = x + cellSize - badgeSize - badgeMargin;
				const badgeY = y + cellSize - badgeSize - badgeMargin;

				// Badge BG
				ctx.fillStyle = '#00CED1';
				ctx.fillRect(badgeX, badgeY, badgeSize, badgeSize);

				// Badge Border
				ctx.strokeStyle = 'rgba(13,27,42,0.8)';
				ctx.lineWidth = 3;
				ctx.strokeRect(badgeX, badgeY, badgeSize, badgeSize);

				// Badge Text
				ctx.fillStyle = '#0d1b2a';
				ctx.font = 'bold 24px Arial, sans-serif';
				ctx.textAlign = 'center';
				ctx.fillText((i + 1).toString(), badgeX + badgeSize / 2, badgeY + badgeSize / 2 + 9);
			}

			// 5. Footer
			const footerStartY = gridStartY + contentHeight + 40;

			// Footer Line
			ctx.fillStyle = lineGradient;
			ctx.fillRect(paddingX, footerStartY, canvas.width - (paddingX * 2), 6);

			// Footer Text
			ctx.textAlign = 'center';

			ctx.fillStyle = '#0d1b2a';
			ctx.font = 'bold 32px Arial, sans-serif'; // tracking-widest simulated by font choice/spacing? keeping simple
			ctx.fillText('SNAPGRID.STATION', canvas.width / 2, footerStartY + 60);

			ctx.fillStyle = '#737373';
			ctx.font = '18px Arial, sans-serif';
			ctx.fillText('DIGITAL PHOTOBOOTH EXPERIENCE', canvas.width / 2, footerStartY + 100);

			const link = document.createElement('a');
			link.download = `snapgrid-${Date.now()}.png`;
			link.href = canvas.toDataURL('image/png');
			link.click();
		} catch (err) {
			console.error('Download error:', err);
		}
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
			alert('Link copied to clipboard!');
		} catch {
		}
	};

	return (
		<div className="min-h-screen flex text-gray-100">
			<BokehBackground />
			<StationNavbar />

			<Sidebar
				stations={journeySteps}
				activeStationId={4}
			/>

			<main className="relative flex-1 px-6 py-10 pt-24 sm:px-10 lg:px-16 overflow-hidden">
				<div className="relative z-10 max-w-6xl mx-auto">
					<div className="text-center">
						<StationBadge>Station 04</StationBadge>
						<h1 className="mt-8 flex items-center justify-center gap-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase">
							<span className="tracking-tight text-white">Share</span>
							<span className="tracking-tight text-[#FF6B35]">Results</span>
						</h1>
						<p className="mt-3 text-sm sm:text-base text-gray-400 tracking-wide">
							Your journey is complete. Download or share your memories.
						</p>
						<div className="mt-6 flex items-center justify-center">
							<span className="inline-flex items-center justify-center gap-4 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] border border-[#00CED1]/50 text-[#00CED1] bg-[rgba(13,27,42,0.5)] rounded-full">
								<span className="h-3 w-3 rounded-full bg-[#00CED1] shadow-[0_0_10px_rgba(0,206,209,0.5)]" aria-hidden />
								Journey Completed
							</span>
						</div>

						<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
							<PillButton
								active={view === "photo-strip"}
								onClick={() => setView("photo-strip")}
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
								</svg>
								Photo Strip
							</PillButton>
							<PillButton
								active={view === "gallery-view"}
								onClick={() => setView("gallery-view")}
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
								</svg>
								Gallery View
							</PillButton>
						</div>
					</div>

					<section className="mt-12">
						<div className={`mx-auto w-full ${previewWidthClass}`}>
							<ResultsPreview view={view} photos={photos} config={config} previewRef={previewRef} />
						</div>
					</section>

					<div className={`mt-10 mx-auto w-full ${previewWidthClass}`}>
						<div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
							<button
								type="button"
								className="flex h-14 w-full flex-1 items-center justify-center gap-3 bg-[#00CED1] px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white rounded-full shadow-[0_20px_45px_rgba(0,206,209,0.25)] transition hover:bg-[#00b8ba]"
								onClick={handleDownload}
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
								</svg>
								Download
							</button>
							<button
								type="button"
								className="flex h-14 w-full flex-1 items-center justify-center gap-3 bg-[#FF6B35] px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white rounded-full shadow-[0_20px_45px_rgba(255,107,53,0.25)] transition hover:bg-[#e55a2b]"
								onClick={handleShare}
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
								</svg>
								Share
							</button>
							<button
								type="button"
								className="flex h-14 w-full flex-1 items-center justify-center gap-3 bg-[rgba(13,27,42,0.8)] border border-[rgba(0,206,209,0.3)] px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white rounded-full transition hover:border-[#00CED1]"
								onClick={handlePrint}
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
								</svg>
								Print
							</button>
						</div>
					</div>

					<section className="mt-14">
						<div className="mx-auto max-w-3xl bg-[rgba(13,27,42,0.7)] border border-[rgba(0,206,209,0.2)] px-6 py-10 rounded-xl backdrop-blur-sm shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
							<div className="text-center">
								<div className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#00CED1]">
									Share on Social
								</div>
								<div className="mt-2 text-sm font-medium uppercase tracking-wide text-gray-400">
									Choose your platform
								</div>
							</div>

							<div className="mt-10 flex flex-wrap items-center justify-center gap-8">
								<CircleShareButton label="Facebook" accent="blue" />
								<CircleShareButton label="Instagram" accent="orange" />
								<CircleShareButton label="Twitter" accent="teal" />
								<CircleShareButton label="TikTok" accent="neutral" />
							</div>

							<div className="mt-10 flex items-center justify-center">
								<div className="inline-flex items-center justify-center gap-4 border border-[rgba(0,206,209,0.3)] bg-[rgba(13,27,42,0.5)] px-8 py-3 rounded-full">
									<span className="h-2.5 w-2.5 rounded-full bg-[#00CED1] shadow-[0_0_8px_rgba(0,206,209,0.6)]" />
									<span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
										All Platforms Ready
									</span>
								</div>
							</div>
						</div>
					</section>

					<div className="mt-12 flex items-center justify-center">
						<button
							type="button"
							className="flex items-center justify-center gap-4 bg-[#FF6B35] px-14 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-white rounded-full shadow-[0_20px_45px_rgba(255,107,53,0.45)] hover:bg-[#e55a2b] transition"
							onClick={() => {
								sessionStorage.removeItem('photobooth_photos');
								sessionStorage.removeItem('photobooth_config');
								router.push("/");
							}}
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
							Start New Journey
						</button>
					</div>
				</div>
			</main>

			{/* Mobile Bottom Bar */}
			<StatusBottomBar stations={journeySteps} activeStationId={4} />
		</div>
	);
}
