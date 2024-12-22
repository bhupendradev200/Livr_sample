import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recently Viewed Products API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/v1/*.js"], // Path to API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
