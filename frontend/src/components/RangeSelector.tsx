type Props = {
  value: "1Y" | "3Y" | "5Y";
  onChange: (v: "1Y" | "3Y" | "5Y") => void;
};

export default function RangeSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {(["1Y", "3Y", "5Y"] as const).map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`px-3 py-1 rounded-md text-sm ${
            value === r
              ? "bg-blue-600 text-white"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
