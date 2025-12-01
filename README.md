# Notes App (tRPC)

Simple full-stack note app that uses **standalone tRPC** server in the backend, providing end-to-end type safety across the project.

## Built With

![Typescript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-CA4245.svg?style=for-the-badge&logo=React-Router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990.svg?style=for-the-badge&logo=React-Hook-Form&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-FF4154.svg?style=for-the-badge&logo=React-Query&logoColor=white)
![Node.JS](https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-2596BE.svg?style=for-the-badge&logo=tRPC&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1.svg?style=for-the-badge&logo=Zod&logoColor=white)
![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000.svg?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=Prisma&logoColor=white)
![PotgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white)

## Getting started

### Prerequisites

- Docker

### Installation

1. Clone the respository

   ```bash
   git clone https://github.com/RCOM363/notes-app-trpc
   cd notes-app-trpc
   ```

2. Environment variable setup
   Create a `.env` file in `/server` directory with following variables

   ```env
   PORT=5000
   CORS_ORIGIN="http://localhost:5173"
   POSTGRES_USER=<username>
   POSTGRES_PASSWORD=<password>
   POSTGRES_DB=<db_name>
   DATABASE_URL="postgresql://<username>:<password>@<host/service_name>:5432/<db_name>"
   TOKEN_SECRET=<your_token_secret>
   ```

3. Run containers

   ```bash
   docker-compose up --build
   ```

4. Sync DB

   ```bash
   docker exec -it <server_container> /bin/sh

   npx prisma migrate dev --name init

   npx prisma generate
   ```

## API Documentation

All procedures are grouped by module (`auth.*`, `note.*`). **publicProcedures** are accessible without authentication, while **protectedProcedure** requires authentication. Validation is enforced through **zod schemas**.

### Auth Procedures

1. `auth.createUser`

- Type: `publicProcedure`
- Method: `Mutation`
- Input:
  ```bash
  {
      "email": string,
      "password": string
  }
  ```
- Output:
  ```bash
  {
      "id": number,
      "email": string
  }
  ```

2. `auth.loginUser`

- Type: `publicProcedure`
- Method: `Mutation`
- Input:
  ```bash
  {
      "email": string,
      "password": string
  }
  ```
- Output:
  ```bash
  {
      "id": number,
      "email": string
  },
  "token": string
  ```

3. `auth.getUserById`

- Type: `protectedProcedure`
- Method: `Query`
- Input: None
- Output:
  ```bash
  {
      "id": number,
      "email": string
  }
  ```

### Note Procedures

1. `note.createNote`

- Type: `protectedProcedure`
- Method: `Mutation`
- Input:
  ```bash
  {
      "title": string,
      "content": string
  }
  ```
- Output:
  ```bash
  {
    "noteId": number,
    "title": string,
    "content": string,
    "userId": number,
    "createdAt": timestamp
  }
  ```

2. `note.updateNote`

- Type: `protectedProcedure`
- Method: `Mutation`
- Input:
  ```bash
  {
      "title": string,
      "content": string,
      "nodeId": number
  }
  ```
- Output:
  ```bash
  {
    "noteId": number,
    "title": string,
    "content": string,
    "userId": number,
    "createdAt": timestamp
  },
  ```

3. `note.deleteNote`

- Type: `protectedProcedure`
- Method: `Mutation`
- Input:
  ```bash
  {
      "nodeId": number
      "userId": number,
  }
  ```
- Output:
  ```bash
  {
    "success": true
  }
  ```

4. `note.getNoteById`

- Type: `protectedProcedure`
- Method: `Query`
- Input:
  ```bash
  {
      "nodeId": number
      "userId": string,
  }
  ```
- Output:
  ```bash
  {
    "noteId": number,
    "title": string,
    "content": string,
    "userId": number,
    "createdAt": timestamp
  },
  ```

4. `note.getUserNotes`

- Type: `protectedProcedure`
- Method: `Query`
- Input: None
- Output:
  ```bash
  [
    {
        "noteId": number,
        "title": string,
        "content": string,
        "userId": number,
        "createdAt": timestamp
    },
    ...
  ]
  ```
