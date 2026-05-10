export default function QuestionSkeleton() {
	return (
		<div role="status" aria-label="Loading questions" className="space-y-4">
			{[1, 2, 3].map(i => (
				<div
					key={i}
					aria-hidden="true"
					className="flex gap-4 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm animate-pulse"
				>
					<div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-gray-200" />
					<div className="flex-1 space-y-2 py-0.5">
						<div className="h-4 rounded bg-gray-200 w-full" />
						<div className="h-4 rounded bg-gray-200 w-3/4" />
					</div>
				</div>
			))}
		</div>
	);
}
