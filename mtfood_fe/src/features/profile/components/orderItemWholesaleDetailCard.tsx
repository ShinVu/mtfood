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
import { changePriceFormat } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { orderWholesaleDetail } from "../../../models/order.model";
const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

export default function OrderWholesaleItemsDetailCard({
    orderDetails,
}: {
    orderDetails: orderWholesaleDetail[];
}) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col flex-1">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            <span className="text-gray-100 font-medium">
                                {t("product")}
                            </span>
                        </TableCell>
                        <TableCell align="right">
                            <span className="text-gray-100 font-medium">
                                {t("productPrice")}
                            </span>
                        </TableCell>
                        <TableCell align="right">
                            <span className="text-gray-100 font-medium">
                                {t("productQuantity")}
                            </span>
                        </TableCell>
                        <TableCell align="right">
                            <span className="text-gray-100 font-medium">
                                {t("subTotal")}
                            </span>
                        </TableCell>
                        <TableCell align="right">
                            <span className="text-gray-100 font-medium">
                                {t("quantityDelivered")}
                            </span>
                        </TableCell>
                        <TableCell align="right">
                            <span className="text-gray-100 font-medium">
                                {t("totalPaid")}
                            </span>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orderDetails.map((orderDetail: orderWholesaleDetail) => (
                        <StyledTableRow key={orderDetail.id}>
                            <TableCell align="left">
                                <div
                                    className="flex flex-row space-x-4 cursor-pointer"
                                    onClick={() => {
                                        navigate(
                                            `/product/details/${orderDetail.product.id}`
                                        );
                                    }}
                                >
                                    <img
                                        src={orderDetail.product.image_url}
                                        className="w-24 h-24"
                                        alt=""
                                    />
                                    <p className="text-base font-medium">
                                        {orderDetail.product.name}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                <p className="text-lg font-medium  my-0 ">
                                    {changePriceFormat(orderDetail.unit_price)}đ
                                </p>
                            </TableCell>
                            <TableCell align="right">
                                <p className="font-regular text-base text-black">
                                    {orderDetail.quantity}
                                </p>
                            </TableCell>
                            <TableCell align="right">
                                <p className="font-medium text-base text-red_main">
                                    {/* {changePriceFormat(
                                        getOrderItemSubTotal(
                                            orderDetail.unit_discount,
                                            orderDetail.quantity
                                        )
                                    )} */}
                                    {changePriceFormat(
                                        parseFloat(orderDetail.unit_price) *
                                            orderDetail.quantity
                                    )}
                                    đ
                                </p>
                            </TableCell>
                            <TableCell align="right">
                                <p className="font-medium text-base ">
                                    {/* {changePriceFormat(
                                        getOrderItemSubTotal(
                                            orderDetail.unit_discount,
                                            orderDetail.quantity
                                        )
                                    )} */}
                                    {orderDetail.quantity_delivered}
                                </p>
                            </TableCell>
                            <TableCell align="right">
                                <p className="font-medium text-base text-red_main">
                                    {/* {changePriceFormat(
                                        getOrderItemSubTotal(
                                            orderDetail.unit_discount,
                                            orderDetail.quantity
                                        )
                                    )} */}
                                    {changePriceFormat(
                                        parseFloat(orderDetail.unit_price) *
                                            orderDetail.quantity_delivered
                                    )}
                                    đ
                                </p>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Divider />
        </div>
    );
}
