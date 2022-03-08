import { React, useState } from "react"
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api"
import { Link } from "react-router-dom"

function Map({ places, geoLocation }) {

    const [activeMarker, setActiveMarker] = useState(null)

    const handleActiveMarker = (place_id) => {
        if (place_id === activeMarker) { return }
        setActiveMarker(place_id)
    }

    return (

        <GoogleMap
            zoom={16}
            center={geoLocation}
            onClick={() => setActiveMarker(null)}

            mapContainerStyle={{ width: "85vw", height: "50vh" }}>
            {places.map(({ _id, name, location }) => (
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
                            <div><Link to={`/detalles/${_id}`}>{name}</Link></div>
                        </InfoWindow>
                    ) : null}
                </Marker>
            ))}
        </GoogleMap>
    )
}

export default Map
