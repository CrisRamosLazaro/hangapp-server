import { Request, Response, NextFunction } from 'express'
// const placesApiHandler = require('../services/places.services')
// const photosPlacesApiHandler = require('../services/photos.places.services')
import User from '@/models/UserModel'
import Spot from '@/models/SpotModel'

const createSpot = (req: Request, res: Response, next: NextFunction) => {

    const {
        placeId,
        name,
        description,
        spotImg,
        photoReference,
        category,
        phone,
        openHours,
        city,
        streetAddress,
        latitude,
        longitude,
        userRating,
        userReview,
        owner,
        comment
    } = req.body

    const address = {
        city: city,
        streetAddress: streetAddress,
        location: {
            type: 'Point',
            coordinates: [latitude, longitude]
        }
    }

    let comments: string[]
    comment === '' ? comments = [] : comments = [comment]

    Spot
        .create({
            placeId,
            name,
            description,
            spotImg,
            photoReference,
            category,
            phone,
            openHours,
            address,
            userRating,
            userReview,
            owner,
            comments
        })
        .then(response => res.sendStatus(204))
        .catch(err => next(err))
}

const getAllSpots = (req: Request, res: Response, next: NextFunction) => {

    Spot
        .find()
        .sort({ name: 1 })
        .then(spots => {
            if (!spots) {
                return res.status(404).json({ message: 'No spots found' })
            }
            res.json(spots)
        })
        .catch(err => {
            console.error(err)
            next(err)
        })
}

// const getOneSpot = (req: Request, res: Response, next: NextFunction) => {

//     const { id } = req.params

//     return placesApiHandler
//         .getDetailsPlace(id)
//         .then(({ data: { result } }) => result)
//         .then((placesDetailsResult) => {
//             const {
//                 place_id,
//                 name,
//                 editorial_summary,
//                 photos,
//                 international_phone_number,
//                 current_opening_hours,
//                 address_components,
//                 formatted_address,
//                 geometry
//             } = placesDetailsResult

//             return photosPlacesApiHandler
//                 .getPhotosPlaces(placesDetailsResult.photos[0].photo_reference)
//                 .then((photoPlacesResult) => {

//                     const urlPhotoResult = photoPlacesResult.request.res.responseUrl

//                     const formattedPlace = {
//                         placeId: place_id || 'data not available',
//                         name: '',
//                         description: editorial_summary?.overview || 'data not available',
//                         placeImg: '',
//                         photoReference: urlPhotoResult || 'data not available',
//                         type: '',
//                         phone: international_phone_number || 'data not available',
//                         weekDay: current_opening_hours?.weekday_text || 'data not available',
//                         city: address_components[2]?.long_name || 'data not available',
//                         address: formatted_address || 'data not available',
//                         latitude: geometry?.location.lat || 'data not available',
//                         longitude: geometry?.location.lng || 'data not available',
//                         userRating: '',
//                         userOpinion: '',
//                         owner: '',
//                         comments: []
//                     }

//                     res.json(formattedPlace)

//                 })

//         })
//         .catch((err: any) => next(err))

// }

const getUserSpots = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    Spot
        .find({ owner: id })
        .then(userSpots => res.json(userSpots))
        .catch((err: any) => next(err))
}

const getSpotInfo = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    Spot
        .findById(id)
        .populate("owner")
        .then(spot => res.json(spot))
        .catch(err => next(err))

}

const addFavouritesPlace = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    const { _id } = req.body

    User
        .findByIdAndUpdate(_id, { $addToSet: { faveSpots: id } }, { new: true })
        .then(() => res.sendStatus(204))
        .catch(err => next(err))

}

const removefavouritesPlace = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    const { _id } = req.body

    User
        .findByIdAndUpdate(_id, { $pull: { faveSpots: id } }, { new: true })
        .then(() => res.sendStatus(204))
        .catch(err => next(err))

}

const editSpot = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    const { category, userRating, userReview } = req.body

    Spot
        .findByIdAndUpdate(id, { category, userRating, userReview }, { new: true })
        .then(spot => res.json(spot))
        .catch(err => next(err))

}

// const deleteSpot = (req: Request, res: Response, next: NextFunction) => {

//     const { id } = req.params

//     Spot
//         .findByIdAndDelete(id)
//         .then((spot) => spot)
//         .then((deletedSpot) => {

//             deleteSpot.comments.map((commentId) => {
//                 Comment
//                     .findByIdAndDelete(commentId)
//                     .then((result) => result)
//                     .catch(err => next(err))
//             })
//         })
//         .then((result) => res.sendStatus(204))
//         .catch(err => console.log(err))




// }


export {
    createSpot,
    getAllSpots,
    // getOneSpot,
    getUserSpots,
    getSpotInfo,
    addFavouritesPlace,
    removefavouritesPlace,
    editSpot,
    // deleteSpot
}