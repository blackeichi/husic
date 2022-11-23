import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function Youtube(id: string) {
  const { data, error } = useSWR(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyDklqLAWYKnwDPB87xKHK064ULHSUeojNE`,
    fetcher
  );
  return { data: data?.items[0].snippet, isLoading: !data && !error };
}
