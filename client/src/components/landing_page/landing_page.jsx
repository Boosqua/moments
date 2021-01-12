import React, {useState}  from "react"
import {Typography, Paper, Button} from "@material-ui/core"
import Carousel from 'react-material-ui-carousel'
import axios from 'axios'
function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}
function LandingPage() {
   var items = [
      {
         name: "Random Name #1",
         description: "Probably the most random thing you have ever seen!"
      },
      {
         name: "Random Name #2",
         description: "Hello World!"
      }
   ]

   return (
      <div style={{ textAlign: "center", marginTop: "10px"}}>
         <Typography variant="h3">
            Trending Albums
         </Typography>
         <Carousel>
               {
                  items.map( (item, i) => <Item key={i} item={item} /> )
               }
         </Carousel>
         <UploadTest />
      </div>
   )
}

function UploadTest(props){
   const [images, setImages] = useState([]);

   return(<input
      type="file"
      onChange={ (e) => {
         const files = e.currentTarget.files
         const fileReader = new FormData()
         fileReader.append("albums[name]", "TestAlbum")
         for( let i = 0; i < files.length; i++ ){
            fileReader.append("albums[photos][]", files[0])
         }
         axios.post("/api/images", fileReader)
      }}
      multiple
      />)
}

export default LandingPage