import { useTranslation } from "react-i18next";

//Import MUI

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled as mui_styled } from "@mui/material/styles";

import Switch from "@mui/material/Switch";
//Import components
import Header from "../components/header";
import Footer from "../components/Footer";
import { ProfileNavigation } from "../features/profile";

const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

const user = {
    address: "Bạch Đằng, Quận Tân Bình, TP.HCM",
    avatar: "./assets/image_15.png",
    name: "Lorem",
};

const label = { inputProps: { "aria-label": "switch" } };
export default function UserNotificationSetting() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full px-4 py-12 bg-background_main">
                <ProfileNavigation user={user} />
                <div className="flex flex-col flex-1 mx-12 space-y-4">
                    <p className="text-base font-bold  text-primary_main uppercase my-0">
                        {t("notificationSetting")}
                    </p>
                    <div className="flex flex-1 bg-white p-4">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <p className="my-0 text-black font-bold">
                                            {t("allNotification")}
                                        </p>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Switch {...label} defaultChecked />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <TableCell>
                                        {" "}
                                        <p className="my-0 text-gray-100">
                                            {t("commonNotification")}
                                        </p>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Switch {...label} defaultChecked />
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        {" "}
                                        <p className="my-0 text-gray-100">
                                            {t("discountNotification")}
                                        </p>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Switch {...label} defaultChecked />
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        {" "}
                                        <p className="my-0 text-gray-100">
                                            {t("orderNotification")}
                                        </p>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Switch {...label} defaultChecked />
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        {" "}
                                        <p className="my-0 text-gray-100">
                                            {t("systemNotification")}
                                        </p>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Switch {...label} defaultChecked />
                                    </TableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
