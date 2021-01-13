import * as APIUtil from "../util/album_util";
import { Middleware, Action } from "redux";
import {ThunkAction} from 'redux-thunk'
import {RootState} from '../reducers/root_reducer'
import { AxiosRequestConfig } from "axios";

export const RECEIVE_ALBUM = "RECEIVE_ALBUM"
export const RECEIVE_ALL_ALBUMS = "RECEIVE_ALL_ALBUMS"
export const REMOVE_ALBUM = "REMOVE_ALBUM"
//shared action type to create albums and store in util section of state for easy ref
export interface action {
   type: "RECEIVE_ALBUM";
   album: APIUtil.album;
}
//grab all public, shared, or owned folders
export interface indexAction {
   type: "RECEIVE_ALL_ALBUMS";
   albums: { [id: number]: APIUtil.album } // finally getting the hang of typescript
}
export const receiveAlbum = (album: APIUtil.album): action => ({
   type: RECEIVE_ALBUM,
   album: album
})
export const receiveAllAlbums = (albums: indexAction['albums']): indexAction => ({
   type: RECEIVE_ALL_ALBUMS,
   albums: albums
})
export const removeUtilAlbum = (): {type: "REMOVE_ALBUM"} => ({
   type: REMOVE_ALBUM
})
export const createAlbum = (album: APIUtil.album) 
   :ThunkAction<void, RootState, unknown, Action<string>>  => (dispatch
      : Middleware | any ) =>
      APIUtil.createAlbum(album).then(
         (result: {data: APIUtil.album}) => dispatch(receiveAlbum(result.data))
  );
export const fetchAllAlbums = (userId: AxiosRequestConfig) 
   :ThunkAction<void, RootState, unknown, Action<string>>  => (dispatch
      : Middleware | any ) =>
      APIUtil.fetchAllAlbums(userId).then(
         (result: {data: {[id: number]: APIUtil.album} }) => dispatch(receiveAllAlbums(result.data))
  );

export const uploadCover = (image: FileReader)
   :ThunkAction<void, RootState, unknown, Action<string>> => (dispatch
      : Middleware | any) =>
      APIUtil.uploadCover(image).then(
         (results: {data: APIUtil.album}) => dispatch(receiveAlbum(results.data))
      ) 