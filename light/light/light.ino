using namespace std;

int led = 13;

void setup() {
  pinMode(led, OUTPUT);
  Serial.begin(9600);
  digitalWrite(led, LOW);
}

int state = 0;
char serialData;

void loop() {
  while(Serial.available()) {
    serialData = Serial.read();
    if (state == 0) {
      state = 1;
      digitalWrite(led, HIGH);
    }
    else if (state == 1) {
      state = 0;
      digitalWrite(led, LOW);
    }
  }
}
