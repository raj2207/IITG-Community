import React from 'react';
import { useSelector } from 'react-redux';
import '../css/IitgBox.css';
import {Avatar} from "@material-ui/core";
import { selectUser } from '../features/userSlice';

function IitgBox() {
    const user = useSelector(selectUser);
    return (
        <div className="iitgbox">
            <div className="iitgbox_info">
                <Avatar 
                src={user.photo}
                />
                <h5>{user.displayName}</h5>
            </div>
            <div className="iitgbox_iitg">
                <p>What is your Question or link?</p>
            </div>
        </div>
    );
}

export default IitgBox;
