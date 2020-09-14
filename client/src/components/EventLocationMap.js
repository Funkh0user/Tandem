// @flow

import React from 'react'
import { Map, TileLayer, Marker, Popup } from "react-leaflet"


class EventLocationMap extends React.Component {
    constructor(props) {
      super(props)
      console.log(props)
      const coords = this.props.coords
      this.state = {
        lat: coords.lat,
        lng: coords.lng,
        zoom: 8
      }
    }
    render() {
      console.log(this.props)
      const position = [this.state.lat, this.state.lng];
      return (
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      );
    }
  }
  
export default EventLocationMap  