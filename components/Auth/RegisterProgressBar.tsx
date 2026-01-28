type Props = {
  percent: number;
};

export function RegisterProgressBar({ percent }: Props) {
  return (
    <div>
      <div
        style={{
          height: 6,
          backgroundColor: "#d1d5db",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            backgroundColor:
              percent < 50 ? "#ef4444" : percent < 100 ? "#f59e0b" : "#22c55e",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
