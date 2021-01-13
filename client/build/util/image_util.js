import axios from 'axios';
export var uploadImages = function (images) { return (axios.post("/api/images", images)); };
export var fetchRecentImages = function () { return (axios.get("/api/recentimages")); };
