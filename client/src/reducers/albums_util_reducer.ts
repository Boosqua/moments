import {REMOVE_ALBUM, RECEIVE_ALBUM, action} from '../actions/album_actions'
import { album } from '../util/album_util'

export default function reducer(
   state: {} | album = {}, 
   action: {type: "REMOVE_ALBUM"} | action
   ){
      switch (action.type) {
         case RECEIVE_ALBUM:
            return action.album
         case REMOVE_ALBUM:
            return {}
         default:
            return state
      }
}

