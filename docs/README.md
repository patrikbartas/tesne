# Projekt Tesne (Smart Gadget pre cyklistov)

## O projekte
"Tesne" je open-source/DIY smart gadget určený na montáž na ľavú stranu riadidiel bicykla. Jeho primárnym cieľom je zaznamenávať reálny bočný odstup pri predbiehaní vozidlami, ukladať dáta pre neskoršiu analýzu a v prípade nebezpečne blízkeho prejazdu (napr. pod 1,5 metra) vizuálne zaznamenať priestupok pomocou kamery.

## Motivácia
Na Slovensku platí zákon upravujúci minimálny bočný odstup pri predbiehaní cyklistov (1 meter do 50 km/h, 1,5 metra nad 50 km/h). Realita v mestách (ako napr. v Bratislave) býva odlišná. Zariadenie má slúžiť ako:
1. Zber dát o bezpečnosti cyklistov v meste (napr. pre organizácie typu Cyklokoalícia).
2. Dôkazový materiál pre samotného cyklistu.

## Fázy vývoja
1. **Fáza 1 (MVP - Minimum Viable Product):**
   - Meranie vzdialenosti pomocou presného senzora (bez aktivovanej kamery).
   - Záznam vzdialenosti a času na SD kartu vo formáte CSV, ak je objekt bližšie ako nastavený limit.
   - Off-line analýza dát (stiahnutie do PC/Excelu).

2. **Fáza 2 (Kamerový systém):**
   - Využitie integrovaného kamerového modulu.
   - Pri poklese vzdialenosti pod 1,5m systém vytvorí okamžitú sériu fotografií ("burst") na zachytenie ŠPZ obiehajúceho vozidla.

3. **Fáza 3 (Produkčný dizajn a integrácia):**
   - Miniaturizácia do "neviditeľného" dizajnu.
   - Oddelenie samotného meracieho čipu (VL53L1X) na káblik a jeho vloženie priamo do ľavej zátky riadidiel (vnútorný priemer 18-20mm).
   - Skryté vedenie kabeláže vnútrom riadidiel.
   - Presun ESP32, batérie a elektroniky do kapsičky pod predstavcom (alebo do rámu).
   - Automatizovaný export dát (napr. stiahnutie priamo do smartfónu cez Wi-Fi po jazde).
