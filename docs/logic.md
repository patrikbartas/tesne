# Softvérová Logika a Tok Dát

Tento dokument opisuje správanie kódu vo Fáze 1 (Zber dát z ToF senzora na SD kartu) s prípravou na Fázu 2 (Fotenie).

## Hlavná slučka (Main Loop)

1. **Inicializácia a Standby (IDLE) stav:**
   - Prebudenie ESP32-S3, pripojenie SD karty, inicializácia senzora, displeja a vstupných tlačidiel.
   - Displej zobrazí "Pripravené" a zariadenie čaká na užívateľa. Žiadne dáta sa nezapisujú.

2. **Spustenie jazdy (Štart):**
   - Užívateľ stlačí **Tlačidlo Štart** na centrálnej jednotke.
   - Displej zobrazí odpočet: "3... 2... 1... GO!".
   - Vygeneruje sa nový identifikátor jazdy (Session ID), napr. `Jazda_001` alebo podľa času, ak máme RTC modul / WiFi.
   - Zariadenie prejde do stavu nahrávania.

3. **Meranie v reálnom čase a Displej (RECORDING):**
   - Prečítanie hodnoty vzdialenosti zo senzora (10x až 20x za sekundu).
   - Aktualizácia displeja s aktuálnou hodnotou v cm. Ak je vzdialenosť > 100 cm, text je **zelený**. Ak < 100 cm, text je **červený**.
   - *Filter šumu:* Ignorovanie náhodných krátkych chýb merania.

4. **Rozhodovacia logika (Trigger obiehania):**
   - Ak je nameraná vzdialenosť `< 300 cm`, začína sa "Udalosť obiehania" a dáta sa ukladajú na SD kartu.
   - Počas jednej udalosti sa hľadá minimálna zaznamenaná vzdialenosť.

5. **Manuálne fotenie (Pravé tlačidlo):**
   - Kedykoľvek počas jazdy môže jazdec stlačiť **samostatné tlačidlo pod pravým palcom**.
   - Systém okamžite vytvorí fotografiu a uloží ju na SD kartu.
   - Fotografia dostane názov alebo metadáta naviazané na aktuálnu jazdu a čas od štartu jazdy.
   - Toto je dôležité, pretože jazdec sa nebude spoliehať iba na automatické fotenie – môže si sám zvoliť správny moment, napr. keď auto dobehne na červenej.

6. **Automatické fotenie (voliteľné, budúca funkcia):**
   - Ak nameraná vzdialenosť klesne pod kritickú hranicu (napr. 150 cm), systém môže v budúcnosti automaticky vytvoriť fotografiu alebo krátku sériu fotiek.
   - Táto funkcia ostáva voliteľná a sekundárna oproti manuálnej spúšti.

7. **Ukončenie jazdy (Stop):**
   - Užívateľ stlačí **Tlačidlo Stop** na centrálnej jednotke.
   - Zápis na SD kartu sa bezpečne ukončí, súbor sa uzavrie (zabraňuje strate dát pri vytiahnutí z napájania).
   - Displej zobrazí zhrnutie (napr. "Jazda uložená: 5 obiehaní") a vráti sa do Standby stavu.

## Dátový formát (CSV)
Zaradenie jázd uľahčí čítanie v Exceli. Nový CSV súbor sa vytvorí pri každom štarte jazdy:

```csv
Session_ID: Jazda_001
Udalosť_ID, Čas_od_štartu(ms), Vzdialenosť(cm), Status_Kamery
1, 15000, 240, OFF
1, 15100, 180, OFF
1, 15200, 110, OFF
1, 18400, 95, MANUAL_PHOTO
2, 45000, 280, OFF
```

Poznámka:
- `MANUAL_PHOTO` znamená, že jazdec v tom momente stlačil pravé tlačidlo spúšte.
- V budúcnosti môže pribudnúť aj status ako `AUTO_PHOTO`.
