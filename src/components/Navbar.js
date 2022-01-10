import React from 'react'
import './Navbar.css';
import logo from './air-quality.png'

function Navbar(props) {
    let locationCoords=props.locationCoords;
    return (
        <div className='navbar-main'>
            <div className='logo-main'><span ><img className='logo-img' src={logo} alt='img'/></span>AirQ</div>
            <div className='locationCoords'>
                <div className='locationCoords-heading'>
                 Showing data for Coordinates of:
                </div>
                <div className='locationCoords-body'>
                    {locationCoords[0]}, {locationCoords[1]}
                </div>
                 
            </div>
        </div>
    )
}

export default Navbar
