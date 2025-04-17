import { HttpStatusCode } from "axios";
import { IGlobalResponse } from "../../interfaces/global";
import {
  ITelegramMessageBody,
  ITelegramMessageResponse,
} from "../../interfaces/telegram";
import { correctGrammar, generateResponse, handleError } from "../../utils";

export const SProcessMessage = async (
  body: ITelegramMessageBody
): Promise<IGlobalResponse<ITelegramMessageResponse>> => {
  const text = body.text ?? "";

  try {
    const [correctedText, botResponse] = await Promise.all([
      correctGrammar(text),
      generateResponse(text),
    ]);

    return {
      status: HttpStatusCode.Ok,
      message: "Success",
      data: {
        corrected_text: correctedText,
        response_text: botResponse,
      },
    };
  } catch (error) {
    throw handleError(error);
  }
};
