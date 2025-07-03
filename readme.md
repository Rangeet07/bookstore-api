# Bookstore API

I built a RESTful API using Node.js and Express for a Bookstore app. It should support CRUD 
operations, file-based data persistence, and token-based user authentication. 

## SETUP instructions | Testing Endpoints

Installed Packages- `express jsonwebtoken bcryptjs uuid`

-First of all you must need to have [Nodejs](https://nodejs.org/en) installed in your system
1. Run the command on Vs code or other terminal then `npm install`  to install packages then `node app.js` to start the application
2. You may use POSTMAN or THUNDERCLIENT to test The API and all of the requests.
3. Test the API endpoints and requests respectively using Postman
   You need to be logged in to view the books.
   If you are not registered register yourself then login
   Register(POST)- `http://localhost:3000/api/auth/login`
   body(JSON) - `{ "username" : "username" , "password" : "password"}`
   Then login(POST) with the registered credentials `http://localhost:3000/api/auth/register` You will recieve a token
4. You need to be logged in to test other endpoints. Provide the Bearer
   token you get after logging in to test other endpoints

   1. Fetch List of all books(GET)- `http://localhost:3000/api/books`
   2. Get book by ID(GET)- `http://localhost:3000/api/books/:id`
   3. Add a new book(POST)- `http://localhost:3000/api/books/` 
      Provide body with book details example is below
    ```JSON
      {
    "title" : "Gullivers Travels",
    "author" : "Jonathan Swift",
    "genre" : "Thriller",
    "publishedYear" : 1820
     }
    ```
    The added book will be saved to books.json as
    ```JSON
     {
    "id": "auto-generated UUID",
    "title": "String",
    "author": "String",
    "genre": "String",
    "publishedYear": "Number",
    "userId": "ID of user who added the book"
    }
    ```
     ![Added book](./addbookssuccess.JPG)

     ### if the data type while adding book is incorrect book wont be added.it will throw an error
    ```JSON
     {
    "error": "Invalid book data. title, author, and genre must be strings. publishedYear must be a number."
    }
    ```
    ![Type Error](addbookdatatype.JPG)

   1. Update a book by ID(PUT)-`http://localhost:3000/api/books/:id`
      Send this PUT request with id of the book you want to update and 
      recieve the required book in the response and update it accordingly.Only user who added the book can update that book.
    ``` JSON
    {
    "title": "String",
    "author": "String",
    "genre": "String",
    "publishedYear": "Number",
    }
    ```
  1. Delete a book by ID(DELETE)- `http://localhost:3000/api/books/:id`
     Send this DELETE request with id of the book you want to delete.
     Only user who added the book can delete it
   

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

