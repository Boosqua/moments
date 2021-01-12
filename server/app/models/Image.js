const db = require("../../db");

module.exports = {
   upload: async (albumId, images) => {
      const imagesEntries = {}
      for( let i = 0; i < images.length; i++ ){
         let image = await db.query("INSERT INTO images (albumId, path) VALUES ($1, $2) RETURNING ID, path", [
            albumId,
            images[i].location,
         ])
         imagesEntries[image.rows[0].id] = (image.rows[0].path)
      }
      console.log(imagesEntries)
   }
}