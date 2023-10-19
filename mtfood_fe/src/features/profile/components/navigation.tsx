import { useTranslation } from "react-i18next";
//Import MUI
import { Avatar, Divider, TextField } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LoopIcon from "@mui/icons-material/Loop";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CreateIcon from "@mui/icons-material/Create";

import { colors } from "../../../../public/theme";
import { useNavigate } from "react-router-dom";

export default function ProfileNavigation(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = props;
    return (
        <div className=" flex flex-col min-w-fit w-fit  space-y-2  ">
            <div className="flex flex-row w-full  items-center space-x-5">
                <Avatar alt={user.name} src={user.avatar} />
                <div className="flex flex-col">
                    <p className="text-base font-bold w-36 md:w-40 lg:w-44 xl:w-48 my-0 line-clamp-4 text-black">
                        {user.name}
                    </p>
                    <div className="flex flex-row items-center mt-1">
                        <CreateIcon
                            sx={{
                                color: colors.gray[200],
                                fontSize: 18,
                            }}
                        />
                        <p
                            className="text-sm font-medium text-gray-200  my-0 ml-1 cursor-pointer"
                            onClick={() => navigate("/user/account")}
                        >
                            {t("editProfile")}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <Divider
                    sx={{
                        borderBottomWidth: 1,
                        bgcolor: colors.gray[100],
                    }}
                />
            </div>
            <div className="ml-2 space-y-4 mt-3 ">
                <div
                    className="flex flex-row items-center text-gray-200 hover:text-primary_main"
                    onClick={() => navigate("/user/account")}
                >
                    <PermIdentityIcon />
                    <p className="text-sm font-medium  my-0 ml-2 text-gray-200 hover:text-primary_main  cursor-pointer">
                        {t("myAccount")}
                    </p>
                </div>
                <div className="ml-8 my-2 ">
                    <p
                        className="text-sm font-medium  my-1 text-gray-100  hover:text-primary_main  cursor-pointer"
                        onClick={() => navigate("/user/account")}
                    >
                        {t("profile")}
                    </p>
                    <p
                        className="text-sm font-medium  my-1 text-gray-100  hover:text-primary_main  cursor-pointer"
                        onClick={() => navigate("/user/bank")}
                    >
                        {t("bank")}
                    </p>
                    <p
                        className="text-sm font-medium  my-1 text-gray-100  hover:text-primary_main  cursor-pointer"
                        onClick={() => navigate("/user/address")}
                    >
                        {t("accountAddress")}
                    </p>
                    <p className="text-sm font-medium  my-1 text-gray-100  hover:text-primary_main  cursor-pointer">
                        {t("notificationSetting")}
                    </p>
                </div>
                <div
                    className="flex flex-row items-center text-gray-200 hover:text-primary_main  cursor-pointer"
                    onClick={() => navigate("/user/order")}
                >
                    <ReceiptLongIcon />
                    <p className="text-sm font-medium  my-0 ml-2 text-gray-200 hover:text-primary_main">
                        {t("order")}
                    </p>
                </div>
                <div
                    className="flex flex-row items-center  text-gray-200 hover:text-primary_main  cursor-pointer"
                    onClick={() => navigate("/user/seen")}
                >
                    <LoopIcon />
                    <p className="text-sm font-medium  my-0 ml-2 text-gray-200 hover:text-primary_main">
                        {t("seenProduct")}
                    </p>
                </div>
                <div
                    className="flex flex-row items-center  text-gray-200 hover:text-primary_main  cursor-pointer"
                    onClick={() => navigate("/user/liked")}
                >
                    <FavoriteBorderIcon />
                    <p className="text-sm font-medium  my-0 ml-2 text-gray-200 hover:text-primary_main">
                        {t("likedProduct")}
                    </p>
                </div>
                <div
                    className="flex flex-row items-center text-gray-200 hover:text-primary_main  cursor-pointer"
                    onClick={() => navigate("/user/notification")}
                >
                    <NotificationsNoneIcon />
                    <p className="text-sm font-medium  my-0 ml-2 text-gray-200 hover:text-primary_main">
                        {t("notification")}
                    </p>
                </div>
            </div>
        </div>
    );
}
