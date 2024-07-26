import { Request, Response, NextFunction } from 'express'
import User from '@/models/UserModel'
import Spot from '@/models/SpotModel'
import placesApiHandler from '@/services/placesAPI.services'
import { constructFormattedPlace } from '@/helpers/constructFormattedPlace'
import { GooglePlaceDetails } from '@/types/googlePlaceDetails'

const createSpot = (req: Request, res: Response, next: NextFunction) => {

    const {
        placeId,
        name,
        description,
        spotImg,
        categories,
        phone,
        openHours,
        address,
        userRating,
        userReview,
        owner,
        comment
    } = req.body

    let comments: string[]
    comment === '' ? comments = [] : comments = [comment]

    Spot
        .create({
            placeId,
            name,
            description,
            spotImg,
            categories,
            phone,
            openHours,
            address,
            userRating,
            userReview,
            owner,
            comments
        })
        .then(() => res.sendStatus(204))
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

const getOneSpot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const { place_id } = req.params

    try {
        const { data: { result } } = await placesApiHandler.getPlaceDetails(place_id)
        const { photos } = result

        if (photos && photos.length > 0) {

            const photoResult = await placesApiHandler.getPlacePhotos(photos[0].photo_reference)
            const url1stPhoto = photoResult.request.res.responseUrl
            const formattedPlace = constructFormattedPlace(result as GooglePlaceDetails, url1stPhoto)
            res.json(formattedPlace)

        } else {
            const urlDefaultPhoto = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'

            const formattedPlace = constructFormattedPlace(result as GooglePlaceDetails, urlDefaultPhoto)

            res.json(formattedPlace)
        }

    } catch (err: any) {
        next(err)
    }
}

const getSpotFullInfo = async (req: Request, res: Response, next: NextFunction) => {

    const { spot_id } = req.params

    try {
        const response = await Spot
            .findById(spot_id)
            .populate("owner")
            .populate("comments")
        if (!response) {
            return res.status(404).json({ message: 'Spot not found' })
        }
        res.json(response)

    } catch (err) {
        console.error(err)
        next(err)
    }
}

const getUserSpots = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    Spot
        .find({ owner: id })
        .then(userSpots => res.json(userSpots))
        .catch((err: any) => next(err))
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

    const { spot_id } = req.params
    const { category, userRating, userReview } = req.body

    Spot
        .findByIdAndUpdate(spot_id, { category, userRating, userReview }, { new: true })
        .then(spot => res.json(spot))
        .catch(err => next(err))

}

const deleteSpot = (req: Request, res: Response, next: NextFunction) => {

    const { spot_id } = req.params

    Spot
        .findByIdAndDelete(spot_id)
        // .then((spot) => spot)
        // .then((deletedSpot) => {

        //     deleteSpot.comments.map((commentId) => {
        //         Comment
        //             .findByIdAndDelete(commentId)
        //             .then((result) => result)
        //             .catch(err => next(err))
        //     })
        // })
        .then(() => res.sendStatus(204))
        .catch(err => console.error(err))
}


export {
    createSpot,
    getAllSpots,
    getOneSpot,
    getSpotFullInfo,
    getUserSpots,
    addFavouritesPlace,
    removefavouritesPlace,
    editSpot,
    deleteSpot
}