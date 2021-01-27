const Image = require ("../models/Image")
const { addCover } = require("../models/Album");
module.exports = {
   upload: (req, res) => {
      Image.upload(req.body.albumId, req.files)
      res.status(200).json(req.files);
   },
   uploadCover: (req, res) => {
      console.log(req.files)
      return addCover(req.body.albumId, req.files[0].location)
         .then( (album) => {
            return res.status(201).json(album)
         }).catch( err => {console.log(err)})
   },
   getRecentImages: (req, res) => { 
      return Image.getRecent()
         .then( images => {
            return res.status(200).json(images)
         })
   }
}