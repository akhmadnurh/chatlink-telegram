export interface ITelegramMessageBody {
  update_id: number;
  message: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username: string;
      language_code: string;
    };
    chat: {
      id: number;
      first_name: string;
      username: string;
      type: string;
    };
    date: number;
    text?: string;
  };
}

export interface ITelegramMessageResponse {
  corrected_text: string;
  response_text: string;
}

export interface ITelegramUpdate {
  update_id: number;
  message?: ITelegramMessageBody;
}
