// Import react library
import { useState } from "react";

// Import React Select
import Select, {
    components,
    DropdownIndicatorProps,
    Props,
} from "react-select";

// Import tailwind css
import { useSelector } from "react-redux";
import "../index.css";

// Import translation
import { useTranslation } from "react-i18next";

//Import icon
import { FaMagnifyingGlass } from "react-icons/fa6";

//Import color theme
import { colors } from "../../public/theme.ts";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <span className="font-bold text-xs text-primary_main">
                {props.selectProps.dynamicTitle}
            </span>
        </components.DropdownIndicator>
    );
};

const Control = ({ children, ...props }) => {
    const style = { cursor: "pointer" };
    return (
        <components.Control {...props}>
            <span style={style}>
                <FaMagnifyingGlass color={colors.gray[100]} size={20} />
            </span>
            {children}
        </components.Control>
    );
};
export default function SearchBar() {
    const { t } = useTranslation();
    return (
        <Select
            options={options}
            components={{ DropdownIndicator, Control }}
            dynamicTitle={t("search")}
            styles={{
                placeholder: (base) => ({
                    ...base,
                    fontSize: "0.75rem",
                    color: colors.gray[100],
                    fontWeight: 500,
                }),
                control: (base, state) => ({
                    ...base,
                    background: colors.background_main,
                }),
                menu: (base) => ({
                    ...base,
                    // override border radius to match the box
                    borderRadius: 0,
                    background: colors.background_main,
                    // kill the gap
                    marginTop: 0,
                }),
            }}
            placeholder={t("searchSuggestion")}
            isClearable
        />
    );
}
