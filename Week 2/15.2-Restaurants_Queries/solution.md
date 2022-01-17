# 1.Crud

### 1.1

db.restaurants.find().pretty()

### 1.2

db.restaurants.find({cuisine: "asian"}).pretty()

### 1.3

db.restaurants.find({kosher: true}).pretty()

### 1.4

db.restaurants.find({"address.city": "Holon"}).pretty()

### 1.5

db.restaurants.find({"address.street": "Balfur 15"}).pretty()

### 1.6

db.restaurants.find({"address.coordinates": [20.46574, -40.6774]}).pretty()

### 1.7

db.restaurants.find().sort({name:1}).pretty()

### 1.8

db.restaurants.find().sort({"address.city":1}).pretty()

### 1.9

db.restaurants.updateOne({"\_id" : ObjectId("61e544d170da635993c6c9d4")},{$set:{name:"Claude's restaurant"}})

### 1.10

db.restaurants.updateOne({"\_id" : ObjectId("61e544d170da635993c6c9d4")},{$push:{reviews: {date: new Date("2022-01-17"), score: 10}}})

### 1.11

db.restaurants.updateMany({},{$set:{kosher: true}})

### 1.12

db.restaurants.deleteOne({"\_id" : ObjectId("61e544d170da635993c6c9d4")})

### 1.13

db.restaurants.deleteMany({})

# 2.forEach Queries

### 2.1

db.restaurants.find().forEach((restaurant)=>{print("name: " + restaurant.name);})

### 2.2

db.restaurants.find().forEach((restaurant)=>{print("city: " + restaurant.address.city);})

### 2.2

db.restaurants.find().forEach((restaurant)=>{print("cords: " + restaurant.address.coordinates);})

# 3. Advanded Queries

### 3.1

db.restaurants.find({name: /^r/}).pretty()

### 3.2

db.restaurants.find().count()

### 3.3

db.restaurants.find({"reviews.date": ISODate("2016-01-01T00:00:00Z")}).pretty()
