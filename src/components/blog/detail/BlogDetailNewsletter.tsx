// ============================================================
// BlogDetailNewsletter — Inline newsletter CTA block
// ============================================================

import { useState } from "react";
import { useToast } from "@/components/ui";

export default function BlogDetailNewsletter() {
  const [email, setEmail] = useState("");
  const { success, error } = useToast();

  function handleSubscribe() {
    if (!email.includes("@")) {
      error("Please enter a valid email address.");
      return;
    }
    success("Welcome! You're now subscribed.");
    setEmail("");
  }

  return (
    <div className="mt-20 py-12 border-t border-border text-center">
      <h3 className="text-2xl font-black mb-4 text-foreground">
        Join the minimalist movement.
      </h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm leading-relaxed">
        Get one weekly essay on design, philosophy, and digital structure
        directly to your inbox.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
          placeholder="email@address.com"
          className="flex-1 px-4 py-3 border border-border bg-background text-foreground focus:border-foreground focus:outline-none rounded-sm text-sm placeholder:text-foreground/30 transition-colors"
          aria-label="Email address"
        />
        <button
          onClick={handleSubscribe}
          className="px-8 py-3 bg-foreground text-background font-bold text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors whitespace-nowrap"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
