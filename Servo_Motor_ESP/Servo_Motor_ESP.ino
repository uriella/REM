
#include <WiFi.h>
#include <SPIFFS.h>
#include <ESPAsyncWebServer.h>
#include <ESP32Servo.h>

const char ssid[] = "";
const char password[] = "";

//Optional
//IPAddress local_IP();
//IPAddress gateway();
//IPAddress subnet();

int clientNumber = 1;

Servo servo[4]; 

int pin[4] = {22, 21, 19, 18};
int pos[4] = {1500, 1500, 1500, 1500};
int pPos[4] = {1500, 1500, 1500, 1500};

int delayPeriod = 0;

AsyncWebServer server(80);
AsyncWebSocket ws("/end");

void onWsEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len){
  if (type == WS_EVT_CONNECT){
    Serial.println();
    Serial.print("Client ");
    Serial.print(clientNumber);
    Serial.println(" connected"); 
    clientNumber += 1;
  } else if (type == WS_EVT_DISCONNECT){
    Serial.println();
    Serial.print("Client ");
    Serial.print(clientNumber - 1);
    Serial.println(" disconnected"); 
    clientNumber -= 1;
  } else if (type == WS_EVT_DATA){
    
    int temp;
    String dataInt;
    String dataTemp;

    for (int i = 0; i < len; i++){
      Serial.print((char) data[i]);
    }

    dataTemp = (char*) data;
    dataInt = dataTemp.substring(1, len);
    
    Serial.print(" ");
    Serial.print((char) data[0]);
    // for (int i = 0; i < strlen(dataInt); i++){
      Serial.print(dataInt);
    // }

    //Select which servo to update
    switch ((char) data[0]) {
      case 'a':
        temp = 0;
        break;
      case 'b':
        temp = 1;
        break;
      case 'c':
        temp = 2;
        break;
      case 'd':
        temp = 3;
        break;
    }

    //Updates the position
    pos[temp] = dataInt.toInt();
    Serial.print(pos[temp]);
    Serial.println();
    if (pos[temp] > pPos[temp]) {
      for (int i = pPos[temp]; i <= pos[temp]; i++) {
        servo[temp].writeMicroseconds(i);
        delay(delayPeriod);
      }
    } else if (pos[temp] < pPos[temp]) {
      for (int i = pPos[temp]; i >= pos[temp]; i--) {
        servo[temp].writeMicroseconds(i);
        delay(delayPeriod);
      }
    }
    //Saves the position 
    pPos[temp] = pos[temp];
    
  }
}

void setup(){
  Serial.begin(115200);
  
  //Initialize WiFi
  if (!WiFi.config(local_IP, gateway, subnet)){
    Serial.println("STA Failed to configure");
  }

  WiFi.begin(ssid, password);

  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED){
    delay(100);
    Serial.print(".");
  }

  Serial.println(""); 
  Serial.println("Your Ip Address is");
  Serial.print(WiFi.localIP());

  //Initialize the Servo
  for (int i = 0; i < 4; i++){
    servo[i].attach(pin[i]);
    servo[i].writeMicroseconds(pos[i]);
  }
  
  //Initialize Web server
  ws.onEvent(onWsEvent);
  server.addHandler(&ws);
  
  server.begin();

}

void loop(){
  
}
