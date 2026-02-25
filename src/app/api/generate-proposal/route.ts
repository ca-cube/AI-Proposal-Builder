import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

// NOTE: This requires OPENAI_API_KEY in .env
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
    const { client, sector, size, winProb, optimalDiscount } = await req.json() as {
        client: string;
        sector: string;
        size: number;
        winProb: number;
        optimalDiscount: number;
    };

    // PhD Framing: Margin-aware generation
    const prompt = `
    You are an expert Sales Strategist using a Revenue Intelligence Engine.
    Generate a highly personalized, margin-aware proposal narrative for:
    Client: ${client}
    Sector: ${sector}
    Deal Size: $${size}
    AI Win Probability: ${(Number(winProb) * 100).toFixed(0)}%
    Optimal Discount Suggested: ${(Number(optimalDiscount) * 100).toFixed(1)}%

    Constraints:
    1. Structure the narrative to justify the value rather than the price.
    2. Anticipate objections related to the ${sector} industry.
    3. Use a tone that is professional, authoritative, and data-driven.
    4. Include a section on "Strategic Alignment" based on their sector.
    
    Output Format: Markdown.
    Sections: Executive Summary, Strategic Alignment, Value-Based Pricing, Next Steps.
  `;

    const response = await openai.createChatCompletion({
        model: 'gpt-4',
        stream: true,
        messages: [
            {
                role: 'system',
                content: 'You are an AI Revenue Intelligence agent that writes high-conversion B2B proposals.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
