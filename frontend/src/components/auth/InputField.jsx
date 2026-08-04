import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function InputField({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false
}) {

    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password"
            ? (showPassword ? "text" : "password")
            : type;

    return (

        <div className="input-group">

            <label>{label}</label>

            {
                type === "password" ? (

                    <div className="password-wrapper">

                        <input
                            type={inputType}
                            name={name}
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            required={required}
                        />

                        <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {
                                showPassword
                                    ? <EyeOff size={20} />
                                    : <Eye size={20} />
                            }
                        </span>

                    </div>

                ) : (

                    <input
                        type={inputType}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                    />

                )
            }

        </div>

    );

}

export default InputField;