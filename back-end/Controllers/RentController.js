const Rent = require('../Models/RentModel')
const Counter = require('../Models/CounterModel')

const addRent = async(req, res) =>{
    try{
        const userId = req.userId;
        const counter = await Counter.findOneAndUpdate(
            { id: "rent" }, 
            { $inc: { count: 1 } }, 
            { new: true, upsert: true }
        );
        const rentId = counter.count;
        const {
            street, city, state, country,
            bedRooms, halls, bathRooms, kitchens, otherDescription, 
            advance, pricePerMonth} = req.body;
        const rent = new Rent({
            userId,
            rentId,
            street,
            city,
            state,
            country,
            bedRooms,
            halls,
            bathRooms,
            kitchens,
            otherDescription,
            advance,
            pricePerMonth
        });
        await rent.save();
        res.json({msg: 'done' , rent : rent});

    }
    catch(err)
    {
        console.log(err);
    }
}


const getRents = async(req, res) =>{
    try{
        const rents = await Rent.find().lean();
        res.json({msg: 'got', rents : rents});
    
    }
    catch(err)
    {

        console.log(err);
    }
}

const getMyRents = async(req, res) =>{
    try{
        const userId = req.userId;
        const rents = await Rent.find({userId}).lean();
        res.json({msg: 'got', rents : rents});
    }
    catch(err)
    {

        console.log(err);
    }
}

const deletemyrents = async(req, res) =>{
    try{
        const userId = req.userId;
        console.log('here');
        const rentId = req.body.rentId;
        const result = await Rent.findOneAndDelete({ rentId: rentId, userId: userId });
        console.log(result);
        if (!result) {
            return res.json({ error: 'Rent not found' });
        }

        res.json({ msg: 'success' });
    
    }
    catch(err)
    {
        console.log(err);
    }
}

const updateRent = async (req, res) =>{
    try {
      const {
            rentId, street, city, state, country,
            bedRooms, halls, bathRooms, kitchens, otherDescription, 
            advance, pricePerMonth} = req.body;
      const userId = req.userId;

      if (!userId) {
        return res.json({ error: 'User ID is required' });
      }

      await Rent.findOneAndUpdate(
        { userId: userId, rentId: rentId },
        { 
            street: street,
            city: city,
            state: state,
            country: country,
            bedRooms: bedRooms,
            halls: halls,
            bathRooms: bathRooms,
            kitchens: kitchens,
            otherDescription: otherDescription,
            advance: advance,
            pricePerMonth: pricePerMonth
        },
        { new: true }
      );
      res.json({ msg: 'updated' });
    } catch (error) {
      console.log('Error:', error); 
      res.json({ message: 'Server error' });
    }
}


module.exports= {addRent, getRents, getMyRents, deletemyrents, updateRent};

