import axios from 'axios'
export interface album {
   id: number;
   ownerid: number;
   title: string;
   public: boolean;
}
export const createAlbum = (album: album): Promise<any> => (
   axios.post("/api/albums", album)
)