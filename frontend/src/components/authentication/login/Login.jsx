import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../header/Header";
import Loader from '../../loader/Loader'

import { useDispatch, useSelector } from "react-redux";

import "./login.scss";
import { login } from "../../../redux/toolkits/userSlice";
import { getMyCarts } from "../../../redux/toolkits/cartSlice";

const Login = () => {
  const dispatch = useDispatch();
  localStorage.removeItem("isAuthenticated");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  const {loading} = useSelector(state => state.userState)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await dispatch(login({ email, password }))
        .unwrap()
        .then((result) => {
          localStorage.setItem("isAuthenticated", JSON.stringify(result.token));
          history("/");
        });
    } catch (err) {
      toast.error("Đăng nhập thất bại!");
    }
  };

  return (
    // <div className='login'>
    //   <form className='form-login' onSubmit={(e) => { handleSubmit(e) }}>
    //     <div className="form-group">
    //       <label >Email</label>
    //       <input type="email" placeholder='Email...' value={email} onChange={(e) => { setEmail(e.target.value) }} />
    //     </div>
    //     <div className="form-group">
    //       <label >Password</label>
    //       <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
    //     </div>
    //     <button type='submit' onClick={(e) => {handleSubmit(e)}}>Login</button>
    //   </form>
    // </div>
    <>
      <div className="login-screen">
        <form onSubmit={handleSubmit} className="login-screen__form">
          <h3 className="login-screen__form__title">Đăng nhập 💙</h3>
          <div className="form-group">
            <div className="form-group__align">
              <label htmlFor="email">Email:</label>
            </div>
            <input
              type="email"
              required
              id="email"
              placeholder="Nhập email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              tabIndex={1}
            />
          </div>
          <div className="form-group">
            <div className="form-group-remaining">
              <div className="form-group__align">
                <label htmlFor="password">Mật khẩu:</label>
              </div>
              <input
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="Nhập mật khẩu..."
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
            </div>
            <Link
              to="/account/password/forgot"
              className="login-screen__forgotpassword"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="form-submit">
            <button onClick={handleSubmit} type="submit" className="btn">
              Đăng nhập
            </button>
          </div>

          <span className="login-screen__subtext">
            Chưa có tài khoản?{" "}
            <Link to="/account/register" target="_self">
              Đăng kí
            </Link>
          </span>
        </form>
        {
          loading && <Loader />
        }
      </div>
    </>
  );
};

export default Login;
