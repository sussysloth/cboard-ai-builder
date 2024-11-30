import { ContentSafetyConfiguration, initEngine } from 'cboard-ai-engine';

export async function POST(req: Request) {
  const { word } = await req.json();

  // Initialize AI engine
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const openAIConfiguration = {
    apiKey,
    basePath:
      'https://cboard-openai.openai.azure.com/openai/deployments/ToEdit-01',
    baseOptions: {
      headers: { 'api-key': apiKey },
      params: {
        'api-version': '2022-12-01',
      },
    },
  };

  const contentSafetyConfiguration = {
    endpoint: process.env.CONTENT_SAFETY_ENDPOINT,
    key: process.env.CONTENT_SAFETY_KEY,
  } as ContentSafetyConfiguration;

  const boardGenerator = initEngine({
    openAIConfiguration,
    contentSafetyConfiguration,
  });

  try {
    const prompt = await boardGenerator.generateAPromptForLeonardo({
      word,
    });

    return Response.json({ prompt });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return Response.json(
      { error: 'Failed to generate prompt' },
      { status: 500 },
    );
  }
}
