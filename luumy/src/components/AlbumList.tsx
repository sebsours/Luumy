import AlbumCard from "./AlbumCard"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from '../App';

interface AlbumList
{
    UserAlbumList: any
}

export default function AlbumList(props:AlbumList)
{
    return(
        <div className="grid grid-cols-4 gap-4">
            { props.UserAlbumList }
        </div>
    )
}