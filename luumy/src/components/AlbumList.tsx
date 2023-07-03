import AlbumCard from "./AlbumCard"
import { useState, useEffect, useContext } from "react";
import axios from "axios";

interface AlbumList
{
    UserAlbumList: any
}

export default function AlbumList(props:AlbumList)
{
    return(
        // grid grid-cols-4 gap-4
        <div className="grid grid-cols-2 gap-4">
            { props.UserAlbumList }
        </div>
    )
}