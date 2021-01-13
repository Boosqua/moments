import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const useStyles = makeStyles((theme) => ({
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
  },
}));
// tile obj example --> I should practice typescript here
/**
 *   {
 *     img: new Image(),
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   }
 **/
export default function ImageGridList({tileData}) {
   const classes = useStyles();
   function setTiles(tile){
      // sets column size according to width 
      //would like to improve formula and add sorting method to allow for full rows
      let widthAdj = tile.img.height  / tile.img.width 
      if(widthAdj < .75){
         return 6
      } else if (widthAdj < 1){
         return 4
      } else {
         return 2
      }
   }
   return (
      <div className={classes.root}>
         <GridList cellHeight={"320"} className={classes.gridList} cols={12}>
         {tileData.map((tile) => (
            <GridListTile key={tile.img.src} cols={setTiles(tile)}>
               <img src={tile.img.src} alt={tile.title} 
                  />
            </GridListTile>
         ))}
         </GridList>
      </div>
   );
}