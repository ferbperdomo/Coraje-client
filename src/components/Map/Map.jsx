import { React, useState } from "react"
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api"
import { Link } from "react-router-dom"
import mapStyles from './mapStyles'

function Map({ places, geoLocation }) {

    const [activeMarker, setActiveMarker] = useState(null)

    const handleActiveMarker = (place_id) => {
        if (place_id === activeMarker) { return }
        setActiveMarker(place_id)
    }

    return (
        <div className="markerMap">

            <GoogleMap
                zoom={14}
                center={geoLocation}
                options={{ styles: mapStyles.purpleRain }}
                onClick={() => setActiveMarker(null)}
                mapContainerStyle={{ width: '70%', height: "50vh", marginLeft: "15%" }}>
                {places.map(({ _id, name, location, type }) => (
                    <Marker
                        key={_id}
                        position={
                            {
                                lat: parseFloat(location.coordinates[0]),
                                lng: parseFloat(location.coordinates[1])
                            }
                        }
                        onClick={() => handleActiveMarker(_id)}>
                        {activeMarker === _id ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                <div className="placeLink"><Link to={`/detalles/${_id}`}>{name}</Link><br />{type}</div>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                ))}
            </GoogleMap>
        </div>

    )
}

export default Map
