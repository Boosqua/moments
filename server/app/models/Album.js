const db = require("../../db");
const Errors = require("./Errors");

module.exports = {
   create: ( album, ownerId ) => {
      const { title, public } = album;
      return db.query(
        "INSERT INTO albums (title, ownerId, public, created_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, ownerId, public, new Date()]
      ).then( results => {
         return results.rows[0]
      })
   },
   all: (userId) => {
      return db
        .query(
          "SELECT albums.id, albums.title, albums.ownerId, albums.public, albums.created_date FROM albums LEFT JOIN album_access ON albums.id = album_access.albumId WHERE (album_access.albumId = albums.id AND album_access.userId = $1) OR public = true OR ownerId = $1 ORDER BY albums.id",
          [userId]
        )
        .then((results) => {
          return results.rows;
        });
   },
   delete: (albumId) => {
      db.query( "DELETE FROM album_access WHERE albumId = $1", [ albumId ])
      return db.query(
         'DELETE FROM albums WHERE ID = $1 RETURNING *', [albumId]
      ).then( results => {
         return results.rows[0]
      })
   }
}