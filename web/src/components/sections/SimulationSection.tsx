"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const SimulationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animácia približovania auta a zmeny čísla na displeji
  const carY = useTransform(scrollYProgress, [0, 0.8], ["100vh", "0vh"]);
  const distance = useTransform(scrollYProgress, [0, 0.8], [300, 75]);
  
  // Zmena farby displeja na základe scrollovania
  const displayColor = useTransform(
    scrollYProgress,
    [0.5, 0.6],
    ["#10b981", "#ef4444"] // Smaragdová zelená na Červenú
  );

  return (
    <section ref={containerRef} className="h-[200vh] bg-neutral-950 relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden border-t border-neutral-900">
        
        <div className="absolute top-20 text-center z-30">
          <h2 className="text-3xl font-bold text-white">V akcii</h2>
          <p className="text-neutral-500">Pohľad jazdca</p>
        </div>

        {/* Simulácia riadidiel zhora */}
        <div className="relative w-full max-w-5xl h-[600px] mt-20 flex justify-center">
          
          {/* Samotné riadidlá (Čiara) */}
          <div className="absolute bottom-20 w-full h-8 bg-neutral-800 rounded-full border-t border-neutral-700 shadow-2xl" />

          {/* Displej na riadidlách */}
          <motion.div 
            className="absolute bottom-24 w-32 h-20 bg-black border-2 rounded-xl flex flex-col items-center justify-center z-20 shadow-2xl"
            style={{ borderColor: displayColor, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.8)" }}
          >
            <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1">Tesne</span>
            <motion.div 
              className="text-3xl font-bold font-mono"
              style={{ color: displayColor }}
            >
              <motion.span>
                {/* Malý trik na zobrazenie plynulého odpočtu čísla vo framer-motion */}
                {useTransform(distance, (d) => `${(d / 100).toFixed(2)}m`)}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Simulácia auta z ľavej strany */}
          <motion.div 
            className="absolute left-10 w-48 h-96 bg-gradient-to-t from-neutral-800 to-neutral-700 rounded-2xl shadow-2xl border border-neutral-600 z-10 flex items-center justify-center"
            style={{ y: carY }}
          >
            <div className="text-neutral-500 font-bold uppercase tracking-widest rotate-90">Auto</div>
          </motion.div>

          {/* Laserový lúč zo zátky do strany */}
          <motion.div 
            className="absolute bottom-[92px] left-0 w-1/4 h-0.5 bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
          />
        </div>
      </div>
    </section>
  );
};
