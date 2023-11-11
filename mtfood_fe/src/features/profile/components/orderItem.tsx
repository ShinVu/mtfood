import {
    Collapse,
    Divider,
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
import { orderDetail, orderType } from "../../../models/order.model";
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
    console.log(open);
    return (
        <Table size="small">
            <TableBody>
                {orderDetailItems
                    .slice(0, 3)
                    .map((orderDetailItem: orderDetail) => (
                        <StyledTableRow key={orderDetailItem.id}>
                            <TableCell align="left">
                                <div className="flex flex-row space-x-4">
                                    <img
                                        src="/assets/image_14.png"
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
                                        <p className="text-base text-gray-100 line-through my-0">
                                            {changePriceFormat(
                                                orderDetailItem.unit_discount
                                            )}
                                        </p>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                <div>
                                    <p className="text-base font-medium text-red_main my-0">
                                        {changePriceFormat(
                                            orderDetailItem.unit_price
                                        )}
                                    </p>
                                </div>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                {open &&
                    orderDetailItems
                        .slice(3, -1)
                        .map((orderDetailItem: orderDetail) => (
                            <StyledTableRow key={orderDetailItem.id}>
                                <TableCell align="left">
                                    <div className="flex flex-row space-x-4">
                                        <img
                                            src="/assets/image_14.png"
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
                                            <p className="text-base text-gray-100 line-through my-0">
                                                {changePriceFormat(
                                                    orderDetailItem.unit_discount
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div>
                                        <p className="text-base font-medium text-red_main my-0">
                                            {changePriceFormat(
                                                orderDetailItem.unit_price
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

export default function OrderItem(props: { order: orderType }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { order } = props;
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="flex flex-1 flex-col p-4 bg-white mb-8 shadow">
            <div className="flex flex-row w-full justify-between px-4">
                <MapHeader orderStatus={order.status} />
                <p className="text-sm text-gray-100">
                    Mã đơn hàng: #{order.order_code}
                </p>
            </div>
            <Divider className="my-2" />
            <div className="flex flex-1 flex-col space-y-2 w-full">
                <OrderDetailItems
                    open={open}
                    orderDetailItems={order.order_detail}
                />
                {order.order_detail.length >= 3 && (
                    <div
                        className="flex w-full items-center justify-center"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />}
                    </div>
                )}
            </div>
            <Divider className="my-2" />
            <div className="flex flex-1 justify-end space-x-4">
                <p className="text-gray-100 text-md my-0">
                    {t("totalOrderAmount")}
                </p>
                <p className="text-md font-medium text-red_main my-0">
                    đ{changePriceFormat(order.subtotal)}
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
        </div>
    );
}
