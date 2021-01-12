import {RECEIVE_IMAGES, images, action} from "../actions/image_actions";

export default function (
   state: {} | images = {}, 
   action: action
   ){
      switch (action.type) {
         case RECEIVE_IMAGES:
            return {
               ...state, 
               ...action.images
            }
         default:
            return state
      }
}
