export default {
  useUnifiedTopology: true,
  type: process.env.TYPEORM_DATABASE_TYPE,
  url: process.env.TYPEORM_URL,
  synchronize: true,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
  },
};
