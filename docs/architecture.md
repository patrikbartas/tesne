# Hardvérová Architektúra

Zariadenie je navrhnuté s dôrazom na nízku cenu, dobrú dostupnosť súčiastok a kompaktné rozmery, aby mohlo byť umiestnené na ľavej strane riadidiel bicykla.

## Hlavné Komponenty

1. **Mikrokontrolér a Kamera: ESP32-S3 s kamerovým modulom**
   - Odporúčam prejsť z pôvodného **ESP32-CAM** na **ESP32-S3** variant s kamerou (napr. Seeed XIAO ESP32S3 Sense, ESP32-S3 WROOM + camera board, alebo podobný modul).
   - **Dôvod:** klasický ESP32-CAM má príliš málo voľných pinov, ak chceme naraz použiť senzor, displej, SD kartu a viac tlačidiel.
   - ESP32-S3 má viac GPIO, vyšší výkon, natívne USB a je vhodnejší pre kameru aj budúce rozšírenia.
   - **Arduino Uno nie je vhodná voľba** – nemá Wi‑Fi, nemá výkon ani pamäť na kameru a celkovo by projekt skôr komplikoval.

2. **Senzor Vzdialenosti: VL53L1X (Time-of-Flight / LiDAR)**
   - Využíva neviditeľný laserový lúč.
   - Dosah: do 4 metrov. Extrémne presný a rýchly (až 50Hz).

3. **Displej (Cyklopočítač)**
   - Malý displej umiestnený viditeľne na riadidlách / predstavci.
   - Bude v reálnom čase ukazovať vzdialenosť auta. Ak je nad 100 cm, čísla budú **zelené**, ak auto prejde bližšie ako 100 cm, čísla sa zmenia na **červené**.
   - Ideálne použiť malý I2C farebný displej.

4. **Napájanie**
   - Bežná USB powerbanka (5V), umiestnená napr. v malej kapsičke na ráme.

5. **Ovládacie Tlačidlá (Fyzické UI)**
   - **Centrálna jednotka pri predstavci:**
     - **Tlačidlo 1 (Štart):** Spustí odpočet (3.. 2.. 1.. GO!) a začne novú jazdu.
     - **Tlačidlo 2 (Stop):** Ukončí aktuálnu jazdu a bezpečne uloží dáta.
   - **Samostatná manuálna spúšť kamery na pravej strane riadidiel:**
     - Ergonomické tlačidlo pod pravým palcom, medzi gripom a brzdovou pákou.
     - Slúži na **okamžité manuálne odfotenie auta**, keď sa tak rozhodne jazdec.
     - Toto riešenie je praktickejšie než hľadať malé tretie tlačidlo na centrálnej jednotke.
   - Keďže použijeme ESP32-S3, manuálna spúšť môže mať **vlastný samostatný GPIO pin**.

## Schéma zapojenia (Koncept)

*Poznámka: pri odporúčanom riešení s ESP32-S3 už nie sme tak dramaticky limitovaní počtom pinov ako pri ESP32-CAM.*

- **VL53L1X** -> **ESP32-S3**
  - VCC -> 3.3V
  - GND -> GND
  - SDA -> I2C SDA
  - SCL -> I2C SCL
- **Displej** -> **ESP32-S3**
  - VCC -> 3.3V / 5V podľa modulu
  - GND -> GND
  - SDA/SCL alebo SPI podľa zvoleného displeja
- **Tlačidlo Štart** -> samostatný GPIO
- **Tlačidlo Stop** -> samostatný GPIO
- **Manuálna spúšť kamery** -> samostatný GPIO (pravá strana riadidiel) 

## Fyzické umiestnenie a Dizajn

### Fáza 1 a 2 (MVP)
- **Centrálna jednotka:** 3D tlačený obal na predstavci alebo v jeho tesnej blízkosti.
- **Obsah centrálnej jednotky:** displej, ESP32-S3, Štart/Stop tlačidlá, prípadne SD karta a napájanie.
- **Senzor vzdialenosti:** samostatne na ľavej strane riadidiel, orientovaný kolmo na vozovku.
- **Manuálna spúšť:** samostatné tlačidlo na pravej strane riadidiel pod palcom.

### Fáza 3 (Produkčná vízia - "Neviditeľný" dizajn)
Cieľom je, aby zariadenie nenarušovalo estetiku a aerodynamiku bicykla.
- **Umiestnenie senzora:** Priamo v rúrke riadidiel (tzv. "bar end").
- **Priemer riadidiel:** Štandardný vonkajší priemer je 22,2 mm, vnútorný priemer cca 18-20 mm.
- **Customizácia senzora:** Bežné "breakout" dosky senzora VL53L1X sú príliš široké. Bude potrebné navrhnúť vlastné miniatúrne PCB, alebo odpájkovať samotný senzor od logickej dosky. Senzorová hlavička bude na kábliku pripevnená v špeciálnej zátke na konci ľavej strany riadidiel.
- **Vedenie káblov:** Káble od senzora a pravého tlačidla spúšte pôjdu vnútrajškom riadidiel až k predstavcu.
- **Riadiaca jednotka:** Pod predstavcom alebo v malej kapsičke bude schovaná hlavná elektronika, napájanie a prípadne kamera.
