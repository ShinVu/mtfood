import { useTranslation } from "react-i18next";
const order_states = [
    "created",
    "waiting_payment",
    "waiting_confirm_payment",
    "waiting_confirm",
    "packing",
    "waiting_shipment",
    "shipping",
    "delivered",
    "completed",
    "cancel_waiting_refund",
    "canceled_refund",
    "canceled",
    "return_wating_refund",
    "returned",
];
function MapHeader({ orderStatus }: { orderStatus: string }) {
    const { t } = useTranslation();
    if (orderStatus === order_states[0]) {
        return (
            <p className=" text-base my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[1]) {
        return (
            <p className=" text-base my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[2]) {
        return (
            <p className=" text-base my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[3]) {
        return (
            <p className=" text-base my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[4]) {
        return (
            <p className=" text-base my-0 text-primary_light font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[5]) {
        return (
            <p className=" text-base my-0 text-primary_light font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[6]) {
        return (
            <p className=" text-base my-0  text-primary_light font-semibold">
                {t("orderShippingHeader")}
            </p>
        );
    } else if (orderStatus === order_states[7]) {
        return (
            <p className=" text-base my-0  text-primary_light font-semibold">
                {t("orderDeliveredHeader")}
            </p>
        );
    } else if (orderStatus === order_states[8]) {
        return (
            <p className=" text-base my-0 text-primary_main font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[9]) {
        return (
            <p className=" text-base my-0 text-primary_main font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[10]) {
        return (
            <p className=" text-base my-0 text-primary_main font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[11]) {
        return (
            <p className=" text-base my-0 text-gray_200 font-semibold">
                {t("orderCanceledHeader")}
            </p>
        );
    } else if (orderStatus === order_states[12]) {
        return (
            <p className=" text-base my-0 text-gray_200 font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[13]) {
        return (
            <p className=" text-base my-0 text-gray_200 font-semibold">
                {t(orderStatus)}
            </p>
        );
    }
}

function MapToText({ order }: { order: orderType }) {
    const { t } = useTranslation();
    console.log(order_states[10]);
    if (order.status === order_states[0]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderCreatedAt")} {changeTimeFormat(order.created_at)}
            </p>
        );
    } else if (order.status === order_states[1]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderWaitingPayment")}
            </p>
        );
    } else if (order.status === order_states[2]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderWaitingConfirmPayment")}
            </p>
        );
    } else if (order.status === order_states[3]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderWaitingConfirm")}
            </p>
        );
    } else if (order.status === order_states[4]) {
        return (
            <p className="text-gray-100 text-xs my-0">{t("orderPacking")}</p>
        );
    } else if (order.status === order_states[5]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderWaitingShipment")}
            </p>
        );
    } else if (order.status === order_states[6]) {
        return (
            <p className="text-gray-100 text-xs my-0">{t("orderShipping")}</p>
        );
    } else if (order.status === order_states[7]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderDelivered")} {changeTimeFormat(order.delivered_at)}
            </p>
        );
    } else if (order.status === order_states[8]) {
        return (
            <p className="text-gray-100 text-xs my-0">{t("orderCompleted")} </p>
        );
    } else if (order.status === order_states[9]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderCanceledWaitingRefund")}
            </p>
        );
    } else if (order.status === order_states[10]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderCanceledRefund")}
            </p>
        );
    } else if (order.status === order_states[11]) {
        return (
            <p className="text-gray-100 text-xs my-0">{t("orderCanceled")}</p>
        );
    } else if (order.status === order_states[12]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderReturnWaitingRefund")}
            </p>
        );
    } else if (order.status === order_states[13]) {
        return <p className="text-gray-100 text-xs my-0">{t("orderReturn")}</p>;
    }
}

export { MapHeader, MapToText };
