import { useState } from "react";
import css from "./text.module.css";
interface InputProps {
  value: string;
  placeholder?: string;
  onChange: (val: string) => void;
  onBlur?: (val: string) => void;
  onValidate?: (val: boolean) => void;

  regex?: RegExp;
  error?: string | null | undefined;
  warn?: string | null | undefined;
  ok?: string | null | undefined;

  disabled?: boolean;
  className?: string;
}

const TextInputComponent = (props: InputProps) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");

  const validate = (val: string) => {
    if (
      !props.regex &&
      !props.onBlur &&
      !props.error &&
      !props.warn &&
      !props.ok
    ) {
      return;
    }

    if (props.onBlur) props.onBlur(val);

    if (props.error && props.error.length > 0) {
      setIsValid(false);
      if (props.onValidate) props.onValidate(false);
      return;
    }

    if (props.regex) {
      setIsValid(props.regex.test(val));
    }

    if (isValid) {
      // show warning
      // else show ok
    } else {
      // create and show error
    }
    if (props.onValidate) props.onValidate(isValid);
  };

  return (
    <>
      <input
        className={`${css.textBox} ${props.className}`}
        style={
          isValid === true
            ? {
                border: "1.2px solid rgb(57, 109, 57)",
              }
            : isValid === false
            ? {
                border: "1.2px solid rgb(171, 11, 11)",
              }
            : {}
        }
        value={props.value}
        onChange={(val) => props.onChange(val.target.value)}
        onBlur={(val) => validate(val.target.value)}
        placeholder={props?.placeholder}
        disabled={props?.disabled}
        type="text"
      />
      {message.length > 0 && <label>{message}</label>}
    </>
  );
};

export default TextInputComponent;
