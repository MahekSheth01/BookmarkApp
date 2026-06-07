 import { createClient } from "@/lib/supabase/server";
    
     export default async function TestPage() {
       const supabase = await createClient();
       const { data: { user } } = await supabase.auth.getUser();
    
       return (
         <main className="p-8">
          <h1 className="text-2xl font-bold">Supabase Server Test</h1>
          <p className="mt-4">
            {user ? `Logged in as: ${user.email}` : "No active session (Server-side check)."}
          </p>
        </main>
      );
    }