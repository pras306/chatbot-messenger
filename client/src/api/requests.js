const BASE_URL = process.env.NODE_ENV === "production" ? "https://chat-bot-messenger-app.herokuapp.com" : "http://localhost:5000";

export const CHAT_SIGNIN = `${BASE_URL}/api/users/signin`;
export const CHAT_REGISTER = `${BASE_URL}/api/users/register`;
export const CHAT_ROOMS = `${BASE_URL}/api/rooms`;
export const CHAT_MESSAGES = `${BASE_URL}/api/messages`;
export const CHATBOT_API = "https://chat-proxy-server.herokuapp.com/query";