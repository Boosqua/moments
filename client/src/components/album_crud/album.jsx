import React, {useState} from "react";
import {withRouter } from "react-router-dom"
import NavBar from '../nav/navbar_container'
import {Typography, Link, TextField, Checkbox, Button} from "@material-ui/core"
function Album(props) {
   const [albums, setAlbums] = useState(Object.values(props.albums))
   let creating = !!props.creating.id ? "images" : null 
   const [crudAction, setCrud] = useState(creating)
   const [album, setAlbum] = useState({ title: '', private: false })
   function crud(){
      switch (crudAction) {
         case "images":
         case "newAlbum":
            return CreateAlbum(props, album, setAlbum, setCrud)
         default:
            return Render(props, albums, setCrud)
      }
   }
   return(
      <div >
         <NavBar />
         <div style={{ textAlign: "center", marginTop: "20px"}}>
            {crud()}
         </div>
      </div>
   )
}

function Render(props, albums, cb) {
   return(
               <Typography variant="h3">
            {
               albums.length === 0 ? 
               ("You haven't created any albums yet!"
               ) :
               "Your albums"
            }
            <br/>
            <div style={{fontSize: "20px"}}>
               <Link href="#" onClick={(e) => {
                  e.preventDefault()
                  cb('newAlbum')
                  }}> Create New Album</Link>
            </div>
         </Typography>
   )
}

function CreateAlbum(props, album, cb, crudCb){

   return (
      <div style={{margin: '20px'}}>
         <Typography style={{margin: '20px'}}>
            {"Album Title"}
            <br/>
            <TextField value={album.title} onInput={(e) => {
               cb({title: e.target.value, private: album.private})
            }}/>
         </Typography>
         <Typography style={{margin: '20px'}}>
            Make Album Private?
            <Checkbox
               value="checkedA"
               inputProps={{ 'aria-label': 'Checkbox A' }}
               onClick={() => {
                  cb({title: album.title, private: !album.private})
               }}
               />
         </Typography>
         <Button size="large" onClick={(e) => {
            e.preventDefault()
            if( album.title === "" ){
               return null
            }

            const newAlbum = { title: album.title, private: album.private, ownerId: props.user.id}
            console.log(album, newAlbum)
            props.createAlbum(newAlbum)
         }} >Create</Button>
      </div>
   )
}
export default withRouter(Album)