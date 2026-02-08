import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Trophy,
  Coins,
  Target,
  TrendingUp,
  Info,
  Calendar,
  MapPin,
  Zap,
  BarChart3,
  Clock,
  Users,
  Activity,
  ShieldCheck,
  CloudRain,
  Swords,
  BookOpen,
  Brain,
  CheckCircle2,
  Gauge,
  Thermometer,
  Wind,
  Droplets,
  Database,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utills";

export default function AnalysisResult({
  data,
  printing = false,
}: {
  data: any;
  printing?: boolean;
}) {
  const [showRaw, setShowRaw] = useState(false);

  // If printing, force expand accordions
  const displayRaw = printing || showRaw;

  // Extract main data payload
  const main = data?.data || data;
  const analysis = main?.analysis || {};
  const weather = main?.weather || {};
  const ground = main?.ground || {};
  const teams = main?.teams || {};
  const matchInfo = main?.match_info || {};

  useEffect(() => {
    if (main) {
      console.log("Full Analysis Payload:", main);
    }
  }, [main]);

  if (!data) return null;

  const SectionHeader = ({ icon: Icon, title, badge }: any) => (
    <div
      className={cn(
        "flex items-center justify-between border-b pb-4 mb-6",
        printing ? "border-slate-200" : "border-white/10",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#ef660f] rounded-none">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h3
          className={cn(
            "font-black text-sm uppercase tracking-widest",
            printing ? "text-slate-900" : "text-white",
          )}
        >
          {title}
        </h3>
      </div>
      {badge && (
        <Badge
          className={cn(
            "rounded-none text-[8px] font-black uppercase",
            printing
              ? "bg-slate-100 text-slate-500 border-slate-200"
              : "bg-white/5 text-white/40 border-white/10",
          )}
        >
          {badge}
        </Badge>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "space-y-12 pb-20 container mx-auto px-6 md:px-0",
        printing ? "bg-white text-slate-900" : "text-white",
        !printing && "animate-in fade-in slide-in-from-bottom-4 duration-1000",
      )}
    >
      {/* Header / Identity Area */}
      <div
        className={cn(
          "flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-4",
          printing ? "border-slate-200" : "border-white/10",
        )}
      >
        <div className="space-y-4 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ef660f]/10 text-[#ef660f] text-xs font-semibold tracking-tight rounded-lg border border-[#ef660f]/20">
            Match Intelligence | T20 Pre Match Analysis
          </div>
          <h2
            className={cn(
              "text-5xl md:text-6xl font-black tracking-tighter leading-none",
              printing ? "text-slate-900" : "text-white",
            )}
          >
            {matchInfo.your_team || teams.your_team?.team_name || "Home"}{" "}
            <span className="text-[#ef660f] "> VS </span>{" "}
            {matchInfo.opponent_team ||
              teams.opponent_team?.team_name ||
              "Away"}
          </h2>
          <div
            className={cn(
              "flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest",
              printing ? "text-slate-500" : "text-white/60",
            )}
          >
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {matchInfo.date || weather.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {matchInfo.time} ({matchInfo.timezone || weather.timezone})
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {matchInfo.location || weather.location}
            </span>
          </div>
        </div>

        {/* Brand Logo for Print */}
        <div
          className={cn(
            "flex flex-col items-center md:items-end gap-2",
            !printing && "hidden md:flex", // Show only on desktop in web, always in print
          )}
        >
          <img
            src="https://ik.imagekit.io/ojcyr6b6l/EN2H%20Main%20Logo%20Black%20Edition.png?updatedAt=1765596023483"
            alt="EN2H Corporate Logo"
            className={cn(
              "h-10 md:h-12 w-auto object-contain",
              printing ? "" : "brightness-0 invert",
            )}
          />
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-[0.2em]",
              printing ? "text-slate-400" : "text-white/40",
            )}
          >
            Match Intelligence Report
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          className={cn(
            "rounded-none border-2 p-8 space-y-6 relative overflow-hidden group",
            printing
              ? "bg-slate-50 border-slate-200"
              : "border-white/10 bg-white/5 backdrop-blur-xl",
          )}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ef660f]/5 rounded-full -mr-16 -mt-16 transition-colors duration-500" />
          <div className="relative z-10 space-y-6">
            <p
              className={cn(
                "text-xs font-black uppercase tracking-widest flex items-center gap-2",
                printing ? "text-slate-500" : "text-white/60",
              )}
            >
              <Gauge className="w-3.5 h-3.5" />
              Win Probability
            </p>
            <div className="flex items-end justify-between gap-4">
              <div className="text-center flex-1">
                <p
                  className={cn(
                    "text-[10px] font-black uppercase truncate",
                    printing ? "text-slate-500" : "text-white/60",
                  )}
                >
                  {matchInfo.your_team || teams.your_team?.team_name}
                </p>
                <h4
                  className={cn(
                    "text-6xl font-black",
                    printing ? "text-slate-900" : "text-white",
                  )}
                >
                  {analysis.win_probability?.your_team || 0}%
                </h4>
              </div>
              <div
                className={cn(
                  "h-16 w-px mb-2",
                  printing ? "bg-slate-200" : "bg-white/10",
                )}
              />
              <div className="text-start flex-1">
                <p
                  className={cn(
                    "text-[10px] font-black uppercase",
                    printing ? "text-slate-500" : "text-white/60",
                  )}
                >
                  {matchInfo.opponent_team || teams.opponent_team?.team_name}
                </p>
                <h4 className="text-6xl font-black text-[#ef660f]">
                  {analysis.win_probability?.opponent_team || 0}%
                </h4>
              </div>
            </div>
            <div
              className={cn(
                "space-y-3 pt-6 border-t",
                printing ? "border-slate-200" : "border-white/10",
              )}
            >
              {analysis.win_probability?.key_factors?.map(
                (f: string, i: number) => (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-2 text-sm font-medium tracking-tight",
                      printing ? "text-slate-600" : "text-white/60",
                    )}
                  >
                    <span className="text-[#ef660f]">-</span>
                    {f}
                  </div>
                ),
              )}
            </div>
          </div>
        </Card>

        <Card
          className={cn(
            "rounded-none border-2 p-8 group overflow-hidden relative",
            printing
              ? "bg-slate-50 border-slate-200"
              : "border-white/10 bg-[#11074b] text-white",
          )}
        >
          <div
            className={cn(
              "absolute bottom-0 right-0 p-4 opacity-5 translate-y-4 group-hover:translate-y-0 transition-transform",
              printing ? "text-slate-300" : "text-white",
            )}
          >
            <Swords className="w-20 h-20" />
          </div>
          <div className="relative z-10 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-[#ef660f] uppercase tracking-widest">
                Bat or Bowl First?
              </p>
              <h3
                className={cn(
                  "text-4xl font-black leading-none uppercase",
                  printing ? "text-slate-900" : "text-white",
                )}
              >
                {analysis.toss_recommendation?.decision?.replace("_", " ") ||
                  "No Data"}
              </h3>
              <p
                className={cn(
                  "text-xs leading-relaxed font-medium",
                  printing ? "text-slate-600" : "text-white/60",
                )}
              >
                {analysis.toss_recommendation?.reasoning}
              </p>
            </div>
            <div className="pt-6">
              <Badge className="bg-[#ef660f] text-white rounded-none text-[9px] font-black border-none px-4 py-1.5 uppercase tracking-widest">
                Confidence: {analysis.toss_recommendation?.confidence || "N/A"}
              </Badge>
            </div>
          </div>
        </Card>

        <Card
          className={cn(
            "rounded-none border-2 p-8 space-y-6",
            printing
              ? "bg-slate-50 border-slate-200"
              : "border-white/10 bg-white/5 backdrop-blur-xl",
          )}
        >
          <p
            className={cn(
              "text-xs font-black uppercase tracking-widest flex items-center gap-2",
              printing ? "text-slate-500" : "text-white/60",
            )}
          >
            <CloudRain className="w-3.5 h-3.5" />
            Weather Analysis
          </p>
          {!weather || Object.keys(weather).length === 0 ? (
            <div className="py-8 text-center bg-white/5 border border-dashed border-white/10">
              <p className="text-xs font-bold text-white/20 uppercase">
                Weather Data Temporarily Unavailable
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      printing ? "text-slate-500" : "text-white/60",
                    )}
                  >
                    <Thermometer className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase">
                      Mean Temp
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-3xl font-black",
                      printing ? "text-slate-900" : "text-white",
                    )}
                  >
                    {analysis.weather_analysis?.temperature ||
                      weather.avg_temp_c + "°C"}
                  </p>
                </div>
                <div className="space-y-1">
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      printing ? "text-slate-500" : "text-white/60",
                    )}
                  >
                    <Droplets className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase">
                      Rain Factor
                    </span>
                  </div>
                  <p className="text-3xl font-black text-[#ef660f]">
                    {analysis.weather_analysis?.rain_chance ||
                      weather.chance_of_rain + "%"}
                  </p>
                </div>
                <div className="space-y-1">
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      printing ? "text-slate-500" : "text-white/60",
                    )}
                  >
                    <Wind className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase">
                      Velocity
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-3xl font-black",
                      printing ? "text-slate-900" : "text-white",
                    )}
                  >
                    {analysis.weather_analysis?.wind_speed ||
                      weather.wind_speed}
                  </p>
                </div>
                <div className="space-y-1">
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      printing ? "text-slate-500" : "text-white/60",
                    )}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase">
                      Humidity
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-3xl font-black",
                      printing ? "text-slate-900" : "text-white",
                    )}
                  >
                    {analysis.weather_analysis?.humidity ||
                      weather.avg_humidity + "%"}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "p-2 border flex gap-3",
                  printing
                    ? "bg-slate-100 border-slate-200"
                    : "bg-white/5 border-white/10",
                )}
              >
                <Info className="w-4 h-4 text-[#ef660f] shrink-0 mt-0.5" />
                <p
                  className={cn(
                    "text-sm font-medium",
                    printing ? "text-slate-600" : "text-white/60",
                  )}
                >
                  {analysis.weather_analysis?.summary ||
                    analysis.weather_analysis?.pitch_impact}
                </p>
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Strategic Matchups - NEW ROW */}
      <div className="space-y-6">
        <SectionHeader
          icon={Swords}
          title="Game Changing Threats"
          badge="CRITICAL_BATTLES"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysis.key_matchups?.map((m: any, i: number) => (
            <Card
              key={i}
              className={cn(
                "rounded-none border-2 p-6 relative group overflow-hidden transition-colors",
                printing
                  ? "bg-slate-50 border-slate-200"
                  : "border-white/10 bg-white/5 backdrop-blur-xl hover:border-[#ef660f]",
              )}
            >
              <div
                className={cn(
                  "absolute top-0 left-0 w-1 h-full transition-all",
                  printing
                    ? "bg-slate-200"
                    : "bg-white/10 group-hover:bg-[#ef660f]",
                )}
              />
              <div className="space-y-4">
                <h5
                  className={cn(
                    "font-black text-sm uppercase tracking-tight",
                    printing ? "text-slate-900" : "text-white",
                  )}
                >
                  {m.battle}
                </h5>
                <div className="flex flex-col gap-2">
                  <Badge className="bg-[#ef660f]/10 text-[#ef660f] border-none rounded-none text-[12px] font-medium px-2 w-fit">
                    Advantage: {m.advantage}
                  </Badge>
                  <p
                    className={cn(
                      "text-xs font-medium border-t pt-2",
                      printing
                        ? "text-slate-600 border-slate-200"
                        : "text-white/60 border-white/10",
                    )}
                  >
                    {m.reasoning}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* DLS Scenario & Pitch Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card
          className={cn(
            "rounded-none border-2 p-8 space-y-4",
            printing
              ? "bg-slate-50 border-slate-200"
              : "border-white/10 bg-[#ef660f]/5",
          )}
        >
          <SectionHeader
            icon={CloudRain}
            title="DLS Impact Scenario"
            badge="PRECIPITATION_RISK"
          />
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-[9px] font-black text-[#ef660f] uppercase">
                Impact Level
              </p>
              <p
                className={cn(
                  "text-xl font-black uppercase",
                  printing ? "text-slate-900" : "text-white",
                )}
              >
                {analysis.weather_analysis?.dls_scenario || "MODERATE"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black text-[#ef660f] uppercase">
                Strategic Focus
              </p>
              <p
                className={cn(
                  "text-xs font-bold leading-tight",
                  printing ? "text-slate-600" : "text-white/60",
                )}
              >
                Preserve Wickets / Variable Scoring Rates
              </p>
            </div>
          </div>
          <p
            className={cn(
              "text-xs font-semibold leading-relaxed border-t pt-4",
              printing
                ? "text-slate-600 border-slate-200"
                : "text-white/60 border-white/10",
            )}
          >
            {analysis.weather_analysis?.dls_strategy}
          </p>
        </Card>

        <Card
          className={cn(
            "rounded-none border-2 p-8 space-y-4",
            printing
              ? "bg-slate-50 border-slate-200"
              : "border-white/10 bg-white/5 backdrop-blur-xl",
          )}
        >
          <SectionHeader
            icon={TrendingUp}
            title="Ground Diagnostic"
            badge="VENUE_REPORT"
          />
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p
                className={cn(
                  "text-[9px] font-black uppercase",
                  printing ? "text-slate-500" : "text-white/60",
                )}
              >
                Average Score
              </p>
              <p
                className={cn(
                  "text-xl font-black",
                  printing ? "text-slate-900" : "text-white",
                )}
              >
                {ground.avg_first_innings_score} RUNS
              </p>
            </div>
            <div className="space-y-1">
              <p
                className={cn(
                  "text-[9px] font-black uppercase",
                  printing ? "text-slate-500" : "text-white/60",
                )}
              >
                Pitch Surface
              </p>
              <p className="text-xl font-black text-[#ef660f] uppercase">
                {ground.pitch_type}
              </p>
            </div>
          </div>
          <p
            className={cn(
              "text-xs font-medium p-3",
              printing
                ? "text-slate-600 bg-slate-100"
                : "text-white/60 bg-white/5",
            )}
          >
            {analysis.ground_analysis?.pace_vs_spin || ground.note}
          </p>
        </Card>
      </div>

      {/* Team Intelligence & Lineups */}
      <div className="space-y-12">
        {[
          {
            team: analysis.your_team_strategy || {},
            lineup: analysis.your_team_best_11,
            color: "orange",
            allPlayers: teams.your_team?.players,
            title: "Game Plan",
          },
          {
            team: analysis.opponent_team_strategy || {},
            lineup: analysis.opponent_team_best_11,
            color: "blue",
            allPlayers: teams.opponent_team?.players,
            title: "Beta Dynamics & Squad Intel",
          },
        ].map((block, idx) => (
          <div
            key={idx}
            className={cn(
              "space-y-8 p-1 border",
              printing
                ? "bg-slate-100 border-slate-200"
                : "bg-white/5 border-white/10",
            )}
          >
            <div
              className={cn(
                "p-8 space-y-10",
                printing ? "bg-white" : "bg-[#11074b]",
              )}
            >
              <div
                className={cn(
                  "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 pb-6",
                  printing ? "border-slate-100" : "border-white/10",
                )}
              >
                <h3
                  className={cn(
                    "text-2xl font-black uppercase tracking-tighter flex items-center gap-3",
                    printing ? "text-slate-900" : "text-white",
                  )}
                >
                  <span
                    className={cn(
                      "w-3 h-8",
                      idx === 0 ? "bg-[#ef660f]" : "bg-[#3b26fb]",
                    )}
                  />
                  {block.team?.team_name ||
                    (idx === 0 ? matchInfo.your_team : matchInfo.opponent_team)}
                  : {block.title}
                </h3>
              </div>

              {/* Phases */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Powerplay ", value: block.team?.powerplay },
                  {
                    label: "Middle Overs ",
                    value: block.team?.middle_overs,
                  },
                  {
                    label: "Death Overs ",
                    value: block.team?.death_overs,
                  },
                ].map((phase, pi) => (
                  <div key={pi} className="space-y-2">
                    <p className="text-sm font-bold text-[#ef660f] uppercase tracking-tighter">
                      {phase.label}
                    </p>
                    <p
                      className={cn(
                        "text-sm font-medium min-h-[60px]",
                        printing ? "text-slate-600" : "text-white/60",
                      )}
                    >
                      {phase.value || "Strategic details pending calculation."}
                    </p>
                  </div>
                ))}
              </div>

              {/* Best 11 / Suggested XI */}
              <div
                className={cn(
                  "space-y-6 pt-10 border-t",
                  printing ? "border-slate-100" : "border-white/10",
                )}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <h4
                    className={cn(
                      "text-xs font-black uppercase",
                      printing ? "text-slate-900" : "text-white",
                    )}
                  >
                    CRICKET AGENT: BEST 11 PLAYERS RECOMMENDED
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {block.lineup?.map((p: any, li: number) => (
                    <div
                      key={li}
                      className={cn(
                        "p-4 border transition-all flex flex-col justify-between group",
                        printing
                          ? "bg-slate-50 border-slate-100"
                          : "bg-white/5 border-white/10 hover:border-[#ef660f]/50",
                      )}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span
                            className={cn(
                              "text-xs font-black uppercase leading-none transition-colors",
                              printing
                                ? "text-slate-900"
                                : "text-white group-hover:text-[#ef660f]",
                            )}
                          >
                            {p.name}
                          </span>
                          <span
                            className={cn(
                              "font-black px-1.5 py-0.5 border uppercase",
                              printing
                                ? "bg-slate-100 text-slate-400 border-slate-200"
                                : "bg-[#11074b] text-white/40 border-white/10",
                            )}
                          >
                            {li + 1}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "font-bold uppercase tracking-tight",
                            printing ? "text-slate-700" : "text-white",
                          )}
                        >
                          {p.role}
                        </p>
                        <p
                          className={cn(
                            "font-medium text-sm md:pt-2 tracking-tight",
                            printing
                              ? "text-slate-500 italic"
                              : "text-white/60",
                          )}
                        >
                          "{p.reasoning}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Player Performance Summary */}
              <div className="pt-10">
                <button
                  onClick={() => setShowRaw(!showRaw)}
                  className="w-full flex items-center justify-between p-4 bg-white/5 text-white rounded-none hover:bg-white/10 transition-colors border border-white/10"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#ef660f]" />
                    Player Performance Summary
                  </span>
                  {displayRaw ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {displayRaw && (
                  <div
                    className={cn(
                      "mt-4 overflow-x-auto border",
                      printing ? "border-slate-100" : "border-white/10",
                    )}
                  >
                    <table className="w-full text-[10px] text-left">
                      <thead>
                        <tr
                          className={cn(
                            "border-b",
                            printing
                              ? "bg-slate-50 border-slate-100"
                              : "bg-white/5 border-white/10",
                          )}
                        >
                          {[
                            "Player No",
                            "Name",
                            "Role",
                            "Batting Avg / Bowling Avg",
                            "Strike Rate / Economy",
                            "Form Status",
                          ].map((h) => (
                            <th
                              key={h}
                              className={cn(
                                "p-3 text-[11px] font-black uppercase tracking-wider",
                                printing ? "text-slate-400" : "text-white/60",
                              )}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.allPlayers?.map((player: any, pi: number) => (
                          <tr
                            key={pi}
                            className={cn(
                              "border-b transition-colors group",
                              printing
                                ? "border-slate-50 bg-white"
                                : "border-white/5 hover:bg-white/5",
                            )}
                          >
                            <td
                              className={cn(
                                "p-3",
                                printing
                                  ? "text-slate-400"
                                  : "text-white/40 group-hover:text-[#ef660f]",
                              )}
                            >
                              #{player.Player_id || pi + 1}
                            </td>
                            <td className="p-3 font-semibold uppercase">
                              <span
                                className={
                                  printing ? "text-slate-900" : "text-white"
                                }
                              >
                                {player.Full_Name || player.name}
                              </span>
                              <span
                                className={cn(
                                  "block text-[8px] font-bold",
                                  printing ? "text-slate-400" : "text-white/40",
                                )}
                              >
                                {player.Batting_Style} • {player.Age}Y
                              </span>
                            </td>
                            <td
                              className={cn(
                                "p-3 uppercase",
                                printing ? "text-slate-600" : "text-white/60",
                              )}
                            >
                              {player.Playing_Role || player.role}
                            </td>
                            <td className="p-3 ">
                              <span
                                className={
                                  printing ? "text-slate-500" : "text-[#3b26fb]"
                                }
                              >
                                B: {player.T20Is_Batting_Ave || "0"}
                              </span>
                              <span
                                className={cn(
                                  "mx-2",
                                  printing ? "text-slate-200" : "text-white/20",
                                )}
                              >
                                |
                              </span>
                              <span className="text-[#ef660f]">
                                W: {player.T20Is_Bowling_Ave || "0"}
                              </span>
                            </td>
                            <td
                              className={cn(
                                "p-3",
                                printing ? "text-slate-500" : "text-white/60",
                              )}
                            >
                              {player.T20Is_Batting_SR || "0"} SR /{" "}
                              {player.T20Is_Bowling_Econ || "0"} EC
                            </td>
                            <td className="p-3">
                              <Badge className="bg-emerald-500/10 text-emerald-600 rounded-none border-none text-[7px] font-black uppercase tracking-widest px-1">
                                STABLE
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final Meta & Critical Factors Summary */}
      <div className="grid grid-cols-1 gap-6">
        <Card
          className={cn(
            "rounded-none border-2 p-10",
            printing
              ? "bg-slate-50 border-slate-200"
              : "bg-white/5 border-white/10",
          )}
        >
          <SectionHeader
            icon={Activity}
            title="Operational Conclusion & Strategic Vectors"
            badge="SUMMARY_OUTPUT"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-xs font-black text-[#ef660f] uppercase tracking-widest mb-4">
                Critical Environmental Factors
              </p>
              {analysis.critical_factors?.map((f: string, i: number) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-4 items-start p-3 border transition-all",
                    printing
                      ? "bg-white border-slate-100"
                      : "border-white/10 hover:border-[#ef660f]/30 hover:bg-white/5",
                  )}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#ef660f] shrink-0 mt-0.5" />
                  <p
                    className={cn(
                      "text-sm font-bold",
                      printing ? "text-slate-600" : "text-white/60",
                    )}
                  >
                    {f}
                  </p>
                </div>
              ))}
            </div>
            <div
              className={cn(
                "p-8 space-y-6 border backdrop-blur-md",
                printing
                  ? "bg-slate-100 border-slate-200"
                  : "bg-black/40 text-white border-white/10",
              )}
            >
              <p className="text-xs font-black text-[#ef660f] uppercase tracking-widest">
                Neural Narrative Conclusion
              </p>
              <div
                className={cn(
                  "text-sm font-medium leading-relaxed whitespace-pre-wrap",
                  printing ? "text-slate-800" : "text-white/80",
                )}
              >
                {typeof analysis.analysis === "string"
                  ? analysis.analysis
                  : "Simulation successfully completed. All tactical vectors point towards optimized resource management in rain-affected conditions."}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
