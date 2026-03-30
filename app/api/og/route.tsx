import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AIAdvisor.tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: "#E6ECFF",
          background: "linear-gradient(135deg, #070A12 0%, #0B1224 100%)",
          width: "100%",
          height: "100%",
          padding: "50px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>🤖</div>
        <h1 style={{ margin: 0 }}>
          <span style={{ color: "#00E5FF" }}>AI</span>Advisor
          <span style={{ color: "#7C5CFF" }}>.tools</span>
        </h1>
        <p style={{ fontSize: 40, color: "#A9B6E6", margin: 0 }}>
          Find the best AI tools
        </p>
      </div>
    ),
    { ...size }
  );
}
