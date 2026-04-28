"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="z-10 max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-neutral-900 dark:text-white">
          <span className="text-red-500">1,5 metra.</span> <br />
          Zákon, alebo len ilúzia?
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
          Zmerajte si skutočný bočný odstup áut pri predbiehaní. <br className="hidden md:block"/>
          Smart radar, ktorý mení subjektívny pocit strachu na nespochybniteľné dáta.
        </p>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-neutral-500 text-sm tracking-widest uppercase mt-20"
        >
          Scrolluj a spoznaj riešenie
          <div className="w-px h-16 bg-neutral-400 dark:bg-neutral-700 mx-auto mt-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};
