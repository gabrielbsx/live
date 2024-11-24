import { aeria } from "aeria-sdk";

export interface CreateUserProps {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default async function createUserAction(payload: CreateUserProps) {
  const response = await aeria.user.createAccount.POST(payload);

  console.log(payload);

  return response;
}
