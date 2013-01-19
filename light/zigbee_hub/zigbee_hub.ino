#include <SoftwareSerial.h>
#include <Servo.h>

Servo switchServo;

void setup() {
  Serial.begin(9600);
}

String packet = "";
int incomingByte;
int window = 10;
int sequence = 0;
String curString = "";
int latest = window;
String data = "";

void loop() {

  if (Serial.available() > 0) {
    incomingByte = Serial.read();
    if (incomingByte == 0) {
      String sub = curString.substring(0, curString.indexOf(":"));
      int s = stringToNumber(sub);
      if (sub == "-1") {
        sequence = 0;
        curString = "";
        execute(data);
        data = "";
      } else {
        String d = curString.substring(curString.indexOf(":")+1);
        if (sequence == s) {
          data += d;
        }
        Serial.print('a');
        Serial.print(':');
        Serial.print(sequence+1);
        Serial.print('\0');
        sequence = sequence + 1;
        curString = "";
      }
    } else {
      curString += (char) incomingByte;
    }
  }
}

void execute(String command) {
  if (command.substring(0,9) == "initServo") {
    int servo = stringToNumber(command.substring(9));
    switchServo.attach(servo);
  } else if (command.substring(0,9) == "initInput") {
    int pin = stringToNumber(command.substring(10));
    pinMode(pin, INPUT);
  } else if (command.substring(0,10) == "initOutput") {
    int pin = stringToNumber(command.substring(10));
    pinMode(pin, OUTPUT);
  } else if (command.substring(0,5) == "servo") {
    int angle = stringToNumber(command.substring(5));
    switchServo.write(angle);
  } else if (command.substring(0,9) == "writeHigh") {
    int pin = stringToNumber(command.substring(9));
    digitalWrite(pin, HIGH);
  } else if (command.substring(0,8) == "writeLow") {
    int pin = stringToNumber(command.substring(8));
    digitalWrite(pin, LOW);
  }
  Serial.print("Received command: ");
  Serial.print(command);
  Serial.print('\0');
}

int stringToNumber(String thisString) {
  int i, value = 0, length;
  length = thisString.length();
  for(i=0; i<length; i++) {
    value = (10*value) + thisString.charAt(i)-(int) '0';;
  }
  return value;
}
