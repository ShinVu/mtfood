import { useTranslation } from "react-i18next";

//Import components
import Header from "../components/header";
import Footer from "../components/Footer";
import { ProfileNavigation } from "../features/profile";

//Import MUI
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Divider } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
    "Select master blaster campaign settings",
    "Create an ad group",
    "Create an ad",
];

const user = {
    address: "Bạch Đằng, Quận Tân Bình, TP.HCM",
    avatar: "./assets/image_15.png",
    name: "Lorem",
};

const order = {
    status: "canceled",
    totalAmount: "đ500.000",
    code: "54323123",
    products: [{ name: "Khô bò", basePrice: "đ1.000.000", price: "đ500.000" }],
};
export default function OrderDetail() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full px-4 py-12 bg-background_main">
                <ProfileNavigation user={user} />
                <div className="flex flex-col flex-1 px-4">
                    <div className="flex flex-row w-full justify-between">
                        <div className="flex flex-row items-center">
                            <KeyboardArrowLeftIcon />
                            <p className="text-gray-100 text-base font-normal my-0">
                                {t("back")}
                            </p>
                        </div>
                        <div className="flex flex-row items-center  divide-x-2">
                            <div className="px-2">
                                <p className="my-0 text-gray-100 text-base">
                                    {t("orderCode")}: {order.code}
                                </p>
                            </div>
                            <div className="px-2">
                                <p className="my-0 text-base">{order.status}</p>
                            </div>
                        </div>
                    </div>
                    <div className="my-8">
                        <Stepper activeStep={1} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
