import { useRouter } from "next/router";

export default function ClientProjectPage() {
  const router = useRouter();

  function loadProjectHandler() {
    // load data...pageProps
    router.push("/clients/geo/projecta");
  }

  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load project A</button>
    </div>
  );
}
