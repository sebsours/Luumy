import SearchIcon from '@mui/icons-material/Search';
interface NavbarProps
{
    openModal: () => void;
}

export default function Navbar(props:NavbarProps)
{

    return(
        <div className="w-full bg-purple-300 p-4 flex justify-around items-center">
            <div>
                <span>Luumy</span>
            </div>

            {/* <div className="w-1/3 flex justify-between bg-white">
                <input type="text" placeholder="Albums, Artists, Users"  className="w-11/12 bg-purple-300 py-1.5 focus:outline-none placeholder-gray-500"
                />
                <button className='w-1/12'>
                    <SearchIcon className=' hover:text-gray-500 transition duration-700 '/>
                </button>
                <span>Albums, Artists</span>
                <SearchIcon className=' hover:text-gray-500 transition duration-700 '/>
            </div> */}
            <button className='w-1/3 flex justify-between rounded bg-purple-300 border border-purple-200 p-1' onClick={props.openModal}>
                <span>Albums, Artists</span>
                <SearchIcon />
            </button>

            <div>
                Profile pics
            </div>
        </div>
    );
    
}