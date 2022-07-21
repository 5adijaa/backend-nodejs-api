require('dotenv').config();

const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favouriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema)

mongoose.connect(
  process.env.MONGO_URI, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
);


const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'didij',
    age: 25,
    favouriteFoods: ["chicken", "Soupes"]
  })
  person.save(function(err, data){
    if (err) return done(err)
    console.log(data)
    done(null, data)
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data)=>{
    if (err) return done(err)
    console.log(data)
    done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err,data)=>{
    if (err) return done(err)
    done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favouriteFoods: food }, (err,data)=>{
    if (err) return done(err)
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err,data)=>{
    if (err) return done(err)
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err,person)=>{
    if (err) return done(err)
    person.favouriteFoods.push(foodToAdd)
    person.save()
    .then(doc=>{
      console.log(doc)
      done(null, doc)
    })
    .catch(err => {
      console.error(err)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true})
  .then(doc => {
    console.log(doc)
    done(null, doc)
  })
  .catch(err => {
    console.error(err)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person)=>{
    if (err) return done(err)
    console.log(person)
    done(null, person)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove})
  .then(doc => {
    console.log(doc)
    done(null, doc)
  })
  .catch(err => {
    console.error(err)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
  .find({favouriteFoods: foodToSearch})
  .sort('name')
  .limit(2)
  // .select({'name':1, 'favouriteFoods': 1})
  .select('name favouriteFoods')
  .exec((err, person)=>{
    if (err) return done(err)
    console.log(person)
    done(null, person)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
