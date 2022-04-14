import Select, { components } from "react-select";

const customStyles = (paddingSize) => {
  return {
    option: (provided) => ({
      ...provided,
      padding: paddingSize,
      textTransform: "capitalize",
    }),
    input: (provided) => ({
      ...provided,
      padding: paddingSize,
    }),
    singleValue: (provided) => ({
      ...provided,
      padding: paddingSize,
      textTransform: "capitalize",
    }),
  };
};

const Control = ({ children, ...props }) => {
  const flagPath = props.getValue().length ? props.getValue()[0].flag : null;
  return (
    <components.Control {...props}>
      {flagPath && (
        <img src={flagPath} alt="Flag Languages" className="w-10 h-10 ml-2" />
      )}

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

function LanguageSelect({ selectHandler, paddingSize, options }) {
  const changeHandler = ({ label }) => {
    selectHandler(label);
  };
  return (
    <Select
      components={{ Option, Control }}
      options={options}
      onChange={changeHandler}
      styles={customStyles(paddingSize)}
      isSearchable={false}
      defaultValue={options[0]}
    />
  );
}

export default LanguageSelect;
