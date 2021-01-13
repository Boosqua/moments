import axios from 'axios';
export const uploadImages = (images) => (axios.post("/api/images", images));
export const fetchRecentImages = () => (axios.get("/api/recentimages"));
