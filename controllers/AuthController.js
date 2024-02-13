const Auth = require("../models/user")
const bcrypt = require("bcrypt")
const { createToken } = require("../utils/verify")


const register = async(req, res) => {
 
    try{
    const {name, email, password} = req.body;

    if(!name || !email || !password) throw "Please fill all the details!";

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Auth({
        name,
        email,
        password:hashedPassword
    })


    const user_data = await Auth.findOne({email})

    if(user_data) {
        res.status(200).send("User already exists !");
    }

    await user.save();

    res.status(200).send("User created successfully!")
} catch(error){
    console.log(error);
    res.status(400).send(error.message);
}

}

const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) throw "Fill all the details!";

        const user = await Auth.findOne({email});
        const matchPassword = await bcrypt.compare(password, user.password);

        if(matchPassword){
            const token = createToken(user);
            // console.log(token);
            res.status(200).send({success:true, msg:user,token})

        }else {
            res.status(200).send({success:false, msg:"incorrect password!"})   
        }
    }catch(error){
        console.log(error);
        res.status(400).send(error.message);
    }
}
module.exports = {
    register,
    login
}