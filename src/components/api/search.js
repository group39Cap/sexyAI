import Groq from "groq-sdk";

const apiKey = "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" 


const groq = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Replace with your actual API key
});




export const sendMessageToGroq = async (message) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Change model if needed
      messages: [{ role: "user", content: message }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Groq API error:", error);
    return "Error: Unable to get a response";
  }
};
