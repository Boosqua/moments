import * as APIUtil from "../util/image_util";
import { Middleware, Action } from "redux";
import {ThunkAction} from 'redux-thunk'
import {RootState} from '../reducers/root_reducer'
export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
export const RECEIVE_UTIL_IMAGES = "RECEIVE_UTIL_IMAGES"
export interface images {
   [id: number]: string
}
export interface action {
   type: "RECEIVE_IMAGES";
   images?: images;
}
export interface utilAction {
   type: "RECEIVE_UTIL_IMAGES",
   images: images[]
}
export const receiveImages = (images:images): action => ({
   type: RECEIVE_IMAGES,
   images: images
})
export const receiveUtilImages = (images: utilAction["images"]): utilAction => ({
   type: RECEIVE_UTIL_IMAGES,
   images: images
})

export const fetchUtilImages = () 
:ThunkAction<void, RootState, unknown, Action<string>>  => (dispatch
      : Middleware | any ) => 
      APIUtil.fetchRecentImages()
      .then(
         (results: {data: images[]}) => dispatch(receiveUtilImages(results.data))
      )
export const uploadImages = (images: FormData) 
   :ThunkAction<void, RootState, unknown, Action<string>>  => (dispatch
      : Middleware | any ) =>
      APIUtil.uploadImages(images).then(
         (result: {data: images}) => dispatch(receiveImages(result.data))
  );