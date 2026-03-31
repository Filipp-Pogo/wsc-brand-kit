import { CHANNEL_GUIDELINES } from "@/lib/brandData";
import { SectionHeader } from "@/pages/Home";

export default function ChannelGuidelines() {
  return (
    <div style={{ backgroundColor: "#22262b", padding: "80px 48px" }}>
      <SectionHeader
        label="12 — Application"
        title="Channel Guidelines"
        subtitle="How the brand voice adapts across every platform and touchpoint — from Instagram to email to facility signage."
        dark
      />

      <div className="mt-10 max-w-6xl space-y-4">
        {CHANNEL_GUIDELINES.map((channel) => (
          <div
            key={channel.channel}
            style={{
              backgroundColor: "#1a1d21",
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Channel header */}
            <div
              style={{
                padding: "16px 24px",
                backgroundColor: "#0f1114",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                }}
              >
                {channel.channel}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#3b82f6",
                  backgroundColor: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  padding: "2px 8px",
                }}
              >
                {channel.brand}
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  color: "#a0a5ad",
                }}
              >
                {channel.frequency}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#a0a5ad",
                    marginBottom: "8px",
                  }}
                >
                  Purpose
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#e8e8e8",
                    lineHeight: 1.6,
                  }}
                >
                  {channel.purpose}
                </p>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#22c55e",
                    marginBottom: "8px",
                  }}
                >
                  ✓ Do
                </div>
                <ul className="space-y-1">
                  {channel.dos.map((d, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "#a0a5ad",
                        lineHeight: 1.5,
                        paddingLeft: "10px",
                        borderLeft: "2px solid rgba(34,197,94,0.3)",
                      }}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#ef4444",
                    marginBottom: "8px",
                  }}
                >
                  ✗ Don't
                </div>
                <ul className="space-y-1">
                  {channel.donts.map((d, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "#a0a5ad",
                        lineHeight: 1.5,
                        paddingLeft: "10px",
                        borderLeft: "2px solid rgba(239,68,68,0.3)",
                      }}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sample post */}
            {channel.samplePost && (
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  padding: "14px 24px",
                  backgroundColor: "rgba(59,130,246,0.04)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#3b82f6",
                    marginRight: "10px",
                  }}
                >
                  Sample:
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#e8e8e8",
                    fontStyle: "italic",
                  }}
                >
                  "{channel.samplePost}"
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
