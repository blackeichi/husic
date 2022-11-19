import { useState } from "react";

type UseMutaitionState<T> = {
  loading: boolean;
  data?: object;
  error?: object;
};
type UseMutaitionResult<T> = [(data: any) => void, UseMutaitionState<T>];

export default function useMutaion<T = any>(
  url: string
): UseMutaitionResult<T> {
  const [state, setState] = useState<UseMutaitionState<T>>({
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
      .then((response) => response.json())
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
    console.log(state);
  }
  return [mutation, { ...state }];
}
