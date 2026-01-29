import { AnalyzeRequest, ChatRequest } from "./types";

const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/v1/cricket";

export async function getTeams() {
  const res = await fetch(`${BASE_URL}/teams`);
  return res.json();
}

export async function getPlayers(teamName: string) {
  const res = await fetch(`${BASE_URL}/players/${teamName}`);
  return res.json();
}

export async function getGrounds() {
  const res = await fetch(`${BASE_URL}/grounds`);
  return res.json();
}

export async function analyzeMatch(payload: AnalyzeRequest) {
  const res = await fetch(`${BASE_URL}/analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function chat(payload: ChatRequest) {
  const res = await fetch(`${BASE_URL}/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
