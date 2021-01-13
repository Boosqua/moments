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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import NavBar from '../nav/navbar_container';
import { Typography, Link, TextField, Checkbox, Button, makeStyles, GridList, GridListTile } from "@material-ui/core";
import GridListContainer from "../grid_list";
var useStyles = makeStyles(function (theme) { return ({
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
}); });
function Album(props) {
    var style = useStyles();
    var creating;
    creating = !!props.creating.cover_path ? "images" : null;
    if (!props.creating.cover_path && !!props.creating.id) {
        creating = "uploadCover";
    }
    var _a = useState(creating), crudAction = _a[0], setCrud = _a[1];
    var _b = useState({ title: '', private: false }), album = _b[0], setAlbum = _b[1];
    var _c = useState(props.creating.cover_path), cover = _c[0], setCover = _c[1];
    var _d = useState([]), images = _d[0], setImages = _d[1];
    var _e = useState([]), files = _e[0], setFiles = _e[1];
    function crud() {
        switch (crudAction) {
            case "uploadCover":
                return UploadCover(props, cover, setCover, setCrud, style);
            case "newAlbum":
                return CreateAlbum(props, album, setAlbum, setCrud);
            case "images":
                return UploadImages(props, images, setImages, setCrud, files, setFiles);
            default:
                return Render(props, setCrud, style);
        }
    }
    return (_jsxs("div", { children: [_jsx(NavBar, {}, void 0),
            _jsx("div", __assign({ style: { textAlign: "center", marginTop: "20px" } }, { children: crud() }), void 0)] }, void 0));
}
function Render(props, cb, style) {
    return (_jsxs(Typography, __assign({ variant: "h3" }, { children: [props.albums.length === 0 ?
                ("You haven't created any albums yet!") :
                "Your albums", _jsx("br", {}, void 0),
            _jsx("div", __assign({ style: { fontSize: "20px" } }, { children: _jsx(Link, __assign({ href: "#", onClick: function (e) {
                        e.preventDefault();
                        cb('newAlbum');
                    } }, { children: " Create New Album" }), void 0) }), void 0), props.albums.length > 0 ?
                AlbumGrid(props, style) :
                null] }), void 0));
}
function AlbumGrid(props, style) {
    return (_jsx("div", __assign({ className: style.root }, { children: _jsx(GridList, __assign({ cellHeight: "320", className: style.gridList, cols: 12 }, { children: props.albums.map(function (album, index) { return (_jsx(GridListTile, __assign({ cols: 3 }, { children: AlbumDisplay({ title: album.title, imagePath: album.cover_path }) }), index)); }) }), void 0) }), void 0));
}
function CreateAlbum(props, album, cb, crudCb) {
    return (_jsxs("div", __assign({ style: { margin: '20px' } }, { children: [_jsxs(Typography, __assign({ style: { margin: '20px' } }, { children: ["Album Title", _jsx("br", {}, void 0),
                    _jsx(TextField, { value: album.title, onInput: function (e) {
                            cb({ title: e.target.value, private: album.private });
                        } }, void 0)] }), void 0),
            _jsxs(Typography, __assign({ style: { margin: '20px' } }, { children: ["Make Album Private?", _jsx(Checkbox, { value: "checkedA", inputProps: { 'aria-label': 'Checkbox A' }, onClick: function () {
                            cb({ title: album.title, private: !album.private });
                        } }, void 0)] }), void 0),
            _jsx(Button, __assign({ size: "large", onClick: function (e) {
                    e.preventDefault();
                    if (album.title === "") {
                        return null;
                    }
                    var newAlbum = { title: album.title, public: !album.private, ownerId: props.user.id };
                    props.createAlbum(newAlbum)
                        .then(function () {
                        crudCb('uploadCover');
                    });
                } }, { children: "Create" }), void 0)] }), void 0));
}
function UploadCover(props, cover, cb, crudCb, style) {
    return (_jsxs("div", __assign({ style: { margin: '20px' } }, { children: [_jsxs(Typography, __assign({ style: { margin: '20px' } }, { children: ["Upload cover for " + props.creating.title,
                    _jsx("br", {}, void 0)] }), void 0),
            _jsx("input", { type: "file", value: "", multiple: true, onChange: function (e) {
                    var reader = new FileReader();
                    var file = e.currentTarget.files[0];
                    reader.onloadend = function () { return (cb({ image: { imageUrl: reader.result, imageFile: file }, file: file })); };
                    if (file) {
                        reader.readAsDataURL(file);
                    }
                } }, void 0),
            _jsx("br", {}, void 0),
            cover ?
                (_jsxs("div", { children: [_jsx("br", {}, void 0), AlbumDisplay({ imagePath: cover.image.imageUrl, title: props.creating.title }), _jsx("br", {}, void 0),
                        _jsx(Button, __assign({ className: style.button, size: "large", onClick: function (e) {
                                e.preventDefault();
                                var fileReader = new FormData();
                                fileReader.append("albumId", props.creating.id);
                                fileReader.append("albums[photos][]", cover.file);
                                props.uploadCover(fileReader).then(function () {
                                    crudCb('images');
                                    cb("");
                                });
                            } }, { children: "Upload" }), void 0)] }, void 0)) :
                null] }), void 0));
}
function UploadImages(props, images, cb, crudCb, files, setFiles) {
    function grabImages(file) {
        var newFiles = files;
        newFiles.push(file);
        setFiles(__spreadArrays(newFiles));
        var reader = new FileReader();
        reader.onloadend = function () {
            var newImages = images;
            newImages.push(reader.result);
            cb(__spreadArrays(newImages));
        };
        reader.readAsDataURL(file);
    }
    function createImagePreview() {
        var gridReady = images.map(function (imagePath, index) {
            var img = new Image();
            img.src = imagePath;
            return { img: img, title: index, author: props.user.username };
        });
        return (_jsxs("div", __assign({ style: { display: "flex", justifyContent: "center", flexDirection: "column" } }, { children: [_jsx("br", {}, void 0),
                _jsx(Button, __assign({ onClick: function (e) {
                        e.preventDefault();
                        var fileReader = new FormData();
                        fileReader.append("albumId", props.creating.id);
                        for (var i = 0; i < files.length; i++) {
                            fileReader.append("albums[photos][]", files[i]);
                        }
                        props.upload(fileReader).then(function () {
                            cb([]);
                            setFiles([]);
                            crudCb("");
                            props.clearAlbum();
                        });
                    }, size: "large" }, { children: "Upload" }), void 0),
                _jsx("br", {}, void 0),
                _jsx(GridListContainer, { tileData: gridReady }, void 0)] }), void 0));
    }
    return (_jsxs("div", __assign({ style: { margin: '20px' } }, { children: [_jsxs(Typography, __assign({ style: { margin: '20px' } }, { children: ["Add images",
                    _jsx("br", {}, void 0)] }), void 0), AlbumDisplay({ imagePath: props.creating.cover_path, title: props.creating.title }), _jsx("input", { type: "file", onChange: function (e) {
                    var files = e.currentTarget.files;
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        grabImages(file);
                    }
                    e.currentTarget.id = e.currentTarget.id === "" ?
                        1 :
                        e.currentTarget.id++;
                }, multiple: true }, void 0), images.length > 0 ?
                createImagePreview() :
                null] }), void 0));
}
export function AlbumDisplay(props, onClickCb) {
    if (onClickCb === void 0) { onClickCb = function (e) { e.preventDefault(); }; }
    return (_jsxs("div", { children: [_jsx("img", { loading: "lazy", src: props.imagePath, onLoad: function (e) {
                    var width = e.currentTarget.width;
                    var height = e.currentTarget.height;
                    var heightAdjust = width < height ? 1 : height / width;
                    var widthAdjust = width < height ? width / height : 1;
                    var sizeAdjust = props.size ? props.size : 260;
                    e.currentTarget.width = sizeAdjust * widthAdjust;
                    e.currentTarget.height = sizeAdjust * heightAdjust;
                }, onClick: onClickCb }, void 0),
            _jsx(Typography, __assign({ variant: "h6" }, { children: props.title ?
                    props.title :
                    null }), void 0)] }, void 0));
}
export default withRouter(Album);
