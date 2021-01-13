import React, {useState } from "react";
import {withRouter } from "react-router-dom"
import NavBar from '../nav/navbar_container'
import {Typography, Link, TextField, Checkbox, Button, makeStyles, GridList, GridListTile} from "@material-ui/core"
import GridListContainer from "../grid_list"

const useStyles = makeStyles((theme)=>({
   button: {
      padding: 10,
      margin: 0,
      width: '200px',
      fontSize: "20px"
      
   },
   grid: {
      height: 50
   },
   modal: {
      display: "flex",
      flexDirection: "row-reverse",

   },
   root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
   },
   gridList: {
      width: 1500,
      height: "auto",
      backgroundSize: "contain"
   },
}))
//value of state object crudAction navigates helper method
function Album(props) {
   const style = useStyles()
   let creating;
   //props.creating( terrible name ) access newly created album in state.utils
   //if creating exists and has a cover photo, app renders component for uploading images
   creating = !!props.creating.cover_path ? "images" : null 
   //if no cover photo but creating exists we skip to uploading cover
   if( !props.creating.cover_path && !!props.creating.id) {
      creating = "uploadCover"
   }
   const [crudAction, setCrud] = useState(creating);
   const [album, setAlbum] = useState({ title: '', private: false });
   const [cover, setCover] = useState(props.creating.cover_path);
   const [images, setImages] = useState([])
   const [files, setFiles] = useState([])
   function crud(){
      switch (crudAction) {
         case "uploadCover":
            return UploadCover(props, cover,setCover, setCrud, style)
         case "newAlbum": //only set when creating
            return CreateAlbum(props, album, setAlbum, setCrud)
         case "images":
            return UploadImages(props, images, setImages, setCrud, files, setFiles)
         default:

            return Render(props, setCrud, style)
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
// render that informs user if they have no albums
function Render(props, cb, style) {
   return(
               <Typography variant="h3">
            {
               props.albums.length === 0 ? 
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
            {
               props.albums.length > 0 ? 
                  AlbumGrid(props, style) :
                  null
            }
         </Typography>
   )
}

function AlbumGrid(props, style){
   return (
      <div className={style.root}>
         <GridList cellHeight="320" className={style.gridList} cols={12}>
            {
               props.albums.map( (album, index) =>(
                  <GridListTile key={index} cols={3}>
                     {AlbumDisplay({title: album.title, imagePath: album.cover_path})}
                  </GridListTile>
               ))   
            }
         </GridList>
      </div>
   )
}
// split album creation into three action
//Create album --> set title and privacy option
//Upload album cover --> preview and send to aws for storage
//upload as many images as desired( limit 200)
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
         <Button 
            size="large" 

            onClick={(e) => {
            e.preventDefault()
            if( album.title === "" ){
               return null
            }

            const newAlbum = { title: album.title, public: !album.private, ownerId: props.user.id}
            props.createAlbum(newAlbum)
               .then(() => {
                  crudCb('uploadCover')
               })
         }} >Create</Button>
      </div>
   )
}

function UploadCover(props, cover, cb, crudCb, style) {
   return (<div style={{margin: '20px'}}>
         <Typography style={{margin: '20px'}}>
            {`Upload cover for ${props.creating.title}`}
            <br/>
         </Typography>
            <input
            type="file"
            value=""
            multiple
            //save file upload and create url path to inject album cover preview
            onChange={ (e) => {
               const reader = new FileReader();
               const file = e.currentTarget.files[0];
               reader.onloadend = () => (
                  cb({ image: {imageUrl: reader.result, imageFile: file}, file: file})
                  )
                  if (file) {
                     reader.readAsDataURL(file);
                  }
               }}
               />
         <br/>
         {
            cover ?
            (  
               <div> 
                  <br />
               {AlbumDisplay({imagePath: cover.image.imageUrl, title: props.creating.title})}
               <br/>
               
               <Button 
               //user can commit cover or create new one
               className={style.button}
               size="large" 
               onClick={(e) => {
                  e.preventDefault()
                  const fileReader = new FormData()
                  fileReader.append("albumId", props.creating.id)
                  fileReader.append("albums[photos][]", cover.file)
                  props.uploadCover(fileReader).then( () => {
                  crudCb('images')
                  cb("")
                  })
               }}>Upload</Button>
               </div>
            ) : 
            null
         }
      </div>)
}

function UploadImages(props, images, cb, crudCb, files, setFiles){
   function grabImages(file) {
      let newFiles = files
      newFiles.push(file)
      //send back info in new array or React won't realize we had a state change
      setFiles([...newFiles])
      const reader = new FileReader();
      reader.onloadend = () => {
         let newImages = images
         newImages.push(reader.result)
         cb([...newImages])
      }
      reader.readAsDataURL(file)
   }

   function createImagePreview(){ 
      //parse information into suitable props for out GridList container
      let gridReady = images.map( (imagePath, index) => {
         let img = new Image();
         img.src = imagePath
         return { img: img, title: index, author: props.user.username }
      })
      return (
         <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <br/>
{/* this button section only renders when our album has images ready to upload, no sense in having an empty album */}
            <Button onClick={(e) => {
               e.preventDefault();
               const fileReader = new FormData();
               fileReader.append("albumId", props.creating.id);
               for( let i = 0; i < files.length; i++ ){
                  fileReader.append("albums[photos][]", files[i])
               }
               props.upload(fileReader).then(() => {
                  cb([]);
                  setFiles([]);
                  crudCb("");
                  props.clearAlbum()
               })
            }}
            size="large" 
            >Upload</Button>
            <br/>
            <GridListContainer tileData={gridReady}/>
         </div>
      )
   }

   return(  
      <div style={{margin: '20px'}}>
         <Typography style={{margin: '20px'}}>
            {`Add images`}
         <br/>
         </Typography>
            {AlbumDisplay({imagePath: props.creating.cover_path, title: props.creating.title})}
            <input //break up multiple image uploads at once and send to helper function
               type="file"
               onChange={ (e) => {
                  const files = e.currentTarget.files;
                  for( let i = 0; i < files.length; i++ ){
                     let file = files[i];
                     grabImages(file) 
                  }
                  //change id to create new input object, without this I kept receiving the old file uploads
                  //now people can upload as many as they want at a time
                  e.currentTarget.id = e.currentTarget.id === "" ?
                     1 :
                     e.currentTarget.id++
               }}
               multiple
               />
            {
               images.length > 0 ?
               createImagePreview() : 
               null
            }
      </div>
   )

   
}
// reusable component that can display albums with or without titles and adjust block sizing via props
export function AlbumDisplay(props, onClickCb = (e) => { e.preventDefault() }) {
   return(
      <div>
         <img 
         src={props.imagePath} 
         onLoad={(e) => { //adjust image sizing for consistent square spacing
            let width = e.currentTarget.width
            let height = e.currentTarget.height
            let heightAdjust = width < height ? 1 : height / width
            let widthAdjust = width < height ? width / height : 1
            let sizeAdjust = props.size ? props.size : 260
            e.currentTarget.width = sizeAdjust * widthAdjust
            e.currentTarget.height = sizeAdjust * heightAdjust
         }}
         onClick={onClickCb}/>
         <Typography variant="h6">
            {
            props.title ?
            props.title : 
            null
            }
         </Typography>
      </div>
   )
}

export default withRouter(Album)