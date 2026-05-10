'use client';

import { useState } from 'react';
import type React from 'react';
import { AlertCircle, BriefcaseIcon, Sparkles } from 'lucide-react';
import { useGenerateQuestions } from '@/services/interviews';
import QuestionSkeleton from '@/components/question-skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
	const [jobTitle, setJobTitle] = useState('');
	const [lastSubmittedTitle, setLastSubmittedTitle] = useState('Customer Success Manager');
	const { mutate, isPending, isError, error, data: questions } = useGenerateQuestions();

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setLastSubmittedTitle(jobTitle);
		mutate(jobTitle);
		setJobTitle('');
	}

	return (
		<main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50/40 flex items-center justify-center py-12 px-4">
			<div className="w-full max-w-2xl">

				{/* Hero header */}
				<div className="text-center mb-10">
					<div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-medium text-blue-600 mb-4">
						<Sparkles className="h-3 w-3" />
						AI-Powered
					</div>
					<h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
						Interview Question Generator
					</h1>
					<p className="text-slate-500 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
						Enter any job title and get 3 tailored, AI-generated interview questions in seconds.
					</p>
				</div>

				{/* Form card */}
				<div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 mb-6">
					<form onSubmit={handleSubmit}>
						<label htmlFor="job-title" className="block text-sm font-medium text-slate-700 mb-2">
							Job Title
						</label>
						<div className="flex flex-col gap-3 sm:flex-row">
							<Input
								id="job-title"
								type="text"
								value={jobTitle}
								onChange={e => setJobTitle(e.target.value)}
								placeholder="e.g. Senior Product Manager"
								maxLength={100}
								required
								disabled={isPending}
								className="flex-1 h-11 text-base"
							/>
							<Button
								type="submit"
								isLoading={isPending}
								className="h-11 px-6 w-full sm:w-auto shrink-0 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
							>
								{!isPending && <Sparkles className="h-4 w-4" />}
								Generate
							</Button>
						</div>
					</form>
				</div>

				{isPending && <QuestionSkeleton />}

				{isError && (
					<div
						role="alert"
						aria-live="polite"
						className="flex gap-3 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700"
					>
						<AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
						<span>{error instanceof Error ? error.message : 'An unknown error occurred.'}</span>
					</div>
				)}

				{questions && questions.length > 0 && (
					<section>
						<div className="flex items-center gap-2 mb-4">
							<BriefcaseIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
							<h2 className="text-sm font-medium text-slate-500">
								Interview questions for{' '}
								<span className="text-slate-900 font-semibold">{lastSubmittedTitle}</span>
							</h2>
						</div>
						<ol className="space-y-3">
							{questions.map((q, i) => (
								<li
									key={i}
									className="flex gap-4 bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4 hover:border-blue-200 hover:shadow-md transition-all duration-200"
								>
									<span
										aria-label={`Question ${i + 1}`}
										className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold"
									>
										{i + 1}
									</span>
									<p className="text-sm sm:text-base text-slate-700 leading-relaxed">{q}</p>
								</li>
							))}
						</ol>
					</section>
				)}
			</div>
		</main>
	);
}
