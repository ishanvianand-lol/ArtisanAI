import { useState, useMemo } from "react";

export function useAI() {
  const [desc, setDesc] = useState(
    "Jaipuri wall art, peacock motifs, lotus glow, deep maroon/ivory palette, minimal Taj line art"
  );
  const [ideasRaw, setIdeasRaw] = useState("");
  const [ideasLoading, setIdeasLoading] = useState(false);
  const [ideasError, setIdeasError] = useState("");

  // Parse AI ideas to bullets
  const ideas = useMemo(() => {
    if (!ideasRaw) return [];
    // Split by lines/numbers/bullets
    return ideasRaw
      .split(/\n+/)
      .map((s) => s.replace(/^\s*[\-\*\d\.\)]\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 10);
  }, [ideasRaw]);

  const handleGenerateIdeas = async () => {
    setIdeasLoading(true);
    setIdeasError("");
    setIdeasRaw("");
    try {
      const res = await fetch("/api/ai/generateIdeas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: desc }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Failed to generate ideas");
      }
      const data = await res.json();
      setIdeasRaw(data.ideas || "");
    } catch (e) {
      setIdeasError(e.message || "Something went wrong");
    } finally {
      setIdeasLoading(false);
    }
  };

  const clearIdeas = () => {
    setIdeasRaw("");
    setIdeasError("");
  };

  return {
    desc,
    setDesc,
    ideas,
    ideasLoading,
    ideasError,
    handleGenerateIdeas,
    clearIdeas,
  };
}