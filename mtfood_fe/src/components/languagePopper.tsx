import { Divider, Popper } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import { colors } from "../../public/theme";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function LanguagePopper() {
    const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const changeLanguageHandler = (lang: string) => {
        if (lang === "en" || lang === "vn") {
            i18n.changeLanguage(lang);
        }
        handleClick(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
        <div>
            <div
                className="mx-3 flex flex-row items-center"
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                onClick={handleClick}
            >
                <div className="mx-2">
                    {i18n.language === "vn" && (
                        <img
                            src="/assets/vietnamese_flag.png"
                            className="h-auto w-6"
                            alt="vn"
                        />
                    )}
                    {i18n.language === "en" && (
                        <img
                            src="/assets/english_flag.png"
                            className="h-auto w-6"
                            alt="en"
                        />
                    )}
                </div>

                <FaAngleDown style={{ color: colors.white }} />
            </div>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                className="z-50"
                placement={"bottom-end"}
            >
                <div className="mt-2 bg-white">
                    <div
                        className="flex flex-row items-center  hover:bg-gray-100 px-2 py-3 "
                        onClick={() => changeLanguageHandler("vn")}
                    >
                        <img
                            src="/assets/vietnamese_flag.png"
                            className="h-auto w-6"
                            alt="vn"
                        />
                        <span className="flex flex-col">
                            <span className="font-medium text-xs capitalize my-0 mx-1 text-black">
                                Tiếng Việt
                            </span>
                        </span>
                    </div>
                    <Divider />
                    <div
                        className="flex flex-row items-center  hover:bg-gray-100 px-2 py-2"
                        onClick={() => changeLanguageHandler("en")}
                    >
                        <img
                            src="/assets/english_flag.png"
                            className="h-auto w-6"
                            alt="en"
                        />
                        <span className="flex flex-col">
                            <span className="font-medium text-xs capitalize my-0 mx-1 text-black">
                                English
                            </span>
                        </span>
                    </div>
                </div>
            </Popper>
        </div>
    );
}
