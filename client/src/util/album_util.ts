import axios, { AxiosRequestConfig } from 'axios'
export interface album {
   id: number;
   ownerid: number;
   title: string;
   public: boolean;
}
export const createAlbum = (album: album): Promise<any> => (
   axios.post("/api/albums", album)
)
export const uploadCover = (image: FileReader): Promise<any> => (
   axios.patch("/api/albums/cover", image)
)

export const fetchAllAlbums = (userId: AxiosRequestConfig): Promise<any> => (
   axios.get("/api/albums", userId)
)