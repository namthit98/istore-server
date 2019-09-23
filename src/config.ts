const config = {
  port: Number(process.env.PORT) || 5000,
  env: process.env.ENV || 'development',
  secret: process.env.SECRET || 'namsieudeptrai',
  db: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
    database: process.env.DATABASE_NAME || 'istore',
    options: {
      useNewUrlParser: true,
    },
  },
}

export default config
