import React,{useState} from "react";
import "./Login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {auth,provider} from "../../firebase";

function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    const signIn = () => {
        auth.signInWithPopup(provider).catch((e) => alert(e.message));

        console.log(auth);
    };
    const handleLogin = (e) => {
        e.preventDefault(); 
        
        auth
        .signInWithEmailAndPassword(email,password)
        .then((auth) => {
            console.log(auth);
        }).catch((e) => alert(e.message));

        setEmail('');
        setPassword('');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((auth) => {
            if(auth){
                console.log(auth);
            }
        })
        .catch((e) => alert(e.message));
    };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="data:image/png;base64,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"
            alt=""
          />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
          <p style={{ color: "royalblue", fontSize: "25px" }}>
            HandCrafted  by{" "}
          </p>
          <h3>Martand Prakash</h3>
        </div>
        <div className="login__auth">
          <div className="login__authOptions">
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                alt=""
              />
              <p onClick={signIn}>Continue With Google</p>
            </div>
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
                alt=""
              />
              <span>Continue With Facebook</span>
            </div>
            <div className="login__authDesc">
              <p>
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Sign Up With Email
                </span>
                . By continuing you indicate that you have read and agree to
                Quora's
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Terms of Service{" "}
                </span>
                and{" "}
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
          <div className="login__emailPass">
            <div className="login__label">
              <h4>Login</h4>
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              <button onClick={handleLogin}>Login</button>
            </div>
            <button onClick={handleRegister}>Register</button>
          </div>
        </div>
        <div className="login__lang">
          <p>हिन्दी</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Businesses</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; Quora Fake Inc. 2021</p>
        </div>
      </div>
    </div>
  );
}

export default Login;