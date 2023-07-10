import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup()
{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState<string | null>(null);
    const [errorUser, setErrorUser] = useState<string | null>(null);
    const [errorPass, setErrorPass] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSignUp = async (e:React.MouseEvent) => {
        e.preventDefault();
        setErrorEmail(null);
        setErrorUser(null);
        setErrorPass(null);

        if (username && email && password) {
            const url = 'http://localhost:8000/signup';
            //eslint-disable-next-line
            if (!email.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')) {
                setErrorEmail("Please enter a valid email");
                return;
            }
            if (!username.match('^[a-zA-Z][a-zA-Z0-9]{6,}$')) {
                setErrorUser("Usernames must start with a letter and contain 6 characters")
                return;
            }
            //eslint-disable-next-line
            if (!password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$')) {
                setErrorPass("Passwords must contain an uppercase character, lowercase character, a number, and at least 9 characters");
                return;
            }
            await axios.post(url, {
                username: username, 
                email: email,
                password: password
            })
                .then((response):any => {
                    handleLogin();

                })
                .catch((error):any => {
                    if (error.response.data.keyValue.email) setErrorEmail("Email already exists");
                    else if (error.response.data.keyValue.username) setErrorUser("Username already exists");
                    else console.log(error);
                });
        }
        else {
            if (!username) setErrorUser("Please input new username");
            if (!email) setErrorEmail("Please input new email");
            if (!password) setErrorPass("Please input new password");
        }

    }

    const handleLogin = async () => {
        if (username && password)
        {
            const url = 'http://localhost:8000/login'
            await axios.post(url, {
                username: username,
                password: password
            }, {withCredentials: true})
                .then((response) => {
                    console.log(response.data);
                    navigate(`/user/${response.data.userInfo.username}`);
                })
                .catch((error) => {
                    console.log(error);
                });
            
        }
    }

    async function checkUser()
    {
        const url = 'http://localhost:8000/user/getCurrentUser';
        await axios.get(url, {withCredentials: true})
            .then(res => {
                navigate(`/user/${res.data.username}`);
            })
            .catch(error => {})
    }


    useEffect(() => {
        checkUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="h-screen bg-background flex justify-center items-center text-text">
        
            <div className="bg-accent rounded-lg w-80 md:w-96 pb-6">
                    <div className="mb-3 pl-4 pt-3">
                        <span className="font-semibold text-2xl">Signup</span>
                    </div>

                    <div className="flex flex-col mb-3 w-full items-start px-4 gap-1">
                        <label htmlFor="email" className='font-medium'>Email</label>
                        <span className='font-medium text-sm text-[#da0b0b]'>{errorEmail}</span>
                        <input id="email" type="email" placeholder="Email" autoComplete="none"                                                                                                                                                    
                            className="w-full text-accent rounded-sm p-1 focus:outline-none"
                            onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="flex flex-col mb-3 w-full items-start px-4 gap-1">
                        <label htmlFor="username" className='font-medium'>Username</label>
                        <span className='font-medium text-sm text-[#da0b0b]'>{errorUser}</span>
                        <input id="username" type="text" placeholder="New Username" autoComplete="none"                                                                                                                                                    
                            className="w-full text-accent rounded-sm p-1 focus:outline-none"
                            onChange={e => setUsername(e.target.value)}/>
                    </div>

                    <div className="flex flex-col mb-3 w-full items-start px-4 gap-1">
                        <label htmlFor="password" className='font-medium'>Password</label>
                        <span className='font-medium text-sm text-[#da0b0b]'>{errorPass}</span>
                        <input id="password" type="password" placeholder="New Password" autoComplete="none"
                            className="w-full text-accent rounded-sm p-1 focus:outline-none"
                            onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <div className='flex justify-center pt-1'>
                        <button className='w-full mx-4 bg-primary-button rounded hover:bg-violet-800 transition ease-in-out font-semibold py-0.5' onClick={e => handleSignUp(e)}>Create Account</button>
                    </div>

                

            </div>

        </div>
    )
}