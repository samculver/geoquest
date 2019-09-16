import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { navigate, graphql, Link } from "gatsby";
import styles from "../styles.module.scss";
import solidIcon from '../images/solidIcon.svg';
import { makeStyles } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-map-react'
import ModalContext, { ModalToggle, Modal } from "../context/modalContext"
//import GatsbyQuery from "../pages/questsList"



const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };



  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD4SADWp_Jb34U61H8mFrBimnutRBGqGLs" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >



<AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;