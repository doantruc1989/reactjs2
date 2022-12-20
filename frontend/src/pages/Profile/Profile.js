import instance from '../../other/axios'
import React, { useEffect, useState } from 'react'
import Navbar2 from '../../components/Navbar/Navbar2'
import './profile.css'
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
    const [profile, setProfile] = useState([])

    const id = localStorage.hasOwnProperty('user') ? (JSON.parse(localStorage.getItem("user"))).id : '';

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        try {
            instance.get(`users/profile/${id}`)
                .then((response) => {
                    setProfile(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [id])

    const handleClick = () => {
        localStorage.removeItem("user");
        navigate(from, { replace: true });
    }

    const handleChangePw = () => {
        navigate('/profile/changepw')
    }

    return (
        <>
            <Navbar2 />
            <section className='profile-container'>
                <div className="wrapper">
                    <div className="left">
                        <img src={profile.image}
                            alt="user" width="100" />
                        <h4>{profile.username}</h4>
                        <button className="btn" onClick={handleChangePw}>Change Password</button>
                        <button className="btn" onClick={handleClick}>Logout</button>
                    </div>
                    <div className="right">
                        <div className="info">
                            <h3>Information</h3>
                            <div className="info_data">
                                <div className="data">
                                    <h4>Email</h4>
                                    <p>{profile.email}</p>
                                </div>
                                <div className="data">
                                    <h4>Phone</h4>
                                    <p>0001-213-998761</p>
                                </div>
                            </div>
                        </div>

                        <div className="projects">
                            <h3>Projects</h3>
                            <div className="projects_data">
                                <div className="data">
                                    <h4>Recent</h4>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>
                                <div className="data">
                                    <h4>Most Viewed</h4>
                                    <p>dolor sit amet.</p>
                                </div>
                            </div>
                        </div>

                        <div className="social_media">
                            <ul>
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Profile