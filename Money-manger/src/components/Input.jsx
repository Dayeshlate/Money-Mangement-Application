import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({ label, value, onChange, placeholder, type }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">

      <label className="text-[13px] text-slate-800 block mb-1">
        {label}
      </label>

      <div className="relative">

        <input
          className="w-full bg-white outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-black focus:border-blue-500"
          type={
            type === "password"
              ? (showPassword ? "text" : "password")
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {type === "password" && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} className="text-blue-600" />
            ) : (
              <Eye size={20} className="text-blue-600" />
            )}
          </span>
        )}

      </div>
    </div>
  );
}

export default Input;
