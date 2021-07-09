const router=require('express').Router();
const { connection } = require('../db/connection')

router.post('/', async (req, res) => {
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const user_name = req.body.userName;
    const email_id = req.body.emailId;
    const password = req.body.password;
    const phone_number = req.body.phoneNumber;
    const address = req.body.address;
    const sqlRegisterUser = "Insert into user_table(first_name,last_name,user_name,email_id,password,phone_number,address) values(?,?,?,?,?,?,?)";
    const sqlUserName = "select * from user_table where user_name = ?";
    connection.query(sqlUserName,[user_name], async (error, result)=> {
        if(result.length>0){
            res.send("UserFound")
        }else{
            connection.query(sqlRegisterUser,[first_name, last_name, user_name, email_id, password, phone_number,address], async (error, result)=> {
                if (error) {
                    res.json(error);
                }else{
                    res.json(result);
                }
            })
        }
    })
    
})


module.exports=router;