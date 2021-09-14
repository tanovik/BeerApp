import React from "react";
import { Field } from "formik";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./Formik.module.css";

type PropsType = {
  control: string;
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  options?: Array<{ key: string; value: string }>;
  check?: boolean;
  className?: string;
};

export const FormikControl: React.FC<PropsType> = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputFormik {...rest} />;
    case "select":
      return <SelectFormik {...rest} />;
    case "date":
      return <DatePickerFormik {...rest} />;
    default:
      return null;
  }
};

type InputPropsType = {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
};

const InputFormik: React.FC<InputPropsType> = (props) => {
  const { label, name, placeholder, ...rest } = props;

  return (
    <div>
      <label htmlFor={name}></label>
      <Field id={name} name={name} placeholder={placeholder} {...rest} />
    </div>
  );
};

type SelectPropsType = {
  type: string;
  label: string;
  name: string;
  options?: Array<{ key: string; value: string }>;
};

const SelectFormik: React.FC<SelectPropsType> = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}></label>
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className={classes.selectField}
      >
        {!!options &&
          options.map((option: { key: string; value: string }) => {
            return (
              <option key={option.value} value={option.value}>
                {option.key}{" "}
              </option>
            );
          })}
      </Field>
    </div>
  );
};

type DatePickerPropsType = {
  label: string;
  name: string;
};

const DatePickerFormik: React.FC<DatePickerPropsType> = (props) => {
  const { label, name, ...rest } = props;

  return (
    <div className={classes.dateField}>
      <label htmlFor={name}>{/* {label} */}</label>
      <Field name={name} {...rest}>
        {({ form, field }: { [key: string]: any }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              dateFormat="MM/yyyy"
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
    </div>
  );
};
