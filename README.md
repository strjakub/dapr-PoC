### JAVA
- service-invocation (server)
- PubSub (publisher)

Run special docker container for state store:
```
cd docker
```
```
docker-compose up -d
```

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
dapr run --app-id app --app-port 3000 --dapr-http-port 3500 --resources-path ../components node server.js
```
adres: 
```
http://localhost:3000/
```
### ENCRYPTION
Key generation:
```
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out keys/rsa-private-key.pem 
```             
### GO <3
```
dapr run --app-id encryption --app-protocol http --app-port 8003 --dapr-http-port 9003  --resources-path ../components -- go run encryptor.go
```
```
dapr run --app-id encryption --app-protocol http --app-port 8004 --dapr-http-port 9004  --resources-path ../components -- go run decryptor.go
```

### Zipkin observability
Connect to Zipkin ui
```
http://localhost:9411/zipkin/
```

### K8S
Setup cluster:
```
https://docs.dapr.io/operations/hosting/kubernetes/cluster/
```
I used minikube option:
```
minikube config set vm-driver virtualbox
```
Create cluster - it is suggested to use it without those 2 flags but they were necesarry for me
```
minikube start --cpus=4 --memory=4096 --no-vtx-check --embed-certs
```

Make sure you are connected to minikube cluster:
```
kubectl config get-contexts
```
Init dapr in cluster (I had to unlock k8s in Docker Desktop)

```
dapr init -k --dev
```
Create server deployment
```
kubectl apply -f k8s/server.yaml
```

Wait for pods to be created and check IP address of a pod
```
kubectl describe pod <server-pod-name>
```
Run health endpoint to check whether everything works
```
kubectl exec -it <server-pod-name> -- curl <ip-address>:8001/health
```