import * as APIUtil from "../util/image_util";
export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
import { Middleware, Action } from "redux";
import {ThunkAction} from 'redux-thunk'
import {RootState} from '../reducers/root_reducer'

export interface images {
   [id: number]: string
}
export interface action {
   type: "RECEIVE_IMAGES";
   images?: images;
}

export const receiveImages = (images:images): action => ({
   type: RECEIVE_IMAGES,
   images: images
})

export const uploadImages = (images: FormData) 
   :ThunkAction<void, RootState, unknown, Action<string>>  => (dispatch
      : Middleware | any ) =>
      APIUtil.uploadImages(images).then(
         (result: images) => dispatch(receiveImages(result))
  );