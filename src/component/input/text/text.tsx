import shared from "component/input/input.module.css";
import { useEffect, useRef, useState } from "react";
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
  const [value, setValue] = useState<string>(props.value);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    updateColor(props.error ? false : true);
  }, [props.error]);

  const updateColor = (override?: boolean) => {
    const current = override ?? isValid;
    if (inputRef.current && current !== null) {
      if (current) {
        inputRef.current.classList.remove(shared.inputBoxInvalid);
        inputRef.current.classList.add(shared.inputBoxValid);
      } else {
        inputRef.current.classList.remove(shared.inputBoxValid);
        inputRef.current.classList.add(shared.inputBoxInvalid);
      }
    }
  };

  const onChange = (val: string) => {
    props.onChange(val);
    setValue(val);
  };
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
    let current = true;
    if (props.onBlur) props.onBlur(val);

    if (props.error && props.error.length > 0) {
      current = false;
    }

    if (props.regex) {
      current = props.regex.test(val);
    }

    if (props.onValidate) props.onValidate(current);
    setIsValid(current);
    updateColor(current);
  };

  return (
    <>
      <input
        ref={inputRef}
        className={`${shared.inputBox} ${props.className || ""}`}
        value={value}
        onChange={(val) => onChange(val.target.value)}
        onBlur={(val) => validate(val.target.value)}
        placeholder={props?.placeholder}
        disabled={props?.disabled}
        type="text"
      />
      {props.error && (
        <label className={`${shared.error} ${css.error}`}>{props?.error}</label>
      )}
      {props.warn && (
        <label className={`${shared.warn} ${css.warn}`}>{props?.warn}</label>
      )}
    </>
  );
};

export default TextInputComponent;
