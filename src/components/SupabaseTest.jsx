import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SupabaseTest() {
  useEffect(() => {
    (async () => {
      await supabase.from("credit_cards").insert({ nickname: "Test Card" });
      const { data, error } = await supabase.from("credit_cards").select("*").order("created_at");
      console.log("cards:", data, "error:", error);
    //   alert(error ? "Supabase error. Check console." : Connected! Rows: ${data?.length ?? 0});
    })();
  }, []);
  return null;
}