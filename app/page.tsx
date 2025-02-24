"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) console.error("Supabase error:", error);
      else setData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Supabase + Next.js</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
