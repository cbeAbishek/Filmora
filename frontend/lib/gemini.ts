import { GoogleGenerativeAI } from "@google/generative-ai";

export interface MovieDetails {
  director: string;
  budget: string | null;
  location: string;
  duration: number;
  releaseYear: number | null;
  releaseDate: string | null;
  description: string;
}

export async function generateMovieDetails(
  movieTitle: string,
  apiKey: string
): Promise<MovieDetails | null> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a movie database expert. Given the movie title "${movieTitle}", provide accurate information about this movie in JSON format with the following fields:
    
{
  "director": "Full name of the director",
  "budget": "Production budget in USD (number only, no currency symbols)",
  "location": "Primary filming location (city or country)",
  "duration": number of runtime minutes,
  "releaseYear": year of release,
  "releaseDate": "YYYY-MM-DD format",
  "description": "A concise 2-3 sentence synopsis"
}

Return ONLY valid JSON without any markdown formatting or additional text. If you cannot find accurate information for a field, use null for that field.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Remove markdown code blocks if present
    const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const movieData = JSON.parse(jsonText) as MovieDetails;
    
    // Validate and clean the data
    return {
      director: movieData.director || "",
      budget: movieData.budget || null,
      location: movieData.location || "",
      duration: Number(movieData.duration) || 120,
      releaseYear: movieData.releaseYear ? Number(movieData.releaseYear) : null,
      releaseDate: movieData.releaseDate || null,
      description: movieData.description || "",
    };
  } catch (error) {
    console.error("Error generating movie details:", error);
    return null;
  }
}
