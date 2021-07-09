import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory} from 'react-router-dom';


const Register = () => {
    let history = useHistory();

    const onSubmitRegister = (data)=>{
        axios.post('http://localhost:3001/register', data).then((response) => {
 
        if(response.data==="UserFound"){
            alert("user Name already exist")
        }else{
            alert("Registration Done");
            history.push('/login');
        }
        }/* 
        else{
            setUsernamePassword("Invalid UserName And Password")
        } */
    );
    }
    
    const validationSchema=Yup.object({
    firstName: Yup.string()
    .max(15, 'Maximum 15 characters')
    .required('Please Enter First Name. '),

    lastName: Yup.string()
    .max(15, 'MAximum 15 character')
    .required('Please Enter Last Name'),

    userName : Yup.string()
    .min(3,'Minimum 3 character')
    .max(20, 'Maximum 20 characters')
    .required('Please Enter User Name'),

    emailId: Yup.string()
    .email('Invalid email address')
    .required('Please Eneter Email Id'),

    password : Yup.string()
    .min(8, 'Password allowed min 8')
    .max(20,"Maximum 20 character allowed")
    .required('Please Enter Password'),

    confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref('password'), null], "Passwords don't match."),

    phoneNumber : Yup.string()
    .min(10,"Please Enter Valid 10 digit Number")
    .max(10, 'Only 10 Number are allowed')
    .required('Please Enter Phone Number')
  
})
return (
    <div>
        <h1 className="login_register_heading">Register Page</h1>
        <Formik
        initialValues={
            { 
                firstName: '', 
                lastName: '',
                userName:'', 
                emailId: '',
                password:'',
                confirmPassword: '',
                phoneNumber:''
                }
        }
        validationSchema={validationSchema}
        onSubmit={onSubmitRegister}
        >
            <Form>
                <center>
                <div className="seosaph_login">
                    <span className="firstNameMessage"><ErrorMessage name="firstName"/></span>
                    <ErrorMessage name="lastName" component="span" />
                    <div className="input-group">
                        <Field 
                        className="form-control mb-3" 
                        name="firstName" 
                        type="text" 
                        placeholder="First Name" />

                        <Field 
                        className="form-control mb-3" 
                        name="lastName" 
                        type="text" 
                        placeholder="Last Name"/>
                    </div>
                    
                    <ErrorMessage name="userName" component="span" />
                    <Field 
                    className="form-control mb-3" 
                    name="userName" 
                    type="text" 
                    placeholder="User Name"/>

                    <ErrorMessage name="emailId" component="span" />
                    <Field 
                    className="form-control mb-3" 
                    name="emailId" 
                    type="email" 
                    placeholder="Email Id"/>
                    
                    <ErrorMessage name="password" component="span" />
                    <Field 
                    className="form-control mb-3" 
                    name="password" 
                    type="password" 
                    placeholder="Password"/>

                    <ErrorMessage name="confirmPassword" component="span" />
                    <Field 
                    className="form-control mb-3" 
                    name="confirmPassword" 
                    type="password" 
                    placeholder="Confirm Password"/>

                    <ErrorMessage name="phoneNumber" component="span" />
                    <Field 
                    className="form-control mb-3" 
                    name="phoneNumber" 
                    type="tel" 
                    placeholder="Phone Number"
                    />

                    <ErrorMessage  name="address" component="span"/>
                    <Field 
                    className="form-control mb-3" 
                    name="address" 
                    type="text" 
                    placeholder="Address"/>
                    <button type="submit">Submit</button>
                </div>
                </center>
            </Form>
        </Formik>
    </div>
);
};

export default Register;

