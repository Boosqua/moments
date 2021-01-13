import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import NavBar from '../nav/navbar_container';
import { Typography, Link, TextField, Checkbox, Button, makeStyles, GridList, GridListTile } from "@material-ui/core";
import GridListContainer from "../grid_list";
const useStyles = makeStyles((theme) => ({
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
}));
//value of state object crudAction navigates helper method
function Album(props) {
    const style = useStyles();
    let creating;
    //props.creating( terrible name ) access newly created album in state.utils
    //if creating exists and has a cover photo, app renders component for uploading images
    creating = !!props.creating.cover_path ? "images" : null;
    //if no cover photo but creating exists we skip to uploading cover
    if (!props.creating.cover_path && !!props.creating.id) {
        creating = "uploadCover";
    }
    const [crudAction, setCrud] = useState(creating);
    const [album, setAlbum] = useState({ title: '', private: false });
    const [cover, setCover] = useState(props.creating.cover_path);
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    function crud() {
        switch (crudAction) {
            case "uploadCover":
                return UploadCover(props, cover, setCover, setCrud, style);
            case "newAlbum": //only set when creating
                return CreateAlbum(props, album, setAlbum, setCrud);
            case "images":
                return UploadImages(props, images, setImages, setCrud, files, setFiles);
            default:
                return Render(props, setCrud, style);
        }
    }
    return (_jsxs("div", { children: [_jsx(NavBar, {}, void 0),
            _jsx("div", Object.assign({ style: { textAlign: "center", marginTop: "20px" } }, { children: crud() }), void 0)] }, void 0));
}
// render that informs user if they have no albums
function Render(props, cb, style) {
    return (_jsxs(Typography, Object.assign({ variant: "h3" }, { children: [props.albums.length === 0 ?
                ("You haven't created any albums yet!") :
                "Your albums", _jsx("br", {}, void 0),
            _jsx("div", Object.assign({ style: { fontSize: "20px" } }, { children: _jsx(Link, Object.assign({ href: "#", onClick: (e) => {
                        e.preventDefault();
                        cb('newAlbum');
                    } }, { children: " Create New Album" }), void 0) }), void 0), props.albums.length > 0 ?
                AlbumGrid(props, style) :
                null] }), void 0));
}
function AlbumGrid(props, style) {
    return (_jsx("div", Object.assign({ className: style.root }, { children: _jsx(GridList, Object.assign({ cellHeight: "320", className: style.gridList, cols: 12 }, { children: props.albums.map((album, index) => (_jsx(GridListTile, Object.assign({ cols: 3 }, { children: AlbumDisplay({ title: album.title, imagePath: album.cover_path }) }), index))) }), void 0) }), void 0));
}
// split album creation into three action
//Create album --> set title and privacy option
//Upload album cover --> preview and send to aws for storage
//upload as many images as desired( limit 200)
function CreateAlbum(props, album, cb, crudCb) {
    return (_jsxs("div", Object.assign({ style: { margin: '20px' } }, { children: [_jsxs(Typography, Object.assign({ style: { margin: '20px' } }, { children: ["Album Title", _jsx("br", {}, void 0),
                    _jsx(TextField, { value: album.title, onInput: (e) => {
                            cb({ title: e.target.value, private: album.private });
                        } }, void 0)] }), void 0),
            _jsxs(Typography, Object.assign({ style: { margin: '20px' } }, { children: ["Make Album Private?", _jsx(Checkbox, { value: "checkedA", inputProps: { 'aria-label': 'Checkbox A' }, onClick: () => {
                            cb({ title: album.title, private: !album.private });
                        } }, void 0)] }), void 0),
            _jsx(Button, Object.assign({ size: "large", onClick: (e) => {
                    e.preventDefault();
                    if (album.title === "") {
                        return null;
                    }
                    const newAlbum = { title: album.title, public: !album.private, ownerId: props.user.id };
                    props.createAlbum(newAlbum)
                        .then(() => {
                        crudCb('uploadCover');
                    });
                } }, { children: "Create" }), void 0)] }), void 0));
}
function UploadCover(props, cover, cb, crudCb, style) {
    return (_jsxs("div", Object.assign({ style: { margin: '20px' } }, { children: [_jsxs(Typography, Object.assign({ style: { margin: '20px' } }, { children: [`Upload cover for ${props.creating.title}`, _jsx("br", {}, void 0)] }), void 0),
            _jsx("input", { type: "file", value: "", multiple: true, 
                //save file upload and create url path to inject album cover preview
                onChange: (e) => {
                    const reader = new FileReader();
                    const file = e.currentTarget.files[0];
                    reader.onloadend = () => (cb({ image: { imageUrl: reader.result, imageFile: file }, file: file }));
                    if (file) {
                        reader.readAsDataURL(file);
                    }
                } }, void 0),
            _jsx("br", {}, void 0),
            cover ?
                (_jsxs("div", { children: [_jsx("br", {}, void 0), AlbumDisplay({ imagePath: cover.image.imageUrl, title: props.creating.title }), _jsx("br", {}, void 0),
                        _jsx(Button
                        //user can commit cover or create new one
                        , Object.assign({ 
                            //user can commit cover or create new one
                            className: style.button, size: "large", onClick: (e) => {
                                e.preventDefault();
                                const fileReader = new FormData();
                                fileReader.append("albumId", props.creating.id);
                                fileReader.append("albums[photos][]", cover.file);
                                props.uploadCover(fileReader).then(() => {
                                    crudCb('images');
                                    cb("");
                                });
                            } }, { children: "Upload" }), void 0)] }, void 0)) :
                null] }), void 0));
}
function UploadImages(props, images, cb, crudCb, files, setFiles) {
    function grabImages(file) {
        let newFiles = files;
        newFiles.push(file);
        //send back info in new array or React won't realize we had a state change
        setFiles([...newFiles]);
        const reader = new FileReader();
        reader.onloadend = () => {
            let newImages = images;
            newImages.push(reader.result);
            cb([...newImages]);
        };
        reader.readAsDataURL(file);
    }
    function createImagePreview() {
        //parse information into suitable props for out GridList container
        let gridReady = images.map((imagePath, index) => {
            let img = new Image();
            img.src = imagePath;
            return { img: img, title: index, author: props.user.username };
        });
        return (_jsxs("div", Object.assign({ style: { display: "flex", justifyContent: "center", flexDirection: "column" } }, { children: [_jsx("br", {}, void 0),
                _jsx(Button, Object.assign({ onClick: (e) => {
                        e.preventDefault();
                        const fileReader = new FormData();
                        fileReader.append("albumId", props.creating.id);
                        for (let i = 0; i < files.length; i++) {
                            fileReader.append("albums[photos][]", files[i]);
                        }
                        props.upload(fileReader).then(() => {
                            cb([]);
                            setFiles([]);
                            crudCb("");
                            props.clearAlbum();
                        });
                    }, size: "large" }, { children: "Upload" }), void 0),
                _jsx("br", {}, void 0),
                _jsx(GridListContainer, { tileData: gridReady }, void 0)] }), void 0));
    }
    return (_jsxs("div", Object.assign({ style: { margin: '20px' } }, { children: [_jsxs(Typography, Object.assign({ style: { margin: '20px' } }, { children: [`Add images`, _jsx("br", {}, void 0)] }), void 0), AlbumDisplay({ imagePath: props.creating.cover_path, title: props.creating.title }), _jsx("input", { type: "file", onChange: (e) => {
                    const files = e.currentTarget.files;
                    for (let i = 0; i < files.length; i++) {
                        let file = files[i];
                        grabImages(file);
                    }
                    //change id to create new input object, without this I kept receiving the old file uploads
                    //now people can upload as many as they want at a time
                    e.currentTarget.id = e.currentTarget.id === "" ?
                        1 :
                        e.currentTarget.id++;
                }, multiple: true }, void 0), images.length > 0 ?
                createImagePreview() :
                null] }), void 0));
}
// reusable component that can display albums with or without titles and adjust block sizing via props
export function AlbumDisplay(props, onClickCb = (e) => { e.preventDefault(); }) {
    return (_jsxs("div", { children: [_jsx("img", { src: props.imagePath, onLoad: (e) => {
                    let width = e.currentTarget.width;
                    let height = e.currentTarget.height;
                    let heightAdjust = width < height ? 1 : height / width;
                    let widthAdjust = width < height ? width / height : 1;
                    let sizeAdjust = props.size ? props.size : 260;
                    e.currentTarget.width = sizeAdjust * widthAdjust;
                    e.currentTarget.height = sizeAdjust * heightAdjust;
                }, onClick: onClickCb }, void 0),
            _jsx(Typography, Object.assign({ variant: "h6" }, { children: props.title ?
                    props.title :
                    null }), void 0)] }, void 0));
}
export default withRouter(Album);
