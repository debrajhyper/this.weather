import React from 'react'
import { Modal } from 'react-bootstrap'
import icon from './assets/icons/favicon.png'
import { FaGithub } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa"
import { FaFacebookF } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaBehance } from "react-icons/fa"
import { FaMediumM } from "react-icons/fa"
import { FaCode } from "react-icons/fa"

export default function about(props) {
        return (
            <Modal className="about-modal" {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
                <div className="modal-box">
                    <Modal.Header className="modal-head" closeButton></Modal.Header>
                    <Modal.Body className="modal-body">
                        <img alt="this.weather icon" src={icon} width="100%" height="100%" />
                        <h4>this.weather</h4>
                        <p>Watch the weather in your city and received hourly forecast, including data of wind, cloudiness, pressure, humidity, time of sunrise and sunset, geo coords on this.weather React PWA App</p>
                        <div className="social-icons">
                            <a href="https://github.com/debrajhyper" className="icon" target="blank"><FaGithub className="social-icon"/></a>
                            <a href="https://www.linkedin.com/in/debraj-karmakar-275570199/" className="icon" target="blank"><FaLinkedinIn className="social-icon"/></a>
                            <a href="https://www.facebook.com/debraj.karmakar.923" className="icon" target="blank"><FaFacebookF className="social-icon"/></a>                            
                            <a href="https://mobile.twitter.com/debraj_010" className="icon" target="blank"><FaTwitter className="social-icon"/></a>                          
                            <a href="https://www.instagram.com/debraj010/" className="icon" target="blank"><FaInstagram className="social-icon"/></a>                            
                            <a href="https://www.behance.net/debrajkarmakar" className="icon" target="blank"><FaBehance className="social-icon"/></a>                          
                            <a href="https://debrajkarmakar-25805.medium.com/" className="icon" target="blank"><FaMediumM className="social-icon"/></a>                          
                            <a href="https://kiwismedia.com/@debraj" className="icon" target="blank"><FaCode className="social-icon"/></a>
                        </div>
                        <br/>
                        <h6>Copyright &copy; 2021 | <a href="https://www.linkedin.com/in/debraj-karmakar-275570199/">Debraj Karmakar</a></h6>
                    </Modal.Body>
                </div>
            </Modal>
        );
}
