# Changelog

Všetky dôležité zmeny v projekte **Tesne** budú zaznamenávané v tomto súbore.

## [0.1.0] - 2026-04-28 (MVP & Vizuálny koncept)

### Pridané
- **Dokumentácia:**
  - `docs/README.md` - Hlavný popis vízie a rozdelenia fáz.
  - `docs/architecture.md` - Hardvérová architektúra postavená na ESP32-S3 a senzore VL53L1X.
  - `docs/BOM.md` - Nákupný zoznam súčiastok s odhadovaným rozpočtom.
  - `docs/logic.md` - Návrh softvérovej logiky mikrokontroléra a formátu zápisu dát.
  - `docs/schematic.md` - ASCII schéma zapojenia komponentov a I2C zbernice.
- **Prezentačný Web:**
  - Vytvorená zložka `web/` s Next.js, Tailwind CSS a Framer Motion.
  - Implementovaný plne responzívny *Light/Dark mód*.
  - Vyvinutá pokročilá **Scrollytelling animácia** (v `StorySection.tsx`), ktorá vizuálne demonštruje funkčnosť senzora.
  - Pridané vlastné `car.svg` s pixelovo presným mapovaním dopadu laserového lúča na karosériu.
  - Pridaná inžinierska mriežka (grid) a skrytý debug mód pre ladenie animácií.
  - Nová moderná hlavička s preklikom priamo na GitHub repozitár a pätička s kreditom.