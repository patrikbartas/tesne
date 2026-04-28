"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import carSvg from "../../../../public/car.svg";

export const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDebug, setShowDebug] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ============================================================================
  // 🕒 ČASOVÁ OS (0.00 až 1.00) - TUNE CONFIG
  // Zmeň tieto hodnoty pre jemné doladenie animácií
  // ============================================================================
  const TIMING = {
    sensorIn: 0.05,
    handlebarsIn: 0.25,
    beamOut: 0.50,
    
    // Logika auta (Prispôsobená pre car.svg s výškou cca 80vh)
    carStart: 0.65,    // Auto sa objaví zdola
    carHitsBeam: 0.721, // Prvý dotyk nárazníka (podľa tvojho mapovania)
    carCenter: 0.80,   // Auto je presne v strede (y = 0)
    carLeavesBeam: 0.879, // Auto definitívne opúšťa lúč
    carEnd: 0.95,      // Auto zmizne zhora
    
    dbNotification: 0.882, // Notifikácia vyskočí ihneď po odchode auta
    sceneFadeOut: 0.96    // Kedy všetko zmizne
  };

  // --- 1. Senzor ---
  const sensorOpacity = useTransform(scrollYProgress, [0.0, TIMING.sensorIn, TIMING.sceneFadeOut, 1.0], [0, 1, 1, 0]);
  const text1Opacity = useTransform(scrollYProgress, [TIMING.sensorIn, 0.10, 0.15, 0.20], [0, 1, 1, 0]);
  
  // --- 2. Riadidlá a Displej ---
  const handlebarsX = useTransform(scrollYProgress, [0.20, TIMING.handlebarsIn], ["100vw", "0vw"]);
  const displayContainerOpacity = useTransform(scrollYProgress, [0.22, TIMING.handlebarsIn, TIMING.sceneFadeOut, 1.0], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.30, 0.35, 0.40, 0.45], [0, 1, 1, 0]);

  // --- 3. Laserový lúč ---
  const beamOpacity = useTransform(scrollYProgress, [0.45, TIMING.beamOut, TIMING.sceneFadeOut, 1.0], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.50, 0.55, 0.60, 0.65], [0, 1, 1, 0]);
  
  // Namiesto šírky meníme umiestnenie jeho "ľavého okraja". 
  // Mapujeme presnú topológiu auta podľa tvojich meraní (Hard skoky vs Smooth lineárne prechody):
  const beamLeftEdge = useTransform(
    scrollYProgress, 
    [
      TIMING.beamOut, 
      0.7209, // 0px (nekonečno) - držíme až do úplne posledného zlomku milimetra
      0.7210, // 75px (absolútny hard skok pri prvom dotyku nárazníka)
      0.7230, // 125px (nový bod - krivka kapoty)
      0.7250, // 158px (nový bod - plynulý nábeh)
      0.7280, // 201px (plynulo prechádza po kapote)
      0.7370, // 220px (nový bod)
      0.7550, // 233px (plynulo po predné sklo)
      0.7830, // 233px (drží rovno po dverách k zrkadlu)
      0.7850, // 250px (plynulo vybehne na zrkadlo)
      0.7879, // 250px (drží na špičke zrkadla)
      0.7880, // 232px (absolútny hard skok dole za zrkadlom)
      0.8470, // 232px (drží rovno pozdĺž zadných dverí)
      0.8630, // 222px (nový bod - klesanie za dverami)
      0.8740, // 202px (plynulo klesá po zadnom kufri)
      0.8789, // 100px (koniec auta / zadný nárazník)
      0.8790  // 0px (nekonečno - absolútny hard skok späť)
    ], 
    [
      "0px", 
      "0px", 
      "75px", 
      "125px",
      "158px",
      "201px", 
      "220px",
      "233px", 
      "233px", 
      "250px", 
      "250px", 
      "232px", 
      "232px", 
      "222px",
      "202px", 
      "100px", 
      "0px"
    ] 
  );

  // --- 4. Auto a reakcia displeja ---
  const carY = useTransform(scrollYProgress, [TIMING.carStart, TIMING.carCenter, TIMING.carEnd], ["100vh", "0vh", "-100vh"]);
  
  // Dynamický text displeja: "OK" -> odpočítavanie -> "0,90m" -> "OK"
  const displayText = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.721) return "OK";
    if (progress >= 0.879) return "OK";

    if (progress >= 0.721 && progress <= 0.728) {
      // Lineárne odpočítavanie z 1.821 na 0.9
      const t = (progress - 0.721) / (0.728 - 0.721);
      const dist = 1.821 - t * (1.821 - 0.900);
      return `${dist.toFixed(2).replace('.', ',')}m`;
    }

    // Od 0.728 po koniec auta podržíme na 0,90m (podľa zadania)
    return "0,90m";
  });

  // Animácia pozadia displeja
  // 1.5m hranica je presne pri progress = 0.7234
  const displayBgColor = useTransform(scrollYProgress,
    [0.0, 0.7233, 0.7234, 0.8789, 0.8790], 
    ["#22c55e", "#22c55e", "#ef4444", "#ef4444", "#22c55e"]
  );

  // --- 5. Uloženie dát ---
  const dbNotificationOpacity = useTransform(scrollYProgress, [TIMING.dbNotification, TIMING.dbNotification + 0.008, 0.95, 0.98], [0, 1, 1, 0]);
  const sceneOpacity = useTransform(scrollYProgress, [TIMING.sceneFadeOut, 1.0], [1, 0]);

  // --- DEBUG POČÍTADLO ---
  const progressText = useTransform(scrollYProgress, (val) => `progress: ${val.toFixed(3)}`);

  return (
    <section ref={containerRef} style={{ position: "relative" }} className="h-[1000vh] bg-transparent">
      
      {/* DEBUG UI vpravo hore */}
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-3 pointer-events-auto">
        {showDebug && (
          <div className="flex items-center gap-3 font-mono text-sm font-bold pointer-events-none">
            <motion.div className="text-black dark:text-white">{progressText}</motion.div>
            <div className="text-neutral-400 dark:text-neutral-600">/</div>
            <motion.div className="text-red-500 flex gap-1">
              lúč: <motion.span>{beamLeftEdge}</motion.span>
            </motion.div>
          </div>
        )}
        <button 
          onClick={() => setShowDebug(!showDebug)}
          className="text-neutral-400 dark:text-neutral-600 hover:text-black dark:hover:text-white transition-colors font-mono text-lg font-bold px-2 py-1 cursor-pointer outline-none"
          title="Toggle Debug Mode"
        >
          {showDebug ? "-" : "+"}
        </button>
      </div>

      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* --- POMOCNÁ MRIEŽKA (GRID) - viditeľná permanentne --- */}
        <>
          {/* Hlavné čiary (100px) */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none text-black dark:text-white opacity-10 dark:opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, currentcolor 1px, transparent 1px), linear-gradient(to bottom, currentcolor 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
              backgroundPosition: '0 0'
            }}
          />
          {/* Vedľajšie čiary (10px) */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none text-black dark:text-white opacity-[0.03] dark:opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, currentcolor 1px, transparent 1px), linear-gradient(to bottom, currentcolor 1px, transparent 1px)`,
              backgroundSize: '10px 10px',
              backgroundPosition: '0 0'
            }}
          />
        </>

        <motion.div style={{ opacity: sceneOpacity }} className="relative w-full h-full flex items-center justify-center">
          
          {/* --- TEXTOVÉ VRSTVY --- */}
          <div className="absolute top-32 left-0 right-0 flex flex-col items-center justify-start px-6 text-center z-50 pointer-events-none">
            <motion.h2 style={{ opacity: text1Opacity }} className="absolute text-2xl md:text-4xl text-neutral-900 dark:text-white font-bold max-w-xl">
              Srdce projektu. <br/><span className="text-blue-500">Miniatúrny ToF senzor.</span>
            </motion.h2>
            <motion.h2 style={{ opacity: text2Opacity }} className="absolute text-2xl md:text-4xl text-neutral-900 dark:text-white font-bold max-w-xl">
              Plne skrytý. <br/><span className="text-neutral-500 dark:text-neutral-400">Zasunutý do trubky riadidiel.</span>
            </motion.h2>
            <motion.h2 style={{ opacity: text3Opacity }} className="absolute text-2xl md:text-4xl text-neutral-900 dark:text-white font-bold max-w-xl">
              Nekompromisný lúč. <br/><span className="text-red-500">Meria 50x za sekundu.</span>
            </motion.h2>
            <motion.div style={{ opacity: dbNotificationOpacity }} className="absolute mt-10 bg-red-100 dark:bg-red-900/30 border border-red-500 text-red-700 dark:text-red-300 px-6 py-3 rounded-[10px] font-mono text-sm backdrop-blur-md shadow-sm">
              ✓ Tak to bolo tesné! 81cm. Uložené do databázy.
            </motion.div>
          </div>

          {/* --- 1. SENZOR --- */}
          <motion.div 
            style={{ opacity: sensorOpacity }}
            className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-12 bg-blue-500 rounded-md shadow-md"
          />

          {/* --- 2. RIADIDLÁ A DISPLEJ --- */}
          <motion.div style={{ x: handlebarsX }} className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute top-[calc(50%-28px)] left-[calc(50%-48px)] w-[calc(50vw+48px)] h-[2px] bg-black dark:bg-white" />
            <div className="absolute top-[calc(50%+26px)] left-[calc(50%-48px)] w-[calc(50vw+48px)] h-[2px] bg-black dark:bg-white" />
            <div className="absolute top-[calc(50%-26px)] left-[calc(50%-48px)] w-[calc(50vw+48px)] h-[52px] bg-neutral-200 dark:bg-neutral-900" />
            
            <motion.div 
              style={{ 
                opacity: displayContainerOpacity,
                backgroundColor: displayBgColor
              }}
              className="absolute left-[65%] top-1/2 -translate-y-1/2 w-32 h-20 rounded-[10px] flex items-center justify-center shadow-lg"
            >
              <motion.div className="absolute text-white font-mono font-bold text-2xl tracking-tighter">
                {displayText}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* --- 3. LASEROVÝ LÚČ --- */}
          <div className="absolute z-10 top-1/2 left-0 right-[calc(50%+48px)] h-[2px] -translate-y-1/2 flex items-center overflow-visible pointer-events-none">
            <motion.div 
              style={{ left: beamLeftEdge, right: 0, opacity: beamOpacity }}
              className="absolute h-full bg-red-500 shadow-sm"
            />
          </div>

          {/* --- 4. AUTO (Tvoje car.svg) --- */}
          <motion.div 
            style={{ y: carY }}
            className="absolute z-20 left-[-100px] top-1/2 -translate-y-1/2 w-[350px] flex items-center justify-center pointer-events-none"
          >
            {/* Využívame Next.js Image komponent pre bezpečný export na GitHub Pages */}
            <Image 
              src={carSvg} 
              alt="Auto" 
              className="w-full h-auto dark:invert opacity-90 transition-all duration-300 drop-shadow-2xl"
            />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
