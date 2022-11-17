import { useState } from "react";

type UseMutaitionState = {
  loading: boolean;
  data?: object;
  error?: object;
};
type UseMutaitionResult = [(data: any) => void, UseMutaitionState];

export default function useMutaion(url: string): UseMutaitionResult {
  const [state, setState] = useState<UseMutaitionState>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json)
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
