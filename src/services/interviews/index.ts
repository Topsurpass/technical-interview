import { useMutation } from '@tanstack/react-query';
import QueryKeys from '../query-keys';

async function generateQuestions(jobTitle: string): Promise<string[]> {
	const res = await fetch('/api/questions', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ jobTitle }),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
	return data.questions;
}

export function useGenerateQuestions() {
	return useMutation({
		mutationKey: [QueryKeys.GENERATE_QUESTIONS],
		mutationFn: generateQuestions,
	});
}
