import { getErrorMessage } from '@/common/common';

const leoBaseUrl: string = 'https://cloud.leonardo.ai/api/rest/v1/';

export async function POST(req: Request) {
  const { description } = await req.json();
  // const basePrompt =
  //   'Create a simple and clear pictogram of ' +
  //   description +
  //   ' in the style of ARASAAC for AAC use. ' +
  //   description +
  //   ' should be represented with basic shapes and minimal details, using bold lines and solid colors to ensure easy recognition and clarity.';

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + process.env.LEONARDO_TOKEN);

  // Imagine image
  const generationsBody: string = JSON.stringify({
    prompt: description,
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
