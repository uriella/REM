#ifndef REM_H
#define REM_H

#include <ESP32Servo.h>

class rem;

class rem {
    protected:
        Servo servo;
        int pos;
        int ppos;
    public:
        void initiliaze(int pin);
        void move(int pos, int ppos);
}

#endif