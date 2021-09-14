import React from "react";
import classes from "./Formik.module.css";

import { getFilter } from "../../Redux/beerSelectors";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BeerFilterType } from "../../Redux/beerReducer";
import { FormikControl } from "./FormikControl";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";

const validationSchema = Yup.object({
  // term: Yup.string().max(15, "Must be 15 characters or less"),
});

type FormType = {
  term: null | string;
  abv_gt: null | string;
  abv_lt: null | string;
  ibu_gt: null | string;
  ibu_lt: null | string;
  food: null | string;
  ibu: null | string;
  abv: null | string;
  brewed_before: null | string;
  brewed_after: null | string;
  brewed_beforeDate: null | Date;
  brewed_afterDate: null | Date;
};

type PropsType = {
  onFilterChanged: (filter: BeerFilterType) => void;
};

const BeerFormik: React.FC<PropsType> = (props) => {
  const filter = useSelector(getFilter);

  const foodOptions = [
    { key: "Food", value: "" },
    { key: "chicken", value: "chicken" },
    { key: "fish", value: "fish" },
    { key: "salad", value: "salad" },
    { key: "crab", value: "crab" },
    { key: "cheese", value: "cheese" },
  ];
  const abvOptions = [
    { key: "ABV%", value: "" },
    { key: "4-5%", value: "4-5" },
    { key: "5-6%", value: "5-6" },
    { key: "6-7%", value: "6-7" },
  ];
  const ibuOptions = [
    { key: "IBU", value: "" },
    { key: "5-25", value: "5-25" },
    { key: "25-50", value: "25-50" },
    { key: "50-100", value: "50-100" },
    { key: "100-120", value: "100-120" },
  ];

  const convertDateToString = (val: Date) => {
    let month = val.toString().slice(4, 7);
    month =
      month === "Jan"
        ? "01-"
        : month === "Feb"
        ? "02-"
        : month === "Mar"
        ? "03-"
        : month === "Apr"
        ? "04-"
        : month === "May"
        ? "05-"
        : month === "Jun"
        ? "06-"
        : month === "Jul"
        ? "07-"
        : month === "Aug"
        ? "08-"
        : month === "Sep"
        ? "09-"
        : month === "Oct"
        ? "10-"
        : month === "Nov"
        ? "11-"
        : month === "Dec"
        ? "12-"
        : "";
    return month + val.toString().slice(11, 15);
  };

  const resetFilter = () => {
    const filter: BeerFilterType = {
      term: "",
      abv_gt: null,
      abv_lt: null,
      ibu_gt: null,
      ibu_lt: null,
      food: null,
      ibu: "",
      abv: "",
      brewed_before: null,
      brewed_after: null,
      brewed_beforeDate: null,
      brewed_afterDate: null,
    };
    props.onFilterChanged(filter);
  };

  const initialValues: FormType = {
    term: filter.term,
    abv_gt: filter.abv_gt,
    abv_lt: filter.abv_lt,
    ibu_gt: filter.ibu_gt,
    ibu_lt: filter.ibu_lt,
    food: filter.food,
    ibu: filter.ibu,
    abv: filter.abv,
    brewed_before: filter.brewed_before,
    brewed_after: filter.brewed_after,
    brewed_beforeDate: filter.brewed_beforeDate,
    brewed_afterDate: filter.brewed_afterDate,
  };

  return (
    <div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: FormType, onSubmitProps) => {
            const filter: BeerFilterType = {
              term: values.term,
              abv_gt:
                values.abv === "4-5"
                  ? "4"
                  : values.abv === "5-6"
                  ? "5"
                  : values.abv === ""
                  ? null
                  : values.abv === "6-7"
                  ? "6"
                  : null,
              abv_lt:
                values.abv === "4-5"
                  ? "5"
                  : values.abv === "5-6"
                  ? "6"
                  : values.abv === ""
                  ? null
                  : values.abv === "6-7"
                  ? "7"
                  : null,
              ibu_gt:
                values.ibu === "5-25"
                  ? "5"
                  : values.ibu === "25-50"
                  ? "25"
                  : values.ibu === "50-100"
                  ? "50"
                  : values.ibu === ""
                  ? null
                  : values.ibu === "100-120"
                  ? "100"
                  : null,
              ibu_lt:
                values.ibu === "5-25"
                  ? "25"
                  : values.ibu === "25-50"
                  ? "50"
                  : values.ibu === "50-100"
                  ? "100"
                  : values.ibu === ""
                  ? null
                  : values.ibu === "100-120"
                  ? "120"
                  : null,
              food: values.food,
              ibu: values.ibu,
              abv: values.abv,
              brewed_before: values.brewed_beforeDate
                ? convertDateToString(values.brewed_beforeDate)
                : null,
              brewed_after: values.brewed_afterDate
                ? convertDateToString(values.brewed_afterDate)
                : null,
              brewed_beforeDate: values.brewed_beforeDate,
              brewed_afterDate: values.brewed_afterDate,
            };
            props.onFilterChanged(filter);
            onSubmitProps.setSubmitting(false);
          }}
        >
          {({}) => {
            return (
              <Form className={classes.form}>
                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="term"
                    name="term"
                    placeholder={"Enter beer name"}
                    className={classes.inputField}
                  />
                </div>
                <div>
                  <div className={classes.formikControls}>
                    <div className={classes.formikInputTitle}>
                      Alcohol by Volume
                    </div>
                    <FormikControl
                      control="select"
                      type="select"
                      label="ABV"
                      name="abv"
                      options={abvOptions}
                    />
                    <div className={classes.formikInputTitle}>
                      International Bitterness Units
                    </div>
                    <FormikControl
                      control="select"
                      type="select"
                      label="IBU"
                      name="ibu"
                      options={ibuOptions}
                    />
                    <div className={classes.formikInputTitle}>Food pairing</div>
                    <FormikControl
                      control="select"
                      type="select"
                      label="Select a food pairing"
                      name="food"
                      options={foodOptions}
                    />
                    <div className={classes.formikInputTitle}>
                      Brewed before:
                    </div>
                    <FormikControl
                      control="date"
                      type=""
                      label="Pick a date"
                      name="brewed_beforeDate"
                    />
                    <div className={classes.formikInputTitle}>
                      Brewed after:
                    </div>
                    <FormikControl
                      control="date"
                      type=""
                      label="Pick a date"
                      name="brewed_afterDate"
                    />
                  </div>
                  <div>
                    <button className={classes.submitButton} type="submit">
                      Search
                    </button>

                    <button
                      className={classes.submitButton}
                      type="reset"
                      onClick={resetFilter}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default BeerFormik;
