# bookstore
##### follow this steps to run this sevrever
  - clone this server into you local machine
  - if you have nodemon installed and gave "nodemon app.js" in package.json then give npm start, or give node app.js to run this server
  - this server have following api routes
        - http://localhost:3000/login/fp  (post request for getting forgot password link in mail)
        - http://localhost:3000/login/ (post request for verifying email and password and allowing user into the site)
        -  http://localhost:3000/login/new (post request for creating new admin)
        -  http://localhost:3000/login/newPassword/:email (patch request for updating new pssword)
        - http://localhost:3000/generes/ (get reuest for getting all geners from genere table)
        - http://localhost:3000/generes/ (post reuest for new geners from genere table)
         - http://localhost:3000/generes/:id (get reuest for particular geners from genere table)
         - http://localhost:3000/books/ (get reuest for getting all books and details of author and genere from book table)
        - http://localhost:3000/books/ (post reuest for new book )
         - http://localhost:3000/books/:id (get reuest for particular book and getting author and genere details of particular book)
         - http://localhost:3000/books/:id (put reuest for updating book)
         - http://localhost:3000/books/:id (delete reuest for deleting book)
         - http://localhost:3000/authors/ (get reuest for getting all authors)
        - http://localhost:3000/authors/ (post reuest for new author )
         - http://localhost:3000/authors/:id (get reuest for particular author)
         - http://localhost:3000/authors/:id (put reuest for updating author)
         - http://localhost:3000/authors/:id (delete reuest for deleting author)
         - http://localhost:3000/enquiry/ (get reuest for gettiing all enquiry messages)
        - http://localhost:3000/enquiry/ (post reuest for new enquiry )
         - http://localhost:3000/authors/:id (put reuest for updating enquiry message as read)
         - http://localhost:3000/authors/:id (delete reuest for deleting enquiry message)

  - the server contains following tables

        - Admin table ( contains credentails of admin)
        - Enquiry table (have details of enquiries did by user)
        - Book table (contains details of all books)
        - Author table (contains details of author)
        - Genere table (contains genere information)

  #  Note:the images that are uploaded by the admin/user for authors and books are stored in images folder using multer concept and gave that url in database so please dont delete images to prevent image breaking