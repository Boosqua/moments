var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
var useStyles = makeStyles(function (theme) { return ({
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
}); });
// tile obj example --> I should practice typescript here
/**
 *   {
 *     img: new Image(),
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   }
 **/
export default function ImageGridList(_a) {
    var tileData = _a.tileData;
    var classes = useStyles();
    function setTiles(tile) {
        // sets column size according to width 
        //would like to improve formula and add sorting method to allow for full rows
        var widthAdj = tile.img.height / tile.img.width;
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
    return (_jsx("div", __assign({ className: classes.root }, { children: _jsx(GridList, __assign({ cellHeight: "320", className: classes.gridList, cols: 12 }, { children: tileData.map(function (tile) { return (_jsx(GridListTile, __assign({ cols: setTiles(tile) }, { children: _jsx("img", { src: tile.img.src, alt: tile.title }, void 0) }), tile.img.src)); }) }), void 0) }), void 0));
}
