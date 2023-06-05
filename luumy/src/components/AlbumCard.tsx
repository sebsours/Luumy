import NotesIcon from '@mui/icons-material/Notes';
interface AlbumCard
{
    favoriteTrack:string | null | undefined;
    score:number | null | undefined;
    notes:string | null | undefined;
    image:string;
    name:string;
    artistName:string;
}

export default function AlbumCard(props:AlbumCard)
{
    return (
        <div className="flex h-full bg-zinc-600 rounded-md">
            <div className="w-1/2">
                <img className='' src={props.image} alt="albumCover" />
            </div>
            <div className="w-1/2 grid text-white pl-2">
                <div className='grid content-start'>
                    <span className='text-lg font-bold py-3'>{props.name}</span>
                    <span className='text-sm pb-3'>{props.artistName}</span>
                    <span className='text-sm'>{props.favoriteTrack}</span>
                </div>

                <div className='flex justify-between'>  
                    <button disabled><NotesIcon className='hover:bg-slate-400 transition rounded'/></button>
                    <span className='self-center pr-4 text-xl font-semibold'>{props.score}</span>
                </div>
            </div>
        </div>
    );
}