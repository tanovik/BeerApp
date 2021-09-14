import React from "react";
import classes from "./Formik.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFilter } from "../../Redux/beerSelectors";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BeerFilterType } from "../../Redux/beerReducer";
import { FormikControl } from "./FormikControl";
import { SearchOutlined } from "@ant-design/icons";

const validationSchema = Yup.object({
  // term: Yup.string().max(30, "Must be 30 characters or less"),
});

type FormType = {
  term: null | string;
};

type PropsType = {
  onFilterChanged: (filter: BeerFilterType) => void;
};

const HeaderFormik: React.FC<PropsType> = (props) => {
  const filter = useSelector(getFilter);

  const initialValues: FormType = {
    term: filter.term,
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
              abv_gt: null,
              abv_lt: null,
              ibu_gt: null,
              ibu_lt: null,
              food: null,
              ibu: null,
              abv: null,
              brewed_before: null,
              brewed_after: null,
              brewed_beforeDate: null,
              brewed_afterDate: null,
            };

            props.onFilterChanged(filter);
            onSubmitProps.setSubmitting(false);
          }}
        >
          {({ values }) => {
            return (
              <Form className={classes.form}>
                <div className={classes.searchGroupStartPage}>
                  <FormikControl
                    control="input"
                    type="text"
                    label="term"
                    name="term"
                    placeholder={"Enter beer name"}
                    className={classes.searchInputStartPage}
                  />

                  <NavLink to={`/beersearch?term=${values.term}`}>
                    <button className={classes.buttonStartPage} type="submit">
                      <SearchOutlined />
                    </button>
                  </NavLink>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default HeaderFormik;
