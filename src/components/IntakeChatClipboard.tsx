import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
  Minimize2,
  X,
  MessageSquare,
  AlertOctagon,
  RefreshCw,
  FileCheck2
} from "lucide-react";
import { playLaughTrack, playPhoneRing } from "../utils/audio";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "model",
    text: "[The front office rotary phone rattles against a stack of expired coupon mailers. Sal picks up the brass receiver with a flourish.] Welcome to Not Guilty-ish Legal, superstar! Just because you did it doesn't mean you're guilty! Sign your name on this sticky clipboard while I check if our coffee maker is done brewing reasonable doubt. What kind of legal drama are we dodging today?",
    timestamp: "Just now"
  }
];

const SUGGESTED_PROMPTS = [
  "Explain burden of proof like I'm 5",
  "Can police search my bag at a bus stop?",
  "Role-play: I was accused of stealing a giant lawn flamingo!",
  "What's the difference between guilty and not guilty-ish?",
  "What are the 5 steps in court?"
];

export function IntakeChatClipboard({
  isOpen,
  onClose,
  onOpen
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation history for server
      const conversationHistory = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversationHistory,
          userMessage: text
        })
      });

      const data = await res.json();
      const replyText = data.reply || data.fallbackReply || "Just because you did it doesn't mean you're guilty!";

      // Check if reply includes laugh track or audience reaction
      if (soundEnabled && /\[laugh track\]/i.test(replyText)) {
        playLaughTrack();
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "model",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "model",
        text: "[The office microwave dings loudly.] Objection sustained on line 4! Remember the golden rule: burden of proof is 100% on the state! If this is a real-life legal emergency, please reach out directly to the Public Defender's Office (PDO) or CLAS immediately.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Formats script bracketed cues like [laugh track] or [stage directions] into script styling.
   */
  const renderFormattedScriptText = (text: string) => {
    // Regex splits by bracketed content
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const isLaugh = /laugh/i.test(part);
        return (
          <span
            key={index}
            className={`inline-block my-1 px-1.5 py-0.5 rounded text-xs font-mono font-bold tracking-tight italic ${
              isLaugh
                ? "bg-red-500 text-yellow-200 border border-red-700 shadow-xs"
                : "bg-amber-300 dark:bg-amber-900/80 text-amber-950 dark:text-amber-200 border border-amber-500/50"
            }`}
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const resetChat = () => {
    playPhoneRing();
    setMessages(INITIAL_MESSAGES);
  };

  // If floating widget is closed, render the floating trigger badge
  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={onOpen}
          className="group relative flex items-center gap-3 px-5 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-billboard text-xl tracking-wider uppercase rounded-2xl border-4 border-black retro-shadow-black transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open front-desk intake clipboard chat"
        >
          {/* Metallic Clip Accent */}
          <div className="w-10 h-3 bg-neutral-400 border-2 border-black rounded-t absolute -top-3 left-1/2 -translate-x-1/2" />
          <MessageSquare className="w-6 h-6 text-red-600 animate-bounce" />
          <span>Front-Desk Intake 📋</span>
          <span className="w-3.5 h-3.5 rounded-full bg-red-600 animate-ping absolute -top-1 -right-1" />
        </button>
      </div>
    );
  }

  return (
    <div
      id="intake-chat-widget"
      role="region"
      aria-label="Front-Desk Intake Clipboard Chat"
      className={`fixed z-50 transition-all duration-300 flex flex-col ${
        isExpanded
          ? "inset-4 sm:inset-10"
          : "bottom-4 right-4 sm:right-6 w-[94vw] sm:w-[460px] h-[640px] max-h-[88vh]"
      }`}
    >
      {/* Outer Wooden / Masonite Clipboard Frame */}
      <div className="relative w-full h-full bg-[#4a2e1b] border-4 border-black rounded-3xl p-3 sm:p-4 retro-shadow-lg flex flex-col overflow-hidden">
        {/* Metal Binder Clip Hardware at top */}
        <div className="flex justify-center -mt-2 mb-2 select-none">
          <div className="relative bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 border-2 border-black rounded-t-lg px-8 py-1.5 shadow-md flex items-center justify-center">
            {/* Clip rivet */}
            <div className="w-3 h-3 rounded-full bg-neutral-600 border border-black shadow-inner mr-2" />
            <span className="text-[10px] font-mono font-black uppercase text-neutral-800 tracking-wider">
              CLIENT INTAKE • CONFIDENTIAL-ISH
            </span>
            <div className="w-3 h-3 rounded-full bg-neutral-600 border border-black shadow-inner ml-2" />
          </div>
        </div>

        {/* Yellow Lined Legal Pad Document Inside Clipboard */}
        <div className="flex-1 bg-legal-pad text-neutral-900 rounded-xl border-2 border-amber-300 flex flex-col overflow-hidden shadow-inner relative">
          {/* Pad Header / Controls */}
          <div className="bg-amber-300/90 border-b-2 border-red-500/60 px-4 py-2.5 flex items-center justify-between gap-2 shrink-0">
            <div>
              <div className="flex items-center gap-1.5 font-billboard text-lg sm:text-xl tracking-wide uppercase text-neutral-900">
                <FileCheck2 className="w-4 h-4 text-red-600" />
                Strip-Mall Sign-In Clipboard
              </div>
              <p className="text-[11px] font-mono text-neutral-700 italic">
                Episode 1: "The Case of the Misunderstood Client"
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Manual Laugh Track Button */}
              <button
                onClick={playLaughTrack}
                className="p-1.5 bg-red-600 text-white hover:bg-red-700 rounded border border-black text-xs font-bold flex items-center gap-1 cursor-pointer transition-transform active:scale-90"
                title="Trigger Sitcom Laugh Track sound effect"
                aria-label="Play laugh track sound"
              >
                🎭 Laugh
              </button>

              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded border border-black cursor-pointer transition-colors ${
                  soundEnabled ? "bg-amber-400 hover:bg-amber-500 text-black" : "bg-neutral-300 text-neutral-500"
                }`}
                title={soundEnabled ? "Mute Sitcom Audio" : "Unmute Sitcom Audio"}
                aria-label={soundEnabled ? "Mute Sitcom Audio" : "Unmute Sitcom Audio"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Expand / Minimize */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 bg-neutral-200 hover:bg-neutral-300 rounded border border-black text-black cursor-pointer"
                title={isExpanded ? "Collapse clipboard" : "Expand clipboard"}
                aria-label={isExpanded ? "Collapse clipboard" : "Expand clipboard"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                className="p-1.5 bg-neutral-900 hover:bg-black text-yellow-300 rounded border border-black cursor-pointer"
                title="Close chat clipboard"
                aria-label="Close chat clipboard"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sitcom Legal Disclaimer Ribbon */}
          <div className="bg-red-100 border-b border-red-300 px-3 py-1 flex items-center justify-between text-[11px] font-sans text-red-800">
            <span className="flex items-center gap-1">
              <AlertOctagon className="w-3.5 h-3.5 shrink-0 text-red-600" />
              Comedic educational sitcom simulation. Not a real law firm.
            </span>
            <button
              onClick={resetChat}
              className="font-bold underline hover:text-black flex items-center gap-1 text-[10px] cursor-pointer"
              title="Reset conversation"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              Reset Scene
            </button>
          </div>

          {/* Scrollable Message History Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <span className="text-[10px] font-mono text-neutral-500 mb-0.5 px-1">
                  {m.role === "user" ? "Client (Potential Legend)" : "Sal (Front-Desk / Lead Counsel)"} • {m.timestamp}
                </span>

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 border-2 border-black text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white text-neutral-900 rounded-tl-none font-sans"
                  }`}
                >
                  {m.role === "model" ? renderFormattedScriptText(m.text) : m.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-mono text-neutral-500 mb-0.5 px-1">
                  Sal is practicing objections...
                </span>
                <div className="bg-white border-2 border-black rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span className="text-xs font-mono font-semibold text-neutral-600 italic">
                    [Rustling papers & pouring lukewarm coffee...]
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-amber-200/70 border-t border-amber-300 px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 shrink-0">
              Try asking:
            </span>
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 bg-white hover:bg-yellow-100 text-neutral-800 text-xs font-medium rounded-full border border-black/40 whitespace-nowrap transition-transform active:scale-95 cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box Bar */}
          <div className="p-3 bg-white border-t-2 border-black flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="State your case or situation (e.g. 'Can police search my trunk?')..."
              className="flex-1 px-3.5 py-2.5 bg-amber-50 rounded-xl border-2 border-black text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-600 font-sans"
              aria-label="Ask the front-desk intake assistant"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-billboard text-base uppercase rounded-xl border-2 border-black retro-shadow-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              aria-label="Send message to legal intake"
            >
              <Send className="w-4 h-4" />
              <span>File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
