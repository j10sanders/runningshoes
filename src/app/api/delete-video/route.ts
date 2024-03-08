import { removeFromAstra } from "../libs/removeVideoFromAstra";

export const POST = async (req: Request) => {
  const body = await req.json();

  await removeFromAstra(body.urlAddress);
  // TODO: add error and success handling
  return new Response(JSON.stringify({ status: "success" }));
};
