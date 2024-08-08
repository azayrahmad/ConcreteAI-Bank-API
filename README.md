# ConcreteAI-Bank-API

Account and Payment Manager API for ConcreteAI assignment.

# Tech stack

- Node.js with Fastify
- MongoDB
- Swagger documentations

# How to run

Navigate to ConcreteAI-Bank-API folder and run Docker Compose command:

```bash
docker-compose up --build
```

Account Manager is accessible in [http://localhost:3000](http://localhost:3000), Payment Manager is supposed to be accessible at [http://localhost:3001](http://localhost:3001) but I found issue in port settings.

Currently in Docker data cannot be saved due to MongoDB needs replica set. To run each project direcly navigate to either account-manager or payment-manager folder and run the project with `npm`.

```bash
npm run dev
```

To access the Swagger API documentation, visit [http://localhost:3000/docs](http://localhost:3000/docs). Currently the projects are connected to my personal MongoDB Atlas account, however you can modify `.env` file to add your own MongoDB connection string.

# What needs improvement

- Supertokens needs to connect to User database and manage sessions.
- Unit tests need to work.
- Docker compose needs to configure MongoDB Replica Set.
- Auto debit needs to be implemented.

# Conclusion

This assignment is ultimately unfinished as my experience is mainly in Microsoft Tech Stack and I am still learning Supertokens and Docker which unfortunately not enough considering the time limit. I am eager to learn if accepted at ConcreteAI. Thank you for your understanding.
