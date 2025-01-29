# VehiclesProject

## Technologies Used

This project is built using the following technologies:

- **Node.js**: Version `22.13.1`  
- **NestJS**: Version `11.0.2`  
- **Angular**: Version `16.2.16`  
- **PostgreSQL**: Version `17`  

## System Requirements
Before running the project, ensure your system meets the following requirements:

- **Node.js**: Download from the official website: [https://nodejs.org/](https://nodejs.org/)  
- **PostgreSQL**: Download from the official website: [https://www.postgresql.org/](https://www.postgresql.org/)

## About the Project

This is a modern application built with **NestJS**, **Angular**, and **PostgreSQL** to deliver secure and scalable solutions.  

## Setup Instructions

To get started, make sure to:

1. Install the required Node.js version.
2. Install PostgreSQL and set up the database as per the project requirements.
3. Clone the repository and follow the development setup guide (provided below).

## After performing the clone
Follow the steps below:
1. cd backend
2. npm i -g @nestjs/cli
3. npm install
4. npm run build
5. npx typeorm migration:generate -d dist/data-source.js srtc/migrations/newMigration

6. cd forntend
7. npm install -g @angular/cli
8. npm install

**after setup** 
- run backend - " npm run start:dev" 
- run frontend - npm start

## Additional Notes
Unfortunately, I encountered an error where the database could not be connected to via Docker, so the Docker setup is not available.
swagger ip - "localhost:3000/api"
