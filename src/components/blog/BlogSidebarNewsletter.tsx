// ============================================================
// BlogSidebarNewsletter — Email subscribe form (dark bg)
// ============================================================

import { useState } from "react";
import { NEWSLETTER } from "@/data/blog.data";
import { useToast } from "@/components/ui";

export default function BlogSidebarNewsletter() {
  const [email, setEmail] = useState("");
  const { success, error } = useToast();

  function handleSubmit() {
    if (!email.includes("@")) {
      error("Please enter a valid email address.");
      return;
    }
    success("You've subscribed! Welcome to the newsletter.");
    setEmail("");
  }

  return (
    <section
      className="bg-foreground p-6 text-background rounded-sm"
      aria-label="Newsletter signup"
    >
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-background/60">
        {NEWSLETTER.label}
      </h4>
      <p className="text-sm leading-relaxed mb-6 font-light text-background/80">
        {NEWSLETTER.description}
      </p>
      <div className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={NEWSLETTER.placeholder}
          className="w-full bg-background/10 border-0 text-background text-xs p-3 focus:ring-1 focus:ring-background/30 focus:outline-none placeholder:text-background/40"
          aria-label="Email address"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-background text-foreground text-[10px] font-bold uppercase tracking-widest py-3 hover:bg-background/90 transition-colors"
        >
          {NEWSLETTER.cta}
        </button>
      </div>
    </section>
  );
}
