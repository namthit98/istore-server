const config = {
  port: Number(process.env.PORT) || 5000,
  env: process.env.ENV || 'development',
  secret: process.env.SECRET || 'namsieudeptrai',
  db: {},
}

export default config
