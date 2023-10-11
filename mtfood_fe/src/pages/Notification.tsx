import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import DiscountIcon from "@mui/icons-material/Discount";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
//Import i18
import { useTranslation } from "react-i18next";
//Import components
import Header from "../components/header";
import Footer from "../components/Footer";
import { ProfileNavigation } from "../features/profile";
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";
const user = {
    address: "Bạch Đằng, Quận Tân Bình, TP.HCM",
    avatar: "./assets/image_15.png",
    name: "Lorem",
};

const notifications = [
    {
        title: "Cảnh báo: Yêu cầu đăng nhập mới",
        content:
            "Lorem Ipsum has been the industry's standard dummy text ever since t Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        time: "21:30 09/8/2023",
    },
    {
        title: "Cảnh báo: Yêu cầu đăng nhập mới",
        content:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        time: "21:30 09/8/2023",
    },
];
export default function UserNotification() {
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Notification = (props) => {
        const { notification } = props;
        return (
            <div className="flex flex-row items-center">
                <div>
                    <Checkbox
                        checked={checked[0]}
                        onChange={handleChange2}
                        className=""
                    />
                </div>
                <div className="flex flex-col ml-5">
                    <h5 className="text-base">{notification.title}</h5>
                    <p className="text-sm text-gray-100">
                        {notification.content}
                    </p>
                    <p className="text-sm text-gray-100">{notification.time}</p>
                </div>
            </div>
        );
    };
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full px-4 py-12 bg-background_main">
                <ProfileNavigation user={user} />
                <div className="flex flex-col flex-1 mx-12 space-y-4">
                    <div>
                        <p className="text-base font-bold  text-primary_main uppercase my-0">
                            {t("notification")}
                        </p>
                    </div>
                    <div className="flex w-full flex-col bg-white p-4">
                        <div className="flex flex-row justify-between items-center">
                            <div>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="icon tabs example"
                                >
                                    <Tab
                                        icon={<HomeIcon />}
                                        aria-label="phone"
                                    />
                                    <Tab
                                        icon={<DiscountIcon />}
                                        aria-label="favorite"
                                    />
                                    <Tab
                                        icon={<ReceiptLongIcon />}
                                        aria-label="person"
                                    />
                                    <Tab
                                        icon={<SettingsIcon />}
                                        aria-label="person"
                                    />
                                </Tabs>
                            </div>
                            <div>
                                <TextButton>{t("delete")}</TextButton>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="flex flex-row items-center">
                                <Checkbox
                                    checked={checked[0] && checked[1]}
                                    indeterminate={checked[0] !== checked[1]}
                                    onChange={handleChange1}
                                />

                                <p className="my-0 font-normal text-gray-100 ml-5">
                                    {t("selectAll")}
                                </p>
                            </div>
                            <div className="flex flex-col mt-4">
                                {notifications.map((notification) => (
                                    <Notification notification={notification} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
