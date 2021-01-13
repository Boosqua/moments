import React, {useState, useEffect}  from "react"
import {Typography, Paper, Button} from "@material-ui/core"
import {AlbumDisplay} from "../album_crud/album"
import Carousel from 'react-material-ui-carousel'
import GridListContainer from "../grid_list"
function Item(props)
{
    return (
        <Paper height="400">
           <br />
           <div style={{height: "450px"}} > 
            {AlbumDisplay(props)}
           </div>
            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}
function LandingPage(props) {
   let items = [];
   const [loaded, setLoaded] = useState(false)
   useEffect( () => {
      if(!loaded){
         props.fetchUtilImages() //grab last 50 uploaded images for image gallery 
         setLoaded(true)
      }
   })
   if( items.length === 0 && props.albums.length > 0 ) { //onetime grab of newly created albums for "trending carousel"
      for( let i = props.albums.length - 1; i >= props.albums.length - 10; i-- ){
         let album = { title: props.albums[i].title, imagePath: props.albums[i].cover_path }
         items.push(album)
      }
   }
   function createImagePreview(images){ //stole function from album crud --> this should be stored on GridListContainer at some point, no time atm
      let gridReady = images.map( (imagePath, index) => {
         let img = new Image();
         img.src = imagePath
         return { img: img, title: index, author: props.user.username }
      })
      return (
         <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}> 
            <br/>
            <GridListContainer tileData={gridReady}/>
         </div>
      )
   }
   return (
      <div style={{ textAlign: "center", marginTop: "10px"}}>
         <Typography variant="h3">
            Trending Albums
         </Typography>
         <br/>
         <Carousel>
               {
                  items.map( (item, i) => (
                     
                        <Item key={i} {...item  } size="400" /> 

                  ))
               }
         </Carousel>
         <Typography variant="h3">
            Most Liked 
         </Typography>
         { 
            loaded ? 
            createImagePreview(props.publicImages) :
            null
         }
      </div>
   )
}



export default LandingPage