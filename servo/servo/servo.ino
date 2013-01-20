#include <Servo.h> 
 
Servo myservo;  
                
 
int pos = 0;    
 
void setup() 
{ 
  myservo.attach(9); 
  Serial.begin(9600);
} 

int turnForward = 1;
char serialData;
 
void loop() {
  while(Serial.available()) {
    serialData = Serial.read();
    if(turnForward==1){
      for(pos = 0; pos < 180; pos += 5)  
      {                                  
        myservo.write(pos);              
        delay(15);                       
      }
      turnForward = 0;
    }
    else if(turnForward==0){
      for(pos = 180; pos>=1; pos -= 5)   
      {                                
        myservo.write(pos);              
        delay(15);                       
      } 
      turnForward = 1;
    }
  }
} 
