const db = require("../../db");
const images = require("../controllers/images");

module.exports = {
   upload: async (albumId, images) => { //async db queries to ensure we return every image in an object sorted by image ids
      const imagesEntries = {}
      for( let i = 0; i < images.length; i++ ){
         let image = await db.query("INSERT INTO images (albumId, path) VALUES ($1, $2) RETURNING ID, path", [
            albumId,
            images[i].location,
         ])
         imagesEntries[image.rows[0].id] = (image.rows[0].path)
      }
   },
   getRecent: () => { // trending image getter
      return db
        .query(
          "SELECT images.path, images.id FROM images LEFT JOIN albums ON albums.id = images.albumId WHERE albums.public = true ORDER BY images.id DESC LIMIT 50"
        )
        .then((results) => {
          return results.rows;
        });
   }
}