import OpenAI from "openai";

// TODO: make another call to see if the user wants to know about a different shoe, and if so, search for that shoe's reviews
export const addChatGPTresponse = async (videos, messages, shoe) => {
  console.log(process.env.OPENAI_API_KEY);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  if (messages.length == 0) {
    messages = [
      {
        role: "system",
        content: `You tell users about running shoe reviews so they can make purchasing decisions. These are the relevant videos with summaries you can use to answer questions: ${videos}.
        Don't tell them to watch the videos - they are coming to you to learn about the shoes.`,
      },
      {
        role: "user",
        content: `I want to know what reviewers think about the ${shoe} shoe. Can you help me?`,
      },
    ];
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  messages = [...messages, response.choices[0].message];

  console.log(`response.choices[0].message`, response.choices[0].message);

  return messages;
};

export const addGPTSummary = async (transcript) => {
  console.log(process.env.OPENAI_API_KEY);
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
