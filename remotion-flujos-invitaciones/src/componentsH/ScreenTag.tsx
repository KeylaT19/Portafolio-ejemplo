export const ScreenTag: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div
      style={{
        alignSelf: "flex-start",
        padding: "12px 30px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.10)",
        border: "1px solid rgba(255,255,255,0.22)",
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: 18,
        fontWeight: 800,
        letterSpacing: 1,
        textTransform: "uppercase",
        color: "#F5B84D",
        marginBottom: 28,
      }}
    >
      {label}
    </div>
  );
};
