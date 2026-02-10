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
  const [openHomeXI, setOpenHomeXI] = useState(false);
  const [openAwayXI, setOpenAwayXI] = useState(false);

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
        "space-y-12 pb-20 container mx-auto px-0 md:px-0",
        printing ? "bg-white text-slate-900" : "text-white",
        !printing && "animate-in fade-in slide-in-from-bottom-4 duration-1000",
      )}
    >
      {/* Header / Identity Area */}
      <div
        className={cn(
          "flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 pb-8 border-b-4",
          printing ? "border-slate-200" : "border-white/10",
        )}
      >
        <div className="space-y-4 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ef660f]/10 text-[#ef660f] text-xs font-semibold tracking-tight rounded-lg border border-[#ef660f]/20">
            Match Intelligence | T20 Pre Match Analysis
          </div>
          <h2
            className={cn(
              "text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase",
              printing ? "text-slate-900" : "text-white",
            )}
          >
            {teams.your_team?.team_name || matchInfo.your_team || "Home"}{" "}
            <span className="text-[#ef660f]">VS</span>{" "}
            {teams.opponent_team?.team_name ||
              matchInfo.opponent_team ||
              "Away"}
          </h2>
          <div
            className={cn(
              "flex flex-wrap gap-4 text-[10px] font-medium  tracking-widest",
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
            "hidden md:flex flex-col items-end gap-2",
            printing && "flex",
          )}
        >
          <img
            src="https://ik.imagekit.io/ojcyr6b6l/EN2H%20Main%20Logo%20Black%20Edition.png?updatedAt=1765596023483"
            alt="Logo"
            className={cn(
              "h-10 w-auto object-contain",
              printing ? "" : "brightness-0 invert",
            )}
          />
          <span
            className={cn(
              "text-[8px] font-black uppercase tracking-[0.2em]",
              printing ? "text-slate-400" : "text-white/40",
            )}
          >
            Match Intelligence Report
          </span>
        </div>
      </div>

      <div className=" flex flex-col gap-6">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Win Probability */}
          <Card
            className={cn(
              "rounded-none border-2 p-8 space-y-6 relative overflow-hidden",
              printing
                ? "bg-white border-slate-200"
                : "border-white/10 bg-white/5 backdrop-blur-xl",
            )}
          >
            <div
              className={cn(
                "absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 transition-colors duration-500",
                printing ? "bg-slate-50" : "bg-[#ef660f]/5",
              )}
            />
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
                      "text-5xl font-black",
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
                  <h4 className="text-5xl font-black text-[#ef660f]">
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

          {/* Weather Analysis */}
          <Card
            className={cn(
              "rounded-none border-2 p-6 space-y-6 relative overflow-hidden",
              printing
                ? "bg-white border-slate-200"
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
              <div
                className={cn(
                  "py-8 text-center border border-dashed",
                  printing
                    ? "bg-slate-50 border-slate-200"
                    : "bg-white/5 border-white/10",
                )}
              >
                <p
                  className={cn(
                    "text-xs font-bold uppercase",
                    printing ? "text-slate-400" : "text-white/20",
                  )}
                >
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
                        "flex items-center gap-2 ",
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
                        "text-2xl font-black",
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
                      ? "bg-slate-50 border-slate-200"
                      : "bg-white/5 border-white/10",
                  )}
                >
                  {/* <Info className="w-4 h-4 text-[#ef660f] shrink-0 mt-0.5" /> */}
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
        {/* Ground Diagnostic */}
        <Card
          className={cn(
            "rounded-none border-2 p-8 space-y-6 relative overflow-hidden",
            printing
              ? "bg-white border-slate-200"
              : "border-white/10 bg-white/5 backdrop-blur-xl",
          )}
        >
          <div className="absolute bottom-0 right-0 p-4 opacity-5 translate-y-4 group-hover:translate-y-0 transition-transform text-[#ef660f]">
            <TrendingUp className="w-20 h-20" />
          </div>
          <p
            className={cn(
              "text-xs font-black uppercase tracking-widest flex items-center gap-2",
              printing ? "text-slate-500" : "text-white/60",
            )}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Pitch & Ground Summary
          </p>
          <div className="flex  gap-6 relative z-10">
            <div className="space-y-1 ">
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
                  "text-2xl font-black",
                  printing ? "text-slate-900" : "text-white",
                )}
              >
                {ground.avg_first_innings_score} RUNS
              </p>
            </div>
            <div
              className={cn(
                "w-px h-10 my-auto",
                printing ? "bg-slate-200" : "bg-white/20",
              )}
            ></div>
            <div className="space-y-1">
              <p
                className={cn(
                  "text-[9px] font-black uppercase",
                  printing ? "text-slate-500" : "text-white/60",
                )}
              >
                Pitch Surface
              </p>
              <p className="text-2xl font-black text-[#ef660f] uppercase">
                {ground.pitch_type}
              </p>
            </div>
          </div>
          <p
            className={cn(
              "text-sm font-medium p-3 relative z-10",
              printing
                ? "text-slate-600 bg-slate-50 border border-slate-100"
                : "text-white/60 bg-white/5",
            )}
          >
            {analysis.ground_analysis?.pace_vs_spin ||
              analysis.ground_analysis?.impact ||
              ground.note}
          </p>
        </Card>
      </div>

      {/* Impact Row - Game Changing Players & Bowling Matchups */}
      <div className="flex flex-col gap-8 ">
        {/* Game Changing Players */}
        <div
          className={cn(
            "space-y-6 lg:p-10 p-2",
            printing
              ? "bg-white p-0 border-b pb-8 border-slate-100"
              : "lg:bg-[#08003d]",
          )}
        >
          <SectionHeader icon={Zap} title="Game Changing Players" badge="" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.game_changing_players?.map((p: any, i: number) => (
              <Card
                key={i}
                className={cn(
                  "rounded-none border-2 p-4 flex gap-4 transition-all hover:border-[#ef660f]",
                  printing
                    ? "bg-white border-slate-200"
                    : "bg-white/5 border-white/10",
                )}
              >
                <div className="shrink-0 w-12 h-12 bg-[#ef660f] flex items-center justify-center font-black text-xl text-white">
                  {i + 1}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={cn(
                        "font-black text-sm capitalize",
                        printing ? "text-slate-900" : "text-white",
                      )}
                    >
                      {p.player_name}
                    </h4>
                    <Badge
                      variant="outline"
                      className="text-[8px] border-[#ef660f] text-[#ef660f] rounded-none"
                    >
                      {p.team}
                    </Badge>
                  </div>
                  <p
                    className={cn(
                      "text-xs font-medium leading-relaxed",
                      printing ? "text-slate-600" : "text-white/60",
                    )}
                  >
                    {p.reasoning}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Bowling Matchups */}
        <div
          className={cn(
            "space-y-6 lg:p-10 p-2",
            printing
              ? "bg-white p-0 border-b pb-8 border-slate-100"
              : "lg:bg-[#08003d]",
          )}
        >
          <SectionHeader
            icon={Swords}
            title=" Batsman vs Bowler: Key Battles"
            badge=""
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.key_bowling_matchups?.map((m: any, i: number) => (
              <Card
                key={i}
                className={cn(
                  "rounded-none border-2 p-4 space-y-3 transition-all hover:border-[#ef660f]",
                  printing
                    ? "bg-white border-slate-200"
                    : "bg-white/5 border-white/10",
                )}
              >
                <div className="flex  flex-col gap-2 justify-between items-start">
                  <div className="space-y-0.5">
                    <p className="text-[#ef660f] text-[12px] font-black capitalize ">
                      {m.phase}
                    </p>
                    <h4
                      className={cn(
                        "font-black text-sm ",
                        printing ? "text-slate-900" : "text-white",
                      )}
                    >
                      {m.bowler}{" "}
                      <span
                        className={cn(
                          "mx-2",
                          printing ? "text-slate-400" : "text-white/40",
                        )}
                      >
                        VS
                      </span>{" "}
                      {m.target_batter}
                    </h4>
                  </div>
                  <Badge className="bg-[#ff6200] text-white rounded-none text-[13px] px-2 tracking-tight ">
                    {m.matchup_importance}
                  </Badge>
                </div>
                <div
                  className={cn(
                    "text-sm font-medium p-2 border",
                    printing
                      ? "bg-slate-50 border-slate-100 text-slate-700"
                      : "bg-white/5 border-white/5 text-white/80",
                  )}
                >
                  <span className="text-[#ff6200] font-black mr-2">PLAN:</span>
                  {m.dismissal_strategy}
                </div>
                <div
                  className={cn(
                    "flex flex-col justify-between text-[12px] font-black",
                    printing ? "text-slate-500" : "text-white/40",
                  )}
                >
                  <span className=" font-semibold pb-1">
                    Field: {m.field_setup}
                  </span>
                  <span className="text-[#ffffff] font-medium">
                    {m.expected_outcome}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Opponent Control Plan */}
      <div
        className={cn(
          "space-y-6 lg:p-10",
          printing
            ? "bg-white p-0 border-b pb-8 border-slate-100"
            : "lg:bg-[#08003d]",
        )}
      >
        <SectionHeader
          icon={ShieldCheck}
          title="Suggested Game Plan"
          badge=""
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {analysis.opponent_control_plan?.map((p: any, i: number) => (
            <Card
              key={i}
              className={cn(
                "rounded-none border-2 p-6 space-y-4",
                printing
                  ? "bg-white border-slate-200"
                  : "bg-white/5 border-white/10",
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-3 border-b pb-3",
                  printing ? "border-slate-100" : "border-white/10",
                )}
              >
                <div className="w-8 h-8 rounded-full bg-[#ef660f]/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-[#ef660f]" />
                </div>
                <h4
                  className={cn(
                    "font-black text-sm uppercase",
                    printing ? "text-slate-900" : "text-white",
                  )}
                >
                  Target:{" "}
                  <span className=" capitalize">{p.player_to_control}</span>
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-[8px] font-black uppercase",
                      printing ? "text-slate-400" : "text-white/40",
                    )}
                  >
                    Weakness
                  </p>
                  <p
                    className={cn(
                      "text-[10px] font-bold",
                      printing ? "text-slate-700" : "text-white",
                    )}
                  >
                    {p.weakness}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-[8px] font-black uppercase",
                      printing ? "text-slate-400" : "text-white/40",
                    )}
                  >
                    Pattern
                  </p>
                  <p
                    className={cn(
                      "text-[10px] font-bold",
                      printing ? "text-slate-700" : "text-white",
                    )}
                  >
                    {p.dismissal_pattern}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "p-3 space-y-2 border",
                  printing
                    ? "bg-slate-50 border-slate-100"
                    : "bg-black/20 border-white/5",
                )}
              >
                <p className="text-[9px] font-black text-[#ef660f] uppercase">
                  Execution Strategy
                </p>
                <p
                  className={cn(
                    "text-xs font-medium leading-relaxed italic",
                    printing ? "text-slate-600" : "text-white/70",
                  )}
                >
                  "{p.attack_plan}"
                </p>
              </div>
              <div
                className={cn(
                  "flex flex-col gap-2 justify-start items-start text-[11px] font-semibold",
                  printing ? "text-slate-500" : "text-white/40",
                )}
              >
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {p.bowler_type}
                </span>
                <span
                  className={cn(
                    printing ? "text-slate-700" : "text-[#ffffff]/70",
                  )}
                >
                  Outcome: {p.expected_outcome}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Intelligence Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Your Team Strategy */}
        <div className="space-y-6">
          <SectionHeader
            icon={Target}
            title={`${teams.your_team?.team_name || "Your"} Game Strategy`}
            badge=""
          />
          <div className="space-y-4">
            {["powerplay", "middle_overs", "death_overs"].map((phase) => (
              <div
                key={phase}
                className={cn(
                  "p-5 border-2 transition-all",
                  printing
                    ? "bg-white border-slate-200"
                    : "bg-[#11074b] border-white/5 hover:bg-[#ef660f]/5",
                )}
              >
                <p className="text-[10px] font-black text-[#ef660f] uppercase mb-2 tracking-tighter">
                  {phase.replace("_", " ")}
                </p>
                <p
                  className={cn(
                    "text-sm font-medium leading-relaxed",
                    printing ? "text-slate-700" : "text-white/80",
                  )}
                >
                  {analysis.your_team_strategy?.[phase] ||
                    "Strategic details pending calculation."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Opponent Team Strategy */}
        <div className="space-y-6">
          <SectionHeader
            icon={Activity}
            title={`${teams.opponent_team?.team_name || "Opponent"} Game Prediction`}
            badge=""
          />
          <div className="space-y-4">
            {["powerplay", "middle_overs", "death_overs"].map((phase) => (
              <div
                key={phase}
                className={cn(
                  "p-5 border-2 transition-all",
                  printing
                    ? "bg-white border-slate-200"
                    : "bg-white/5 border-white/5 hover:bg-white/10",
                )}
              >
                <p
                  className={cn(
                    "text-[10px] font-black uppercase mb-2 tracking-tighter",
                    printing ? "text-slate-400" : "text-white/40",
                  )}
                >
                  {phase.replace("_", " ")}
                </p>
                <p
                  className={cn(
                    "text-sm font-medium leading-relaxed",
                    printing ? "text-slate-700" : "text-white/60",
                  )}
                >
                  {analysis.opponent_team_strategy?.[phase] ||
                    "Strategic details pending calculation."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended XI Section */}
      <div className="space-y-12">
        <div className="space-y-8">
          <SectionHeader
            icon={Users}
            title="Cricket Agent: Best 11 Selection"
            badge=""
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Your Team Recommended XI */}
            <div className="space-y-1">
              <button
                onClick={() => setOpenHomeXI(!openHomeXI)}
                className="w-full flex items-center justify-between md:cursor-default bg-white/5 border border-white/10 p-3"
              >
                <h4 className="text-xs font-black uppercase bg- text-[#ef660f] tracking-widest">
                  {teams.your_team?.team_name || "Home"} XI
                </h4>
                <div className="md:hidden">
                  {openHomeXI ? (
                    <ChevronUp className="w-4 h-4 text-[#ef660f]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#ef660f]" />
                  )}
                </div>
              </button>

              <div
                className={cn(
                  "grid grid-cols-1 sm:grid-cols-2 gap-3",
                  !openHomeXI && !printing && "hidden md:grid",
                )}
              >
                {analysis.your_team_best_11?.map((p: any, i: number) => (
                  <div
                    key={i}
                    className={cn(
                      "p-4 border transition-all",
                      printing
                        ? "bg-white border-slate-200"
                        : "bg-[#11074b] border-white/10 hover:border-[#ef660f]/50",
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span
                        className={cn(
                          "lg:text-[10px] text-[12px] font-black capitalize truncate max-w-[80%]",
                          printing ? "text-slate-900" : "text-white",
                        )}
                      >
                        {p.name || p.player_name}
                      </span>
                      <span className="text-[9px] font-bold text-[#ef660f]">
                        #{i + 1}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "lg:text-[10px] text-[12px] font-black capitalize",
                        printing ? "text-slate-400" : "text-white/40",
                      )}
                    >
                      {p.role}
                    </p>
                    <p
                      className={cn(
                        "lg:text-[10px] text-[12px] font-medium mt-2 line-clamp-2 italic",
                        printing ? "text-slate-600" : "text-white/60",
                      )}
                    >
                      "{p.reasoning}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Opponent Team Predicted XI */}
            <div className="space-y-6">
              <button
                onClick={() => setOpenAwayXI(!openAwayXI)}
                className="w-full flex items-center justify-between md:cursor-default bg-white/5 border border-white/10 p-3"
              >
                <h4
                  className={cn(
                    "text-xs font-black uppercase tracking-widest",
                    printing ? "text-slate-400" : "text-white/40",
                  )}
                >
                  {teams.opponent_team?.team_name || "Away"} XI
                </h4>
                <div className="md:hidden">
                  {openAwayXI ? (
                    <ChevronUp className="w-4 h-4 text-white/40" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/40" />
                  )}
                </div>
              </button>

              <div
                className={cn(
                  "grid grid-cols-1 sm:grid-cols-2 gap-3",
                  !openAwayXI && !printing && "hidden md:grid",
                )}
              >
                {analysis.opponent_team_best_11?.map((p: any, i: number) => (
                  <div
                    key={i}
                    className={cn(
                      "p-4 border transition-all",
                      printing
                        ? "bg-white border-slate-200"
                        : "bg-white/5 border-white/10 hover:bg-white/20",
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span
                        className={cn(
                          "lg:text-[10px] text-[12px] font-black capitalize truncate max-w-[80%]",
                          printing ? "text-slate-900" : "text-white/80",
                        )}
                      >
                        {p.name || p.player_name}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-bold",
                          printing ? "text-slate-300" : "text-white/20",
                        )}
                      >
                        #{i + 1}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "lg:text-[10px] text-[12px] font-black capitalize",
                        printing ? "text-slate-400" : "text-white/40",
                      )}
                    >
                      {p.role}
                    </p>
                    <p
                      className={cn(
                        "lg:text-[10px] text-[12px] font-medium mt-2 line-clamp-2 italic",
                        printing ? "text-slate-500" : "text-white/40",
                      )}
                    >
                      "{p.reasoning}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Players Performance Detailed Summary (Expandable) */}
      <div className={cn("pt-10", printing ? "hidden" : "block")}>
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="w-full flex items-center justify-between p-6 bg-white/5 text-white rounded-none hover:bg-white/10 transition-colors border-2 border-white/10"
        >
          <span className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-4">
            <Database className="w-5 h-5 text-[#ef660f]" />
            Squad Performance Data
          </span>
          {displayRaw ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {displayRaw && (
          <div className="mt-4 overflow-x-auto border-2 border-white/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b-2 border-white/10">
                  {[
                    "Player",
                    "Role",
                    "Batting Ave",
                    "Bowling Ave",
                    "SR / Econ",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="p-4 text-[10px] font-black uppercase tracking-widest text-white/40"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ...(teams.your_team?.players || []),
                  ...(teams.opponent_team?.players || []),
                ].map((player: any, pi: number) => (
                  <tr
                    key={pi}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="font-black text-xs  text-white group-hover:text-[#ef660f]">
                        {player.Full_Name || player.name}
                      </div>
                      <div className="text-[9px] text-white/40">
                        {player.Batting_Style} • {player.Age}Y
                      </div>
                    </td>
                    <td className="p-4 text-[10px] uppercase font-bold text-white/60">
                      {player.Playing_Role || player.role}
                    </td>
                    <td className="p-4 text-[10px] font-black text-white/80">
                      {player.T20Is_Batting_Ave || "0.0"}
                    </td>
                    <td className="p-4 text-[10px] font-black text-[#ef660f]">
                      {player.T20Is_Bowling_Ave || "0.0"}
                    </td>
                    <td className="p-4 text-[10px] font-bold text-white/40">
                      {player.T20Is_Batting_SR || "0"}/
                      {player.T20Is_Bowling_Econ || "0"}
                    </td>
                    <td className="p-4">
                      <Badge className="bg-emerald-500/10 text-emerald-600 rounded-none border-none text-[7px] font-black uppercase px-2">
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

      {/* Conclusion & Critical Factors */}
      <div className="grid grid-cols-1 gap-6">
        <Card
          className={cn(
            "rounded-none border-2 p-10",
            printing
              ? "bg-white border-slate-200"
              : "bg-white/5 border-white/10",
          )}
        >
          <SectionHeader
            icon={Activity}
            title="Match Forecast & Final Call"
            badge=""
          />
          <div className="grid grid-cols-1  gap-10">
            <div className="space-y-6">
              <p className="text-xs font-black text-[#ef660f] uppercase tracking-widest mb-4">
                Critical Factors
              </p>
              {analysis.critical_factors?.map((f: string, i: number) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-4 items-start p-3 border transition-all",
                    printing
                      ? "bg-slate-50 border-slate-100"
                      : "border-white/10 hover:border-[#ef660f]/30 hover:bg-white/5",
                  )}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#ef660f] shrink-0 mt-0.5" />
                  <p
                    className={cn(
                      "text-sm font-bold",
                      printing ? "text-slate-700" : "text-white/60",
                    )}
                  >
                    {f}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Meta */}
      <div
        className={cn(
          "text-center pt-8 border-t opacity-20",
          printing ? "border-slate-100" : "border-white/10",
        )}
      >
        <p className="text-[16px] font-black uppercase tracking-tight">
          Ask AI Coming Soon ...
        </p>
      </div>
    </div>
  );
}
