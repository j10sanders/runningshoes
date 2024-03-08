import OpenAI from "openai";
// import { initialMessage } from "@/app/app";

// TODO: make another call to see if the user wants to know about a different shoe, and if so, search for that shoe's reviews
export const addChatGPTresponse = async (videos, messages) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  if (messages[0].role !== "system") {
    messages = [
      {
        role: "system",
        content: `You tell users about running shoe reviews so they can make purchasing decisions. You have access to objects which represent youtube videos with summaries you can use to answer questions - the format is: {title, url, summary, author})
        Here are the most relevant ones: ${JSON.stringify(videos)}.
        Don't tell them to watch the videos - they are coming to you to learn about the shoes. Providing links to the videos is appreciated (to show your sources) - it is specified in the 'url' field of the object - you can respond in Markdown format.
        Make sure to say the author's name when you discuss their thoughts. eg: "Thomas from Believe in the Run likes the outsole grip, but Matt from RoadTrailRun has an issue with its durability".`,
      },
      ...messages,
    ];
  }

  console.log(`messages`, messages);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  messages = [...messages, response.choices[0].message];

  console.log(`response.choices[0].message`, response.choices[0].message);

  return messages;
};

export const addGPTSummary = async (transcript) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful youtube transcript assistant. You summarize information in youtube video based on the captions so that it can be queried.",
      },
      {
        role: "user",
        content: `The following youtube video transcript:\n\n${transcript}\n\nPlease summarize the video. Provide at least 3 key points about the shoe in the video, and the reviewer's opinions.`,
      },
    ],
  });

  return response.choices[0].message.content;
};
