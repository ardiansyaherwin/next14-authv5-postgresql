export type ActionResponseType = "success" | "error";

export type AuthResponseType = {
  type: ActionResponseType | "";
  message: string;
};
