// Import tailwind css
import "../index.css";

// Import translation
import { useTranslation } from "react-i18next";

// Import library from bootstrap
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Import icons
import { FaMoneyBills } from "react-icons/fa6";
import { colors } from "../../public/theme";
function Footer() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-initial flex-row justify-content m-2 justify-evenly">
            <div className="mr-2">
                <h1 className="font-bold text-base capitalize  ">
                    {t("customerService")}
                </h1>
                <p className="font-medium text-xs text-gray-100">
                    {t("hotline")}:{" "}
                    <span className="underline">096 321 9191</span>
                </p>
                <p className="font-medium text-xs text-gray-100">
                    {t("regQuestion")}
                </p>
                <p className="font-medium text-xs text-gray-100">
                    {t("orderGuide")}
                </p>
                <p className="font-medium text-xs text-gray-100">
                    {t("returnPolicy")}
                </p>
            </div>

            <div className="mx-2">
                <h1 className="font-bold text-base capitalize ">
                    {t("about")} {t("name")}
                </h1>

                <p className="font-medium text-xs text-gray-100">
                    {t("introduce")}
                </p>
                <p className="font-medium text-xs text-gray-100">
                    {t("recruit")}
                </p>
                <p className="font-medium text-xs text-gray-100">
                    {t("privacy_policy")}
                </p>
                <p className="font-medium text-xs text-gray-100">
                    {t("payment")}
                </p>
            </div>
            <div className="mx-2">
                <h1 className="font-bold text-base capitalize ">
                    {t("paymentMethod")}
                </h1>
                <div className="flex flex-row items-center my-0">
                    <FaMoneyBills style={{ color: colors.primary_main }} />
                    <p className="font-medium text-xs text-gray-100 my-0 mx-2">
                        {t("COD")}
                    </p>
                </div>
                <div className="flex flex-row items-center my-3">
                    <img src="/assets/momo.png" className="h-auto w-6" />
                    <p className="font-medium text-xs text-gray-100 my-0 mx-2">
                        {t("momo")}
                    </p>
                </div>
                <div className="flex flex-row items-center my-2">
                    <img src="/assets/zaloPay.png" className="h-auto w-6" />
                    <p className="font-medium text-xs text-gray-100 my-0 mx-2">
                        {t("ZaloPay")}
                    </p>
                </div>
            </div>
            <div className="mx-2">
                <h1 className="font-bold text-base capitalize ">
                    {t("deliveryMethod")}
                </h1>

                <p className="font-medium text-xs text-gray-100">
                    {t("ahamove")}
                </p>
            </div>
            <div className="mx-2">
                <h1 className="font-bold text-base capitalize ">
                    {t("connect")}
                </h1>
                <div className="flex flex-row">
                    <img src="/assets/zalo.png" className="h-auto w-6" />
                    <img src="/assets/facebook.png" className="h-auto w-6" />
                </div>
            </div>
        </div>
    );
}

export { Footer };
