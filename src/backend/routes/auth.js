import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const router = express.Router();

// router.post('/register',async (req,res)=>{
//     try{
//         const {name,email,password} = req.body;
//         const user = User.findOne({email})
//         if(user){
//             return res.status(401).json({success: false, message: "User already exist"})
//         }

//         const hashPassword = await bcrypt.hash(password,10)

//         const newUser = new User({
//             name,email,password:hashPassword
//         })

//         await newUser.save()

//         return res.status(200).json({success: true, message: "Account Created successfully"})
//     }catch(error){
//         console.log(error.message)
//         return res.status(500).json({success: true, message: "Error in adding"})
//     }
// })

router.post('/register',async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(409).json({success: false, message: "User Already exist"})
        }

        const hashPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            name,email,password: hashPassword
        })

        await newUser.save();
        return res.status(200).json({success: true, message: "Account created successfully"})
    }catch(error){
        console.log(error.message);
        return res.status(500).json({success: false,message: "error is adding user"})
    }
})

// Example with Express & MongoDB
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ success: false, message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "secretkeyofexpenseapp123@#", { expiresIn: "1h" });

  res.json({
    success: true,
    message: "Login successfully",
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role, // <-- make sure to include role here
    },
  });
});



export default router