import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useYoutube(type?: string) {
  const { data, error } = useSWR(
    type === "query" ? "/api/videos/query" : "/api/videos",
    fetcher
  );
  return { data, isLoading: !data && !error };
}
