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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { AlbumDisplay } from "../album_crud/album";
import Carousel from 'react-material-ui-carousel';
import GridListContainer from "../grid_list";
function Item(props) {
    return (_jsxs(Paper, __assign({ height: "400" }, { children: [_jsx("br", {}, void 0),
            _jsx("div", __assign({ style: { height: "450px" } }, { children: AlbumDisplay(props) }), void 0),
            _jsx(Button, __assign({ className: "CheckButton" }, { children: "Check it out!" }), void 0)] }), void 0));
}
function LandingPage(props) {
    var items = [];
    var _a = useState(false), loaded = _a[0], setLoaded = _a[1];
    useEffect(function () {
        if (!loaded) {
            props.fetchUtilImages(); //grab last 50 uploaded images for image gallery 
            setLoaded(true);
        }
    });
    if (items.length === 0 && props.albums.length > 0) { //onetime grab of newly created albums for "trending carousel"
        for (var i = props.albums.length - 1; i >= props.albums.length - 10; i--) {
            if (i < 0) { //sad times
                break;
            }
            var album = { title: props.albums[i].title, imagePath: props.albums[i].cover_path };
            items.push(album);
        }
    }
    function createImagePreview(images) {
        var gridReady = images.map(function (imagePath, index) {
            var img = new Image();
            img.src = imagePath;
            return { img: img, title: index, author: props.user.username };
        });
        return (_jsxs("div", __assign({ style: { display: "flex", justifyContent: "center", flexDirection: "column" } }, { children: [_jsx("br", {}, void 0),
                _jsx(GridListContainer, { tileData: gridReady }, void 0)] }), void 0));
    }
    return (_jsxs("div", __assign({ style: { textAlign: "center", marginTop: "10px" } }, { children: [_jsx(Typography, __assign({ variant: "h3" }, { children: "Trending Albums" }), void 0),
            _jsx("br", {}, void 0),
            _jsx(Carousel, { children: items.map(function (item, i) { return (_jsx(Item, __assign({}, item, { size: "400" }), i)); }) }, void 0),
            _jsx(Typography, __assign({ variant: "h3" }, { children: "Most Liked" }), void 0), loaded ?
                createImagePreview(props.publicImages) :
                null] }), void 0));
}
export default LandingPage;
