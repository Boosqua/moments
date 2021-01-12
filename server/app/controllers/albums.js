const Album = require( "../models/Album")

module.exports = {
   createAlbum: (request, response) => {
      const { title, ownerId, public } = request.body;
      console.log(request.body)
      return Album.create( {title, public, ownerId }).then( album => {
         response.status(201).json(album)
      })
   },
   index: (request, response) => {
      const { userId } = request.body;
      return Album.all(userId).then( albums => {
         return response.status(200).json(albums)
      })
   },
   delete: ( request, response ) => {
      const id = parseInt(request.params.id);
      return Album.delete(id).then( album => {
         return response.status(200).json(album)
      })
   }
}