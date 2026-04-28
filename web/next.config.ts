import type { NextConfig } from "next";

// Nastavíme basePath podľa toho, či bežíme na GitHub Actions (produkcia)
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Povie Next.js, aby vygeneroval statické HTML súbory
  output: "export",
  
  // Nastaví podadresár pre GitHub Pages (aby vedel nájsť CSS a JS súbory)
  basePath: isProd ? "/tesne" : "",
  
  // Vypne internú optimalizáciu obrázkov (GitHub Pages nepodporuje Next.js serverové funkcie)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
