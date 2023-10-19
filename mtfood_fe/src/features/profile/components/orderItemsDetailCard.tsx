import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled as mui_styled } from "@mui/material/styles";
import { colors } from "../../../../public/theme";
const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

export default function OrderItemsDetailCard(props) {
    const { t } = useTranslation();
    const { products } = props;
    return (
        <div className="flex flex-col flex-1">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="w-3/6" align="left">
                            <span className="text-gray-100 font-medium">
                                {t("product")}
                            </span>
                        </TableCell>
                        <TableCell className="w-1/6" align="right">
                            <span className="text-gray-100 font-medium">
                                {t("productPrice")}
                            </span>
                        </TableCell>
                        <TableCell className="w-1/6" align="right">
                            <span className="text-gray-100 font-medium">
                                {t("productQuantity")}
                            </span>
                        </TableCell>
                        <TableCell className="w-1/6" align="right">
                            <span className="text-gray-100 font-medium">
                                {t("subTotal")}
                            </span>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {products.map((product) => (
                        <StyledTableRow>
                            <TableCell align="left">
                                <div className="flex flex-row space-x-4">
                                    <img
                                        src="/assets/image_14.png"
                                        className="w-24 h-24"
                                    />
                                    <p className="text-base font-medium">
                                        {product.name}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                {product.basePrice}
                            </TableCell>
                            <TableCell align="right">
                                {product.quantity}
                            </TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Divider />
            <div className="flex flex-col items-end  mt-8">
                <div>
                    <Table>
                        <TableBody>
                            <StyledTableRow>
                                <TableCell className="w-96">
                                    <span className="text-gray-100 font-medium">
                                        {" "}
                                        {t("subTotal")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">1234</TableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <TableCell>
                                    <span className="text-gray-100 font-medium">
                                        {t("deliveryFee")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    213123121234
                                </TableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <TableCell>
                                    <span className="text-gray-100 font-medium">
                                        {t("deliveryFeeDiscount")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">1234</TableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <TableCell>
                                    <span className="text-gray-100 font-medium">
                                        {t("voucherDiscount")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">1234</TableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <TableCell>
                                    <span className="text-gray-100 font-medium">
                                        {t("total")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className="text-2xl font-bold text-red_main">
                                        1234
                                    </span>
                                </TableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
