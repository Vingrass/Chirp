const { chirp, User } = require("../models");
const { populate } = require("../models/User");

const chirpController = {
// get all chirps
getAllchirps(req, res) {
    chirp.find().then((chirp) => res.json(chirp)).catch((err) => res.status(500).json(err));

},
// get one chirp by it's id
// create chirp to a user
createChirp(req, res) {
   chirp.create(req.body)
   .then((dbchirpData) => {
       return User.findOneAndUpdate(
           {_id:req.body.userID},
           {$push:{ chirps:dbchirpData._id}},
           {new:true}

       )
    
   })
   .then(userData => res.json(userData))
   .catch((err) => res.status(500).json(err));
},
//update chirp by it's id
updateChirp(req, res) {
    chirp.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        runValidators: true,
        new: true
    }).then((chirp) => {
        !chirp ? res.status(404).json({message: 'No chirp by ID'}) : res.json(chirp);

    }).catch((err) => res.status(500).json(err));


},

//   getchirpById
getChirpById({ params }, res) {
    chirp.findOne({ _id: params.id })
      .then((dbchirpData) => {
        // if no chirp is found
        if (!dbchirpData) {
          res.status(404).json({ message: "No chirp with this ID" });
          return;
        }
        res.json(dbchirpData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

// delete a chirp
deleteChirp(req, res) {
    chirp.findOneAndDelete({_id: req.params.id})
    .then((chirp) => {
        if(!chirp){
            res.status(404).json({message: 'No chirp with that ID'}) 


        }      
        
        return User.findOneAndUpdate(
            {_id:req.body.userID},
            {$pull:{chirps:chirp._id}},
            {new:true}
 
        )
   }).then(() => res.json({message: 'User and associated apps deleted!'})).catch((err) => res.status(500).json(err));
},

}

module.exports = chirpController;