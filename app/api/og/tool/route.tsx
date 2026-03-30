import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PRICING_COLOR: Record<string, string> = {
  Free: "#22D3EE",
  Freemium: "#A78BFA",
  Paid: "#F472B6"
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") ?? "AI Tool";
  const tagline = searchParams.get("tagline") ?? "";
  const pricing = searchParams.get("pricing") ?? "Free";
  const tagsRaw = searchParams.get("tags") ?? "";
  const tags = tagsRaw ? tagsRaw.split(",").slice(0, 4) : [];

  const pricingColor = PRICING_COLOR[pricing] ?? "#A78BFA";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #070A12 0%, #0B1224 60%, #0D1A3A 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif"
        }}
      >
        {/* Neon glow blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,92,255,0.35) 0%, transparent 70%)",
            filter: "blur(40px)"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,229,255,0.25) 0%, transparent 70%)",
            filter: "blur(40px)"
          }}
        />

        {/* Subtle dot/noise overlay — rendered as a faint inner border ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(27,43,82,0.6) 0%, transparent 70%)"
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "60px 70px",
            gap: 20
          }}
        >
          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(124,92,255,0.2)",
                    border: "1px solid rgba(124,92,255,0.4)",
                    color: "#C4B5FD",
                    borderRadius: 999,
                    padding: "6px 16px",
                    fontSize: 20
                  }}
                >
                  {tag}
                </span>
              ))}
              <span
                style={{
                  background: `rgba(0,0,0,0.3)`,
                  border: `1px solid ${pricingColor}60`,
                  color: pricingColor,
                  borderRadius: 999,
                  padding: "6px 16px",
                  fontSize: 20
                }}
              >
                {pricing}
              </span>
            </div>
          )}

          {/* Tool name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#E6ECFF",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              textShadow: "0 0 40px rgba(124,92,255,0.5)"
            }}
          >
            {name}
          </div>

          {/* Tagline */}
          {tagline && (
            <div
              style={{
                fontSize: 32,
                color: "#A9B6E6",
                lineHeight: 1.4,
                maxWidth: 900
              }}
            >
              {tagline}
            </div>
          )}

          {/* Site brand */}
          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 12
            }}
          >
            <div
              style={{
                width: 6,
                height: 40,
                background: "linear-gradient(180deg, #7C5CFF 0%, #00E5FF 100%)",
                borderRadius: 3
              }}
            />
            <div style={{ fontSize: 24, color: "#A9B6E6", display: "flex" }}>
              <span style={{ color: "#00E5FF" }}>AI</span>
              <span>Advisor</span>
              <span style={{ color: "#7C5CFF" }}>.tools</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
