import { getErrorMessage } from '@/common/common';
import { ContentSafetyConfiguration, initEngine } from 'cboard-ai-engine';

const leoBaseUrl: string = 'https://cloud.leonardo.ai/api/rest/v1/';

export async function POST(req: Request) {
  const { description } = await req.json();
  // const basePrompt =
  //   'Create a simple and clear pictogram of ' +
  //   description +
  //   ' in the style of ARASAAC for AAC use. ' +
  //   description +
  //   ' should be represented with basic shapes and minimal details, using bold lines and solid colors to ensure easy recognition and clarity.';
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
  let prompt;
  try {
    prompt = await boardGenerator.generateAPromptForLeonardo({
      word: description,
    });

    prompt = JSON.stringify(prompt);
  } catch (error) {
    console.error('Error generating prompt:', error);
    return Response.json(
      { error: 'Failed to generate prompt' },
      { status: 500 },
    );
  }
  if (!prompt)
    return new Response('Error generating AI Prompt', { status: 500 });

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + process.env.LEONARDO_TOKEN);

  // Imagine image
  const generationsBody: string = JSON.stringify({
    prompt: prompt,
    modelId: '6b645e3a-d64f-4341-a6d8-7a3690fbf042', //Leonardo Phoenix
    contrast: 4,
    num_images: 2,
    width: 896,
    height: 896,
    alchemy: false,
    styleUUID: '1fbb6a68-9319-44d2-8d56-2957ca0ece6a', //Graphic design vector
    enhancePrompt: false,
  });
  try {
    const response = await fetch(leoBaseUrl + 'generations', {
      method: 'POST',
      headers: myHeaders,
      body: generationsBody,
      redirect: 'follow',
      cache: 'no-store',
    });
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error generating AI image. ', getErrorMessage(error));
    return new Response('Error generating AI image', { status: 500 });
  }
}
