import {RECEIVE_ALBUM, RECEIVE_ALL_ALBUMS, action, indexAction} from "../actions/album_actions";
import { album } from "../util/album_util";
export default function reducer(
   state: {} | {[id: number]: album} = {}, 
   action: action | indexAction
   ){
      switch (action.type) {
         case RECEIVE_ALL_ALBUMS:
            return action.albums
         case RECEIVE_ALBUM:
            let id = action.album.id
            let newAlbum:{[id: number]: album}  = {[id]: action.album};
            return Object.assign({}, state, newAlbum)
         default:
            return state
      }
}