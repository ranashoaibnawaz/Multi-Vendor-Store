const express = require ("express");
const router = new express.Router();
const  Products = require("../Models/ProductSchema");
const USER = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");
const Authenticate = require("../MiddleWear/Authenticate");

router.get("/getProducts",async(req,res)=>{
    try {
            const ProductData = await Products.find();
            res.status(201).json(ProductData);
    } catch (error) {
        console.log("Error" + error.message); 
    }
});

router.get('/getProductOne/:id',async(req,res)=>{
    try {
        const {id} = req.params;

        const Individualdata = await Products.findOne({id:id});

        res.status(201).json(Individualdata);
    } catch (error) {
        res.status(400).json(error);
      
    }
});

router.post("/Register",async(req,res) =>{
    const {name,email,phone,password,confirmPassword} = req.body;
    
    if(!name || !email || !phone || !password || !confirmPassword)
    {
        res.status(422).json({error : "Fill All The Data"});
        console.log("Not Data Available");
    };

    try {
        const preuser = await USER.findOne({email : email});
        if(preuser)
        {
            res.status(422).json({error : "This User Already Exist"})
        }
        else if(password!==confirmPassword)
        {
            res.status(422).json({error : "This Password Is Not Matched"})
        }
        else
        {
            console.log('final user')
            const FinalUser = new USER({
                name,email,phone,password,confirmPassword
            })
            console.log(FinalUser)
            const StoreData = await FinalUser.save();
            console.log(StoreData);
            return res.status(201).json(StoreData);
        }
    } catch (error) {
            console.log('error'+ error);
    }
});

router.post("/Login",async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password)
    {
        res.status(400).json({error : "Fill All The Data"});
        console.log("Not Data Available");
    };

    try {
        const userLogin = await USER.findOne({email:email});

        if(userLogin)
        {
            const isMatched = await bcrypt.compare(password,userLogin.password);
            console.log(isMatched);

            if(!isMatched)
            {
                res.status(400).json({error : "Not Matched"});
            }
            else
            {
                const token = await userLogin.generateAuthToken();
            
                res.cookie("AmazonWeb",token,{
                    expire:new Date(Date.now()+900000),
                    httpOnly:true
                })
                res.status(201).json(userLogin);
            }
        }
        else
        {

            res.status(400).json({error : "Not Matched"});
        }
    } catch (error) {
        res.status(400).json({error : "Not Matched"});
    }
});

router.post("/AddCart/:id",Authenticate,async(req,res)=>{
    try {
        const {id} = req.params;
        const cart = await Products.findOne({id:id});
        console.log(cart+"Frontend data");

        const UserContact = await USER.findOne({_id:req.UserId});
        console.log(UserContact);

        if(UserContact)
        {
            const CartData = await UserContact.AddCart(cart);
            await UserContact.save();
            console.log(CartData);
            res.status(201).json(UserContact);

        }
        else
        {
            res.status(401).json({error:"Invalid Data"});
        }
    } catch (error) {
        res.status(401).json({error:"Invalid Data"});
    }
});

router.get("/CartDetail",Authenticate,async(req,res)=>{
    try {
        const BuyUser = await USER.findOne({_id:req.UserId});
        res.status(201).json(BuyUser);
    } catch (error) {
        console.log("error" +error);
    }
});

router.get("/ValidUser",Authenticate,async(req,res)=>{
    try {
        const validuser = await USER.findOne({_id:req.UserId});
        res.status(201).json(validuser);
    } catch (error) {
        console.log("error" +error);
    }
});

router.delete("/DeleteUser/:id",Authenticate,async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(req.UserCart.carts);
        req.UserCart.carts = req.UserCart.carts.filter((CurrentValue)=>{
            return CurrentValue.id !== id;
        });
        req.UserCart.save();
        res.status(201).json(req.UserCart);
        console.log("Item Remove");
    } catch (error) {
        console.log("error something" + error);
        res.status(400).json(req.UserCart);
    }
});

router.get("/LogOut",Authenticate,(req,res)=>{
    try {
        req.UserCart.tokens = req.UserCart.tokens.filter((CurrentValue)=>{
            return CurrentValue.token !== req.token
        });
        res.clearCookie("AmazonWeb",{path:"/"});
        req.UserCart.save();
        res.status(201).json(req.UserCart.tokens);
        console.log("LogOut");
    } catch (error) {
        console.log("LogOut");
    }
})

module.exports = router; 