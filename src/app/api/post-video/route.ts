import { addVideoToAstra } from "../libs/addVideoToAstra";

export const POST = async (req: Request) => {
  const body = await req.json();

  await addVideoToAstra(body.urlAddress);
  // TODO: add error and success handling
  return new Response(JSON.stringify({ status: "success" }));
};
