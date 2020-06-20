#include <WiFi.h>
#include <SPIFFS.h>
#include <ESPAsyncWebServer.h>
#include <ESP32Servo.h>
#include "Rem.h"
#include "env.h"

const char ssid[] = YOUR_LOCAL_SSID;
const char password[] = SSID_PASSWORD;

//Optional
IPAddress local_IP(IP1, IP2, IP3, IP4);
IPAddress gateway(GIP1, GIP2, GIP3, GIP4);
IPAddress subnet(MASK1, MASK2, MASK3, MASK4);

rem part[4];
int pin[4] = {22, 21, 19, 18};

int clientNumber = 1;

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
    int dataInt;
    String dataTemp, dataFoo;

    dataTemp = (char*) data;
    
    Serial.println();

    for (int i = 0; i < len; i += 5){
        
      dataFoo = dataTemp.substring(i, i+5);
      dataInt = dataFoo.substring(1, 5).toInt();
  
      //Select which servo to update
      temp = (int) dataFoo[0] - 97;

      //Updates the position
      part[temp].pos = dataInt;
      part[temp].move(0);

      //Saves the position 
      part[temp].ppos = part[temp].pos;
    }
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
    part[i].initiliaze(pin[i]);
  }
  
  //Initialize Web server
  ws.onEvent(onWsEvent);
  server.addHandler(&ws);
  
  server.begin();

}

void loop(){
  
}
