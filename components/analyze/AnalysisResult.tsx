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
    <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-none">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-black text-sm text-white uppercase tracking-widest">
          {title}
        </h3>
      </div>
      {badge && (
        <Badge className="bg-slate-800 text-slate-300 rounded-none text-[8px] font-black uppercase border-slate-700">
          {badge}
        </Badge>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "space-y-12 pb-20 container mx-auto px-4 md:px-0",
        !printing && "animate-in fade-in slide-in-from-bottom-4 duration-1000",
      )}>
      {/* Header / Identity Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-4 border-slate-800">
        <div className="space-y-4 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-xs font-medium tracking-tight rounded-lg">
            Match Intelligence | Pre Match Analysis
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter  leading-none">
            {matchInfo.your_team || teams.your_team?.team_name || "Home"}{" "}
            <span className="text-blue-500 "> VS </span>{" "}
            {matchInfo.opponent_team ||
              teams.opponent_team?.team_name ||
              "Away"}
          </h2>
          <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
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
          )}>
          <img
            src="https://ik.imagekit.io/ojcyr6b6l/EN2H%20Main%20Logo%20Black%20Edition.png?updatedAt=1765596023483"
            alt="EN2H Corporate Logo"
            className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
          />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            Match Intelligence Report
          </span>
        </div>
      </div>

      {/* Primary Metrics: Win Prob & Toss */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-none border-2 border-slate-800 bg-slate-900 p-8 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full -mr-16 -mt-16 group-hover:bg-blue-900/20 transition-colors duration-500" />
          <div className="relative z-10 space-y-6">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Gauge className="w-3.5 h-3.5" />
              Win Probability
            </p>
            <div className="flex items-end justify-between gap-4">
              <div className="text-center flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase truncate">
                  {matchInfo.your_team || teams.your_team?.team_name}
                </p>
                <h4 className="text-6xl font-black text-white">
                  {analysis.win_probability?.your_team || 0}%
                </h4>
              </div>
              <div className="h-16 w-px bg-slate-800 mb-2" />
              <div className="text-start flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase ">
                  {matchInfo.opponent_team || teams.opponent_team?.team_name}
                </p>
                <h4 className="text-6xl font-black text-blue-500">
                  {analysis.win_probability?.opponent_team || 0}%
                </h4>
              </div>
            </div>
            <div className="space-y-3 pt-6 border-t border-slate-800">
              {analysis.win_probability?.key_factors?.map(
                (f: string, i: number) => (
                  <div
                    key={i}
                    className="flex gap-2 text-sm font-medium text-slate-400  tracking-tight">
                    <span className="text-blue-500">-</span>
                    {f}
                  </div>
                ),
              )}
            </div>
          </div>
        </Card>

        <Card className="rounded-none border-2 border-slate-800 bg-slate-950 text-white p-8 group overflow-hidden relative">
          <div className="absolute bottom-0 right-0 p-4 opacity-10 translate-y-4 group-hover:translate-y-0 transition-transform text-white">
            <Swords className="w-20 h-20" />
          </div>
          <div className="relative z-10 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                Condition Optimized Toss
              </p>
              <h3 className="text-4xl font-black leading-none uppercase text-white">
                {analysis.toss_recommendation?.decision?.replace("_", " ") ||
                  "No Data"}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {analysis.toss_recommendation?.reasoning}
              </p>
            </div>
            <div className="pt-6">
              <Badge className="bg-blue-600 text-white rounded-none text-[9px] font-black border-none px-4 py-1.5 uppercase tracking-widest">
                Confidence: {analysis.toss_recommendation?.confidence || "N/A"}
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="rounded-none border-2 border-slate-800 bg-slate-900 p-8 space-y-6">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <CloudRain className="w-3.5 h-3.5" />
            Weather Analysis
          </p>
          {!weather || Object.keys(weather).length === 0 ? (
            <div className="py-8 text-center bg-slate-800/50 border border-dashed border-slate-700">
              <p className="text-xs font-bold text-slate-400 uppercase">
                Weather Data Temporarily Unavailable
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Thermometer className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase">
                      Mean Temp
                    </span>
                  </div>
                  <p className="text-3xl font-black text-white">
                    {analysis.weather_analysis?.temperature ||
                      weather.avg_temp_c + "°C"}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Droplets className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase">
                      Rain Factor
                    </span>
                  </div>
                  <p className="text-3xl font-black text-blue-500">
                    {analysis.weather_analysis?.rain_chance ||
                      weather.chance_of_rain + "%"}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Wind className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase">
                      Velocity
                    </span>
                  </div>
                  <p className="text-3xl font-black text-white">
                    {analysis.weather_analysis?.wind_speed ||
                      weather.wind_speed}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Activity className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase">
                      Humidity
                    </span>
                  </div>
                  <p className="text-3xl font-black text-white">
                    {analysis.weather_analysis?.humidity ||
                      weather.avg_humidity + "%"}
                  </p>
                </div>
              </div>
              <div className="p-2 bg-slate-800 border border-slate-700 flex gap-3">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-slate-300  ">
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
              className="rounded-none border-2 border-slate-800 bg-slate-900 p-6 relative group overflow-hidden hover:border-blue-600 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 group-hover:bg-blue-600 transition-all" />
              <div className="space-y-4">
                <h5 className="font-black text-sm uppercase tracking-tight text-white">
                  {m.battle}
                </h5>
                <div className="flex flex-col gap-2">
                  <Badge className="bg-blue-900/30 text-blue-400 border-none rounded-none text-[12px] font-medium  px-2 w-fit">
                    Advantage: {m.advantage}
                  </Badge>
                  <p className="text-xs text-slate-400 font-medium   border-t border-slate-800 pt-2">
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
        <Card className="rounded-none border-2 border-amber-900/40 bg-amber-950/10 p-8 space-y-4">
          <SectionHeader
            icon={CloudRain}
            title="DLS Impact Scenario"
            badge="PRECIPITATION_RISK"
          />
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-[9px] font-black text-amber-500 uppercase">
                Impact Level
              </p>
              <p className="text-xl font-black text-white uppercase">
                {analysis.weather_analysis?.dls_scenario || "MODERATE"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black text-amber-500 uppercase">
                Strategic Focus
              </p>
              <p className="text-xs font-bold text-slate-300 leading-tight">
                Preserve Wickets / Variable Scoring Rates
              </p>
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-400 leading-relaxed border-t border-amber-900/30 pt-4">
            {analysis.weather_analysis?.dls_strategy}
          </p>
        </Card>

        <Card className="rounded-none border-2 border-slate-800 bg-slate-900 p-8 space-y-4">
          <SectionHeader
            icon={TrendingUp}
            title="Ground Diagnostic"
            badge="VENUE_REPORT"
          />
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-[9px] font-black text-slate-400 uppercase">
                Average Score
              </p>
              <p className="text-xl font-black text-white">
                {ground.avg_first_innings_score} RUNS
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black text-slate-400 uppercase">
                Pitch Surface
              </p>
              <p className="text-xl font-black text-blue-500 uppercase">
                {ground.pitch_type}
              </p>
            </div>
          </div>
          <p className="text-xs font-medium text-slate-400 bg-slate-800 p-3 ">
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
            color: "blue",
            allPlayers: teams.your_team?.players,
            title: "Game Plan",
          },
          {
            team: analysis.opponent_team_strategy || {},
            lineup: analysis.opponent_team_best_11,
            color: "slate",
            allPlayers: teams.opponent_team?.players,
            title: "Beta Dynamics & Squad Intel",
          },
        ].map((block, idx) => (
          <div
            key={idx}
            className="space-y-8 p-1 bg-slate-900 border border-slate-800">
            <div className="bg-slate-950 p-8 space-y-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-slate-800 pb-6">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                  <span
                    className={cn(
                      "w-3 h-8",
                      idx === 0 ? "bg-blue-600" : "bg-slate-700",
                    )}
                  />
                  {block.team?.team_name ||
                    (idx === 0 ? matchInfo.your_team : matchInfo.opponent_team)}
                  : {block.title}
                </h3>
                <Badge className="bg-slate-800 text-slate-400 border-none rounded-none text-[9px] font-bold">
                  REGISTRY_PATH: TEAMS.
                  {idx === 0 ? "YOUR_TEAM" : "OPPONENT_TEAM"}
                </Badge>
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
                    <p className="text-sm font-bold text-blue-500 uppercase tracking-tighter">
                      {phase.label}
                    </p>
                    <p className="text-sm font-medium text-slate-400  min-h-[60px]">
                      {phase.value || "Strategic details pending calculation."}
                    </p>
                  </div>
                ))}
              </div>

              {/* Best 11 / Suggested XI */}
              <div className="space-y-6 pt-10 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-xs font-black uppercase  text-white">
                    CRICKET AGENT: BEST 11 PLAYERS RECOMMENDED
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {block.lineup?.map((p: any, li: number) => (
                    <div
                      key={li}
                      className="p-4 bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between group">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-black text-white group-hover:text-blue-500 transition-colors uppercase leading-none">
                            {p.name}
                          </span>
                          <span className=" font-black bg-slate-950 text-slate-400 px-1.5 py-0.5 border border-slate-800 uppercase">
                            {li + 1}
                          </span>
                        </div>
                        <p className="t font-bold text-slate-500 uppercase tracking-tight">
                          {p.role}
                        </p>
                        <p className=" text-slate-400  font-medium text-sm md:pt-2 tracking-tight">
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
                  className="w-full flex items-center justify-between p-4 bg-slate-900 text-white rounded-none hover:bg-slate-800 transition-colors border border-slate-800">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-500" />
                    Player Performance Summary
                  </span>
                  {displayRaw ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {displayRaw && (
                  <div className="mt-4 overflow-x-auto border border-slate-800">
                    <table className="w-full text-[10px] text-left">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-800">
                          <th className="p-3 text-slate-300 text-[11px] font-black uppercase tracking-wider">
                            Player No
                          </th>
                          <th className="p-3 text-slate-300 text-[11px] font-black uppercase tracking-wider">
                            Name
                          </th>
                          <th className="p-3 text-slate-300 text-[11px] font-black uppercase tracking-wider">
                            Role
                          </th>
                          <th className="p-3 text-slate-300 text-[11px] font-black uppercase tracking-wider">
                            Batting Avg / Bowling Avg
                          </th>
                          <th className="p-3 text-slate-300 text-[11px] font-black uppercase tracking-wider">
                            Strike Rate / Economy
                          </th>
                          <th className="p-3 text-slate-300 text-[11px] font-black uppercase tracking-wider">
                            Form Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {block.allPlayers?.map((player: any, pi: number) => (
                          <tr
                            key={pi}
                            className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors group">
                            <td className="p-3  text-slate-500 group-hover:text-blue-500">
                              #{player.Player_id || pi + 1}
                            </td>
                            <td className="p-3 font-semibold  text-white uppercase ">
                              {player.Full_Name || player.name}
                              <span className="block text-[8px] text-slate-500 font-bold">
                                {player.Batting_Style} • {player.Age}Y
                              </span>
                            </td>
                            <td className="p-3  text-slate-400 uppercase">
                              {player.Playing_Role || player.role}
                            </td>
                            <td className="p-3 ">
                              <span className="text-blue-500">
                                B: {player.T20Is_Batting_Ave || "0"}
                              </span>
                              <span className="mx-2 text-slate-600">|</span>
                              <span className="text-amber-500">
                                W: {player.T20Is_Bowling_Ave || "0"}
                              </span>
                            </td>
                            <td className="p-3  text-slate-300">
                              {player.T20Is_Batting_SR || "0"} SR /{" "}
                              {player.T20Is_Bowling_Econ || "0"} EC
                            </td>
                            <td className="p-3">
                              <Badge className="bg-emerald-900/30 text-emerald-400 rounded-none border-none text-[7px] font-black uppercase tracking-widest px-1">
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
        <Card className="rounded-none border-2 border-slate-800 bg-slate-900 p-10">
          <SectionHeader
            icon={Activity}
            title="Operational Conclusion & Strategic Vectors"
            badge="SUMMARY_OUTPUT"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-xs font-black text-blue-500 uppercase tracking-widest mb-4">
                Critical Environmental Factors
              </p>
              {analysis.critical_factors?.map((f: string, i: number) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-3 border border-slate-800 hover:border-blue-900 hover:bg-slate-800/50 transition-all">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-slate-400 ">{f}</p>
                </div>
              ))}
            </div>
            <div className="p-8 bg-black text-white space-y-6 border border-slate-800">
              <p className="text-xs font-black text-blue-400 uppercase tracking-widest">
                Neural Narrative Conclusion
              </p>
              <div className="text-sm font-medium text-slate-300 leading-relaxed  whitespace-pre-wrap">
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
