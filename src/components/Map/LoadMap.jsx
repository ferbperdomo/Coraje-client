import { useLoadScript } from "@react-google-maps/api"
import Map from "./Map"
import { useEffect, useState } from "react"
import Geocode from "react-geocode"
Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`)
Geocode.setLanguage("es")
Geocode.setRegion("es")
Geocode.setLocationType("ROOFTOP")

export function LoadMap({ places, placeSearched }) {

    const [placeGeolocation, setPlaceGeolocation] = useState({ lat: 40.42532590270769, lng: -3.7022046234418 })

    useEffect(() => {
        getPlaceLocation()
    }, [placeSearched])

    const getPlaceLocation = () => {

        Geocode.fromAddress(placeSearched).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location
                setPlaceGeolocation({ lat, lng })
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${process.env.REACT_APP_MAPS_API_KEY}`

    })

    return isLoaded ? <Map places={places} geoLocation={placeGeolocation} /> : null
}
