import styles from "../styles/CustomSelect.module.css";
import React from "react";
import Select, { NonceProvider } from "react-select";

//options used in the filter dropdown menu
const options = [
  { value: "Meat", label: "Meat" },
  { value: "Vegetable", label: "Vegetable" },
  { value: "Soup", label: "Soup" },
  { value: "Other", label: "Other" },
];

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: 300,
  }),
  control: (provided, state) => ({
    ...provided,
    width: 300,
    height: 50,
    border: "1px solid black",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: 50,
    width: 50,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: 50,
    width: 50,
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: "#ffffff",
  }),
};

function CustomSelect() {
  return (
    <Select
      styles={customStyles}
      placeholder="Filter"
      closeOnMenuSelect={false}
      isMulti
      options={options}
    ></Select>
  );
}

export default CustomSelect;
