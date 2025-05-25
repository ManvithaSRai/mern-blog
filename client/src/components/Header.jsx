import { Button, Navbar, TextInput,NavbarCollapse,NavbarLink, NavbarToggle, Dropdown,Avatar, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-react';
import React,{ useEffect, useState } from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon,FaSun } from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
  const path=useLocation().pathname;
  const dispatch= useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const {theme} =useSelector((state)=>state.theme);
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])

  const handleSignout= async()=>{
        try{
             const res= await fetch('/api/user/signout',{
              method: 'POST',
             });
             const data=await res.json();
             if(!res.ok){
              console.log(data.message);
             }else{
              dispatch(signoutSuccess());
             }
        }catch(error){
          console.log(error.message);
        }
     };

     const handleSubmit = (e)=>{
      e.preventDefault()
      const urlParams = new URLSearchParams(location.search)
      urlParams.set('searchTerm', searchTerm)
      const searchQuery = urlParams.toString()
      navigate(`/search?${searchQuery}`)
    }
  

  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-400 rounded-lg text-white'>Manvitha's</span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-2'>
        <Button className="w-12 h-10 hidden sm:inline" color='gray'  pill
         onClick={()=>dispatch(toggleTheme())}>
          {theme === 'dark' ? <FaSun/> : <FaMoon/>}
        </Button>

        {currentUser ? (
          <Dropdown arrowIcon={false}
          inline
          label={
            <Avatar alt='user' img={currentUser.profilePicture} rounded>
            </Avatar>
          } 
          >
           <DropdownHeader>
            <span className='block text-sm'>@{currentUser.username}</span>
            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
          </DropdownHeader>
          <Link to={'/dashboard?tab=profile'}> 
          <DropdownItem>Profile</DropdownItem>
          </Link> 
          <DropdownDivider/>
            <DropdownItem onClick={handleSignout}>Sign Out</DropdownItem>
          </Dropdown>
        ):
        (
          <Link to='/sign-in'>
          <Button className='bg-gradient-to-r from-purple-500 to-blue-500 text-white'>
            Sign In 
          </Button>
        </Link> 
        )
        }
        <NavbarToggle/>
      </div>
      <NavbarCollapse>
          <NavbarLink active={path === '/'} as={'div'}>
            <Link to='/'>Home</Link>
          </NavbarLink>
          <NavbarLink active={path === '/about'} as={'div'}>
            <Link to='/about'>About</Link>
          </NavbarLink>
          <NavbarLink active={path === '/projects'} as={'div'}>
            <Link to='/projects'>Projects</Link>
          </NavbarLink>
        </NavbarCollapse>
    </Navbar>
  );
}