# netologyNodeJS

db.books.insertMany({    
    title = "Title1",
    description = "Description1",
    authors = "Author1",
    _id = "ID1"
},{
    title = "Title2",
    description = "Description2",
    authors = "Author2",
    _id = "ID2"
}) 


db.books.find({title:"Title1"},
    {
    title = 1,
    description = 1,
    authors = 1
    })

db.books.updateOne({id:"ID1"},{description:"DescriptionModify"}) 