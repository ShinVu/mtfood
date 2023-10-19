import * as React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import { colors } from "../../../../public/theme";
import { Payment } from "@mui/icons-material";

const StyledConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: colors.primary_main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: colors.primary_main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));

const StyledStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        backgroundColor: colors.primary_main,
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: colors.primary_main,
        backgroundColor: colors.white,
    }),
}));

function StyledStepIcon(props) {
    const { active, completed, className } = props;
    const getColor = () => {
        if (completed) return { color: colors.primary_main };
        else return { color: colors.white };
    };
    const icons = {
        1: <ReceiptLongIcon sx={getColor()} />,
        2: <PaymentIcon sx={getColor()} />,
        3: <LocalShippingOutlinedIcon sx={getColor()} />,
        4: <Inventory2OutlinedIcon sx={getColor()} />,
        5: <StarBorderOutlinedIcon sx={getColor()} />,
    };
    return (
        <StyledStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </StyledStepIconRoot>
    );
}

StyledStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

export default function CustomizedSteppers() {
    const { t } = useTranslation();
    const steps = [
        { status: t("orderCreated"), time: Date.now() },
        { status: t("paymentConfirmed"), time: Date.now() },
        { status: t("shipmentConfirmed"), time: Date.now() },
        { status: t("shipped"), time: Date.now() },
        { status: t("rate"), time: Date.now() },
    ];
    return (
        <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={3}
                connector={<StyledConnector />}
            >
                {steps.map((label) => (
                    <Step key={label.status}>
                        <StepLabel StepIconComponent={StyledStepIcon}>
                            <span className="text-gray-100 text-sm">
                                {label.status}
                                <br />
                                {label.time}
                            </span>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}
