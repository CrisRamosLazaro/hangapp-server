import axios, { AxiosInstance } from 'axios'
const apiKey = process.env.GOOGLE_API_KEY

class PlacesApiHandler {

    private axiosApp: AxiosInstance

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/place'
        })
    }

    getPlaceDetails(place_id: string) {
        return this.axiosApp.get(`details/json?place_id=${place_id}&key=${apiKey}`)
    }

    getPlacePhotos(photo_reference: string) {
        return this.axiosApp.get(`/photo?maxwidth=500&photo_reference=${photo_reference}&key=${apiKey}`)
    }

}

const placesApiHandler = new PlacesApiHandler()

export default placesApiHandler