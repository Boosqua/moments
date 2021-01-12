import {RECEIVE_ALBUM, action} from "../actions/album_actions";
import { album } from "../util/album_util";
export default function (
   state: {} | {[id: number]: album} = {}, 
   action: action
   ){
      switch (action.type) {
         case RECEIVE_ALBUM:
            let id = action.album.id
            let newAlbum:{[id: number]: album}  = {[id]: action.album};
            return Object.assign({}, state, newAlbum)
         default:
            return state
      }
}