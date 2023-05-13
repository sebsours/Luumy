import SearchIcon from '@mui/icons-material/Search';

export default function Navbar()
{

    return(
        <div className="w-full bg-purple-300 p-4 flex justify-around items-center">
            <div>
                <span>Luumy</span>
            </div>

            <div className="w-1/3 flex border-b border-gray-500">
                <input type="text" placeholder="Albums, Artists, Users"  className="w-11/12 bg-purple-300 py-1.5 focus:outline-none placeholder-gray-500"
                />
                <button className='w-1/12'>
                    <SearchIcon className=' hover:text-gray-500 transition duration-700 '/>
                </button>
            </div>

            <div>
                Profile pics
            </div>
        </div>
    );
    
}