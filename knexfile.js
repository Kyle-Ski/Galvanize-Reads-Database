module.exports = {

  development: {
      client: 'pg',
      connection: 'postgres://localhost/Galvanize_Reads'
  },

  production: {
      client: 'postgresql',
      connection: process.env.DATABASE_URL + '?ssl=true'
  }

};