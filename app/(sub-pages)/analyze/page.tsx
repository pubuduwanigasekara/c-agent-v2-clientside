"use client";

import { useEffect, useState } from "react";
import TeamSelector from "@/components/analyze/TeamSelector";
import GroundSelector from "@/components/analyze/GroundSelector";
import PlayerMultiSelect from "@/components/analyze/PlayerMultiSelect";
import MatchDateTime from "@/components/analyze/MatchDateTime";
import AnalyzeButton from "@/components/analyze/AnalyzeButton";
import AnalysisResult from "@/components/analyze/AnalysisResult";
import { analyzeMatch } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import Select from "@/components/ui/Select";
import {
  Sparkles,
  BrainCircuit,
  CheckCircle2,
  Circle,
  ShieldCheck,
  Activity,
  Trophy,
  Info,
  Users,
} from "lucide-react";
import ChatSection from "@/components/pages/chat/ChatSection";
import { Download } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

// Types for the libraries we'll import dynamically
type jsPDF = any;
type html2canvas = any;

const TIMEZONES = [
  { value: "Asia/Kolkata", label: "IST (India)" },
  { value: "Asia/Colombo", label: "SLT (Sri Lanka)" },
  { value: "Asia/Dubai", label: "GST (UAE)" },
  { value: "Asia/Karachi", label: "PKT (Pakistan)" },
  { value: "Australia/Sydney", label: "AEST (Australia-Sydney)" },
  { value: "Europe/London", label: "GMT (UK)" },
  { value: "UTC", label: "UTC (Universal)" },
];

