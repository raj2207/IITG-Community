import React , {useEffect, useState} from 'react';
import '../css/Post.css';
import {Avatar} from "@material-ui/core";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { MoreHorizOutlined, ShareOutlined } from "@material-ui/icons";
import Modal from 'react-modal';
import "../css/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectQuestionId, setQuestionInfo } from "../features/questionSlice";
import {db} from "../firebase";
import firebase from "firebase";

function Post({Id,question,image,timestamp,iitgUser}) {
    const user = useSelector(selectUser);
    const [openModal,setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const questionId = useSelector(selectQuestionId);
    const [answer,setAnswer] = useState("");
    const [getAnswer,setGetAnswer] = useState([]);
    
    useEffect(() => {
        if(questionId){
            db.collection('questions').doc(questionId).collection('answer')
            .orderBy('timestamp','desc').onSnapshot(snapshot => setGetAnswer(
                snapshot.docs.map((doc) => ({
                id : doc.id,
                answers : doc.data()
            }))));
        }
    },[questionId]);
    const handleAnswer = (e) => {
        e.preventDefault();
        if(questionId){
            db.collection('questions').doc(questionId).collection
            ('answer').add({
                questionId:questionId,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                answer: answer,
                user: user,
            });
        }
            console.log(questionId);
            setAnswer("");
            setOpenModal(false);
        
    };
    return (
        <div className="post"
         onClick={() => dispatch(setQuestionInfo({
             questionId:Id,
             questionName:question,
         }))}
        >
            <div className="post_info">
                <Avatar 
                 src={iitgUser.photo}
                />
                <h5>{iitgUser.displayName ? iitgUser.displayName : iitgUser.email}</h5>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>
            <div className="post_body">
                <div className="post_question">
                    <p>{question}</p>
                    <button onClick={() => setOpenModal(true)} className="post_btnAnswer">Answer</button>
                    <Modal
                 isOpen={openModal}
                 onRequestClose= { () => setOpenModal(false)}
                 shouldCloseOnOverlayClick={false}
                 style={{
                     overlay:{
                        width:700,
                        height:600,
                        backgroundColor:"rgba(0,0,0,0.8)",
                        zIndex:"1000",
                        top:"50%",
                        left:"50%",
                        marginTop:"-250px",
                        marginLeft:"-350px",
                     },
                 }}
                >
                    <div className="modal_question">
                            <h1>{question}</h1>
                            <p> asked by{" "}
                            <span className="name">{iitgUser.displayName? iitgUser.displayName : iitgUser.email}
                            </span>{" "}{" "}on{" "}
                            <span className="name">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                            </p>
                    </div>
                    <div className="modal_answer">
              <textarea
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
              />
            </div>
            <div className="modal_button">
              <button className="cancle" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleAnswer} className="add">
                Add Answer
              </button>
            </div>
                </Modal>
                </div>
                <div className="post_answer">
                    {
                        getAnswer.map(({id,answers}) => (
                            <p
                             key={id}
                             style={{position:"relative",
                                     paddingBottom:"3px"}}>
                            {
                                Id === answers.questionId ? (<span>
                                    {answers.answer}
                                    <br />
                                    <span
                                 style={{position:"absolute",
                                 color:"red",
                                 fontSixe:"small",
                                display:"flex",
                            right:"0px",
                            bottom:"1px"}}
                                >
                                
                                    <span style={{color:"#b9b27"}}>{
                                        answers.user.displayName ? answers.user.displayName :
                                        answers.user.email
                                    } on { new Date(answers.timestamp?.toDate()).toLocaleString()}
                                    </span>
                                </span>
                                </span>
                                ) : ( "" )}
                            </p>
                        ))
                    }
                    <p></p>
                </div>
                <img src={image} alt=""></img>
            </div>
            <div className="post_footer">
                <div className="post_footerAction">
                    <ArrowUpwardOutlinedIcon />
                    <ArrowDownwardOutlinedIcon />
                </div>

                <RepeatOutlinedIcon />
                <ChatBubbleOutlineOutlinedIcon />
                <div className="popst_footerLeft">
                    <ShareOutlined />
                    <MoreHorizOutlined />
                </div>
            </div>
        </div>
    );
}

export default Post;
