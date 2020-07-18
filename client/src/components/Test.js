/** @format */

import React, { useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const Test = ({handleSetLatLng}) => {
	console.log('trigger')
	const [coords, setCoords] = useState({ lat: '', lng: '', zoom: 2 });

    const position = [coords.lat, coords.lng];
    
    const handleOnClick = (e) => {
		console.log(e.latlng)
		const myLatLng = e.latlng
		handleSetLatLng(myLatLng)
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
 export default Test