import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Signup_bg from "../assets/Signup_bg.jpg";
import Input from '../components/Input';  
import { validEmail } from '../util/validation';
import axiosConfig from '../util/axiosConfig';
import { LoaderCircle } from 'lucide-react';
import {API_ENDPOINT} from '../util/apiEndpoints';

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading,setIsLoading] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();

    setIsLoading(true);

    //validation
    if(!fullName.trim()){
      setError("Please enter your full Name");
      setIsLoading(false);
      return;
    
    }
    if(!validEmail(email)){
      setError("Please enter valid email");
      setIsLoading(false);
      return;
    }
    if(!password.trim()){
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }
    setError("");

    //signup api call

    try{
      const response = await axiosConfig.post(API_ENDPOINT.REGISTER, {
        fullName,
        email,
        password,
      })
      if(response.status === 200){
        toast.success("Profile created succesfully");
        navigate("/profile/login");
      }
    }catch(err){
      console.error("Something went wrong",err);
      setError(err.message);
    }finally{
      setIsLoading(false);
    }

  }

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img 
        src={Signup_bg}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover blur-sm"
      />

      {/* Signup Card */}
      <div className="absolute z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create An Account
          </h3>

          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your spending by joining with us!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <Input
                value={fullName}
                onChange={setFullName}
                label="Full Name"
                placeholder="Danny"
                type="text"
              />

              <Input
                value={email}
                onChange={setEmail}
                label="Email"
                placeholder="danny@gmail.com"
                type="text"
              />

              <div className="col-span-2">
                <Input
                  value={password}
                  onChange={
                    setPassword}
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button disable={isLoading} className={`bg-blue-600 text-white w-full flex item-center justify-center gap-2 ${isLoading ? "opacity-60 cursor-not-allowed":""} py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition`} type='submit'>
              {isLoading ? (
                <>
                <LoaderCircle className='"animate-spin w-5 h-5'/>
                Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 underline hover:text-blue-800 transition-colors">
                Login
              </Link>
            </p>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Signup;
