* # User Registration Endpoint
 * ## POST /users/register

 * ### Description
 * This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.
 
 * ### Request Body
 * The request body should be a JSON object with the following properties:
 * - `fullname`: An object containing:
 *   - `firstname` (string, required): The user's first name. Must be at least 3 characters long.
 *   - `lastname` (string, optional): The user's last name. Must be at least 3 characters long if provided.
 * - `email` (string, required): The user's email address. Must be a valid email format.
 * - `password` (string, required): The user's password. Must be at least 6 characters long.
 
 * Example:
 * ```json
 * {
 *   "fullname": {
 *     "firstname": "John",
 *     "lastname": "Doe"
 *   },
 *   "email": "john.doe@example.com",
 *   "password": "password123"
 * }
 * ```
 
 * ### Responses
 
 * #### Success
 * - **Status Code**: 201 Created
 * - **Response Body**: A JSON object containing the authentication token and user details.
 * ```json
 * {
 *   "token": "jwt_token_here",
 *   "user": {
 *     "_id": "user_id_here",
 *     "fullName": {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     },
 *     "email": "john.doe@example.com"
 *   }
 * }
 * ```

 * # User login Endpoint

 * ## POST /users/login

 * ### Description
 * This endpoint is used to log in an existing user. It requires the user's email and password.

 * ### Request Body
 * The request body should be a JSON object with the following properties:
 * - `email` (string, required): The user's email address. Must be a valid email format.
 * - `password` (string, required): The user's password. Must be at least 6 characters long.
 
 * Example:
 * ```json
 * {
 *   "email": "john.doe@example.com",
 *   "password": "password123"
 * }
 * ```

 * ### Responses

 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing the authentication token and user details.
 * ```json
 * {
 *   "token": "jwt_token_here",
 *   "user": {
 *     "_id": "user_id_here",
 *     "fullName": {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     },
 *     "email": "john.doe@example.com"
 *   }
 * }
 * ```
 
 * # User Profile Endpoint
 
 * ## GET  /users/profile
 
 * ### Description
 * This endpoint is used to retrieve the profile of the authenticated user.
 *
 * ### Request Headers
 * - `Authorization` (string, required): The user's JWT token.
 
 * ### Responses
 
 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing the user's profile details.
 * ```json
 * {
 *   "_id": "user_id_here",
 *   "fullName": {
 *     "firstname": "John",
 *     "lastname": "Doe"
 *   },
 *   "email": "john.doe@example.com"
 * }
 * ```
 
 * # User Logout Endpoint
 
 * ## GET /users/logout
 
 * ### Description
 * This endpoint is used to log out the authenticated user.
 
 * ### Request Headers
 * - `Authorization` (string, required): The user's JWT token.
 
 * ### Responses
 
 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing a success message.
 * ```json
 * {
 *   "message": "Logged out successfully"
 * }
 * ```
 
 * # Captain Registration Endpoint
 
 * ## POST /captains/register
 
 * ### Description
 * This endpoint is used to register a new captain. It requires the captain's first name, last name, email, password, and vehicle details.
 *
 * ### Request Body
 * The request body should be a JSON object with the following properties:
 * - `fullname`: An object containing:
 *   - `firstname` (string, required): The captain's first name. Must be at least 3 characters long.
 *   - `lastname` (string, required): The captain's last name. Must be at least 3 characters long.
 * - `email` (string, required): The captain's email address. Must be a valid email format.
 * - `password` (string, required): The captain's password. Must be at least 6 characters long.
 * - `vehicle`: An object containing:
 *   - `color` (string, required): The vehicle's color. Must be at least 3 characters long.
 *   - `plate` (string, required): The vehicle's plate number. Must be at least 3 characters long.
 *   - `capacity` (number, required): The vehicle's capacity. Must be a number.
 *   - `vehicleType` (string, required): The type of vehicle. Must be one of 'car', 'motorcycle', or 'auto'.
 
 * Example:
 * ```json
 * {
 *   "fullname": {
 *     "firstname": "Jane",
 *     "lastname": "Doe"
 *   },
 *   "email": "jane.doe@example.com",
 *   "password": "password123",
 *   "vehicle": {
 *     "color": "red",
 *     "plate": "ABC123",
 *     "capacity": 4,
 *     "vehicleType": "car"
 *   }
 * }
 * ```
 
 * ### Responses
 
 * #### Success
 * - **Status Code**: 201 Created
 * - **Response Body**: A JSON object containing the captain details.
 * ```json
 * {
 *   "_id": "captain_id_here",
 *   "fullname": {
 *     "firstname": "Jane",
 *     "lastname": "Doe"
 *   },
 *   "email": "jane.doe@example.com",
 *   "vehicle": {
 *     "color": "red",
 *     "plate": "ABC123",
 *     "capacity": 4,
 *     "vehicleType": "car"
 *   }
 * }
 * ```

 * # Captain Login Endpoint

 * ## POST /captains/login

 * ### Description
 * This endpoint is used to log in an existing captain. It requires the captain's email and password.

 * ### Request Body
 * The request body should be a JSON object with the following properties:
 * - `email` (string, required): The captain's email address. Must be a valid email format.
 * - `password` (string, required): The captain's password. Must be at least 6 characters long.
 
 * Example:
 * ```json
 * {
 *   "email": "jane.doe@example.com",
 *   "password": "password123"
 * }
 * ```

 * ### Responses

 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing the authentication token and captain details.
 * ```json
 * {
 *   "token": "jwt_token_here",
 *   "captain": {
 *     "_id": "captain_id_here",
 *     "fullname": {
 *       "firstname": "Jane",
 *       "lastname": "Doe"
 *     },
 *     "email": "jane.doe@example.com",
 *     "vehicle": {
 *       "color": "red",
 *       "plate": "ABC123",
 *       "capacity": 4,
 *       "vehicleType": "car"
 *     }
 *   }
 * }
 * ```

 * # Captain Profile Endpoint
 
 * ## GET  /captains/profile
 
 * ### Description
 * This endpoint is used to retrieve the profile of the authenticated captain.
 *
 * ### Request Headers
 * - `Authorization` (string, required): The captain's JWT token.
 
 * ### Responses
 
 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing the captain's profile details.
 * ```json
 * {
 *   "_id": "captain_id_here",
 *   "fullname": {
 *     "firstname": "Jane",
 *     "lastname": "Doe"
 *   },
 *   "email": "jane.doe@example.com",
 *   "vehicle": {
 *     "color": "red",
 *     "plate": "ABC123",
 *     "capacity": 4,
 *     "vehicleType": "car"
 *   }
 * }
 * ```

 * # Captain Logout Endpoint
 
 * ## GET /captains/logout
 
 * ### Description
 * This endpoint is used to log out the authenticated captain.
 
 * ### Request Headers
 * - `Authorization` (string, required): The captain's JWT token.
 
 * ### Responses
 
 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing a success message.
 * ```json
 * {
 *   "message": "Logged out successfully"
 * }
 * ```

