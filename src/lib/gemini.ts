import { GoogleGenerativeAI } from '@google/generative-ai';

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateInterviewQuestions(jobTitle: string): Promise<string[]> {
	const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

	const prompt = `You are an experienced hiring manager. Generate exactly 3 thoughtful, open-ended interview questions for a ${jobTitle} role.

The questions should assess both technical competence and soft skills relevant to the position. Return the response as a JSON array of strings with no additional text or markdown formatting.

Example format: ["Question 1?", "Question 2?", "Question 3?"]`;

	const result = await model.generateContent(prompt);
	const text = result.response.text().trim();

	// Strip markdown code fences if the model wraps the JSON
	const cleaned = text
		.replace(/^```(?:json)?\n?/, '')
		.replace(/\n?```$/, '')
		.trim();

	const questions: string[] = JSON.parse(cleaned);

	if (!Array.isArray(questions) || questions.length === 0) {
		throw new Error('Unexpected response format from AI.');
	}

	return questions;
}
