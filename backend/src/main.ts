import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { createContainer } from "./container.js";
import { seed } from "./seed.js";

async function bootstrap(): Promise<void> {
  const container = createContainer();
  if (env.SEED_DATA) {
    await seed(container);
    console.log("Seed data loaded");
  }

  createApp(container).listen(env.PORT, () => {
    console.log(`API listening on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
