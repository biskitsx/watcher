# Watcher 🍿

## Overview
Watcher is a web application designed to enhance the experience of tracking, discovering, and engaging with various types of entertainment media, including movies, series, and anime. The application provides users with a seamless experience across all devices, making it easier to plan their media consumption while receiving personalized recommendations.

## Project Background and Importance
With the growing popularity of entertainment media, users often face challenges in organizing and keeping track of their viewing activities. Some common issues include:
- Difficulty in tracking release dates and planning media consumption.
- Lack of a comprehensive platform to display all types of entertainment media.
- Inconvenience in finding relevant media recommendations.
- The need for a centralized place to read and share reviews across different platforms.

Watcher aims to solve these issues by providing a centralized hub where users can manage their entertainment experience efficiently.

## Project Goals
Watcher is designed to:
- Enhance user experience by providing a smooth and accessible interface.
- Allow users to easily plan and manage their entertainment activities.
- Deliver accurate and personalized media recommendations.
- Foster a community for entertainment enthusiasts to share and discuss their interests.

## Project Scope
Watcher is a web-based application that provides users with tools to efficiently manage and discover entertainment content. The key features include:
- **Media Information Display**: Showcases media details such as titles, images, synopses, and cast information.
- **Cross-Platform Rating Comparison**: Aggregates ratings from different platforms for easy comparison.
- **Personalized Recommendations**: Suggests media based on user preferences.
- **Entertainment Release Calendar**: Displays upcoming media releases for better planning.
- **User Ratings and Reviews**: Enables users to rate and review media to facilitate discussion.
- **Watch History Tracking**: Allows users to record their viewing history for better tracking.

## GitOps
![alt text](https://img5.pic.in.th/file/secure-sv1/Screenshot-2568-02-27-at-14.26.43.png)
Watcher follows a GitOps approach for infrastructure management using the [**watcher-infra**](https://github.com/biskitsx/watcher-infra) repository. This repository is responsible for automating deployments, managing infrastructure as code, and ensuring consistency across environments. By leveraging **GitOps**nciples, Watcher benefits from:
- **Automated Deployments**: Continuous integration and deployment pipelines ensure smooth updates.
- **Version Control for Infrastructure**: All changes are tracked and auditable.
- **Scalability and Reliability**: Infrastructure is managed declaratively, making scaling and maintenance easier.

The **watcher-infra** repository integrates with CI/CD tools to automatically deploy changes whenever updates are pushed, ensuring a stable and efficient development workflow.

## Infrastructure
![alt text](https://img5.pic.in.th/file/secure-sv1/Blank-Diagram-2.png)
The Watcher application is hosted on **Google Cloud Platform (GCP)** using a robust and scalable architecture:
- **Virtual Private Cloud (VPC)**: Ensures a secure and isolated environment.
- **Google Kubernetes Engine (GKE) Cluster**: Hosts the application and manages containerized workloads.
- **Compute Engine**: Used for additional backend services within a private subnet.
- **Load Balancing & Nginx Ingress**: Handles incoming traffic efficiently.
- **Cloud Firewall Rules**: Secures the application by controlling network traffic.
- **Cloud NAT**: Allows secure outbound connections to third-party APIs and container registries.

This architecture ensures high availability, security, and scalability for the Watcher application.