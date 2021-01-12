const Image = require ("../models/Image")

module.exports = {
   upload: (req, res) => {
      Image.upload(1, req.files)
      res.status(200).json(req.files);
   }
}