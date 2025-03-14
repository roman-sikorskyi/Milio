# Milio Project

## Overview

The Milio project is a comprehensive application that includes various features such as mapping, user authentication, and data management. The project is built using a combination of React Native for the mobile application and ASP.NET Core for the backend services.

## Project Structure

The workspace is organized into several directories, each serving a specific purpose:

### Backend: ASP.NET Core

- `aspnet-core-backend/`: Contains the ASP.NET Core backend services.
  - `.vs/`: Visual Studio configuration files.
  - `.vscode/`: Visual Studio Code configuration files.
  - `Milio/`: Contains the source code for the backend services.
    - `Controllers/`: Contains the API controllers.
    - `Data/`: Contains the database context and migrations.
    - `Migrations/`: Contains the Entity Framework migrations.
    - `Properties/`: Contains project properties.
    - `Services/`: Contains the service layer.
    - `Utils/`: Contains utility classes.
    - `wwwroot/`: Contains static files.
    - `Program.cs`: The main entry point for the ASP.NET Core application.
    - `Milio.sln`: The solution file for the ASP.NET Core project.
    - `Dockerfile`: Dockerfile for building the backend service image.
  - `docker-compose.yml`: Docker Compose file for setting up the entire application stack.

### Frontend: React Native

- `react-native-app/`: Contains the React Native mobile application.
  - `.expo/`: Expo configuration files.
  - `assets/`: Contains image assets used in the application.
  - `components/`: Contains reusable React components.
  - `screens/`: Contains the screen components for the application.
    - `MapScreen.js`: Displays a map with various markers representing different proposals.
  - `utils/`: Contains utility functions.
  - `App.js`: The main entry point for the React Native application.
  - `app.json`: Configuration file for the React Native application.
  - `babel.config.js`: Babel configuration file.
  - `package.json`: Contains the dependencies and scripts for the React Native application.
  - `styles.js`: Contains the styles used in the application.
  - `Dockerfile`: Dockerfile for building the mobile application image.

## Getting Started

### Prerequisites

To run this project, ensure you have the following installed:

- **Node.js** and **npm** (for React Native development)
- **.NET SDK** (for backend development)
- **React Native CLI** (to build and run the mobile app)
- **Android Studio** or **Xcode** (for mobile development)
- **Docker** and **Docker Compose** (to containerize and run the entire stack)

### Installation Steps

#### 1. Clone the repository
```bash
git clone <repository-url>
cd milio-project
```

#### 2. Set up the backend
1. Navigate to the backend directory:
   ```bash
   cd aspnet-core-backend/Milio
   ```
2. Build and run the backend using Docker:
   ```bash
   docker-compose up --build
   ```
3. The backend will be available at `http://localhost:8080` by default.

#### 3. Set up the mobile application
1. Navigate to the React Native application directory:
   ```bash
   cd react-native-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application using Expo:
   ```bash
   npx expo start
   ```
4. Use the Expo app on your mobile device to scan the QR code displayed in the terminal or browser.

## Features

### Backend
- User authentication using JWT.
- Role-based access control.
- RESTful APIs for managing data.
- PostgreSQL database integration.
- Dockerized deployment for seamless scalability.

### Frontend
- Interactive map with marker functionality.
- User-friendly interface for managing proposals.
- Authentication and secure API communication.
- Cross-platform support (iOS and Android).

## Deployment

### Backend Deployment
To deploy the backend to a production server:
1. Build the Docker image:
   ```bash
   docker build -t milio-backend .
   ```
2. Push the image to a container registry (e.g., Docker Hub, AWS ECR).
3. Deploy the container to your production environment.

### Frontend Deployment
To deploy the mobile app:
1. Build the app for release using Expo:
   ```bash
   npx expo build:android
   npx expo build:ios
   ```
2. Distribute the app via app stores or directly to testers.

## Contributing

We welcome contributions to the Milio project! To contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push the branch:
   ```bash
   git push origin feature-name
   ```
4. Create a pull request describing your changes.


