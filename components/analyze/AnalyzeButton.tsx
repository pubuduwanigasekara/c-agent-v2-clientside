import Button from "@/components/ui/Button";

export default function AnalyzeButton({
  disabled,
  loading,
  onClick,
}: {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      className="w-full py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
      {loading ? "Analyzing..." : "Analyze  Match"}
    </Button>
  );
}
