import Select, { components, OptionProps } from "react-select";

const customStyles = {
  option: (provided) => ({
    ...provided,
    padding: 10,
  }),
  input: (provided) => ({
    ...provided,
    padding: 10,
  }),
  singleValue: (provided) => ({
    ...provided,
    padding: 10,
  }),
};

const Control = ({ children, ...props }) => {
  const flagPath = props.getValue()[0].flag;
  return (
    <components.Control {...props}>
      <img src={flagPath} alt="Flag Languages" className="w-10 h-10 ml-2" />
      {children}
    </components.Control>
  );
};

const Option = (props) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center">
        <img src={props.data.flag} alt="Flag Languages" className="w-8 h-8" />
        <span className="ml-3 font-semibold">{props.label}</span>
      </div>
    </components.Option>
  );
};

const options = [
  { value: "en", label: "English", flag: "/images/flags/en.png" },
  { value: "ja", label: "Japanese", flag: "/images/flags/japan.png" },
];

function LanguageSelect({ selectHandler }) {
  const changeHandler = ({ label }) => {
    selectHandler(label);
  };
  return (
    <Select
      components={{ Option, Control }}
      options={options}
      onChange={changeHandler}
      styles={customStyles}
      defaultInputValue={options[0].label}
    />
  );
}

export default LanguageSelect;
