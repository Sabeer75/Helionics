#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9
#define forceSensorPin A0
#define ledPin 8

const int forceThreshold = 550;  // Adjust based on your sensor sensitivity

MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class
byte nuidPICC[4];

bool cardScanned = false; // Flag to check if RFID card is scanned

void setup() {
  Serial.begin(9600);
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522

  pinMode(ledPin, OUTPUT);

  Serial.println(F("Scan your RFID card..."));
}

void loop() {
  if (!cardScanned) {
    // Check for new card
    if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial())
      return;

    Serial.println(F("Card detected."));

    // Show card info
    MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
    Serial.print(F("Card type: "));
    Serial.println(rfid.PICC_GetTypeName(piccType));

    if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&
        piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
        piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
      Serial.println(F("Not a MIFARE Classic card."));
      return;
    }

    Serial.println(F("Card UID:"));
    printHex(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();

    cardScanned = true; // Enable force sensor after card is scanned

    rfid.PICC_HaltA();       // Halt PICC
    rfid.PCD_StopCrypto1();  // Stop encryption
  }

  // Force sensor logic (only runs after RFID is scanned)
  if (cardScanned) {
    int forceValue = analogRead(forceSensorPin);
    Serial.print("Force Value: ");
    Serial.println(forceValue);

    if (forceValue > forceThreshold) {
      digitalWrite(ledPin, HIGH);  // Turn on LED if force is strong
    } else {
      digitalWrite(ledPin, LOW);   // Turn off LED otherwise
    }

    delay(200);  // Small delay for stability
  }
}

// Helper to print Hex values
void printHex(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}
