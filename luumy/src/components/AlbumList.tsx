interface AlbumListProps
{
    UserAlbumList: any
}

export default function AlbumList(props:AlbumListProps)
{
    return(
        <div className="grid grid-cols-1 min-[430px]:grid-cols-2 sm:grid-cols-3 min-[860px]:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-3 
                        gap-2 lg:gap-x-28 2xl:gap-x-14">
            { props.UserAlbumList }
        </div>
    )
}