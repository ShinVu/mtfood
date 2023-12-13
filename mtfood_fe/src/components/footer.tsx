// Import tailwind css
import "../index.css";

// Import translation
import { useTranslation } from "react-i18next";

// Import icons
import { FaMoneyBills } from "react-icons/fa6";
import { colors } from "../../public/theme";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

export default function Footer() {
    const { t } = useTranslation();
    return (
        <div className="p-4 flex  w-full justify-center items-center bg-background_footer">
            <TableContainer>
                <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <StyledTableRow>
                            <TableCell>
                                <h1 className="font-bold text-base capitalize my-0 ">
                                    {t("customerService")}
                                </h1>
                            </TableCell>
                            <TableCell>
                                {" "}
                                <h1 className="font-bold text-base capitalize my-0">
                                    {t("about")} {t("name")}
                                </h1>
                            </TableCell>
                            <TableCell>
                                <h1 className="font-bold text-base capitalize my-0">
                                    {t("paymentMethod")}
                                </h1>
                            </TableCell>
                            <TableCell>
                                {" "}
                                <h1 className="font-bold text-base capitalize my-0">
                                    {t("deliveryMethod")}
                                </h1>
                            </TableCell>
                            <TableCell>
                                <h1 className="font-bold text-base capitalize my-0">
                                    {t("connect")}
                                </h1>
                            </TableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <TableCell>
                                <p className="font-medium text-xs text-[#808080] my-0">
                                    {t("hotline")}:{" "}
                                    <span className="underline">
                                        096 321 9191
                                    </span>
                                </p>
                            </TableCell>
                            <TableCell>
                                <p className="font-medium text-xs text-[#808080] my-0">
                                    {t("introduce")}
                                </p>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-row items-center ">
                                    <FaMoneyBills
                                        style={{ color: colors.primary_main }}
                                        className="h-auto w-6"
                                    />
                                    <p className="font-medium text-xs text-[#808080] my-0 mx-2">
                                        {t("COD")}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <p className="font-medium text-xs text-[#808080] my-0">
                                    {t("ahamove")}
                                </p>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-row">
                                    <img
                                        src="/assets/zalo.png"
                                        className="h-auto w-6"
                                        alt="zalo"
                                    />
                                    <img
                                        src="/assets/facebook.png"
                                        className="h-auto w-6"
                                        alt="facebook"
                                    />
                                </div>
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>
                                <p className="font-medium text-xs text-[#808080] my-0">
                                    {t("regQuestion")}
                                </p>
                            </TableCell>
                            <TableCell>
                                <p className="font-medium text-xs text-[#808080] my-0">
                                    {t("recruit")}
                                </p>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-row items-center">
                                    <img
                                        src="/assets/momo.png"
                                        className="h-auto w-6"
                                        alt=""
                                    />
                                    <p className="font-medium text-xs text-[#808080] my-0 mx-2">
                                        {t("momo")}
                                    </p>
                                </div>
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>
                                <p className="font-medium text-xs text-[#808080] my-0">
                                    {t("orderGuide")}
                                </p>
                            </TableCell>
                            <TableCell>
                                <p className="font-medium text-xs text-[#808080] my-0">
                                    {t("privacy_policy")}
                                </p>
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>
                                <p className="font-medium text-xs text-[#808080] my-0">
                                    {t("returnPolicy")}
                                </p>
                            </TableCell>
                            <TableCell>
                                <p className="font-medium text-xs text-[#808080] my-0">
                                    {t("payment")}
                                </p>
                            </TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
