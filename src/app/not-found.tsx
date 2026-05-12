import Link from 'next/link';
import { SearchX, Sparkles } from 'lucide-react';

export const metadata = {
	title: '404 — Page Not Found | Interview Question Generator',
};

export default function NotFound() {
	return (
		<main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50/40 flex items-center justify-center py-12 px-4">
			<div className="w-full max-w-md text-center">

				{/* Badge */}
				<div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3 py-1 text-xs font-medium text-red-500 mb-6">
					<SearchX className="h-3 w-3" />
					Page not found
				</div>

				{/* 404 number */}
				<div className="text-[8rem] sm:text-[10rem] font-extrabold leading-none tracking-tight bg-linear-to-br from-blue-500 to-indigo-500 bg-clip-text text-transparent select-none mb-4">
					404
				</div>

				{/* Card */}
				<div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-6">
					<h1 className="text-xl font-bold text-slate-900 mb-2">
						This page doesn&apos;t exist
					</h1>
					<p className="text-slate-500 text-sm leading-relaxed">
						The URL you followed may be broken, or the page may have been moved or removed.
					</p>
				</div>

				{/* Back home button */}
				<Link
					href="/"
					className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md"
				>
					<Sparkles className="h-4 w-4" />
					Back to generator
				</Link>
			</div>
		</main>
	);
}
