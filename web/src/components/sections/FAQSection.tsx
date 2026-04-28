"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question: "Ako presne vie Tesne zmerať bočný odstup auta?",
    answer:
      "Základ tvorí ToF senzor VL53L1X, ktorý veľmi rýchlo meria vzdialenosť od objektu vedľa bicykla. Vďaka tomu vie systém zachytiť aj krátke a nebezpečné predbiehania.",
  },
  {
    question: "Bude zariadenie fungovať aj bez kamery?",
    answer:
      "Áno. MVP ráta najprv so zberom dát o vzdialenosti a ukladaním udalostí. Kamera je plánované rozšírenie pre neskoršiu fázu projektu.",
  },
  {
    question: "Na aké bicykle sa má riešenie hodiť?",
    answer:
      "Koncept cieli najmä na bicykle s rovnými riadidlami, kde sa dá senzor elegantne skryť do ľavej strany riadidiel bez toho, aby rušil jazdu alebo vzhľad bicykla.",
  },
  {
    question: "Čo sa stane, keď auto prejde bližšie ako 1,5 metra?",
    answer:
      "Taká udalosť sa v dátach zvýrazní ako riziková. V budúcnosti sa k nej môže automaticky priradiť aj fotografia alebo séria fotografií pre ďalšiu analýzu.",
  },
  {
    question: "Na čo budú tieto dáta užitočné?",
    answer:
      "Môžu pomôcť jednotlivcom, komunitám aj mestám lepšie pochopiť, kde vznikajú nebezpečné situácie. Namiesto dojmov tak vzniknú konkrétne a porovnateľné čísla.",
  },
] as const;

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 px-6 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_38%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_40%)] pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-300/70 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-600 dark:text-neutral-300">
            <HelpCircle className="h-3.5 w-3.5" />
            FAQ
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Najčastejšie otázky k projektu.
          </h2>
          <p className="mt-5 max-w-xl text-lg md:text-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
            Krátke odpovede na to, ako by Tesne fungovalo, komu je určené a aký typ dát by vedelo zbierať počas jazdy.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="overflow-hidden rounded-[22px] border border-neutral-200 dark:border-white/10 bg-white/85 dark:bg-white/[0.03] shadow-[0_20px_60px_-30px_rgba(15,23,42,0.22)] backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
                >
                  <span className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-neutral-200 dark:border-white/10 px-5 py-5 md:px-6">
                        <p className="max-w-2xl text-base md:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
