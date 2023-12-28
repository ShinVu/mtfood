import { useTranslation } from "react-i18next";
import { changeTimeFormat } from "../../../utils";
import { orderType } from "../../../models/order.model";
const order_states = [
    "created", //0
    "planning", //1
    "waiting_payment", //2
    "waiting_confirm_payment", //3
    "waiting_confirm", //4
    "packing", //5
    "waiting_shipment", //6
    "shipping", //7
    "delivered", //8
    "completed", //9
    "cancel_waiting_refund", //10
    "canceled_refund", //11
    "canceled", //12
    "return_waiting_refund", //13
    "returned", //14
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
            <p className=" text-base my-0 text-blue font-semibold">
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
            <p className=" text-base my-0 text-primary_light font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[7]) {
        return (
            <p className=" text-base my-0  text-primary_light font-semibold">
                {t("orderShippingHeader")}
            </p>
        );
    } else if (orderStatus === order_states[8]) {
        return (
            <p className=" text-base my-0  text-primary_light font-semibold">
                {t("orderDeliveredHeader")}
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
            <p className=" text-base my-0 text-primary_main font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[12]) {
        return (
            <p className=" text-base my-0 text-gray_200 font-semibold">
                {t("orderCanceledHeader")}
            </p>
        );
    } else if (orderStatus === order_states[13]) {
        return (
            <p className=" text-base my-0 text-gray_200 font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_states[14]) {
        return (
            <p className=" text-base my-0 text-gray_200 font-semibold">
                {t(orderStatus)}
            </p>
        );
    }
}

function MapToText({ order }: { order: orderType }) {
    const { t } = useTranslation();
    if (order.status === order_states[0]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderCreatedAt")} {changeTimeFormat(order.created_at)}
            </p>
        );
    } else if (order.status === order_states[1]) {
        return (
            <p className="text-gray-100 text-xs my-0">{t("orderPlanning")}</p>
        );
    } else if (order.status === order_states[2]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderWaitingPayment")}
            </p>
        );
    } else if (order.status === order_states[3]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderWaitingConfirmPayment")}
            </p>
        );
    } else if (order.status === order_states[4]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderWaitingConfirm")}
            </p>
        );
    } else if (order.status === order_states[5]) {
        return (
            <p className="text-gray-100 text-xs my-0">{t("orderPacking")}</p>
        );
    } else if (order.status === order_states[6]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderWaitingShipment")}
            </p>
        );
    } else if (order.status === order_states[7]) {
        return (
            <p className="text-gray-100 text-xs my-0">{t("orderShipping")}</p>
        );
    } else if (order.status === order_states[8]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderDelivered")} {changeTimeFormat(order.delivered_at)}
            </p>
        );
    } else if (order.status === order_states[9]) {
        return (
            <p className="text-gray-100 text-xs my-0">{t("orderCompleted")} </p>
        );
    } else if (order.status === order_states[10]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderCanceledWaitingRefund")}
            </p>
        );
    } else if (order.status === order_states[11]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderCanceledRefund")}
            </p>
        );
    } else if (order.status === order_states[12]) {
        return (
            <p className="text-gray-100 text-xs my-0">{t("orderCanceled")}</p>
        );
    } else if (order.status === order_states[13]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderReturnWaitingRefund")}
            </p>
        );
    } else if (order.status === order_states[14]) {
        return <p className="text-gray-100 text-xs my-0">{t("orderReturn")}</p>;
    }
}

function mapActiveStep(orderStatus: string) {
    if (orderStatus === order_states[0]) {
        return 0;
    } else if (orderStatus === order_states[1]) {
        return 0;
    } else if (orderStatus === order_states[2]) {
        return 1;
    } else if (orderStatus === order_states[3]) {
        return 1;
    } else if (orderStatus === order_states[4]) {
        return 1;
    } else if (orderStatus === order_states[5]) {
        return 2;
    } else if (orderStatus === order_states[6]) {
        return 2;
    } else if (orderStatus === order_states[7]) {
        return 3;
    } else if (orderStatus === order_states[8]) {
        return 4;
    } else if (orderStatus === order_states[9]) {
        return 4;
    }
}

function MapActiveStepMessage({
    order,
    label,
}: {
    order: orderType;
    label: { status: string };
}) {
    const { t } = useTranslation();
    if (label.status == "orderCreated") {
        if (order_states.indexOf(order.status) == 1) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperPlanning")}
                    <br />
                    {changeTimeFormat(order.created_at)}
                </p>
            );
        }
        if (order_states.indexOf(order.status) >= 0) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperCreated")}
                    <br />
                    {changeTimeFormat(order.created_at)}
                </p>
            );
        }
    }

    if (label.status == "paymentConfirmed") {
        if (order_states.indexOf(order.status) == 2) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperWaitingPayment")}
                    <br />
                </p>
            );
        } else if (order_states.indexOf(order.status) == 3) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperWaitingPaymentConfirm")}
                </p>
            );
        } else if (order_states.indexOf(order.status) == 4) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperWaitingConfirm")}
                    <br />
                </p>
            );
        } else if (order_states.indexOf(order.status) > 5) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperConfirmed")}
                    <br />
                    {changeTimeFormat(order.confirmed_at)}
                </p>
            );
        }
    }
    if (label.status == "shipmentConfirmed") {
        if (order_states.indexOf(order.status) == 5) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperPacking")}
                    <br />
                </p>
            );
        } else if (order_states.indexOf(order.status) == 6) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperWaitingShipment")}
                    <br />
                </p>
            );
        } else if (order_states.indexOf(order.status) > 6) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperWaitingShipmentCompleted")}
                    <br />
                    {changeTimeFormat(order.shipping_at)}
                </p>
            );
        }
    }
    if (label.status == "shipped") {
        if (order_states.indexOf(order.status) == 7) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperShipping")}
                    <br />
                </p>
            );
        } else if (order_states.indexOf(order.status) == 8) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperDelivered")}
                    <br />
                    {changeTimeFormat(order.delivered_at)}
                </p>
            );
        } else if (order_states.indexOf(order.status) > 8) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperDelivered")}
                    <br />
                    {changeTimeFormat(order.delivered_at)}
                </p>
            );
        }
    }
    if (label.status == "rate") {
        if (order_states.indexOf(order.status) == 8) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperWaitingRating")}
                    <br />
                </p>
            );
        } else if (order_states.indexOf(order.status) == 9) {
            return (
                <p className="text-gray-100 text-xs my-0">
                    {t("orderStepperCompleted")}
                    <br />
                </p>
            );
        }
    }
}
export {
    order_states,
    MapHeader,
    MapToText,
    mapActiveStep,
    MapActiveStepMessage,
};
