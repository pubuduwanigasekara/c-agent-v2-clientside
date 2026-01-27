"use client";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Users,
  CloudRain,
  MapPin,
  Activity,
  Sparkles,
  Trophy,
  Zap,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utills";

export default function HomePageHeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-32">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-purple-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Column: Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Match Intelligence</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              AI-Powered Cricket Match Analysis,{" "}
              <span className="text-blue-600">
                Before the First Ball Is Bowled
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Analyze teams, players, pitch, weather, and match conditions to
              get data-driven predictions, strategies, and winning insights in
              seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <Link
                href="/analyze"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all  hover:-translate-y-0.5 active:translate-y-0"
              >
                Analyze a Match Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all hover:border-slate-300"
              >
                See How It Works
              </Link>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
              {[
                {
                  icon: TrendingUp,
                  text: "Win probability & toss recommendation",
                  color: "text-emerald-500",
                  bg: "bg-emerald-50",
                },
                {
                  icon: Users,
                  text: "Best XI selection for both teams",
                  color: "text-blue-500",
                  bg: "bg-blue-50",
                },
                {
                  icon: CloudRain,
                  text: "Weather & DLS impact analysis",
                  color: "text-amber-500",
                  bg: "bg-amber-50",
                },
                {
                  icon: MapPin,
                  text: "Ground-specific match insights",
                  color: "text-purple-500",
                  bg: "bg-purple-50",
                },
                {
                  icon: Activity,
                  text: "Player-level performance intelligence",
                  color: "text-rose-500",
                  bg: "bg-rose-50",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-1">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      item.bg
                    )}
                  >
                    <item.icon className={cn("w-4 h-4", item.color)} />
                  </div>
                  <span className="text-slate-700 font-medium text-sm md:text-base text-left">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dashboard Mockup */}
          <div className="flex-1 w-full max-w-2xl relative group">
            <div className="relative rounded-2xl border border-slate-200 bg-white  overflow-hidden backdrop-blur-sm">
              {/* Mockup Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                  <Zap className="w-3 h-3" />
                  Match-Analyzer Pro v2.4
                </div>
              </div>

              {/* Mockup Content */}
              <div className="p-6 space-y-6 bg-slate-50/30">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-100  animate-pulse">
                    <p className="text-xs text-slate-400 font-bold uppercase mb-2">
                      Win Probability
                    </p>
                    <div className="text-3xl font-black text-blue-600">68%</div>
                    <div className="mt-2 text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +4.2% based on Ground Stats
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 ">
                    <p className="text-xs text-slate-400 font-bold uppercase mb-2">
                      Best 11 Prediction
                    </p>
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold"
                        >
                          P{i}
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-600">
                        +7
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 font-medium">
                      Optimized for Spin conditions
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-100  space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      Strategic Insights
                    </h4>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { l: "Toss strategy", v: "Bowl First", w: "85%" },
                      { l: "Average Score", v: "182 Runs", w: "60%" },
                    ].map((row, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-slate-500">{row.l}</span>
                          <span className="text-slate-800 font-bold">
                            {row.v}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: row.w }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl  border border-slate-100 animate-bounce-slow hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold">Accuracy</p>
                  <p className="text-lg font-black text-slate-800">92.4%</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl  border border-slate-100 animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Trusted By
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    500+ Pro Coaches
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
