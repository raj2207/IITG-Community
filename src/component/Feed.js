import React,{useEffect, useState} from 'react';
import '../css/Feed.css';
import { db } from '../firebase';
import IitgBox from './IitgBox';
import Post from './Post';

function Feed() {

    const [posts,setPosts] = useState([]);

    useEffect(() => {
        db.collection('questions')
        .orderBy('timestamp',"desc")
        .onSnapshot((snapshot) => 
           setPosts(
               snapshot.docs.map((doc) => ({
            id: doc.id,
            questions: doc.data(),
        }))));
    },[]);
    return (
        <div className="feed">
            <IitgBox />
            {
                posts.map(({id,questions}) => (
                    <Post 
                     key={id}
                     Id={id}
                     image={questions.imageUrl}
                     question={questions.question}
                     timestamp={questions.timestamp}
                     iitgUser={questions.user}
                    />
                ))
            }
            
        </div>
    );
}

export default Feed;
