"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      const { data: users, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("Initial fetch error:", error);
      } else {
        setData(users);
      }
    };
    fetchData();

    // Listen to INSERT events
    const channel = supabase
      .channel("realtime-users")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "users" },
        (payload) => {
          console.log("INSERT event received:", payload);
          // Option A: Re-fetch entire table
          fetchData();

          // Option B: Just append new row to local state
          // setData((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    // Cleanup: remove channel when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleInsert = async () => {
    const { error } = await supabase.from("users").insert({
      email: "test@test.test",
      "first name": "Tester", // prefer underscores, but "first name" can work if the column is literally named that
      password: "pass",
    });
    if (error) {
      console.error("Insert error:", error);
    } else {
      console.log("Insert successful");
    }
  };

  return (
    <div>
      <h1>Supabase + Next.js (Realtime)</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={handleInsert}>testing</button>
    </div>
  );
}
