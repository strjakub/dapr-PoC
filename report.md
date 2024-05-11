# Case study —  Dapr

### Year: 2024

### Group: Barbara Doncer, Jakub Strojewski, Anna Franczyk, Marcel Spryszyński

## Table of contents

[1. Introduction](#introduction)

[2. Theoretical background/technology stack](#background)

[3. Case study concept description](#background)

[4. Solution architecture](#architecture)

[5. Environment configuration description](#configuration)

[6. Installation method](#installation)

[7. How to reproduce](#reproducing)

[8. Demo deployment steps](#deployment)

[9. Summary – conclusions](#summary)

[10. References](#references)

## 1. Introduction<a name="introduction"></a> 
Nowadays, web applications are becoming increasingly complex. Additionally, cloud providers offer a range of services and resources to build and deploy such applications. Due to that, web developers are looking for solutions that will simplify the process of creation, scaling, and management of their applications. In response to these needs, many tools have been created, one of them is Dapr.

Dapr (Distributed Application Runtime) is an open-source platform designed to simplify the development of distributed applications. It offers a set of integrated APIs with built-in best practices and patterns, so the developer can focus on business logic rather than being concerned about infrastructure. Dapr enables faster application development, reduces complexity, and enhances reliability and scalability.

As part of our project, we decided to explore the potential of Dapr by implementing its different functionalities in an application. Our goal is to understand how this tool works and demonstrate an application utilizing its capabilities.

## 2. Theoretical background/technology stack<a name="background"></a> 
**Building blocks**

Dapr offers a range of building blocks to simplify distributed application development.

![](/img/dapr-functionalities.png)

Dapr’s building blocks (source:[ https://docs.dapr.io/concepts/overview/](https://docs.dapr.io/concepts/overview/))

### Cross-cutting APIs
In addition to building blocks, Dapr offers APIs that work across all the used building blocks: [Resiliency](https://docs.dapr.io/concepts/resiliency-concept/), [Observability](https://docs.dapr.io/concepts/observability-concept/) and [Security](https://docs.dapr.io/concepts/security-concept/).

### Chosen capabilities

We've chosen to showcase the following capabilities:

1. **Service Invocation** — enables communication within applications using the standard [gRPC](https://grpc.io/) or [HTTP](https://www.w3.org/Protocols/) protocols
1. **Publish-Subscribe** — facilitates asynchronous messaging between components
1. **State Management** —  provides a unified interface for storing and retrieving application state
1. **Secret Management —**  enables receiving sensitive data from third party storage 
1. **Cryptography** — enables encryption, decryption, and secure data transmission within the application
1. **Observability** — allows monitoring and troubleshooting of application performance and issues

## 3. Case study concept description<a name="case-study"></a>
**Background:**

Company We Love Dogs needs a microservices-based application to manage the event called “Feed our pupils” that stores the data about number of votes for predefined pets shared by the company. Due to limited resources, must utilize the cheapest proven options available in the market from tool providers. Given the dynamically changing prices of providers and new resource utilization optimizations introduced by open-source tools, migrations in the future are possible. Therefore, the decision was made to implement the application using Dapr.

**Objectives:**

- To create simple web page to allow user interaction with application
- To minimize development time and overhead associated with managing microservices
- Standardize development approach
- Improve security, scalability, and maintainability of application

**Scope:**

The case study will focus on the development of a microservice application using Dapr. It will encompass the implementation of key microservices components such as service invocation, state management, and observability using Dapr's features. The study will not delve into the specific implementation details of individual microservices or their functionalities.

**Methodology:**

- Design: Define the architecture and design of the microservices' application, including the selection of Dapr components
- Development: Develop and implement microservices using Dapr's SDKs and runtime, integrating necessary components and functionalities.
- Testing: Test possibility of swapping between components implementations
- Conclusion: Gather feedback from developers whether introducing Dapr was worth a given effort

**Expected Outcomes:**

- Simple interactive gui to feed dogs and see results
- The possibility of quick switching between tools used during development
- Application which uses standardized tools, responsible for, among others:

  communication, data storage and security

- Validation of Dapr’s effectiveness in microservices development and management

## 4. Solution architecture<a name="architecture"></a>
![image](https://github.com/strjakub/dapr-PoC/assets/92330747/e9bd20b9-2f08-40ce-b630-6a3119234fba)

## 5. Environment configuration description<a name="configuration"></a>
Environment configuration is the biggest advantage of DAPR. We can set up and modify entire setup by changing `.yaml` files. Then after rebuilding component with passing the path to apropriate directory we can make dapr use the configuration we just changed. That feature make changing configuration a lot easier.

### PubSub configuration
In the component yaml we can set the type of comunication, for example Redis, RabbitMQ or Kafka. The we can add metadata for it. In the subscription yaml we set the specific topics and routes, that way we can define what our app should use in communication flow.

```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: pubsub
spec:
  type: pubsub.redis
  version: v1
  metadata:
  - name: redisHost
    value: localhost:6379
  - name: redisPassword
    value: ""
```

```yaml
apiVersion: dapr.io/v2alpha1
kind: Subscription
metadata:
  name: pubsub
spec:
  topic: common-topic
  routes: 
    default: /pubsub
  pubsubname: pubsub
scopes:
  - server
  - receiverLog
  - receiverStore
```

### State store configuration
Here we can configure our database including the type of database, port on which we can access it, and credentails.

```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: statestore
spec:
  type: state.redis
  version: v1
  metadata:
  - name: redisHost
    value: localhost:6380
  - name: redisPassword
    secretKeyRef:
      name: db.password
      value: db.password
auth: 
  secretStore: secretstore
scopes:
 - server
```

### Local storage configuration
The purpose of local storage is to load keys from a local directory. The most important configurable thing here is path to directory with keys.

```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: localstorage
spec:
  type: crypto.dapr.localstorage
  version: v1
  metadata:
    - name: path
      value: ../keys
```

### Observability configuration
It allows us to access observability console on a given endpoint.

```yaml
apiVersion: dapr.io/v1alpha1
kind: Configuration
metadata:
  name: daprConfig
  namespace: default
spec:
  tracing:
    samplingRate: "1"
    zipkin:
      endpointAddress: "http://localhost:9411/api/v2/spans"
```

### Secret store configuration
We can set here the path to file where the secrets are stored. It has similiar configuration to a local store.

```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: secretstore
spec:
  type: secretstores.local.file
  version: v1
  metadata:
  - name: secretsFile
    value: ../secrets/secrets.json
  - name: nestedSeparator
    value: "."
```
## 6. Installation method<a name="installation"></a>
To set up and get everything up and running locally, you first need to start every microservice. To do it in dapr context, it is required to wrap service staring method in dapr command and pass application ports as well as ones that dapr should expose and path to component configuration. That will plug dapr socket into the service and let you communicate just between the dapr sockets, not worrying about what's underneath. Be mindful that you can request connection to dapr exposed ports only from other dapr clients, everything else is forbidden. Here are examples of dapr staring commands for languages that we used.
### Java
```
 dapr run --app-id server --app-protocol http --app-port 8001 --dapr-http-port 9001 --resources-path ../components -- java -jar ./build/libs/demo-0.0.1-SNAPSHOT.jar
```
### Python
```
dapr run --app-id receiverLog --app-protocol http --app-port 8002 --dapr-http-port 9002 --resources-path ../components -- python main.py
```
### JavaScript
```
dapr run --app-id app --app-port 3000 --dapr-http-port 3500 --resources-path ../components node server.js
```
### Go
```
dapr run --app-id encryption --app-protocol http --app-port 8003 --dapr-http-port 9003  --resources-path ../components -- go run encryptor.go
```
```
dapr run --app-id encryption --app-protocol http --app-port 8004 --dapr-http-port 9004  --resources-path ../components -- go run decryptor.go
```
That should make all services available after a while and able to communicate with one another. But to fully finish the setup, we also need an available state store, which we do using docker command. From the root of the project, we need to run
```
cd docker
```
```
docker-compose up -d
``` 
## 7. How to reproduce<a name="reproducing"></a>
When the services are up and running we can open our web page and using the user interface create a request from which data will propagate through the entire system. For it to be sent between Go components using encryption, we need a key pair to encode and decode data safely. For simplicity, we assume that appropriate keys, for encoding purposes, can be sent between components securely. We can generate keys using openssl.
```
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out keys/rsa-private-key.pem 
```
After filling a form on the web page and submitting it, the data will be sand through JavaScript server to main component which is Java server. There it will be saved in databases making it possible to ask the service about it from web whenever we want to, and propagated through PubSub to Python component and Go service where it will be encoded and send further (in our case the second Go component — decoder). We can observe events in our app using zipkin.
## 8. Demo deployment steps<a name="deployment"></a>

Setup minikube cluster:
```
https://docs.dapr.io/operations/hosting/kubernetes/cluster/
```

Init dapr in cluster

```
dapr init -k
```
Create zipkin pod for observability
```
kubectl create deployment zipkin --image openzipkin/zipkin
kubectl expose deployment zipkin --type ClusterIP --port 9411
```
Create two redis pods
```
cd k8s/redis
kubectl apply -f redis.yaml
kubectl apply -f secret-redis-configmap.yaml
kubectl apply -f secret-redis.yaml
```
Create kubernetes secret for secret-redis pod connectivity
```
cd ../secrets
kubectl apply -f secretstore.yaml
```
Configure dapr components
```
cd ../components
kubectl apply -f crypto.yaml
kubectl apply -f pubsub.yaml
kubectl apply -f secrets.yaml
kubectl apply -f statestore.yaml
kubectl apply -f subscription.yaml
kubectl apply -f zipkin.yaml
```
Create server deployment
```
cd ../server
kubectl apply -f server.yaml
```
Create app deployment
```
cd ../app
kubectl apply -f app.yaml
```
Create app load balancer to allow access from browser
```
kubectl apply -f app-service.yaml
```
Create receiver deployment
```
cd ../receiver
kubectl apply -f receiver.yaml
```
Create crypto deployments
```
cd ../crypto
```
Put your private key in key-configmap.yaml
```
kubectl apply -f k8s/key-configmap.yaml
kubectl apply -f k8s/encrytor.yaml
kubectl apply -f k8s/decryptor.yaml
```

Wait for pods to be created

If you are using minikube you might need to enable app LoadBalancer by running new terminal and executing command
```
minikube tunnel
```

Check external ip of a load balancer
```
kubectl get svc
```

Paste ip into your browser and check how it works

To enable zipkin in your browser run:
```
kubectl port-forward svc/zipkin 9411:9411
```


## 9. Summary – conclusions<a name="summary"></a>
We managed to create a system with non-trivial business logic and quickly integrate components with one another using dapr, despite the fact that every service was written in different language and was worked on by many people. In terms of system integration, dapr proved to be a big help. It also provides a possibility to quickly switch middleware underneath communication method using only configuration files.

On the other hand, due to dapr being a new technology, there are some places and functionalities that lack documentation and on top of that are implemented in non-standard way what leads to problems in using some components provided by dapr. The most noticeable case here is cryptography, which has literally no documentation, only case specific examples implemented in .NET and Go.

During implementation of web application with dapr client, we also encountered some bugs related to JavaScript modules not cooperating with one another and having errors in library implementation. The easiest to show example here is dapr client of service invocation implemented in react app, which leads to errors in gRPC-client implementation that is used by dapr.

To sum things up, there are parts of dapr that were implemented really well and prove to be useful in creating scalable and easily maintainable systems, but you need to be wary of parts that are still in alpha phase and lack documentation about them.
## 10. References<a name="references"></a>
#### [Dapr documentation](https://docs.dapr.io/)
- [Publish / Subscribe](https://docs.dapr.io/getting-started/quickstarts/pubsub-quickstart/)
- [Service Invocation](https://docs.dapr.io/getting-started/quickstarts/serviceinvocation-quickstart/)
- [State Management](https://docs.dapr.io/getting-started/quickstarts/statemanagement-quickstart/)
- [Secrets](https://docs.dapr.io/getting-started/quickstarts/secrets-quickstart/)
- [Cryptography](https://docs.dapr.io/getting-started/quickstarts/cryptography-quickstart/)

##### [Dapr quickstarts](https://github.com/dapr/quickstarts)
