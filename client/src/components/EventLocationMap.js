// @flow

import React from 'react'
import { Map, TileLayer, Marker, Popup } from "react-leaflet"


class EventLocationMap extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        lat: this.props.coords.lat,
        lng: this.props.coords.lng,
        zoom: 13
      }
    }
    render() {
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