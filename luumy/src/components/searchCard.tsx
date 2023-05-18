import AddIcon from '@mui/icons-material/Add';

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
        <div className="grid rounded-md relative group"  >
            <div className="">
                <img className='rounded-md rounded-b-none' src={props.images[1].url} alt="Album Cover"/>
            </div>
            <div className='bg-slate-400'>
               <span className='overflow-hidden'>{`${props.name} - ${props.artists[0].name}`}</span>
            </div>
            {/* <button className='absolute end-0'><AddIcon/></button> */}
            <button 
                className='fixed bg-zinc-600 w-12 h-12 rounded-full mt-1.5 ml-1.5 invisible transition 
                group-hover:visible flex justify-center items-center
                hover:bg-zinc-400'>
                <AddIcon/>
            </button>


        </div>

    )
}

export default SearchCard;