// interface ImageObject
// {
//     url: string;
//     height: number;
//     width: number;
// }

interface AlbumData
{
    href:string;
    images:any;
    name:string;
    release_date:string;
    // Get name and href to get the genre here
    artists:any;
}


const SearchCard: React.FC<AlbumData> = (props: AlbumData) => {
    return (
        <div className="grid rounded-md h-full" >
            <div className="">
                <img className='rounded-l-md' src={props.images[1].url} alt="Album Cover"/>
            </div>
            <div className="">
               <span className="">{`${props.name} - ${props.artists[0].name}`}</span>
            </div>



        </div>

    )
}

export default SearchCard;