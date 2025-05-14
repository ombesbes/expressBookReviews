const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',async (req, res) => {
    res.send(JSON.stringify(books,null,4));
   
  });
  

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) =>{
    
    const ISBN = req.params.isbn;
    const booksBasedOnIsbn = (ISBN) => {
        return new Promise((resolve,reject) =>{
          setTimeout(() =>{
            const book = books.find((b) => b.isbn === ISBN);
            if(book){
              resolve(book);
            }else{
              reject(new Error("Book not found"));
            }},1000);
        });
    
            
    }
    booksBasedOnIsbn(ISBN).then((book) =>{
      res.json(book);
    }).catch((err)=>{
      res.status(400).json({error:"Book not found"})
    });
     res.send(books[ISBN]);    
   
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
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
