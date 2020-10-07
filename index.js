const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors')
const config = require('./config.json');

const app = express();
app.use(cors())

const schema = buildSchema(`
  type Movie {
    id: Int
    movie_name: String
    rating: String
    review: String
    release_year: String
    average_rating:String
  }
  type Query {
    getMovies: [Movie],
    getMoviesInfo(id: Int) : Movie,
    searchMovieReview(review: String) : Movie
  }
  type Mutation {
    updateMoviesInfo(id: Int, movie_name: String, release_year: String) : Boolean
    createMoviesInfo(movie_name: String, release_year: String) : Boolean
    deleteMoviesInfo(id: Int) : Boolean
    addMovieReview(movie_id: Int, rating: String, review: String) : Boolean
  }
`);

const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err)
        return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

const root = {
  getMovies: (args, req) => queryDB(req, "SELECT * from getmovies", args).then(data => data),
  getMoviesInfo: (args, req) => queryDB(req, "SELECT id, movie_name, release_year, ROUND((SELECT AVG(rating) FROM getmovies_reviews WHERE movie_id = " + [args.id] + "),1) AS 'average_rating' FROM getmovies WHERE id = ?", [args.id]).then(data => data[0]),
  // updateMoviesInfo: (args, req) => queryDB(req, "update movies SET ? where id = ?", [args, args.id]).then(data => data),
  createMoviesInfo: (args, req) => queryDB(req, "insert into getmovies SET ?", args).then(data => data),
  deleteMoviesInfo: (args, req) => queryDB(req, "DELETE getmovies, getmovies_reviews FROM getmovies INNER JOIN getmovies_reviews ON getmovies.id = getmovies_reviews.movie_id WHERE getmovies.id = ?", [args.id]).then(data => data),
  addMovieReview: (args, req) => queryDB(req, "insert into getmovies_reviews SET ?", args).then(data => data),
  searchMovieReview: (args, req) => queryDB(req, "SELECT rating, review from getmovies_reviews where review LIKE '"+[args.review]+"%'", args).then(data => data[0])
};

app.use((req, res, next) => {
  req.mysqlDb = mysql.createConnection({
    host     : config.db_config.host,
    user     : config.db_config.user,
    password : config.db_config.password,
    database : config.db_config.database
  });
  req.mysqlDb.connect();
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(config.port);

console.log('Running a GraphQL API server at localhost:4000/graphql');
