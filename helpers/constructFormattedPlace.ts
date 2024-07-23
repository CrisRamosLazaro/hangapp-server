import { GooglePlaceDetails } from "@/types/googlePlaceDetails"

export const constructFormattedPlace = (googlePlaceDetails: GooglePlaceDetails, photoUrl: string) => {

    const {
        place_id,
        name,
        editorial_summary,
        international_phone_number,
        current_opening_hours,
        address_components,
        formatted_address,
        // types,
        geometry,
    } = googlePlaceDetails

    return {
        placeId: place_id || 'data not available',
        name: name || 'data not available',
        description: editorial_summary?.overview || 'data not available',
        spotImg: photoUrl,
        // categories: types,
        phone: international_phone_number || 'data not available',
        openHours: current_opening_hours?.weekday_text || 'data not available',
        address: {
            city: address_components[2]?.long_name || 'data not available',
            streetAddress: formatted_address || 'data not available',
            location: {
                type: 'Point',
                coordinates: [
                    geometry?.location.lng || 0,
                    geometry?.location.lat || 0,
                ],
            },
        },
    }
}