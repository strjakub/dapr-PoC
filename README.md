### JAVA
- service-invocation (server)
- PubSub (publisher)
```
dapr run --app-id server --app-protocol http --app-port 8001 --dapr-http-port 9001 -- java -jar .\build\libs\demo-0.0.1-SNAPSHOT.jar
```

### PYTHON
- PubSub (subscriber)
```
dapr run --app-id receiverLog --app-protocol http --app-port 8002 --dapr-http-port 9002 -- python main.py
```

### JS
- service-invocation (client)
```
node app.js
```
