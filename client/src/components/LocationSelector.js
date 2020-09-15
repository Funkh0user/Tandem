import React, { useState, useRef } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


const LocationSelector = ({handleSetLatLng}) => {
	const [coords, setCoords] = useState({ lat: '', lng: '', zoom: 2 });

	const [position, setPosition] = useState([coords.lat, coords.lng])
	
	//this function simultaneously updates the marker position on the map and sets the event location to state.
    const handleOnClick = (e) => {
		const myLatLng = e.latlng
		handleSetLatLng(myLatLng)
		setPosition([myLatLng.lat, myLatLng.lng])
		setCoords({...coords, zoom: e._zoom})
    }

	return (
		<Map center={position} zoom={coords.zoom} onClick={handleOnClick}>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={position}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</Map>
	);
};
 export default LocationSelector