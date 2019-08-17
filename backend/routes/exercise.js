const router = require ('express').Router();

let Exercise = require ('../models/exercise.model');

router.get('/',(req,res,next) => {
    Exercise.find()
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error : ' + err));
});

router.post('/add',(req,res,next) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date= Date.parse(req.body.date);

    const newExercise =  new Exercise({ 
        username,
        description,
        duration,
        date
    }); //creating instance of the records of the exercise model which is added using post request

    newExercise.save() //saving the new instance of the model to the database
    .then(()=> res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error : '+err ));

});

router.get('/:id',(req,res) => {
    Exercise.findById(req.params.id)
    .then((exercise)=> res.json(exercise))
    .catch(err => res.status(400).json('Error :'+ err));
});

router.delete('/:id',(req,res) =>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(() =>res.json('Exercise deleted'))
    .catch((err) => res.status(400).json('Error :'+err));
});
router.post('/update/:id',(req,res)=> {
    Exercise.findById(req.params.id)
    .then((exercise) => {
        exercise.username  = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
    
        exercise.save()
        .then(()=> res.json("Exercise updated"))
        .catch((err) => console.log("error:" +err))
    }).catch((err) => console.log("error : "+ err));
});

module.exports = router;