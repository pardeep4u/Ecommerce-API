# Ecommerce API with Node js
![1_J3G3akaMpUOLegw0p0qthA](https://github.com/pardeep4u/Ecommerce-API/assets/64978605/3554ab6e-8a46-4aa3-af06-81ccf0523c0b)

Welcome to Ecommerce API ! This API allows you to manage products, user carts, and orders. It comes with features like database integration, authentication, error handling, and documentation.

## Features

1. **Database Integration:** This API integrates with a MongoDB database to store and manage product data, user cart information, and order details. It performs CRUD operations on products, cart items, and orders.

2. **Authentication Middleware and Security:** Sensitive API endpoints, such as cart management and order placement, are protected with authentication middleware. Only authenticated users are allowed to access these endpoints.

3. **User Authentication:** The API implements user authentication using JSON Web Tokens (JWT). Users can register, log in, and obtain a token to authenticate API requests.

4. **Error Handling:** The API includes robust error handling, ensuring meaningful error messages and appropriate status codes are returned when errors occur.

5. **Documentation:** Detailed API documentation is provided. You can explore the API endpoints, their functionalities, expected inputs, and outputs in the Postman documentation ( below Mentioned ).

6. **Rate Limiting :** API rate limiting is implemented to prevent abuse and maintain server stability. Requests are limited to a specific rate ( 25 Request per 5 minutes ), preventing excessive usage.

## Getting Started

1. Install required dependencies using `npm install`.

2. **Database Setup:**

   - Set up your MongoDB database.
   - Create a `.env` file in the root directory of your project.
   - In the `.env` file, add the following configurations:

     ```

     JWT_SECRET=your_secret_key
     PORT=3000
     MONGODB=your_mongodb_connection_string

     ```

   - Replace `your_secret_key` with a secure JWT secret key.
   - Replace `your_mongodb_connection_string` with the connection string to your MongoDB database.

3. Start the API server using `npm start`.

4. Use Below Mentioned Postman Link to Check API Documentation.

## API Endpoints

- **POST /auth/signup:** Register a new user.
- **POST /auth/login:** Log in and obtain an authentication token.
- **GET /all-products:** Fetch list of all products.
- **GET /single-product/:id:** Fetch details of a specific product.
- **GET /get-all-categories:** Fetch all Categories from Products.
- **POST /cart/add:** Add a product to the user's cart.
- **PUT /cart/decrease/:** Decrease the quantity of a product in the cart.
- **GET /cart/show:** Fetch the user's cart.
- **POST /order/place** Place an order based on the products in the cart.
- **GET /order/get-order-detail/:orderId:** Fetch specific order detail made by a specific user.
- **GET /order/show:** Fetch all the orders from a specific user.

## Authentication

To access secure endpoints, provide an authentication token in the request headers. Obtain a token by registering and logging in as a user.

## Rate Limiting

The API implements rate limiting to prevent abuse. Requests are limited to a specific rate within a time window.

## Contributing

Contributions are welcome! If you find a bug or want to suggest an improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
