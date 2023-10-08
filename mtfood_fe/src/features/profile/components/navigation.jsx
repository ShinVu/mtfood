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

export default function ProfileNavigation(props) {
    const { t } = useTranslation();
    const { user } = props;
    return (
        <div className=" flex flex-col min-w-fit w-fit  space-y-2  ">
            <div className="flex flex-row w-full  items-center space-x-5">
                <Avatar alt={user.name} src={user.avatar} />
                <div className="flex flex-col">
                    <p className="text-base font-bold w-36 md:w-40 lg:w-44 xl:w-48 my-0 line-clamp-4">
                        {user.name}
                    </p>
                    <div className="flex flex-row items-center mt-1">
                        <CreateIcon
                            sx={{
                                color: colors.gray[200],
                                fontSize: 18,
                            }}
                        />
                        <p className="text-sm font-medium text-gray-200  my-0 ml-1">
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
                <div className="flex flex-row items-center hover:text-primary_main">
                    <PermIdentityIcon />
                    <p className="text-sm font-medium  my-0 ml-2">
                        {t("myAccount")}
                    </p>
                </div>
                <div className="ml-8 my-2 ">
                    <p className="text-sm font-medium  my-1 text-gray-200  hover:text-primary_main">
                        {t("profile")}
                    </p>
                    <p className="text-sm font-medium  my-1 text-gray-200  hover:text-primary_main">
                        {t("bank")}
                    </p>
                    <p className="text-sm font-medium  my-1 text-gray-200  hover:text-primary_main">
                        {t("accountAddress")}
                    </p>
                    <p className="text-sm font-medium  my-1 text-gray-200  hover:text-primary_main">
                        {t("notificationSetting")}
                    </p>
                </div>
                <div className="flex flex-row items-center  hover:text-primary_main">
                    <ReceiptLongIcon />
                    <p className="text-sm font-medium  my-0 ml-2">
                        {t("order")}
                    </p>
                </div>
                <div className="flex flex-row items-center  hover:text-primary_main">
                    <LoopIcon />
                    <p className="text-sm font-medium  my-0 ml-2">
                        {t("seenProduct")}
                    </p>
                </div>
                <div className="flex flex-row items-center  hover:text-primary_main">
                    <FavoriteBorderIcon />
                    <p className="text-sm font-medium  my-0 ml-2">
                        {t("likedProduct")}
                    </p>
                </div>
                <div className="flex flex-row items-center  hover:text-primary_main">
                    <NotificationsNoneIcon />
                    <p className="text-sm font-medium  my-0 ml-2">
                        {t("notification")}
                    </p>
                </div>
            </div>
        </div>
    );
}
