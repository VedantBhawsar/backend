# Ninjanex Backend

This repository contains the backend code for a Ninjanex, implementing a GraphQL API. The backend is built using Express.js, and Prisma ORM, and it is written in TypeScript for enhanced type safety and development experience.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VedantBhawsar/ninjanex-backend.git

## Dependencies

2. Install dependencies:

   ```bash
   cd ninjanex-backend
   npm install

## Development Server

3. Run the development server:

   ```bash
   npm run dev


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Submit a pull request.


## Deployment
Docker
1. Build the Docker image:
   ```bash
   docker build -t ninjanex-backend .

2. Run the Docker container:
   ```bash
   docker run -d -p 3000:3000 ninjanex-backend

## Docker Compose
1. Run the application with Docker Compose:
   ```bash
   docker-compose up -d

## Ngnix
The repository includes an nginx.conf file for Nginx setup. Update the configuration as needed and follow Nginx documentation for deployment.

## Project Structure
    ```bash
    ninjanex-backend/
    ├── dist/                   # Compiled files for production
    ├── prisma/                 # Prisma schema and migrations
    ├── public/                 # Static files
    ├── src/                    # Source code
    │   ├── controllers/        # Route controllers
    │   ├── middlewares/        # Custom middlewares
    │   ├── models/             # Database models
    │   ├── routes/             # API routes
    │   └── index.js            # Entry point
    ├── .dockerignore           # Docker ignore file
    ├── .gitignore              # Git ignore file
    ├── Dockerfile              # Dockerfile for containerizing the app
    ├── README.md               # Project documentation
    ├── automate.js             # Automation scripts
    ├── docker-compose.yml      # Docker Compose configuration
    ├── firebase.json           # Firebase configuration (if any)
    ├── nginx.conf              # Nginx configuration file
    ├── package.json            # NPM package file
    ├── tsconfig.json           # TypeScript configuration (if applicable)
    └── .env.example            # Example environment variables

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include relevant tests.


This README file provides an overview of your project, including instructions on how to get started, use, and deploy the application. It also includes a project structure outline and contribution guidelines.


