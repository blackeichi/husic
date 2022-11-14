import { useRouter } from "next/router";

export default function Enter() {
  const router = useRouter();
  const { form } = router.query;
  return <div className="w-full h-screen flex flex-col"></div>;
}
