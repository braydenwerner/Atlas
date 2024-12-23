import { useEffect, useState } from "react";

import { Button } from "@atlas/ui/src/button";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

import { createClient } from "@supabase/supabase-js";

import env from "./env";
import { Database } from "./types/database.types";

const supabase = createClient<Database>(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_PUBLIC_ANON_KEY,
);

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // supabase.auth.onAuthStateChange((event, session) => {
    //   console.log(event, session);
    // });
    async function test() {
      const data = await supabase
        .from("Post")
        .select("*")
        .then((res) => {
          console.log(res);
        });
      console.log(data);
    }
    test();
  }, []);

  return (
    <>
      <Button>Click me</Button>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
