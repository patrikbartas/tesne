"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center text-center px-6 border-t border-neutral-200 dark:border-neutral-900 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-200/50 to-neutral-50 dark:from-neutral-900/50 dark:to-neutral-950 z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-2xl"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white">
          Z konceptu do reality.
        </h2>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12">
          Hardvérová architektúra a dizajn MVP sú hotové. Teraz hľadáme inžinierov, vývojárov 
          a partnerov na výrobu PCB či 3D tlač. Pridaj sa k vývoju tohto open-source projektu 
          a poďme spoločne urobiť cesty bezpečnejšími.
        </p>
        
        <a href="mailto:patrik.bartas@gmail.com?subject=Chcem%20sa%20prida%C5%A5%20k%20tesne" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-[10px] bg-neutral-900 dark:bg-white px-8 font-medium text-white dark:text-black transition-all hover:scale-105 active:scale-95">
          <span className="mr-2 font-bold">Pridať sa k projektu Tesne</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  );
};
