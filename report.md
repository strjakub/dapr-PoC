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
![image](https://github.com/strjakub/dapr-PoC/assets/92330747/856c312f-dc9d-4b6d-ab85-da3ef31f3872)

## 5. Environment configuration description<a name="configuration"></a>
## 6. Installation method<a name="installation"></a>
## 7. How to reproduce<a name="reproducing"></a>
## 8. Demo deployment steps<a name="deployment"></a>
## 9. Summary – conclusions<a name="summary"></a>
## 10. References<a name="references"></a>
