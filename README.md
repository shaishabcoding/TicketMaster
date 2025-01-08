# TicketMaster

TicketMaster is a backend application designed to manage ticketing systems efficiently. The project is modular, scalable, and built with TypeScript and Express.js, focusing on buses, tickets, users, and authentication workflows.

## Features
 
- **Bus Management:**  
  Create, update, and manage bus information.

- **Ticket Management:**  
  Book, update, and validate tickets seamlessly.

---

## Project Structure

```plaintext
src/
├── app.ts               # Application entry point
├── server.ts            # Server configuration
├── app/
│   ├── config/          # Application configuration
│   ├── db/              # Database connection setup
│   ├── errors/          # Custom error handling
│   ├── interfaces/      # TypeScript interfaces
│   ├── middlewares/     # Middlewares for validation, error handling, etc.
│   ├── modules/         # Feature-based modules (auth, bus, ticket, user)
│   │   ├── auth/        # Authentication workflows
│   │   ├── bus/         # Bus management
│   │   ├── ticket/      # Ticket management
│   │   └── user/        # User management
│   ├── routes/          # API route definitions
│   └── utils/           # Utility functions (e.g., QueryBuilder, email sender)
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shaishabcoding/TicketMaster.git
   cd TicketMaster
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the required configuration.

4. **Run the application:**
   ```bash
   pnpm dev
   ```

---

## Scripts

- **Start Development Server:**
  ```bash
  pnpm dev
  ```
- **Build for Production:**
  ```bash
  pnpm build
  ```
- **Run Production Build:**
  ```bash
  pnpm start
  ```

---

## Contributing

Contributions are welcome! Please follow the standard Git workflow:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.