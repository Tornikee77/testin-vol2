import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import { url } from 'inspector'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'law backend',
      version: '1.0.0',
      description: 'API documentation for the law backend',
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}

const swaggerDocs = swaggerJSDoc(options)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  console.log(`Docs available at http://localhost:3000/api-docs `)
}
