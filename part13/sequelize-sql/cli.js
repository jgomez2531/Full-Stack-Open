require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const main = async () => {
  let blogs = [];
  try {
    console.log('Establishing connection.')
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  blogs.forEach(b => {
    console.log(`${b.author}: '${b.title}', ${b.likes} likes`);
  });
}

main()