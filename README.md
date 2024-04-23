### JAVA
- service-invocation (server)
- PubSub (publisher)

Run special docker container for state store:
cd docker
docker-compose up -d

Windows:
```
dapr run --app-id server --app-protocol http --app-port 8001 --dapr-http-port 9001 --resources-path ../components -- java -jar .\build\libs\demo-0.0.1-SNAPSHOT.jar
```

Mac / Linux: 
```
 dapr run --app-id server --app-protocol http --app-port 8001 --dapr-http-port 9001 --resources-path ../components -- java -jar ./build/libs/demo-0.0.1-SNAPSHOT.jar
```
### PYTHON
- PubSub (subscriber)
```
dapr run --app-id receiverLog --app-protocol http --app-port 8002 --dapr-http-port 9002 --resources-path ../components -- python main.py
```

### JS
- service-invocation (client)
```
node app.js
```

### Mini klient + server js
```
dapr run --app-id app --app-port 3000 --dapr-http-port 3500 --resources-path ../components node server.js
```
adres: 
```
http://localhost:3000/
```

### Zipkin observability
Connect to Zipkin ui
```
http://localhost:9411/zipkin/
```
