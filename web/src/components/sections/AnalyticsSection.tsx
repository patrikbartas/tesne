"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { AlertTriangle, BarChart3, Download } from "lucide-react";

const rideEvents = [
  {
    timestamp: "08:14:22.431",
    distance: 1.84,
    segment: "Račianska",
    speed: "34 km/h",
    tag: "OK",
  },
  {
    timestamp: "08:17:05.118",
    distance: 1.42,
    segment: "Šancová",
    speed: "46 km/h",
    tag: "Priestupok",
  },
  {
    timestamp: "08:19:41.982",
    distance: 2.07,
    segment: "Legionárska",
    speed: "29 km/h",
    tag: "OK",
  },
  {
    timestamp: "08:23:10.204",
    distance: 1.31,
    segment: "Karadžičova",
    speed: "41 km/h",
    tag: "Priestupok",
  },
  {
    timestamp: "08:27:54.667",
    distance: 0.81,
    segment: "Mlynské nivy",
    speed: "52 km/h",
    tag: "Kritické",
  },
  {
    timestamp: "08:31:12.090",
    distance: 1.63,
    segment: "Košická",
    speed: "37 km/h",
    tag: "OK",
  },
] as const;

const chartData = [1.84, 1.42, 2.07, 1.31, 0.81, 1.63, 1.58, 2.11, 1.24, 1.76];

const getDistanceTone = (distance: number) => {
  if (distance < 1.5) {
    return {
      cell: "bg-red-500/15 text-red-700 dark:text-red-300 ring-1 ring-inset ring-red-500/30",
      row: "bg-red-500/[0.04]",
      bar: "from-red-500 to-orange-400",
    };
  }

  if (distance < 1.8) {
    return {
      cell: "bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-1 ring-inset ring-amber-500/30",
      row: "bg-amber-500/[0.03]",
      bar: "from-amber-400 to-yellow-300",
    };
  }

  return {
    cell: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-500/30",
    row: "",
    bar: "from-emerald-400 to-cyan-300",
  };
};

export const AnalyticsSection = () => {
  return (
    <section className="relative border-t border-neutral-200 dark:border-neutral-900 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_45%,#fafafa_100%)] dark:bg-[linear-gradient(180deg,#09090b_0%,#111827_55%,#0a0a0a_100%)] px-4 py-24 md:px-6 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_40%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_40%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-7xl"
      >
        <div className="mb-10 max-w-3xl text-center md:mb-14 md:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
            <BarChart3 className="h-3.5 w-3.5" />
            Nadhľad nad jazdou
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Dáta, ktoré sa dajú čítať na prvý pohľad.
          </h2>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
            Po jazde by z Tesne nevznikol len CSV súbor, ale aj jednoduchá analytická aplikácia.
            Zvýrazní nebezpečné predbiehania, ukáže najkritickejšie momenty a pripraví podklady na ďalšiu analýzu.
          </p>
        </div>

        <div className="rounded-[28px] border border-neutral-200/80 dark:border-white/10 bg-white/80 dark:bg-neutral-950/70 shadow-[0_30px_100px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 px-4 py-3 md:px-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="text-xs md:text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Tesne Analytics / Jazda_2026_04_28_0812
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="rounded-full bg-neutral-100 dark:bg-white/5 px-2.5 py-1">Bratislava</span>
              <span className="rounded-full bg-neutral-100 dark:bg-white/5 px-2.5 py-1">Threshold 1,5m</span>
            </div>
          </div>

          <div className="grid gap-6 p-4 md:grid-cols-[1.25fr_0.75fr] md:p-6">
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">Obiehania</div>
                  <div className="mt-2 text-3xl font-bold">146</div>
                  <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">za poslednú jazdu</div>
                </div>
                <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-red-600 dark:text-red-300">Pod 1,5m</div>
                  <div className="mt-2 text-3xl font-bold text-red-700 dark:text-red-300">37</div>
                  <div className="mt-1 text-sm text-red-600/80 dark:text-red-300/80">zvýraznené v tabuľke</div>
                </div>
                <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">Najhorší prípad</div>
                  <div className="mt-2 text-3xl font-bold">0,81m</div>
                  <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Mlynské nivy</div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/90 dark:bg-black/20">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-neutral-100/80 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Timestamp</th>
                        <th className="px-4 py-3 text-left font-medium">Vzdialenosť</th>
                        <th className="px-4 py-3 text-left font-medium">Úsek</th>
                        <th className="px-4 py-3 text-left font-medium">Rýchlosť auta</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rideEvents.map((event) => {
                        const tone = getDistanceTone(event.distance);

                        return (
                          <tr
                            key={`${event.timestamp}-${event.segment}`}
                            className={clsx(
                              "border-t border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-200",
                              tone.row
                            )}
                          >
                            <td className="px-4 py-3 font-mono text-xs md:text-sm">{event.timestamp}</td>
                            <td className="px-4 py-3">
                              <span className={clsx("inline-flex rounded-full px-2.5 py-1 font-semibold", tone.cell)}>
                                {event.distance.toFixed(2).replace(".", ",")}m
                              </span>
                            </td>
                            <td className="px-4 py-3">{event.segment}</td>
                            <td className="px-4 py-3">{event.speed}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                                {event.distance < 1.5 && <AlertTriangle className="h-3.5 w-3.5 text-red-500" />}
                                {event.tag}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">Distribúcia prejazdov</div>
                    <div className="mt-1 text-lg font-semibold">Najbližšie predbiehania počas jazdy</div>
                  </div>
                  <div className="rounded-full bg-neutral-100 dark:bg-white/5 px-2.5 py-1 text-xs text-neutral-500 dark:text-neutral-400">
                    posledných 10 udalostí
                  </div>
                </div>

                <div className="flex h-44 items-end gap-2 rounded-2xl bg-neutral-100/70 dark:bg-black/20 p-4">
                  {chartData.map((value, index) => {
                    const tone = getDistanceTone(value);
                    const height = `${Math.max(18, value * 32)}px`;

                    return (
                      <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center justify-end gap-2">
                        <div
                          className={clsx("w-full rounded-t-xl bg-gradient-to-t", tone.bar)}
                          style={{ height }}
                        />
                        <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                          {value.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-5">
                <div className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Aplikácia by vedela filtrovať iba priestupky pod 1,5m, exportovať ich do CSV a neskôr pridať aj mapový pohľad, fotky či porovnanie trás medzi jednotlivými jazdami.
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-[10px] bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-black">
                    <AlertTriangle className="h-4 w-4" />
                    Filtrovať priestupky
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-[10px] border border-neutral-300 dark:border-white/10 px-4 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    <Download className="h-4 w-4" />
                    Export CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
