import axios from 'axios'

export const uploadImages = (images: FormData): Promise<any> => (
   axios.post("/api/images", images)
)