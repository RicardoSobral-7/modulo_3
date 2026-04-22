import fastify from "fastify";

import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(appRoutes);

// tratativa de erros globais

app.setErrorHandler((error, _, reply) => {
  // todo tipo de erro do zod agora aparece no insomnia
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Aqui podemos enviar o erro para um serviço de monitoramento
    // como o sentry
    // datadog
  }

  return reply.status(500).send({
    message: "Internal server error.",
  });
});
