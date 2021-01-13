import { jsx as _jsx } from "react/jsx-runtime";
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
export default function ImageGridList({ tileData }) {
    const classes = useStyles();
    function setTiles(tile) {
        // sets column size according to width 
        //would like to improve formula and add sorting method to allow for full rows
        let widthAdj = tile.img.height / tile.img.width;
        if (widthAdj < .75) {
            return 6;
        }
        else if (widthAdj < 1) {
            return 4;
        }
        else {
            return 2;
        }
    }
    return (_jsx("div", Object.assign({ className: classes.root }, { children: _jsx(GridList, Object.assign({ cellHeight: "320", className: classes.gridList, cols: 12 }, { children: tileData.map((tile) => (_jsx(GridListTile, Object.assign({ cols: setTiles(tile) }, { children: _jsx("img", { src: tile.img.src, alt: tile.title }, void 0) }), tile.img.src))) }), void 0) }), void 0));
}
