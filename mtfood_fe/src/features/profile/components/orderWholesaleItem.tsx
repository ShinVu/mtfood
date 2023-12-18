import {
    Collapse,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
//Import MUI
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//Import Components
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../../../components/button";
import { useNavigate } from "react-router-dom";
import { changePriceFormat, changeTimeFormat } from "../../../utils";
import {
    orderDetail,
    orderType,
    orderWholesaleType,
} from "../../../models/order.model";
import { styled } from "@mui/material/styles";
import { KeyboardArrowUp } from "@mui/icons-material";
import { MapHeader, MapToText } from "../../order/components/message.";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

function OrderDetailItems({
    orderDetailItems,
    open,
}: {
    orderDetailItems: orderDetail[];
    open: boolean;
}) {
    return (
        <Table size="small">
            <TableBody>
                {orderDetailItems
                    .slice(0, 2)
                    .map((orderDetailItem: orderDetail) => (
                        <StyledTableRow key={orderDetailItem.id}>
                            <TableCell align="left">
                                <div className="flex flex-row space-x-4">
                                    <img
                                        src={orderDetailItem.product.image_path}
                                        className="w-24 h-24 object-cover object-center"
                                    />
                                    <p className="font-medium text-sm my-0">
                                        {orderDetailItem.product.name}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                <div>
                                    {orderDetailItem.unit_discount && (
                                        <>
                                            {parseFloat(
                                                orderDetailItem.unit_discount
                                            ) > 0 && (
                                                <p className="text-base  text-gray-100 my-0 line-through">
                                                    {changePriceFormat(
                                                        parseFloat(
                                                            orderDetailItem.unit_price
                                                        ) +
                                                            parseFloat(
                                                                orderDetailItem.unit_discount
                                                            )
                                                    )}
                                                </p>
                                            )}
                                            <p className="text-lg font-medium  my-0 ">
                                                {changePriceFormat(
                                                    orderDetailItem.unit_price
                                                )}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                <p className="text-lg font-medium  my-0 ">
                                    x{orderDetailItem.quantity}
                                </p>
                            </TableCell>
                            <TableCell align="right">
                                <div>
                                    <p className="text-lg font-medium text-red_main my-0">
                                        {changePriceFormat(
                                            parseFloat(
                                                orderDetailItem.unit_price
                                            ) * orderDetailItem.quantity
                                        )}
                                    </p>
                                </div>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                {open &&
                    orderDetailItems
                        .slice(2)
                        .map((orderDetailItem: orderDetail) => (
                            <StyledTableRow key={orderDetailItem.id}>
                                <TableCell align="left">
                                    <div className="flex flex-row space-x-4">
                                        <img
                                            src={
                                                orderDetailItem.product
                                                    .image_path
                                            }
                                            className="w-24 h-24 object-cover object-center"
                                        />
                                        <p className="font-medium text-sm my-0">
                                            {orderDetailItem.product.name}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div>
                                        {orderDetailItem.unit_discount && (
                                            <>
                                                {parseFloat(
                                                    orderDetailItem.unit_discount
                                                ) > 0 && (
                                                    <p className="text-base  text-gray-100 my-0 line-through">
                                                        {changePriceFormat(
                                                            parseFloat(
                                                                orderDetailItem.unit_price
                                                            ) +
                                                                parseFloat(
                                                                    orderDetailItem.unit_discount
                                                                )
                                                        )}
                                                    </p>
                                                )}
                                                <p className="text-lg font-medium  my-0 ">
                                                    {changePriceFormat(
                                                        orderDetailItem.unit_price
                                                    )}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <p className="text-lg font-medium  my-0 ">
                                        x{orderDetailItem.quantity}
                                    </p>
                                </TableCell>
                                <TableCell align="right">
                                    <div>
                                        <p className="text-lg font-medium text-red_main my-0">
                                            {changePriceFormat(
                                                parseFloat(
                                                    orderDetailItem.unit_price
                                                ) * orderDetailItem.quantity
                                            )}
                                        </p>
                                    </div>
                                </TableCell>
                            </StyledTableRow>
                        ))}
            </TableBody>
        </Table>
    );
}

export default function OrderWholesaleItem(props: {
    order: orderWholesaleType;
}) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { order } = props;
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Paper elevation={5} className="flex flex-1 flex-col p-4">
            <div className="flex flex-row w-full justify-between px-4">
                <MapHeader orderStatus={order.status} />
                <p className="text-sm text-gray-100">
                    Mã đơn hàng: #{order.order_code}
                </p>
            </div>
            <Divider className="my-2" />
            <div className="flex flex-1 flex-col space-y-2 w-full">
                {/* <OrderDetailItems
                    open={open}
                    orderDetailItems={order.order_summary_detail}
                />
                {order.order_summary_detail.length >= 3 && (
                    <div
                        className="flex w-full items-center justify-center"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />}
                    </div>
                )} */}
            </div>
            <Divider className="my-2" />
            <div className="flex flex-1 justify-end space-x-4 items-center">
                <p className="text-gray-100 text-md my-0">
                    {t("totalOrderAmount")}
                </p>
                <p className="text-2xl font-bold text-red_main my-0 pr-2">
                    {changePriceFormat(order.total)}
                </p>
            </div>
            <div className="flex flex-1 flex-row justify-between mt-12 items-center">
                <MapToText order={order} />
                <div className="flex flex-col lg:flex-row space-y-4 space-x-0 lg:space-y-0  lg:space-x-4">
                    <OutlinedButton
                        onClick={() =>
                            navigate(`/user/order/details/${order.id}`)
                        }
                    >
                        {t("seeOrderDetail")}
                    </OutlinedButton>
                    <OutlinedButton endIcon={<KeyboardArrowDownIcon />}>
                        {t("seeMore")}
                    </OutlinedButton>
                </div>
            </div>
        </Paper>
    );
}