* # Get Coordinates Endpoint
 * ## GET /maps/get-coordinates
 * ### Description
 * This endpoint is used to get the coordinates (latitude and longitude) of a given address.
 * ### Request Parameters
 * - `address` (string, required): The address to get coordinates for. Must be at least 3 characters long.
 * ### Responses
 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing the latitude and longitude of the address.
 * ```json
 * {
 *   "ltd": 37.7749,
 *   "lng": -122.4194
 * }
 * ```
 * #### Error
 * - **Status Code**: 400 Bad Request
 * - **Response Body**: A JSON object containing the error message.
 * ```json
 * {
 *   "errors": [
 *     {
 *       "msg": "Invalid value",
 *       "param": "address",
 *       "location": "query"
 *     }
 *   ]
 * }
 * ```
 * - **Status Code**: 404 Not Found
 * - **Response Body**: A JSON object containing the error message.
 * ```json
 * {
 *   "message": "Coordinates not found"
 * }
 * ```

* # Get Distance and Time Endpoint
 * ## GET /maps/get-distance-time
 * ### Description
 * This endpoint is used to get the distance and time between an origin and a destination.
 * ### Request Parameters
 * - `origin` (string, required): The starting point. Must be at least 3 characters long.
 * - `destination` (string, required): The ending point. Must be at least 3 characters long.
 * ### Responses
 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing the distance and time between the origin and destination.
 * ```json
 * {
 *   "distance": {
 *     "text": "5.3 km",
 *     "value": 5300
 *   },
 *   "duration": {
 *     "text": "15 mins",
 *     "value": 900
 *   }
 * }
 * ```
 * #### Error
 * - **Status Code**: 400 Bad Request
 * - **Response Body**: A JSON object containing the error message.
 * ```json
 * {
 *   "errors": [
 *     {
 *       "msg": "Invalid value",
 *       "param": "origin",
 *       "location": "query"
 *     },
 *     {
 *       "msg": "Invalid value",
 *       "param": "destination",
 *       "location": "query"
 *     }
 *   ]
 * }
 * ```
 * - **Status Code**: 500 Internal Server Error
 * - **Response Body**: A JSON object containing the error message.
 * ```json
 * {
 *   "message": "Internal server error"
 * }
 * ```

* # Get AutoComplete Suggestions Endpoint
 * ## GET /maps/get-suggestions
 * ### Description
 * This endpoint is used to get autocomplete suggestions for a given input.
 * ### Request Parameters
 * - `input` (string, required): The input to get suggestions for. Must be at least 3 characters long.
 * ### Responses
 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON array containing the autocomplete suggestions.
 * ```json
 * [
 *   {
 *     "description": "San Francisco, CA, USA",
 *     "place_id": "ChIJIQBpAG2ahYAR_6128GcTUEo"
 *   },
 *   {
 *     "description": "San Francisco International Airport (SFO), San Francisco, CA, USA",
 *     "place_id": "ChIJVVVVVQK6j4ARzZ1iZ1k9b7g"
 *   }
 * ]
 * ```
 * #### Error
 * - **Status Code**: 400 Bad Request
 * - **Response Body**: A JSON object containing the error message.
 * ```json
 * {
 *   "errors": [
 *     {
 *       "msg": "Invalid value",
 *       "param": "input",
 *       "location": "query"
 *     }
 *   ]
 * }
 * ```
 * - **Status Code**: 500 Internal Server Error
 * - **Response Body**: A JSON object containing the error message.
 * ```json
 * {
 *   "message": "Internal server error"
 * }
 * ```

