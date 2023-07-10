import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import AlbumDialog from './SearchAlbumDialog';

interface AlbumData
{
    albumID: string;
    images:any;
    name:string;
    release_date:string;
    // Get name and href to get the genre here
    artists:any;

}


const SearchCard: React.FC<AlbumData> = (props: AlbumData) => {
    const [open, setOpen] = useState(false);
    return (
        
        <div className='h-[275px] w-[175px] bg-accent rounded-md group'>
            <div className='flex flex-col items-center py-3 h-full'>
                <div className='w-5/6'>
                    <img src={props.images[1].url} alt="Album Cover" />
                </div>

                <div className=' w-full h-2/3 px-4 pt-3'>
                    <div className='flex flex-col gap-1.5 h-full'>
                        <span className='font-bold text-sm '>{props.name}</span>
                        
                        <span className='font-semibold text-xs'>{props.artists[0].name}</span>

                        <button className='invisible group-hover:visible ml-auto mt-auto' onClick={() => setOpen(true)} ><AddIcon/></button>
                    </div>
                    
                </div>

            </div>

            {open ? <AlbumDialog open={open} closeDialog={() => setOpen(false)} name={props.name} image={props.images[1].url} artist={props.artists[0].name}
            albumID={props.albumID}/>
            : null}
        </div>
            
        

    )
}

export default SearchCard;