import * as APIUtil from "../util/album_util";
import { Middleware, Action } from "redux";
import {ThunkAction} from 'redux-thunk'
import {RootState} from '../reducers/root_reducer'

export const RECEIVE_ALBUM = "RECEIVE_ALBUM"
export interface action {
   type: "RECEIVE_ALBUM";
   album: APIUtil.album;
}
export const receiveAlbum = (album: APIUtil.album): action => ({
   type: RECEIVE_ALBUM,
   album: album
})

export const uploadImages = (album: APIUtil.album) 
   :ThunkAction<void, RootState, unknown, Action<string>>  => (dispatch
      : Middleware | any ) =>
      APIUtil.createAlbum(album).then(
         (result: APIUtil.album) => dispatch(receiveAlbum(result))
  );