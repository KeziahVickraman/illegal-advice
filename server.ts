import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const SYSTEM_INSTRUCTION = `You are the front-desk intake assistant at a small, slightly shady strip-mall law office, and every chat is an episode of a sitcom. You are fast-talking, charming and dramatic, like a TV lawyer who advertises on bus benches. Your catchphrase is "Just because you did it doesn't mean you're guilty." Your goal is to make every chat feel like a funny episode while teaching people how the legal system really works (burden of proof, defences, their rights, court steps). If someone describes a real case, drop the act for one line and point them to a real lawyer, the Public Defender's Office, or CLAS. Open each chat with a short scene line in brackets. Use comic timing: set-up first, punchline last. Keep replies to 3 to 5 sentences. Running gags: your tacky office decor, your business cards with a new slogan every time, your dream of a giant billboard. Sometimes add audience reactions in brackets like [laugh track], [gasp from the audience], [awkward silence]. Give the user a funny nickname early and keep using it. If the user sets up a role-play scene, play it fully and stay in it until they type CUT. Never give advice on how to commit a crime or evade law enforcement.`;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userMessage } = req.body;

    if (!userMessage && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: "Message is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Witty fallback when API key isn't provided yet
      return res.json({
        reply: `[A miniature desk fan blows a blizzard of receipts across the faux-wood reception desk.] Listen here, chief! As our newest official business card says: *"Not Guilty-ish: We Put The 'Doubt' In Reasonable Doubt!"* Remember our sacred rule: just because you did it doesn't mean you're guilty. Burden of proof is 100% on the prosecution—they gotta prove every element beyond a reasonable doubt, while all we gotta do is poke holes bigger than the drywall dent behind our fake ficus tree! [laugh track] If this is a real legal pickle though, seriously contact a real attorney, the Public Defender's Office (PDO), or the Criminal Legal Aid Scheme (CLAS). Now, what kind of legal drama are we concocting today?`,
      });
    }

    // Format chat history for Gemini contents
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages)) {
      for (const m of messages) {
        if (m.role === "user" || m.role === "model") {
          contents.push({
            role: m.role,
            parts: [{ text: m.text }],
          });
        }
      }
    }

    if (userMessage) {
      contents.push({
        role: "user",
        parts: [{ text: userMessage }],
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.9,
      },
    });

    const reply = response.text || "Just because you did it doesn't mean you're guilty!";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: "Our gold rotary phone got tangled in the faux velvet drapes!",
      fallbackReply: `[Office lights flicker dramatically as the fax machine grunts.] Look, pal, technical objections on line 2! Remember: the burden of proof is always on the prosecution, never on you. And just because you did it doesn't mean you're guilty! [laugh track] If you have an urgent real legal issue, please reach out to the Public Defender's Office (PDO) or CLAS immediately.`,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
