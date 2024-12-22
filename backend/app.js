import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";
import userRoutes from "./routes/v1/userRoutes.js";
import { connectRedis, redisClient } from './config/redis.js';

const app = express();
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


connectRedis().then(() => {
  console.log('Connected to Redis');
}).catch((err) => {
  console.error('Redis connection failed:', err);
  process.exit(1); // Stop server if Redis connection fails
});

// Routes
app.use("/api/v1/users", userRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.log(`Error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Set the port
const PORT = process.env.PORT || 3000; // Default to port 3000 if no environment variable is provided

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
