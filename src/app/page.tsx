'use client';

import { useState } from 'react';
import type React from 'react';
import { useGenerateQuestions } from '@/services/interviews';
import QuestionSkeleton from '@/components/question-skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
	const [jobTitle, setJobTitle] = useState('Customer Success Manager');
	const { mutate, isPending, isError, error, data: questions } = useGenerateQuestions();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		mutate(jobTitle);
	}

	return (
		<main className="min-h-screen bg-gray-50 flex items-start justify-center py-8 px-4 sm:py-16">
			<div className="w-full max-w-2xl">
				<h1 className="text-2xl font-bold text-gray-900 mb-2 sm:text-3xl">
					Interview Question Generator
				</h1>
				<p className="text-sm text-gray-500 mb-6 sm:text-base sm:mb-8">
					Enter a job title to get 3 tailored interview questions powered by AI.
				</p>

				<form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 sm:flex-row sm:gap-3 sm:mb-8">
					<div className="flex-1">
						<label htmlFor="job-title" className="sr-only">
							Job title
						</label>
						<Input
							id="job-title"
							type="text"
							value={jobTitle}
							onChange={e => setJobTitle(e.target.value)}
							placeholder="e.g. Customer Success Manager"
							maxLength={100}
							required
							disabled={isPending}
						/>
					</div>
					<Button
						type="submit"
						isLoading={isPending}
						className="w-full sm:w-auto shrink-0"
					>
						Generate
					</Button>
				</form>

				{isPending && <QuestionSkeleton />}

				{isError && (
					<div
						role="alert"
						aria-live="polite"
						className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm"
					>
						{error instanceof Error ? error.message : 'An unknown error occurred.'}
					</div>
				)}

				{questions && questions.length > 0 && (
					<section>
						<h2 className="text-base font-semibold text-gray-800 mb-4 sm:text-lg">
							Interview questions for{' '}
							<span className="text-blue-600">{jobTitle}</span>
						</h2>
						<ol className="space-y-3 sm:space-y-4">
							{questions.map((q, i) => (
								<li
									key={i}
									className="flex gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm sm:gap-4 sm:px-5 sm:py-4"
								>
									<span
										aria-label={`Question ${i + 1}`}
										className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-semibold"
									>
										{i + 1}
									</span>
									<p className="text-sm text-gray-800 leading-relaxed sm:text-base">{q}</p>
								</li>
							))}
						</ol>
					</section>
				)}
			</div>
		</main>
	);
}
