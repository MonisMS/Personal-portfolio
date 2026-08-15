import { ImageResponse } from "next/og";

// Favicon for the v2 routes — a serif "M" monogram on near-black, matching the
// editorial brand. Scoped to /v2 (moves site-wide at cutover).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontSize: 24,
          fontWeight: 600,
          borderRadius: 6,
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
