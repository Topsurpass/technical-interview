import { generateInterviewQuestions } from '@/lib/gemini';
import { GoogleGenerativeAIError } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { jobTitle } = await req.json();

	if (!jobTitle || typeof jobTitle !== 'string' || !jobTitle.trim()) {
		return NextResponse.json({ error: 'A valid job title is required.' }, { status: 400 });
	}

	if (jobTitle.trim().length > 100) {
		return NextResponse.json({ error: 'Job title must be 100 characters or fewer.' }, { status: 400 });
	}

	if (!process.env.GEMINI_API_KEY) {
		return NextResponse.json(
			{ error: 'Server is not configured with an AI API key.' },
			{ status: 500 },
		);
	}

	try {
		const questions = await generateInterviewQuestions(jobTitle.trim());
		return NextResponse.json({ questions });
	} catch (err) {
		if (err instanceof GoogleGenerativeAIError) {
			const status = (err as { status?: number }).status;

			if (status === 429) {
				return NextResponse.json(
					{
						error:
							'API rate limit reached. You have exhausted the free-tier quota for this model. ' +
							'Please wait a minute and try again, or check your quota at https://ai.dev/rate-limit.',
					},
					{ status: 429 },
				);
			}
		}

		console.error('Gemini API error:', err);
		return NextResponse.json({ error: 'Failed to generate questions. Please try again.' }, { status: 500 });
	}
}