* # Create Ride Endpoint
 * ## POST /rides/create
 * ### Description
 * This endpoint is used to create a new ride. It requires the user's pickup location, destination, and vehicle type.
 * ### Request Body
 * The request body should be a JSON object with the following properties:
 * - `pickup` (string, required): The pickup location. Must be at least 3 characters long.
 * - `destination` (string, required): The destination location. Must be at least 3 characters long.
 * - `vehicleType` (string, required): The type of vehicle. Must be one of 'auto', 'car', or 'moto'.
 * Example:
 * ```json
 * {
 *   "pickup": "123 Main St",
 *   "destination": "456 Elm St",
 *   "vehicleType": "car"
 * }
 * ```
 * ### Responses
 * #### Success
 * - **Status Code**: 201 Created
 * - **Response Body**: A JSON object containing the ride details.
 * ```json
 * {
 *   "_id": "ride_id_here",
 *   "user": "user_id_here",
 *   "pickup": "123 Main St",
 *   "destination": "456 Elm St",
 *   "fare": 100,
 *   "status": "pending",
 *   "otp": "123456"
 * }
 * ```

* # Get Fare Endpoint
 * ## GET /rides/get-fare
 * ### Description
 * This endpoint is used to get the fare estimate for a ride. It requires the pickup and destination locations.
 * ### Request Parameters
 * - `pickup` (string, required): The pickup location. Must be at least 3 characters long.
 * - `destination` (string, required): The destination location. Must be at least 3 characters long.
 * Example:
 * ```
 * /rides/get-fare?pickup=123%20Main%20St&destination=456%20Elm%20St
 * ```
 * ### Responses
 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing the fare estimate for different vehicle types.
 * ```json
 * {
 *   "auto": 50,
 *   "car": 100,
 *   "moto": 30
 * }
 * ```

* # Confirm Ride Endpoint
 * ## POST /rides/confirm
 * ### Description
 * This endpoint is used to confirm a ride. It requires the ride ID.
 * ### Request Body
 * The request body should be a JSON object with the following properties:
 * - `rideId` (string, required): The ID of the ride to confirm. Must be a valid MongoDB ObjectId.
 * Example:
 * ```json
 * {
 *   "rideId": "ride_id_here"
 * }
 * ```
 * ### Responses
 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing the confirmed ride details.
 * ```json
 * {
 *   "_id": "ride_id_here",
 *   "user": "user_id_here",
 *   "pickup": "123 Main St",
 *   "destination": "456 Elm St",
 *   "fare": 100,
 *   "status": "accepted",
 *   "captain": "captain_id_here",
 *   "otp": "123456"
 * }
 * ```

* # Start Ride Endpoint
 * ## GET /rides/start-ride
 * ### Description
 * This endpoint is used to start a ride. It requires the ride ID and OTP.
 * ### Request Parameters
 * - `rideId` (string, required): The ID of the ride to start. Must be a valid MongoDB ObjectId.
 * - `otp` (string, required): The OTP for the ride. Must be a 6-digit string.
 * Example:
 * ```
 * /rides/start-ride?rideId=ride_id_here&otp=123456
 * ```
 * ### Responses
 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing the started ride details.
 * ```json
 * {
 *   "_id": "ride_id_here",
 *   "user": "user_id_here",
 *   "pickup": "123 Main St",
 *   "destination": "456 Elm St",
 *   "fare": 100,
 *   "status": "ongoing",
 *   "captain": "captain_id_here",
 *   "otp": "123456"
 * }
 * ```

* # End Ride Endpoint
 * ## POST /rides/end-ride
 * ### Description
 * This endpoint is used to end a ride. It requires the ride ID.
 * ### Request Body
 * The request body should be a JSON object with the following properties:
 * - `rideId` (string, required): The ID of the ride to end. Must be a valid MongoDB ObjectId.
 * Example:
 * ```json
 * {
 *   "rideId": "ride_id_here"
 * }
 * ```
 * ### Responses
 * #### Success
 * - **Status Code**: 200 OK
 * - **Response Body**: A JSON object containing the ended ride details.
 * ```json
 * {
 *   "_id": "ride_id_here",
 *   "user": "user_id_here",
 *   "pickup": "123 Main St",
 *   "destination": "456 Elm St",
 *   "fare": 100,
 *   "status": "completed",
 *   "captain": "captain_id_here",
 *   "otp": "123456"
 * }
 * ```
