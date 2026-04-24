import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Container } from "@/components/Section";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { useSeo } from "@/lib/seo";

function Login() {
  useSeo({ title: "Admin Login | CoastalPro Marine" });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Signed in");
    navigate("/admin");
  };

  return (
    <section className="py-32 min-h-[70vh]">
      <Container>
        <div className="max-w-md mx-auto rounded-2xl border border-border bg-card p-9 shadow-card">
          <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
            <Lock className="h-5 w-5 text-accent" />
          </div>
          <h1 className="font-display text-3xl mb-2">Admin sign in</h1>
          <p className="text-sm text-muted-foreground mb-6">Restricted area — accounts are added manually.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full bg-secondary border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full bg-secondary border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <button disabled={loading} className="w-full rounded-full bg-foreground text-background py-3 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
