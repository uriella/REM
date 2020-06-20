#include <arduino.h>
#include <ESP32Servo.h>

#include "Rem.h"

void rem::initiliaze(int pin) {
    this->servo.attach(pin);
    
    this->pos = 1500;
    this->servo.writeMicroseconds(this->pos);
    
    this->ppos = 1500;
    this->servo.writeMicroseconds(this->ppos);
}

void rem::move(int delayPeriod = 0) {

    if (this->pos > this->ppos) {
      for (int i = this->ppos; i <= this->pos; i++) {
        this->servo.writeMicroseconds(i);
        delay(delayPeriod);
      }
    } else if (this->pos < this->ppos) {
      for (int i = this->ppos; i >= this->pos; i--) {
        this->servo.writeMicroseconds(i);
        delay(delayPeriod);
      }
    }
}