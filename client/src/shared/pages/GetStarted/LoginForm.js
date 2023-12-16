import KimoButton from "../../Components/KimoButton";
import { useEffect, useState } from "react";
import Input from "../../Components/InputField";
import logo from "../../../shared/assets/logo.png";
import * as yup from "yup";
import { Formik } from "formik";
import LoadingIndicator from "../../Components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, login } from "../../../store";
import ForgetPasswordScreen from "../ForgetPasswordScreen";
import OtpScreen from "../OtpScreen";
import { useDispatch } from "react-redux";
import FormErrorDialog from "../../Components/FormErrorDialog";


export default function LoginForm(){
    const [isLoading, setIsLoading] = useState(false);
    const [forgetPassword, setForgetPassword] = useState(false);
    const [otpOpen, setOtpOpen] = useState(false);
    const navigate = useNavigate();
    const [loginMutation, results] = useLoginMutation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        if (results.isError) {
          setIsError(true);
        }
      }, [results]);

    return (
        <div>
            login form
        </div>
    );
}

const UserSchema = yup.object().shape({
    username: yup
      .string("Invalid username")
      .required("Please enter a valid username"),
  
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Please enter a valid password"),
  });

