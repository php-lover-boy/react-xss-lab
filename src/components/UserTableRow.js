import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import {  Button } from "react-bootstrap";
import './App.css';

  

const UserForm2 = (props) => {
  
 
  

 
  return (

    
    
    
      <Formik {...props} >
      
        <Form>
       
         
         <div className="button_submit">
          <Button size="lg" 
            block="block" type="submit">
            {props.children}
          </Button>
          </div>
        </Form>
      
      </Formik>
      
  
    
  );
  
};
  
export default UserForm2;
