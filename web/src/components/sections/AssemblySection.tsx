"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const AssemblySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Tieto hodnoty mapujú % scrollovania (0 až 1) na opacitu prvkov
  const sensorOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const brainOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const displayOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="h-[300vh] bg-black relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        <div className="text-center mb-16 z-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Dekonštrukcia bezpečnosti</h2>
          <p className="text-neutral-400">Neviditeľný dizajn ukrytý v riadidlách.</p>
        </div>

        {/* Simulácia rozloženého hardvéru */}
        <div className="relative w-full max-w-4xl h-96 border border-neutral-800/50 rounded-3xl bg-neutral-900/20 backdrop-blur-sm p-8 flex items-center justify-between">
          
          {/* 1. Senzor */}
          <motion.div style={{ opacity: sensorOpacity }} className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/50 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <span className="text-xs font-mono text-blue-400">VL53L1X</span>
            </div>
            <p className="mt-4 text-sm text-neutral-400">Laserový senzor<br/>(v ľavej zátke)</p>
          </motion.div>

          {/* 2. Centrálna jednotka */}
          <motion.div style={{ opacity: brainOpacity }} className="flex flex-col items-center">
            <div className="w-24 h-24 bg-purple-500/20 border border-purple-500/50 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <span className="text-xs font-mono text-purple-400">ESP32-S3</span>
            </div>
            <p className="mt-4 text-sm text-neutral-400 text-center">Mozog + Kamera<br/>(v predstavci)</p>
          </motion.div>

          {/* 3. Displej a Ovládanie */}
          <motion.div style={{ opacity: displayOpacity }} className="flex flex-col items-center">
            <div className="w-20 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <span className="text-xs font-mono text-emerald-400">OLED</span>
            </div>
            <p className="mt-4 text-sm text-neutral-400 text-center">Displej a spúšť<br/>(na riadidlách)</p>
          </motion.div>

          {/* Spojovacie SVG čiary (placeholder pre neskoršiu animáciu káblov) */}
          <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none" style={{ filter: 'blur(1px)' }}>
            <motion.path 
              d="M 150 192 L 400 192 L 650 192" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="5 5"
            />
          </svg>

        </div>
      </div>
    </section>
  );
};
