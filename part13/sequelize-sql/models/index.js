const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Session = require('./session')

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Readinglist, as: 'markedBlogs' });
Blog.belongsToMany(User, { through: Readinglist, as: 'usersMarked' });

User.hasMany(Session);
Session.belongsTo(User);


module.exports = {
  Blog, User, Readinglist, Session
}