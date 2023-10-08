// Import react library
import { useState } from "react";

// Import MUI
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

//Import color theme
import { colors } from "../../public/theme.js";
import { useTranslation } from "react-i18next";

// const options = [
//     { value: "chocolate", label: "Chocolate" },
//     { value: "strawberry", label: "Strawberry" },
//     { value: "vanilla", label: "Vanilla" },
// ];

// const DropdownIndicator = (props) => {
//     return (
//         <components.DropdownIndicator {...props}>
//             <span className="font-bold text-xs text-primary_main">
//                 {props.selectProps.dynamicTitle}
//             </span>
//         </components.DropdownIndicator>
//     );
// };

// const Control = ({ children, ...props }) => {
//     const style = { cursor: "pointer" };
//     return (
//         <components.Control {...props}>
//             <span style={style}>
//                 <FaMagnifyingGlass color={colors.gray[100]} size={20} />
//             </span>
//             {children}
//         </components.Control>
//     );
// };
// export default function SearchBar() {
//     const { t } = useTranslation();
//     return (
//         <Select
//             options={options}
//             components={{ DropdownIndicator, Control }}
//             dynamicTitle={t("search")}
//             styles={{
//                 placeholder: (base) => ({
//                     ...base,
//                     fontSize: "0.75rem",
//                     color: colors.gray[100],
//                     fontWeight: 500,
//                 }),
//                 control: (base, state) => ({
//                     ...base,
//                     background: colors.background_main,
//                 }),
//                 menu: (base) => ({
//                     ...base,
//                     // override border radius to match the box
//                     borderRadius: 0,
//                     background: colors.background_main,
//                     // kill the gap
//                     marginTop: 0,
//                 }),
//             }}
//             placeholder={t("searchSuggestion")}
//             isClearable
//         />
//     );
// }

export default function SearchBar() {
    const { t } = useTranslation();
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{
                width: "100%",
                "background-color": colors.white,
            }}
            size="small"
            options={["a", "b", "c"]}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={t("searchFood")}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" className="mx-2">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <span className=" mr-2">|</span>
                                <span className="text-primary_main font-medium">
                                    {t("search")}
                                </span>
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
}
