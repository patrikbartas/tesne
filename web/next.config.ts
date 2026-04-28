import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Povie Next.js, aby vygeneroval statické HTML súbory
  output: "export",
  // Vypne internú optimalizáciu obrázkov (GitHub Pages nepodporuje Next.js serverové funkcie)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
