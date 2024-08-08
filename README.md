<h1>
  <img src="https://github.com/crisramoslazaro/hangapp-client/raw/main/public/favicon.ico" alt="Logo" width="30" height="30">
  Hangapp
</h1>
<hr/>
Hangapp is a *work-in-progress* full-stack MERN application contained in 2 repositories:

- [hangapp-client](https://github.com/crisramoslazaro/hangapp-client): front-end
- [hangapp-server](https://github.com/crisramoslazaro/hangapp-server): back-end

### hangapp-client basics
- Vite bootstrap
- Typescript + TailwindCSS
- [i18next](https://www.i18next.com/) translation
- Message Context created for native Toasts
  
### hangapp-server basics

- Express + Mongoose + Typescript configuration
- jwt password hashing
- GooglePlaces API integration

<hr/>

## Google Places API integration

This app uses [react-places-autocomplete](https://github.com/hibiken/react-places-autocomplete) to allow the user to search for Google Places.

1) Once a Google Place is selected, a call to the `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}` endpoint is made.
   </br>

2) A check is made to verify that the data result contains a "photos" property and that it's an array with length > 0.

`?` If that's the case, a call to the `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photo_reference=${photo_reference}&key=${apiKey}` endpoint is made, and the first 5 photo URLs are copied into our photoOptions array.

`:` If not, a default "no image found" photo is pushed into the photoOptions array.

3) Then a "formatted place" object is built, containing the following Google Place details from the data result:
   - place_id
   - name
   - editorial_summary
   - international_phone_number
   - current_opening_hours
   - address_components
   - formatted_address
   - geometry
   - ... plus the photoOptions array and a heroImg property containing the 1st URL in the array.
</br>
  
4) This object is sent back to the client and populates the Spot Creation form fields that are unrelated to the creator.
   (the creator populates other fields:
   - their own review of the place
   - their rating
   - and they can choose from the 5 photos displayed which one will be the heroImg) 

<hr/>

## Api endpoints

### Auth Routes

Base URL `/api/auth`

| HTTP Method 	| URI path      	   | Description              |
|-------------	|---------------	   |--------------------------|
| POST         	| `/signup`            | Signup user              |
| POST         	| `/login`             | Login user               |
| GET         	| `/verify`            | Verify auth token        |


### User Routes

Base URL `/api/users`

| HTTP Method 	| URI path      	  | Description               |
|-------------	|---------------	  |---------------------------|
| GET         	| `/all-users`      | Gets all users            |
| GET         	| `/:id`              | Gets one user             |
| PUT          	| `/:id/edit`         | Upadates user             |
| DELETE        | `/:id/delete`       | Deletes user              |


### Spot Routes

Base URL `/api/spots`

| HTTP Method 	| URI path      	  | Description               |
|-------------	|---------------	  |---------------------------|
| POST         	| `/create-spot`      | Creates new spot          |
| GET         	| `/all-spots`        | Gets all spots            |
| GET         	| `/:spot_id`         | Gets spot by id           |
| PUT         	| `/:spot_id/edit`    | Updates spot by id        |
| PUT      	| `/:spot_id/add-to-faves`   | Adds spot to user favorites |
| PUT      	| `/:spot_id/remove-from-faves`   | Removes spot from user favorites |
| DELETE        | `/:spot_id/delete`       | Deletes spot              |
| GET         	| `/get-one-google-place/:place_id`  | Gets the details of a Google Place and creates a "formatted place" object with data that will be used in `/create-spot`           |

### Comment routes

Base URL `/api/spots`

| METHOD | URI Path                                | Description                 |
| ------ | --------------------------------------- | --------------------------- |
| POST   | `/:spot_id/create-comment`              | Create new comment          |
| GET    | `/:spot_id/comments`                    | Gets all comments of a spot |
| PUT    | `/:spot_id/comments/:comment_id/edit`   | Edits comment               |
| DELETE | `/:spot_id/comments/:comment_id/delete` | Deletes comment             |


### Group routes

Base URL `/api/groups`

| METHOD | URI Path       | Description    |
| ------ | -------------- | -------------- |
| GET    | `/`            | Get all groups |
| GET    | `/:id `        | Get one group  |
| POST   | `/create`      | Create group   |
| PUT    | `/:id/join `   | Join group     |
| POST   | `/:id/unjoin ` | Unjoin group   |
| DELETE | `/:id/delete ` | Delete group   |

<hr/>

## Error Handling specifics
- **401**:
  - **On login**: Displays a UI message indicating the user provided incorrect login credentials
  - **When the jwt token expires**: Navigates the user back to the login page and displays a message indicating the session expired and they must login again. 
- **404**: Displays a UI "page not found" message
- **409**: Displays a UI message indicating which specific data provided by the user is duplicated
- **Front-end**:
  - **"Mandatory field"** check and respective UI message under the field
  - **"Confirm password"** check and UI message

<hr/>

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/crisramoslazaro/hangapp-client.git
cd hangapp-server
```

Install dependencies:
```bash
npm install
```

Create a .env file based on the .env.example and configure the necessary environment variables.

Run the development server:
```bash
npm run dev
```
<hr/>

## Environment Configuration
The application requires several environment variables to be set.
The .env.example file provides a template for these variables:

**hangapp-client**
```bash
VITE_API_URL=http://localhost:5005/api
```

**hangapp-server**
```bash
PORT=5005
ORIGIN=http://localhost:5173
MONGODB_URI=your_mongo_uri
TOKEN_SECRET=your_jwt_token_secret
GOOGLE_API_KEY=your_google_api_key
```