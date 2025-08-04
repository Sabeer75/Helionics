# Helionics

![Helmet Tech](./Helionics%20Website/helmet-hero.png)

Helionics is a smart helmet system designed to improve rider safety by ensuring that the bike can only be started when the helmet is properly worn. This is achieved by using a force sensor and a temperature sensor, both connected to an Arduino, to detect if a person is wearing the helmet.

## How It Works

- **Force Sensor (FSR Pressure Sensor):** Detects pressure to confirm the helmet is being worn.
- **Temperature Sensor (LM35):** Measures temperature to verify the presence of a human (body heat).
- The Arduino reads both sensor values.
- **Ignition Logic:**
  - If both the force and temperature values are above their respective thresholds, the Arduino allows the bike to be started.
  - If either value is below the threshold, the bike ignition remains disabled, preventing the bike from starting unless the helmet is worn.

## Hardware Used

- Arduino Board
- Force Sensor (FSR Pressure Sensor)
- Temperature Sensor (LM35 Temperature Sensor)

## Code

The complete code for this project is written in Embedded C and is available in the `helionis.ino` file.

---

This project demonstrates a simple yet effective way to enforce helmet usage and enhance rider safety using basic sensors and Arduino programming.
