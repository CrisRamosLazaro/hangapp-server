import { Request, Response, NextFunction } from 'express'
import User from '@/models/UserModel'
import Spot from '@/models/SpotModel'
import placesApiHandler from '@/services/placesAPI.services'
import { constructFormattedPlace } from '@/helpers/constructFormattedPlace'
import { GooglePlaceDetails } from '@/types/googlePlaceDetails'

const getOneGooglePlace = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const { place_id } = req.params

    let photoOptions: string[] = []
    try {
        const { data: { result } } = await placesApiHandler.getPlaceDetails(place_id)
        const { photos } = result

        if (photos && photos.length > 0) {

            const photoUrls = await photos.slice(0, 5).map((photo: any) =>
                placesApiHandler.getPlacePhotos(photo.photo_reference)
                    .then(photoData => photoData.request.res.responseUrl)
            )

            photoOptions = await Promise.all(photoUrls)

        } else {
            photoOptions.push('https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg')
        }

        const formattedPlace = constructFormattedPlace(result as GooglePlaceDetails, photoOptions[0], photoOptions)

        res.json(formattedPlace)

    } catch (err: any) {
        next(err)
    }
}

const createSpot = (req: Request, res: Response, next: NextFunction) => {

    const {
        placeId,
        name,
        description,
        heroImg,
        photoOptions,
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
            heroImg,
            photoOptions,
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

const getOneSpot = async (req: Request, res: Response, next: NextFunction) => {

    const { spot_id } = req.params

    try {
        const response = await Spot
            .findById(spot_id)
            .populate({
                path: 'owner',
                select: '-password'
            })
            .populate("comments")
        if (!response) {
            return res.status(404).json({ message: 'Spot not found' })
        }
        res.json(response)

    } catch (err) {
        console.error(err)
    }
}

const addSpotToUserFaves = (req: Request, res: Response, next: NextFunction) => {

    const { spot_id } = req.params
    const { user_id } = req.body

    User
        .findByIdAndUpdate(user_id, { $addToSet: { faveSpots: spot_id } }, { new: true })
        .then(() => res.sendStatus(204))
        .catch(err => next(err))

}

const removeSpotFromUserFaves = (req: Request, res: Response, next: NextFunction) => {

    const { spot_id } = req.params
    const { user_id } = req.body

    User
        .findByIdAndUpdate(user_id, { $pull: { faveSpots: spot_id } }, { new: true })
        .then(() => res.sendStatus(204))
        .catch(err => next(err))

}

const getUserSpots = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    Spot
        .find({ owner: id })
        .then(userSpots => res.json(userSpots))
        .catch((err: any) => next(err))
}

const editSpot = (req: Request, res: Response, next: NextFunction) => {

    const { spot_id } = req.params
    const { userRating, userReview } = req.body

    Spot
        .findByIdAndUpdate(spot_id, { userRating, userReview }, { new: true })
        .then(spot => res.json(spot))
        .catch(err => next(err))
}

const deleteSpot = (req: Request, res: Response, next: NextFunction) => {

    const { spot_id } = req.params

    Spot
        .findOneAndDelete({ _id: spot_id })
        .then(() => res.sendStatus(204))
        .catch(err => {
            console.error(err)
            res.status(500).send('Internal server error deleting the spot')
        })
}


export {
    createSpot,
    getAllSpots,
    getOneGooglePlace,
    getOneSpot,
    getUserSpots,
    addSpotToUserFaves,
    removeSpotFromUserFaves,
    editSpot,
    deleteSpot
}