import { TERMINOLOGY } from "@/lib/brandData";
import { SectionHeader } from "@/pages/Home";

export default function Terminology() {
  return (
    <div style={{ backgroundColor: "#1a1d21", padding: "80px 48px" }}>
      <SectionHeader
        label="13 — Application"
        title="Terminology Guide"
        subtitle="Precise language matters. These are the approved terms, spellings, and capitalizations used across all brand communications."
        dark
      />

      <div className="mt-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TERMINOLOGY.map((section) => (
            <div
              key={section.category}
              style={{
                backgroundColor: "#22262b",
                border: "1px solid rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  backgroundColor: "#0f1114",
                  padding: "12px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#3b82f6",
                  }}
                >
                  {section.category}
                </div>
              </div>
              <div>
                {section.terms.map((term, i) => (
                  <div
                    key={term.term}
                    style={{
                      padding: "14px 20px",
                      borderBottom: i < section.terms.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#ffffff",
                          marginBottom: "3px",
                        }}
                      >
                        {term.term}
                      </div>
                      {term.definition && (
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            color: "#a0a5ad",
                            fontStyle: "italic",
                          }}
                        >
                          {term.definition}
                        </div>
                      )}
                    </div>
                    <div>
                      {term.avoid && (
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            color: "#ef4444",
                            textDecoration: "line-through",
                            marginBottom: "2px",
                          }}
                        >
                          {term.avoid}
                        </div>
                      )}
                      {term.definition && (
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            color: "#a0a5ad",
                            lineHeight: 1.5,
                          }}
                        >
                          {term.definition}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
