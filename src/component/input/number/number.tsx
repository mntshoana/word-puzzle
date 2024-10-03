import shared from "component/input/input.module.css";
import { useEffect, useRef, useState } from "react";
import css from "./number.module.css";

interface InputProps {
  value: number;
  placeholder?: string;
  onChange: (val: number) => void;
  onBlur?: (val: number) => void;
  onValidate?: (val: boolean) => void;

  regex?: RegExp;
  error?: string | null | undefined;
  warn?: string | null | undefined;
  ok?: string | null | undefined;

  disabled?: boolean;
  className?: string;
}

const NumberInputComponent = (props: InputProps) => {
  const [value, setValue] = useState<number>(props.value);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const onChange = (val: string) => {
    if (val.startsWith("0") && val.length > 1) {
      val = val.replace(/^0+/, "");
      setTimeout(() => setValue(Number(val)), 50);
    } else setValue(Number(val));
    props.onChange(Number(val));
  };

  return (
    <>
      <input
        ref={inputRef}
        className={`${shared.inputBox} ${props.className || ""} `}
        value={value}
        onChange={(val) => onChange(val.target.value)}
        onBlur={(val) => validate(val.target.value)}
        placeholder={props?.placeholder}
        disabled={props?.disabled}
        type="number"
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

export default NumberInputComponent;
