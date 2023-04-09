import { useEffect } from "react";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/products");
  }, []);

  return null;
};

export default IndexPage;
