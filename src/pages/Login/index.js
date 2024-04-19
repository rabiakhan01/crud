import React, { useState } from "react";
import { Button, InputField, OutlinedButton } from "../../components/Shared";
import Layout from "../../utils/Layout";
import { Navigate, useNavigate } from "react-router-dom";
import images from "../../assets/images";
const Login = () => {

    //hook used for navigation from one page to another
    const navigate = useNavigate();

    //check if user already logged in
    const isLoginUser = () => {

        const getUser = JSON.parse(localStorage.getItem("loginUser"));
        if (getUser) {
            const user = getUser.find(user => user.isLogin === true);
            if (user) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }

    }

    const [isLoggedIn, setisLoggedIn] = useState(isLoginUser());
    //handel state of input fields of login screen
    const [loginUser, setLoginUser] = useState({
        username: '',
        password: ''
    });

    //handel state of validation errors
    const [validationError, setValidationError] = useState(false);

    // handel the validation error message
    const [validationMessage, setValidationMessage] = useState('');

    //handel the empty input fields errors
    const [error, setError] = useState({
        username: "",
        password: ""
    })

    const [passwordIcon, setPasswordIcon] = useState(false);
    // handel values of input fields of login form
    const handelChange = (event) => {
        const { name, value } = event.target;
        setLoginUser({
            ...loginUser,
            [name]: value
        })
        setError({
            ...error,
            [name]: false
        })
        setValidationMessage(false)

    }

    //handel login user
    const handelLogin = () => {

        // get the data of users which are stored in local storage
        const getUser = JSON.parse(localStorage.getItem("loginUser"));

        //handel if atleast one user exists
        if (getUser) {
            //check if the user matches
            getUser.map((user) => {

                //if the users matches the cred then navigate to the Listing page
                if (user.username === loginUser.username && user.password === loginUser.password) {
                    user.isLogin = true;
                    const setUser = JSON.stringify(getUser);
                    console.log("getUser", setUser)
                    localStorage.setItem("loginUser", setUser);
                    navigate("/user-listing");
                }

                // activate validations  
                else {
                    if (loginUser.username !== "" && loginUser.password !== "") {
                        setValidationError(true);
                        setValidationMessage("Please enter a valid username and password");
                    }
                    else {
                        if (loginUser.username === '') {
                            setError((prevError) => ({ ...prevError, username: "username required" }))
                        }
                        if (loginUser.password === '') {
                            setError((prevError) => ({ ...prevError, password: "password required" }))
                        }
                    }
                }
            })
        }
        //handel if no user exists 
        else {
            if (loginUser.username !== "" && loginUser.password !== "") {
                setValidationError(true);
                setValidationMessage("Account not exists please first create an account");
                setLoginUser({
                    username: "",
                    password: ""
                })
            }
            else {
                if (loginUser.username === '') {
                    setError((prevError) => ({ ...prevError, username: "username required" }))
                }
                if (loginUser.password === '') {
                    setError((prevError) => ({ ...prevError, password: "password required" }))
                }
            }
        }
    }

    // if user is not have account than navigate through this button to the signup page
    const createAccount = () => {
        navigate("/signup");
    }
    const showPassword = () => {
        setPasswordIcon(true)
    }
    const hidePassword = () => {
        setPasswordIcon(false)
    }
    return (
        <Layout>
            {
                isLoggedIn
                    ?
                    <div className="flex justify-center items-center h-lvh">
                        <div className="flex flex-col w-4/5 sm:w-auto justify-center items-center outline outline-1 outline-outlineColor m-5 p-10 sm:px-20 sm:py-14">
                            <div>
                                <h1 className="text-primaryColor text-2xl md:text-3xl font-bold pb-8">Login</h1>
                            </div>
                            {validationError && <span className="text-errorColor">{validationMessage}</span>}
                            <div>
                                <form className="relative flex flex-col">
                                    <InputField
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        value={loginUser.username}
                                        onChange={handelChange}
                                        error={error.username}
                                    />
                                    <InputField
                                        name="password"
                                        type={passwordIcon ? `text` : `password`}
                                        placeholder="password"
                                        value={loginUser.password}
                                        onChange={handelChange}
                                        error={error.password}
                                    />
                                    {
                                        passwordIcon
                                            ?
                                            <button type="button" className="" onClick={hidePassword}><img src={images.eye} alt="" className={`h-5 w-5 absolute ${error.password ? 'top-[7rem] left-48' : 'top-[5.7rem] left-48'} sm:top-[6.5rem] sm:left-64`} /></button>
                                            :
                                            <button type="button" className="" onClick={showPassword}><img src={images.eyeSlash} alt="" className={`h-5 w-5 absolute ${error.password ? 'top-[7rem] left-48' : 'top-[5.7rem] left-48'}  sm:top-[6.5rem] sm:left-64`} /></button>
                                    }

                                </form>
                            </div>
                            <div className="mt-10 mb-3">
                                <Button
                                    name="Sign In"
                                    onClick={handelLogin}
                                    smWidth="56"
                                    mdWidth="sm:w-72"
                                />
                            </div>
                            <OutlinedButton
                                name="Create New Account"
                                onClick={createAccount}
                                smWidth="56"
                                mdWidth="sm:w-72"
                            />

                        </div>
                    </div>
                    :
                    <Navigate to="/user-listing" />
            }
        </Layout>
    );
}

export default Login;