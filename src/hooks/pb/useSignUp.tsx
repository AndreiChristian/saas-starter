import { useState } from "react";
import { pb } from "./main";

export interface SignupData {
  password: string,
  passwordConfirm: string,
  email: string
  name?: string,
  emailVisibility?: true,
  verified?: boolean,
}

export function useSignUp() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function signup(signupData: SignupData) {

    try {

      setLoading(true)

      const record = await pb.collection('users').create(signupData);

      await pb.collection('users').authWithPassword(signupData.email, signupData.password);

      setLoading(false)

      return record

    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setLoading(false)
    }
  }

  return { signup, loading, error }

}
