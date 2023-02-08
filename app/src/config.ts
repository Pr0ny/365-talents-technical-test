export const MYSQL_CONF = {
  mySql365Talent: {
    DB_HOST: process.env.MY_SQL_DB_HOST,
    DB_USER: process.env.MY_SQL_DB_USER,
    DB_PASSWORD: process.env.MY_SQL_DB_PASSWORD,
    DB_PORT: process.env.MY_SQL_DB_PORT,
    DB_DATABASE: process.env.MY_SQL_DB_DATABASE,
    DB_CONNECTION_LIMIT: process.env.MY_SQL_DB_CONNECTION_LIMIT ? parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT) : 4,
  }
};

export const SERVER_CONF = {
  hapiServer: {
    HAPI_HOST: process.env.HOST,
    HAPI_PORT: process.env.PORT,
    HAPI_TIMEOUT: process.env.TIMEOUT
  }
}

export const JWT_CONF = {
  jwtApi: {
    JWT_KEY_SECRET: process.env.JWT_KEY_SECRET
  }
}

export const TALENT_CONF = {
  TALENT_API_URL: process.env.TALENT_API_URL,
  TALENT_API_PARTNER: process.env.TALENT_API_PARTNER,
  TALENT_API_PASSWORD: process.env.TALENT_API_PASSWORD
}
