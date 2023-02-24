import React, { useState } from 'react'
import like from '../../../assets/foro/like-red.png';
import icondelete from '../../../assets/foro/trash-delete-remove-clean-svgrepo-com.svg';
import moment from 'moment';
import { useAuth0 } from "@auth0/auth0-react";


import likeNo from '../../../assets/foro/heart-svgrepo-com.svg';
import likeYes from '../../../assets/foro/heart-svgrepo-com (1).svg';

interface User{
  username: string;
  userName: string;
}

interface Comment{
  _id: string;
  author: string;
  content: string;
  likes: string[];
  onDeleteComment: any;
  email: string;
  created: Date
  likeCommentHandler: any
}

export default function Foro_comments({author, likes, _id, content, onDeleteComment, email, created, likeCommentHandler}: Comment){

  const { user } = useAuth0()
  
  return (
    <div className='comments_Container'>
      <div className='comments_headerDiv'>
        <h3>{author.charAt(0).toUpperCase()+author.slice(1)}</h3>
        <h5>{moment(created).fromNow()}</h5>
      </div>
      <div className='comments_contentDiv'>
        <p>{content}</p>
      </div>
      <hr/>
      <div className='comments_buttonsDiv'>
        <div className='comments_Button_left'>
          {
            email==user?.email&&
            <img onClick={()=> onDeleteComment(_id, email)} className='icondelete' src={icondelete} alt="delete" />
          }
        </div>
        <div className='comments_Button_right'>
          {
            user?.email?
              <img onClick={()=> likeCommentHandler(_id, user?.email)} src={likes.includes(user!.email!)?likeYes:likeNo} alt="like" />:
              <img onClick={()=> alert('Only users can like this post')} src={likeNo} alt="like" />
          }
          <p>{likes.length}</p>
        </div>
      </div>
    </div>
  )
}
