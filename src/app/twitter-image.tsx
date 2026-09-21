import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "Davis Lapenta — Front-End Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoPath = path.join(process.cwd(), "public", "og-logo.png");
  const logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#141414",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoBase64} alt="" width={760} height={76} />
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 34,
            color: "#dad8d8",
            letterSpacing: 1,
          }}
        >
          Front-End Developer · React · Next.js · Angular
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 6,
            backgroundColor: "#ff5252",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
