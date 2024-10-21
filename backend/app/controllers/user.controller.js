const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User}=require('../models/index');

module.exports = {
    signup:async (req, res, next) => {
      try {
        const {email,password}=req.body;
        const existingUser=await User.findOne({where:{email}});
        if (existingUser) {
            return res.status(400).json({ message: 'email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user=await User.create({email, password:hashedPassword});

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(201).json({
            message:"User add successfuly",
            user:{
                id:user.id,
                email:user.email,
                token:token
            }
        });


      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
    },
    signin:async (req, res, next) => {
      try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Validate password
        const isMatch = await user.validPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
    },
}