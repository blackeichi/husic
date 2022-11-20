import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useUser(isPrivate = true) {
  const { data, error } = useSWR("/api/users/me", fetcher);
  return { user: data, isLoading: !data && !error };
}
