import { images, RECEIVE_UTIL_IMAGES, utilAction } from "../actions/image_actions";

export default function reducer(
   state: [] | images[] = [],
   action: utilAction
){
   switch (action.type) {
      case RECEIVE_UTIL_IMAGES:
         return action.images;
      default:
         return state
   }
}