// Import react library
import { useCallback, useEffect, useRef, useState } from "react";

// Import MUI
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

//Import color theme
import { colors } from "../../../../public/theme";
import { useTranslation } from "react-i18next";
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { debounce } from "lodash";
import axiosClient from "../../../../axios-client";
import { Box, Typography } from "@mui/material";
import { searchOption } from "../../../models/product.model";

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

export default function SearchOrderBar() {
    const { t } = useTranslation();

    const hint = useRef("");
    //Get keyword from params
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState<any | null>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [options, setOptions] = useState<readonly searchOption[]>([]);
    const navigate = useNavigate();
    const getOptionsDelayed = useCallback(
        debounce(async (keyword) => {
            const fetchOptions = async () => {
                const payload = {
                    keyword: keyword,
                };
                const response = await axiosClient.get("/orderSearch", {
                    params: {
                        ...payload,
                    },
                });
                return response.data.result.order;
            };
            let newOptions = [];

            if (keyword !== "") {
                newOptions = await fetchOptions();
            }
            setOptions(newOptions);
        }, 500),
        []
    );

    useEffect(() => {
        setSearchValue(searchParams.get("keyword") ?? "");
    }, [searchParams.get("keyword")]);

    useEffect(() => {
        hint.current = "";
        getOptionsDelayed(searchValue);
    }, [searchValue]);

    const onSubmit = () => {
        const path = {
            pathname: "/user/order",
            search: createSearchParams({
                type: searchParams.get("type") ?? "all",
                keyword: searchValue ?? "",
            }).toString(),
        };

        navigate(path);
    };
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            onKeyDown={(event) => {
                if (event.key === "Tab") {
                    if (hint.current) {
                        setSearchValue(hint.current);
                        hint.current = "";
                        event.preventDefault();
                    }
                }
            }}
            onBlur={() => {
                hint.current = "";
            }}
            sx={{
                width: "100%",
            }}
            filterOptions={(x) => x}
            options={options}
            freeSolo
            getOptionLabel={(option) => option.name}
            value={value}
            onChange={(event: any, newValue: searchOption) => {
                if (event.key === "Enter") {
                    onSubmit();
                    event.preventDefault();
                } else {
                    const productId = newValue.id;
                    navigate(`/product/details/${productId}`);
                }
            }}
            inputValue={searchValue}
            onInputChange={(event: any, newInputValue: string | null) => {
                setSearchValue(newInputValue ?? "");
            }}
            size="small"
            renderInput={(params) => (
                <Box sx={{ position: "relative" }}>
                    <TextField
                        {...params}
                        className="bg-white"
                        InputProps={{
                            ...params.InputProps,
                            autoComplete: "new-password",
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                    className="mx-2"
                                >
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    onClick={onSubmit}
                                >
                                    <span className=" mr-2">|</span>
                                    <span className="text-primary_main font-medium">
                                        {t("search")}
                                    </span>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Typography
                        sx={{
                            position: "absolute",
                            opacity: 0.5,
                            left: 54,
                            top: 8,
                        }}
                    >
                        {hint.current}
                    </Typography>
                </Box>
            )}
        />
    );
}
