import { useTranslation } from "react-i18next";
import { changeTimeFormat } from "../../../utils";
import { orderType } from "../../../models/order.model";
const order_wholesale_states = [
    "created", //0
    "waiting_confirm", //1
    "in_process", //2
    "completed", //3
];
function MapWholesaleHeader({ orderStatus }: { orderStatus: string }) {
    const { t } = useTranslation();
    if (orderStatus === order_wholesale_states[0]) {
        return (
            <p className=" text-base my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_wholesale_states[1]) {
        return (
            <p className=" text-base my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_wholesale_states[2]) {
        return (
            <p className=" text-base my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_wholesale_states[3]) {
        return (
            <p className=" text-base my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    }
}

function MapWholesaleHeaderDetail({ orderStatus }: { orderStatus: string }) {
    const { t } = useTranslation();
    if (orderStatus === order_wholesale_states[0]) {
        return (
            <p className=" text-lg my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_wholesale_states[1]) {
        return (
            <p className=" text-lg my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_wholesale_states[2]) {
        return (
            <p className=" text-lg my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    } else if (orderStatus === order_wholesale_states[3]) {
        return (
            <p className=" text-lg my-0 text-blue font-semibold">
                {t(orderStatus)}
            </p>
        );
    }
}

function MapWholesaleToText({ order }: { order: orderType }) {
    const { t } = useTranslation();
    if (order.status === order_wholesale_states[0]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderCreatedAt")} {changeTimeFormat(order.created_at)}
            </p>
        );
    } else if (order.status === order_wholesale_states[1]) {
        return (
            <p className="text-gray-100 text-xs my-0">
                {t("orderWaitingConfirm")}
            </p>
        );
    } else if (order.status === order_wholesale_states[2]) {
        return (
            <p className="text-gray-100 text-xs my-0">{t("orderInProcess")}</p>
        );
    } else if (order.status === order_wholesale_states[3]) {
        return (
            <p className="text-gray-100 text-xs my-0">{t("orderCompleted")} </p>
        );
    }
}

export {
    order_wholesale_states,
    MapWholesaleHeader,
    MapWholesaleToText,
    MapWholesaleHeaderDetail,
};
