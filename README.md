# Bus Ticket Purchase API

## Objective

This project was developed to digitize and streamline the bus ticket purchasing process. Traditionally, bus terminals force passengers to buy tickets on-site, this system enables users to complete their purchases entirely online, offering features like route visualization, estimated departure and arrivale times, and automated PDF ticket generation.

## Technologies

The system is built using the following tools and technologies:

- ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white) Framework
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) Language
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) Containerization
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) Runtime
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) Database
- ![PostGIS](https://img.shields.io/badge/PostGIS-336791?style=flat-square&logo=postgis&logoColor=white) Geospatial Database Extension

## How to run locally

### Using Docker

#### Prerequisites

- Docker Desktop installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/hiygabo/bus-ticket-purchase-api-nestJS.git
```

2. Navigate to the project directory:

```bash
cd bus-ticket-purchase-api-nestJS
```

3. Build the Docker image:

```bash
docker compose up --build
```

4. Configure the environment variable in the `.env` file. You can use the provided `.env.example` as a template.
5. Go to clone the frontend repository: `https://github.com/hiygabo/bus-ticket-purchase-ui.git` and follow the instructions in the README.md file to run the frontend application.

### Using localhost

#### Prerequisites

- Node.js and npm installed on your machine.
- To install npm execute:

```bash
npm install -g npm
```

1. Clone the repository:

```bash
git clone https://github.com/hiygabo/bus-ticket-purchase-api-nestJS.git
```

2. Navigate to the project directory:

```bash
cd bus-ticket-purchase-api-nestJS
```

3. install dependencies and run the application:

```bash
npm install
npm run start:dev
```

### Architecture

The project follows a modular backend architecture built with NestJS, separating concerns into independent modules with dedicated controllers, services, and entities for each domain.

```text
src/
├── auth/                          # Authentication & Authorization
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   └── jwt.strategy.ts
├── bus/                           # Bus Management
│   ├── bus.controller.ts
│   ├── bus.service.ts
│   ├── bus.module.ts
│   ├── dto/
│   │   ├── create-bus.dto.ts
│   │   └── update-bus.dto.ts
│   └── entities/
│       └── bus.entity.ts
├── category/                      # Bus Categories
│   ├── category.controller.ts
│   ├── category.service.ts
│   ├── category.module.ts
│   ├── dto/
│   │   ├── create-category.dto.ts
│   │   └── update-category.dto.ts
│   └── entities/
│       └── category.entity.ts
├── passenger/                     # Passenger Management
│   ├── passenger.controller.ts
│   ├── passenger.service.ts
│   ├── passenger.module.ts
│   ├── dto/
│   │   ├── create-passenger.dto.ts
│   │   └── update-passenger.dto.ts
│   └── entities/
│       └── passenger.entity.ts
├── place/                         # Places/Destinations
│   ├── place.controller.ts
│   ├── place.service.ts
│   ├── place.module.ts
│   ├── dto/
│   │   ├── create-place.dto.ts
│   │   └── update-place.dto.ts
│   └── entities/
│       └── place.entity.ts
├── schedule/                      # Travel Schedules
│   ├── schedule.controller.ts
│   ├── schedule.service.ts
│   ├── schedule.module.ts
│   ├── dto/
│   └── entities/
├── seat/                          # Seat Management
│   ├── seat.controller.ts
│   ├── seat.service.ts
│   ├── seat.module.ts
│   ├── dto/
│   └── entities/
├── stop/                          # Bus Stops with Geospatial Data
│   ├── stop.controller.ts
│   ├── stop.service.ts
│   ├── stop.module.ts
│   ├── dto/
│   └── entities/
├── travel/                        # Travel Routes with Geospatial Data
│   ├── travel.controller.ts
│   ├── travel.service.ts
│   ├── travel.module.ts
│   ├── dto/
│   └── entities/
├── travel_detail/                 # Travel Details
│   ├── travel_detail.controller.ts
│   ├── travel_detail.service.ts
│   ├── travel_detail.module.ts
│   ├── dto/
│   └── entities/
├── users/                         # User Management
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   ├── dto/
│   └── entities/
├── app.controller.ts              # Root Controller
├── app.service.ts                 # Root Service
├── app.module.ts                  # Root Module
└── main.ts                        # Application Entry Point
```

#### Database

The application uses **PostgreSQL** as the primary database with **TypeORM** as the ORM, providing type-safe database operations with automatic entity synchronization.
