import * as React from "react"; // ✅ 꼭 필요!

export function formatBotMessage(content: string): React.ReactNode[][] {
  if (!content) return [];

  const cleaned = content.trim();

  if (cleaned.length < 30 && !/[.?!].+?[.?!]/.test(cleaned)) {
    return [parseBold(cleaned)];
  }

  return cleaned
    .replace(/([.?!])\s+(?=[가-힣A-Z])/g, "$1\n")
    .split("\n")
    .map((s) => parseBold(s.trim()))
    .filter((line) => line.length > 0);
}

function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^\*]+\*\*)/g); // **내용** 분리

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}