import { HttpStatusCode } from "axios";
import { IGlobalResponse } from "../../interfaces/global";
import {
  ITelegramMessageBody,
  ITelegramMessageResponse,
} from "../../interfaces/telegram";
import {
  correctGrammar,
  generateResponse,
  getUserDb,
  handleError,
  sendMessage,
  summarizeConversation,
} from "../../utils";
import { setUserDb } from "../../utils/db.util";

export const SProcessMessage = async (
  body: ITelegramMessageBody
): Promise<IGlobalResponse<ITelegramMessageResponse>> => {
  const text = body.message.text ?? "";

  console.log("body", body);

  try {
    const userDb = await getUserDb(body.message.chat.id);

    const [correctedText, botResponse] = await Promise.all([
      correctGrammar(text),
      generateResponse(text, userDb.summary ?? "no summarized text"),
    ]);

    await sendMessage(body.message.chat.id, correctedText.message);
    await sendMessage(body.message.chat.id, botResponse.message);

    const summarizedText = await summarizeConversation(
      userDb.summary,
      text,
      botResponse.message
    );

    setUserDb(body.message.chat.id, summarizedText.message);

    return {
      status: HttpStatusCode.Ok,
      message: "Success",
      data: {
        corrected_text: correctedText.message,
        response_text: botResponse.message,
      },
    };
  } catch (error) {
    console.log(error);
    throw handleError(error);
  }
};
