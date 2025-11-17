import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup_bg from "../assets/Signup_bg.jpg";     // <-- change the path if needed

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

        </div>
      </div>

    </div>
  );
}

export default Signup;
