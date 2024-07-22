export interface GooglePlaceDetails {
    place_id: string
    name: string
    editorial_summary?: {
        overview: string
    }
    international_phone_number?: string
    current_opening_hours?: {
        weekday_text: string[]
    }
    address_components: {
        long_name: string
    }[]
    formatted_address?: string
    photos?: { photo_reference: string }[]
    types: string[]
    geometry?: {
        location: {
            lat: number
            lng: number
        }
    }
}