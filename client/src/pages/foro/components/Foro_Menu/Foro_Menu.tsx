import React from 'react';
import Home from '../../../../assets/foro/HomeW.svg';
import notification from '../../../../assets/foro/notificationW.svg';
import profile from '../../../../assets/foro/profile-white.svg';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../Redux/hook';
import { useAuth0 } from "@auth0/auth0-react";
import { UserProfile } from '../Foro_Profile/Foro_Profile';

interface props {
    refresh: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    setUser?: React.Dispatch<React.SetStateAction<UserProfile>>
    setOnLoadPost?: React.Dispatch<React.SetStateAction<boolean>>
    setPostByUser?: React.Dispatch<React.SetStateAction<never[]>>
}

export const Foro_Menu = ({setRefresh, refresh, setUser, setOnLoadPost, setPostByUser}: props) => {
    const {isAuthenticated} = useAuth0()
    const userByBd = useAppSelector((state) => state.userReducer.userState);

  const auxiliar = ()=> {
    if (setRefresh && setUser && setOnLoadPost && setPostByUser) {
        setUser({
            _id: '',
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            comments: [],
            picture: '',
            banner: '',
            posts: [],
            role: ''
        })
        setOnLoadPost(false)
        setPostByUser([])
        setRefresh(!refresh)
    }
  } 

  return (
    <div className='Foro_Menu_Container'>
        {
            isAuthenticated&&
            <NavLink onClick={auxiliar} to={`/foro/profile/${userByBd._id}`} className='Menu_ButtonContainer'>
                <img src={profile} alt="profile" />
            </NavLink>
        }
        <NavLink to={'/foro'} className='Menu_ButtonContainer'>
            <img src={Home} alt="home" />
        </NavLink>
        <div className='Menu_ButtonContainer'>
            <img src={notification} alt="notification" />
        </div>
    </div>
  )
}
