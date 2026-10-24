import { ImageResponse } from "next/og";

export const alt = "Harbor: a three-minute reset for what just happened";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#f6f2ec",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 512 512">
          <rect width="512" height="512" rx="112" fill="#9c4f2e" />
          <g fill="none" stroke="#f6f2ec" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="30" d="M168 300V232a88 88 0 0 1 176 0v68" />
            <path strokeWidth="22" d="M144 364q28-20 56 0t56 0 56 0 56 0" />
          </g>
        </svg>
        <div style={{ display: "flex", marginTop: 48, fontSize: 88, color: "#261c16", fontFamily: "serif" }}>Harbor</div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 40, color: "rgba(38, 28, 22, 0.74)" }}>
          A three-minute reset for what just happened.
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 26, color: "#9c4f2e" }}>
          For Black professionals · Microaggressions · Being the only one
        </div>
      </div>
    ),
    size,
  );
}
