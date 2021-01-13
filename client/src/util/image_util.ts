import axios from 'axios'

export const uploadImages = (images: FormData): Promise<any> => (
   axios.post("/api/images", images)
)

export const fetchRecentImages = (): Promise<any> => (
   axios.get("/api/recentimages")
)