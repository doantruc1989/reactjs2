import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa'

const PWD_REGEX = /^(?=.*[0-9]).{3,24}$/;

const UpdateNewPw = () => {
    const { forgotToken } = useParams();
    const id = localStorage.hasOwnProperty('user') ? (JSON.parse(localStorage.getItem("user"))).id : '';
    const errRef = useRef();

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v2 = PWD_REGEX.test(password);
        if (!v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3001/reset-password/`,
                JSON.stringify({ forgotToken, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setSuccess(true);
            setPassword('');
            setMatchPwd('');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {success ? (
                <section className='register-container'>
                    <h1>Success!</h1>
                    <p>
                        <Link to='/login'>to Login page</Link>
                    </p>
                </section>
            ) : (
                <section className='register-container'>
                    <div className='login'>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Change Password</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="password">
                                Password:
                                <FaCheck className={validPwd ? "valid" : "hide"} />
                                <FaTimes className={validPwd || !password ? "hide" : "invalid"} />

                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FaInfoCircle />
                                3 to 24 characters.<br />
                                Must include lowercase letters, a number.<br />
                            </p>


                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <FaCheck className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FaTimes className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FaInfoCircle />
                                Must match the first password input field.
                            </p>

                            <button disabled={!validPwd || !validMatch ? true : false}>Change</button>
                        </form>
                    </div>
                </section>
            )}
        </>
    )
}

export default UpdateNewPw