import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import type { HeroTheme } from "@/lib/mock-tools";

export const runtime = "edge";

const THEME_GRADIENTS: Record<HeroTheme, [string, string, string]> = {
  violet: ["#7C5CFF", "#4C3CB0", "#070A12"],
  cyan:   ["#00E5FF", "#0099BB", "#070A12"],
  green:  ["#00FF94", "#00994F", "#070A12"],
  orange: ["#FF8C00", "#CC5500", "#070A12"],
  pink:   ["#FF4DB8", "#CC0077", "#070A12"],
  blue:   ["#4D9FFF", "#1A5FCC", "#070A12"]
};

const PRICING_COLOUR: Record<string, string> = {
  Free:     "#00FF94",
  Freemium: "#00E5FF",
  Paid:     "#FF8C00"
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name    = searchParams.get("name")    ?? "AI Tool";
  const tagline = searchParams.get("tagline") ?? "Discover more at AIAdvisor.tools";
  const theme   = (searchParams.get("theme")  ?? "violet") as HeroTheme;
  const pricing = searchParams.get("pricing") ?? "Free";
  const logoUrl = searchParams.get("logoUrl") ?? "";

  const [accent, mid] = THEME_GRADIENTS[theme] ?? THEME_GRADIENTS.violet;
  const pricingColor  = PRICING_COLOUR[pricing] ?? PRICING_COLOUR.Free;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "56px 60px",
          background: `radial-gradient(ellipse 120% 80% at 0% 0%, ${accent}55, transparent 55%),
                       radial-gradient(ellipse 80% 60% at 100% 100%, ${mid}44, transparent 50%),
                       #070A12`
        }}
      >
        {/* decorative grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${accent}18 1px, transparent 1px),
                               linear-gradient(90deg, ${accent}18 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            display: "flex"
          }}
        />

        {/* logo */}
        {logoUrl && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#0B1224",
              border: `1px solid ${accent}55`,
              marginBottom: 28,
              overflow: "hidden"
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt="" width={48} height={48} style={{ objectFit: "contain" }} />
          </div>
        )}

        {/* name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#E6ECFF",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            display: "flex"
          }}
        >
          {name}
        </div>

        {/* tagline */}
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            color: "#A9B6E6",
            maxWidth: 800,
            lineHeight: 1.4,
            display: "flex"
          }}
        >
          {tagline}
        </div>

        {/* bottom row: pricing badge + brand */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 18px",
                borderRadius: 999,
                border: `1px solid ${pricingColor}55`,
                background: `${pricingColor}15`,
                color: pricingColor,
                fontSize: 20,
                fontWeight: 600
              }}
            >
              {pricing}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 22,
              color: "#A9B6E6"
            }}
          >
            <span style={{ color: accent, fontWeight: 700 }}>AI</span>
            <span style={{ fontWeight: 600 }}>Advisor</span>
            <span style={{ color: "#7C5CFF", fontWeight: 600 }}>.tools</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
