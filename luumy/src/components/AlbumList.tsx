import AlbumCard from "./AlbumCard"

export default function AlbumList()
{
    return(
        <div className="grid grid-cols-4 gap-4">
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
        </div>
    )
}