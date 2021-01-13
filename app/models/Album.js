const db = require("../../db");
const Errors = require("./Errors");

module.exports = {
   create: ( album ) => {
      const { title, public, ownerId } = album;
      return db.query(
        "INSERT INTO albums (title, ownerId, public, created_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, ownerId, public, new Date()]
      ).then( results => {
         return results.rows[0]
      })
   },
   addCover: ( albumId, path ) => {
      return db.query(
         "UPDATE albums SET cover_path = $1 WHERE id = $2 RETURNING *",
         [path, albumId]
      ).then(res => {
         return res.rows[0]
      })
   },
   all: (userId) => {
      //sql query grabbing all albums, their corresponding matches on an unused access table( which grants access to private albums ), ignoring entries without coverPhotos
      // need to find way to prevent or clean up incomplete album entries
      return db
        .query(
          "SELECT albums.id, albums.title, albums.ownerId, albums.public, albums.created_date, albums.cover_path FROM albums LEFT JOIN album_access ON albums.id = album_access.albumId WHERE albums.cover_path IS NOT NULL AND ( (album_access.albumId = albums.id AND album_access.userId = $1) OR public = true OR ownerId = $1) ORDER BY albums.id",
          [userId]
        )
         .then((results) => {
            const albums = {} 
            results.rows.forEach( album => {
               albums[album.id] = album;
            })
            return albums
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