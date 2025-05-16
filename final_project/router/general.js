const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {

    const username = req.body.username;
    const password = req.body.password;
    if(username&&password){
        const present = users.filter((user)=> user.username === username)
        if(present.length===0){
            users.push({"username":req.body.username,"password":req.body.password});
            return res.status(201).json({message:"User successfully registered."})
        }
        else{
          return res.status(400).json({message:"Already exists"})
        }
    }
    else if(!username && !password){
      return res.status(400).json({message:"Bad request"})
    }
    else if(!username || !password){
      return res.status(400).json({message:"Check username and password"})
    }  
  
   
  });


// without Promise Get the book list available in the shop
// public_users.get('/',async (req, res) => {
//     res.send(JSON.stringify(books,null,4));  
//   });

// using Promise callbacks Get the book list available in the shop
public_users.get('/', (req, res) => {
    new Promise((resolve, reject) => {
        if (books) {
            resolve(books);
        } else {
            reject("Error: Books list not available");
        }
    })
    .then((bookList) => {
        res.status(200).send(JSON.stringify(bookList, null, 4));
    })
    .catch((error) => {
        res.status(500).json({ message: error });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const ISBN = req.params.isbn;

    const booksBasedOnIsbn = (ISBN) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const book = books[ISBN]; // Assuming books is an object where ISBNs are keys
                if (book) {
                    resolve(book);
                } else {
                    reject(new Error("Book not found"));
                }
            }, 1000);
        });
    };

    booksBasedOnIsbn(ISBN)
        .then((book) => res.json(book))
        .catch((err) => res.status(404).json({ error: err.message })); // Use 404 for not found
});



  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

   let new_books = {}
   const new_author = req.params.author;
   for(let bookid in books){
      if(books[bookid].author === new_author ){
        new_books= books[bookid];
      }
    }
     res.send(JSON.stringify(new_books));
  
});



// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let new_books = {}
  const new_title = req.params.title;
  for(let bookid in books){
     if(books[bookid].title === new_title ){
       new_books= books[bookid];
     }
   }
    res.send(JSON.stringify(new_books));
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  res.send(books[ISBN].reviews); 
});

module.exports.general = public_users;
