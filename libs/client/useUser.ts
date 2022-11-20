import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useUser(isReplace = true) {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok && isReplace) {
          return router.replace("/enter");
        }
        setUser(data.profile);
      });
  }, [isReplace, router]);
  return user;
}
