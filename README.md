# 🛍️ E-Commerce Platform for Perfume Sales & Delivery Tracking

This project is a full-featured **e-commerce application** for selling original perfumes, with built-in **order delivery and shipment monitoring**.  
It covers the entire flow from product management and checkout to shipping, tracking, and returns.

## ✨ Features

- 🛒 Product catalog with shopping cart and checkout flow
- 📦 Order shipping and tracking
- 🔄 Product return support
- 🚚 Integration with **Nova Poshta API** for:
  - Creating shipments
  - Tracking delivery status
  - Handling returns
- 🧑‍💼 Customized admin panel for product and order management
- 📄 Interactive **Swagger API documentation**

## 🛠 Tech Stack

### Backend
- **Python**
- **Django**
- **Django REST Framework (DRF)**
- PostgreSQL (primary database)
- Redis (caching, background tasks)
- Swagger / OpenAPI
- Customized Django Admin

### Frontend
- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- End-to-end testing with **Playwright**

### Infrastructure & DevOps
- **Kubernetes (AKS – Azure Kubernetes Service)**
- Multiple Kubernetes deployments
- Ingress controllers
- **Helm charts** for application packaging
- **Harbor** (self-hosted registry for Docker images and Helm charts)
- **Tilt** for improved local developer experience
- **Kluctl** for multi-environment deployments

## 🚀 Deployment

The application is deployed to a **Kubernetes AKS cluster** on Azure, using a modular and scalable architecture with environment-specific configurations.

## 🎯 Goal

The goal of this project is to deliver a **scalable, production-ready e-commerce solution** with real-world logistics integration, modern frontend tooling, and cloud-native deployment practices.