export default function AnalyzePage() {
  // Team selection
  const [yourTeam, setYourTeam] = useState("");
  const [opponentTeam, setOpponentTeam] = useState("");

  // Player selection
  const [yourPlayers, setYourPlayers] = useState<string[]>([]);
  const [opponentPlayers, setOpponentPlayers] = useState<string[]>([]);

  // Match details
  const [ground, setGround] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  // UI state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  // Scroll state
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Content Protection logic
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Discourage PrintScreen and common screenshot shortcuts where possible
      if (
        e.key === "PrintScreen" ||
        (e.metaKey &&
          e.shiftKey &&
          (e.key === "3" || e.key === "4" || e.key === "5"))
      ) {
        // We can't stop OS screenshots, but we can acknowledge "Secure Mode"
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleExportPDF = async () => {
    const element = document.getElementById("analysis-result-print");
    if (!element) return;

    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: html2canvas } = await import("html2canvas-pro");

      // Temporarily show the element for capture
      element.style.display = "block";

      const canvas = await html2canvas(element, {
        scale: 1.5, // Reduced scale for smaller file size
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Hide it back
      element.style.display = "none";

      const imgData = canvas.toDataURL("image/jpeg", 0.7); // Use JPEG with 0.7 compression for size
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 10; // 10mm margin
      const contentWidth = pdfWidth - 2 * margin;
      const pdfHeight = (canvas.height * contentWidth) / canvas.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      let heightLeft = pdfHeight;
      let position = margin; // Start at margin height

      // Add first page
      pdf.addImage(imgData, "JPEG", margin, position, contentWidth, pdfHeight);
      heightLeft -= pageHeight - margin;

      // Add subsequent pages if needed
      while (heightLeft > 0) {
        pdf.addPage();
        position = heightLeft - pdfHeight + margin;
        pdf.addImage(
          imgData,
          "JPEG",
          margin,
          position,
          contentWidth,
          pdfHeight,
        );
        heightLeft -= pageHeight;
      }

      pdf.save(`Match_Analysis_${yourTeam}_vs_${opponentTeam}.pdf`);
    } catch (err) {
      console.error("PDF Export failed:", err);
    }
  };

  const REASONING_LOGS = [
    "Analyzing your team performance…",
    "Analyzing opponent team strengths…",
    "Checking ground and venue details…",
    "Reviewing pitch and match conditions…",
    "Studying past match patterns…",
    "Preparing match insights…",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setCurrentLogIndex(0);
      interval = setInterval(() => {
        setCurrentLogIndex((prev) => (prev + 1) % REASONING_LOGS.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const isValid =
    yourTeam &&
    opponentTeam &&
    yourTeam !== opponentTeam &&
    ground &&
    date &&
    time &&
    yourPlayers.length >= 11 &&
    opponentPlayers.length >= 11;

  const handleAnalyze = async () => {
    if (!isValid) {
      if (!isValid) {
        toast.warning(
          "Please complete all fields. Both teams need at least 11 players.",
        );
        return;
      }
    }

    setLoading(true);
    setLoading(true);
    setResult(null);

    // Scroll to result/loading state immediately
    setTimeout(() => {
      document
        .getElementById("analysis-result")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    const payload = {
      your_team: yourTeam,
      opponent_team: opponentTeam,
      date,
      time,
      location: ground,
      timezone,
      your_team_players: yourPlayers,
      opponent_team_players: opponentPlayers,
      session_id: `sess_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      client_id: "cricket_web_app_v2",
      user_id: "user_internal_001",
    };

    try {
      const res = await analyzeMatch(payload);
      setResult(res);
    } catch (err) {
      console.error(err);
      toast.error(
        "Analysis failed. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative font-sans select-none bg-[#11074b]">
      {/* Navbar - Always Fixed */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#11074b]/80 backdrop-blur-md border-b border-white/10 py-3 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={"https://www.en2h.tech/"}>
              <img
                src="https://ik.imagekit.io/ojcyr6b6l/EN2H%20Main%20Logo%20Black%20Edition.png?updatedAt=1765596023483"
                alt="EN2H Logo"
                className="h-5 w-auto object-contain brightness-0 invert"
              />
            </Link>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            {[
              { label: "Report", id: "analysis-result" },
              { label: "Ask AI", id: "chat" },
              { label: "New Analysis", id: "analyze-form" },
            ].map((link) => (
              <button
                key={link.id}
                disabled={!result}
                onClick={() =>
                  document
                    .getElementById(link.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                  !result
                    ? "text-white/40 cursor-not-allowed"
                    : "text-white hover:text-[#ef660f]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="h-6 w-px bg-white/10 mx-1 hidden md:block"></div>
            <button
              disabled
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-white/5 text-white/30 cursor-not-allowed border border-white/10 opacity-70"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF (Coming Soon)</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[600px] flex items-center justify-center lg:justify-start overflow-hidden bg-[#11074b]">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://ik.imagekit.io/ojcyr6b6l/c%20agent%20bg.png"
            alt="Intelligence Background"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Gradients for readability and smooth transition */}
          <div className="absolute inset-0 bg-linear-to-r from-[#11074b] via-[#11074b]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#11074b] to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 pb-40 flex flex-col justify-center h-full">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#ef660f]" />
              <span>AI + Data + Domain Expert</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl leading-tight">
            Cricket <span className="text-[#ef660f]">Intelligence</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
            Get AI and data-driven pre-match insights and strategic
            recommendations for{" "}
            <span className="text-white font-bold underline underline-offset-4 decoration-[#ef660f] decoration-2">
              International T20 matches.
            </span>
          </p>
        </div>
      </div>

      {/* Main Content Area - Overlapping Hero */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 -mt-32 pb-24 space-y-12">
        <section id="analyze-form">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Form Area */}
            <div className="lg:col-span-8 space-y-8">
              <Card className="p-0 border-white/10 overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl ring-1 ring-white/10">
                <div className="p-8 space-y-10">
                  {/* Team Selection Section */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                      <ShieldCheck className="w-4 h-4 text-[#ef660f]" />
                      <h3 className="font-bold text-sm text-white uppercase tracking-tight">
                        TEAM SELECTION
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <TeamSelector
                        label="Select Your Team"
                        value={yourTeam}
                        onChange={setYourTeam}
                      />
                      <TeamSelector
                        label="Select Opponent Team"
                        value={opponentTeam}
                        onChange={setOpponentTeam}
                        disabledTeam={yourTeam}
                      />
                    </div>
                  </section>

                  {/* Player Detail Section */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                      <Users className="w-4 h-4 text-[#ef660f]" />
                      <h3 className="font-bold text-sm text-white uppercase tracking-tight">
                        PICK THE PLAYERS (11+)
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <PlayerMultiSelect
                        team={yourTeam}
                        selectedPlayers={yourPlayers}
                        onChange={setYourPlayers}
                      />
                      <PlayerMultiSelect
                        team={opponentTeam}
                        selectedPlayers={opponentPlayers}
                        onChange={setOpponentPlayers}
                      />
                    </div>
                  </section>

                  {/* Detail Section */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                      <Activity className="w-4 h-4 text-[#ef660f]" />
                      <h3 className="font-bold text-sm text-white uppercase tracking-tight">
                        Playing Conditions
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                      <div className="md:col-span-1">
                        <GroundSelector value={ground} onChange={setGround} />
                      </div>
                      <div className="md:col-span-2">
                        <MatchDateTime
                          date={date}
                          time={time}
                          onDateChange={setDate}
                          onTimeChange={setTime}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Select
                        label="Match Timezone"
                        value={timezone}
                        options={TIMEZONES}
                        onChange={setTimezone}
                      />
                    </div>
                  </section>
                </div>

                {/* Action Footer */}
                <div className="bg-[#11074b]/50 p-8 border-t border-white/10 flex flex-col items-center justify-center gap-4">
                  <AnalyzeButton
                    loading={loading}
                    onClick={handleAnalyze}
                    disabled={!isValid || loading}
                  />
                  <p className="text-sm text-[#ef660f] bg-[#ef660f]/10 border border-[#ef660f]/20 px-4 py-2 rounded-full font-medium inline-flex text-center items-center gap-2">
                    <Info className="w-3.5 h-3.5" />
                    For guidance only. AI may make mistakes, verify important
                    info.
                  </p>
                </div>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6 pt-12 lg:pt-0">
              <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-xl text-white relative overflow-hidden group ring-1 ring-white/10">
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-[#ef660f]/10 text-[#ef660f] text-[10px] font-black uppercase tracking-widest border border-[#ef660f]/20">
                    Powered by EN2H AI
                  </div>
                  <h3 className="font-black text-2xl tracking-tighter leading-none">
                    Match Analysis
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed font-medium">
                    Provides a detailed look at team performance, conditions,
                    and possible match outcomes.
                  </p>
                  <div className="space-y-4 pt-2">
                    {[
                      "Ground & Pitch Insights",
                      "Build Your Best 11 Players",
                      "Toss Suggestion",
                      "Weather & DLS Scenarios",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1">
                          <Trophy className="w-3.5 h-3.5 text-[#ef660f]" />
                        </div>
                        <span className="text-white/80 text-sm font-semibold leading-normal  tracking-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-xl space-y-6">
                <h4 className="font-bold text-white text-sm  tracking-tight border-b border-white/10 pb-3">
                  Ready Check / Ready to start ?
                </h4>
                <div className="space-y-4">
                  <StatusItem
                    label="Teams Selected"
                    checked={
                      !!yourTeam && !!opponentTeam && yourTeam !== opponentTeam
                    }
                  />
                  <StatusItem
                    label="Your Players Selected"
                    checked={yourPlayers.length >= 11}
                  />
                  <StatusItem
                    label="Opponent Players Selected"
                    checked={opponentPlayers.length >= 11}
                  />
                  <StatusItem
                    label="Ground & Date Set"
                    checked={!!ground && !!date && !!time}
                  />
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="analysis-result">
          {/* Analysis Result Section */}
          <div id="analysis-result" className="pt-12">
            {loading && (
              <div className="flex flex-col items-center justify-center py-24 space-y-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#ef660f]/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                  <div className="relative flex items-center justify-center">
                    <Loader className="w-16 h-16 text-[#ef660f] animate-spin relative z-10" />
                    <Sparkles className="w-6 h-6 text-[#ef660f]/60 absolute animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-4 max-w-md mx-auto">
                  <h3 className="text-white font-black text-2xl tracking-tight uppercase">
                    Quantizing Match Data...
                  </h3>
                  <div className="h-6 overflow-hidden">
                    <p
                      key={currentLogIndex}
                      className="text-[#ef660f] font-bold text-sm uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-500"
                    >
                      {REASONING_LOGS[currentLogIndex]}
                    </p>
                  </div>
                  <p className="text-white/60 font-medium text-xs uppercase tracking-tighter">
                    Consulting high-dimensional models for accuracy
                  </p>
                </div>
              </div>
            )}

            {result && <AnalysisResult data={result} />}
          </div>

          {/* Hidden Print Container */}
          <div
            id="analysis-result-print"
            style={{
              position: "absolute",
              left: "-9999px",
              top: "-9999px",
              width: "1200px", // Fixed width for consistent A4 aspect ratio capture
              display: "none",
            }}
          >
            {result && <AnalysisResult data={result} printing={true} />}
          </div>
        </section>

        {result && (
          <section id="chat" className="space-y-4">
            <ChatSection />
            <p className="text-center text-[10px] text-white/60 font-medium flex items-center justify-center gap-2 pb-8">
              <Info className="w-3 h-3 text-[#ef660f]" />
              AI models can provide inaccurate data. Consult professional match
              officials for definitive rules.
            </p>
          </section>
        )}
      </div>

      {/* WhatsApp Fixed Button */}
      <a
        href="https://wa.me/94767098119?text=Hi%2C%20I%20would%20like%20to%20submit%20feedback%20for%20the%20Match%20Analysis.%0A%0ARating%20(1%E2%80%935)%3A%0AComments%3A
"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="absolute inset-0 bg-[#ef660f] blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>

        <div className="relative bg-[#ef660f] text-white p-4 rounded-full hover:bg-[#ef660f]/80 hover:scale-110 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="font-bold text-sm hidden group-hover:block whitespace-nowrap pl-2">
              Submit your Feedback <br />
              <span className=" text-sm font-medium">
                We realy appreciate your feedback and thank you.
              </span>
            </div>

            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.002 3C9.373 3 4 8.373 4 15.002c0 2.652.867 5.102 2.332 7.086L4 29l7.086-2.332a11.94 11.94 0 0 0 4.916 1.06h.002C22.63 27.728 28 22.355 28 15.726 28 9.097 22.63 3.726 16.002 3zm6.7 17.4c-.28.78-1.38 1.5-2.27 1.62-.61.08-1.39.12-4.48-1.02-3.95-1.53-6.5-5.37-6.7-5.63-.2-.27-1.6-2.13-1.6-4.06 0-1.93 1.01-2.88 1.37-3.27.36-.39.78-.49 1.04-.49.26 0 .52 0 .75.01.24.01.56-.09.88.67.32.78 1.09 2.67 1.19 2.86.1.19.17.41.03.66-.14.25-.21.41-.41.63-.2.22-.42.5-.6.67-.2.2-.41.42-.18.83.23.41 1.02 1.68 2.19 2.72 1.5 1.34 2.76 1.75 3.16 1.95.4.2.63.17.86-.1.23-.27.99-1.15 1.25-1.55.26-.4.52-.33.88-.2.36.13 2.27 1.07 2.66 1.26.39.19.65.28.75.43.1.15.1.87-.18 1.65z" />
            </svg>
          </div>
        </div>
      </a>

      <style jsx>{`
        @keyframes head-shake {
          0% {
            transform: translateX(0);
          }
          6.5% {
            transform: translateX(-6px) rotateY(-9deg);
          }
          18.5% {
            transform: translateX(5px) rotateY(7deg);
          }
          31.5% {
            transform: translateX(-3px) rotateY(-5deg);
          }
          43.5% {
            transform: translateX(2px) rotateY(3deg);
          }
          50% {
            transform: translateX(0);
          }
        }
        .animate-head-shake {
          animation: head-shake 0.6s ease-in-out infinite;
        }
      `}</style>
      <Footer />
    </div>
  );
}

function StatusItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center justify-between group">
      <span
        className={`text-[11px] font-bold  tracking-tight transition-colors ${
          checked ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {label}
      </span>
      <div
        className={`transition-all duration-300 ${
          checked ? "scale-110" : "scale-100 opacity-50"
        }`}
      >
        {checked ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
        ) : (
          <Circle className="w-4 h-4 text-slate-600" />
        )}
      </div>
    </div>
  );
}
