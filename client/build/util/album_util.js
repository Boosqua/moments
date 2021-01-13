import axios from 'axios';
export const createAlbum = (album) => (axios.post("/api/albums", album));
export const uploadCover = (image) => (axios.patch("/api/albums/cover", image));
export const fetchAllAlbums = (userId) => (axios.get("/api/albums", userId));
