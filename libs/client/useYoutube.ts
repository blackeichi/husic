import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useYoutube(home: string) {
  const { data, error } = useSWR("/api/videos", fetcher);
  return { data, isLoading: !data && !error };
}
