import { TONE_MATRIX } from "@/lib/brandData";
import { SectionHeader } from "@/pages/Home";

export default function ToneMatrix() {
  return (
    <div style={{ backgroundColor: "#0d1b2a", padding: "80px 48px" }}>
      <SectionHeader
        label="09 — Brand Voice"
        title="Tone-by-Context Matrix"
        subtitle="Voice is constant. Tone shifts. This matrix shows how to adjust delivery while keeping the brand identity intact across every context."
        dark
      />

      <div className="mt-10 max-w-6xl overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse", minWidth: "700px" }}>
          <thead>
            <tr>
              {["Context", "Brand", "Tone", "Sample Language"].map((h) => (
                <th
                  key={h}
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#3b82f6",
                    padding: "12px 16px",
                    textAlign: "left",
                    backgroundColor: "rgba(59,130,246,0.08)",
                    borderBottom: "2px solid rgba(59,130,246,0.3)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TONE_MATRIX.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                }}
              >
                <td
                  style={{
                    padding: "14px 16px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#e8e8e8",
                    verticalAlign: "top",
                  }}
                >
                  {row.context}
                </td>
                <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: row.brand === "Tier 1" ? "#3b82f6" : "#4cabfd",
                      backgroundColor: row.brand === "Tier 1" ? "rgba(59,130,246,0.1)" : "rgba(76,171,253,0.1)",
                      border: `1px solid ${row.brand === "Tier 1" ? "rgba(59,130,246,0.3)" : "rgba(76,171,253,0.3)"}`,
                      padding: "2px 8px",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.brand}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
                  <div className="flex flex-wrap gap-1">
                    {row.toneWords.map((word) => (
                      <span
                        key={word}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#a0a5ad",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          padding: "2px 7px",
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#a0a5ad",
                    fontStyle: "italic",
                    lineHeight: 1.55,
                    verticalAlign: "top",
                  }}
                >
                  "{row.sample}"
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
