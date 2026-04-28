# Schéma zapojenia (ASCII)

Tento nákres zobrazuje modulárne rozloženie po bicykli. Centrálna jednotka je na predstavci, senzor je vľavo a spúšť kamery vpravo. Vďaka modernému čipu ESP32-S3 máme dostatok voľných pinov na priame pripojenie tlačidiel.

```text
                               +-----------------------------+
                               |     Powerbank (5V USB)      |
                               +--------------+--------------+
                                              |
 [ĽAVÁ STRANA RIADIDIEL]                      v                      [PRAVÁ STRANA RIADIDIEL]
                               +--------------+--------------+
 +-------------------+         |  CENTRÁLNA JEDNOTKA (ESP32) |         +--------------------+
 | ZÁTKA RIADIDIEL   |         |  (Umiestnenie: Predstavec)  |         | ERGONOMICKÉ TLAC.  |
 |                   |         |                             |         |                    |
 |  VL53L1X Senzor   | < I2C > |  Mikrokontrolér ESP32-S3    | < GPIO> |  Manuálna Spúšť    |
 |  (meria autá)     |         |  s integrovanou kamerou     |         |  Kamery (Pod palec)|
 |                   |         |                             |         |                    |
 +-------------------+         |  [MicroSD]   [Displej I2C]  |         +--------------------+
                               |                             |
                               |  [Tl. Štart]   [Tl. Stop]   |
                               +-----------------------------+
```

## Zapojenie Pinov (ESP32-S3)
Vďaka použitiu ESP32-S3 (napr. Seeed XIAO Sense) už nemusíme riešiť zložité odporové deliče pre tlačidlá, pretože máme dostatok GPIO pinov.

- **I2C Zbernica (SDA/SCL):** Spoločná pre Senzor vzdialenosti a Displej.
- **Tlačidlo Štart (GPIO A):** Digital In s vnútorným Pull-up odporom.
- **Tlačidlo Stop (GPIO B):** Digital In s vnútorným Pull-up odporom.
- **Manuálna Spúšť (GPIO C):** Nezávislé tlačidlo vyvedené káblikom na pravú stranu (Digital In s Pull-up).
```

## Poznámka k zapojeniu pinov (ESP32-CAM)
ESP32-CAM má veľmi obmedzený počet voľných GPIO pinov, pretože väčšinu z nich využíva interná kamera a čítačka MicroSD kariet.
- Odporúčané piny pre I2C zbernicu: **GPIO 14 (SCL)** a **GPIO 15 (SDA)** (prípadne iné podľa toho, či bude SD karta bežať v 1-bitovom alebo 4-bitovom režime).
- Keďže I2C je zbernica, senzor aj displej môžu byť zapojené paralelne na tie isté dva piny, procesor ich rozozná podľa ich hardvérovej adresy.
