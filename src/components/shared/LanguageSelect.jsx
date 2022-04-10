import Select, { components, OptionProps } from "react-select";

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
];

function LanguageSelect() {
  return <Select components={{ Option }} options={options} />;
}

export default LanguageSelect;
