import axios from 'axios';
export var createAlbum = function (album) { return (axios.post("/api/albums", album)); };
export var uploadCover = function (image) { return (axios.patch("/api/albums/cover", image)); };
export var fetchAllAlbums = function (userId) { return (axios.get("/api/albums", userId)); };
