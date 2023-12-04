import React, { useEffect } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useTranslation } from "react-i18next";
import Facebook from "/assets/facebook.svg";
import Button from "@mui/material/Button";

function FacebookButton(props: any) {
    const { t } = useTranslation();
    const { onClick, onLogoutClick } = props;
    return (
        <Button
            component="label"
            variant="contained"
            className="w-full bg-rich-black"
            startIcon={
                <img src={Facebook} className="w-4 h-4" alt="facebook" />
            }
            onClick={onClick}
        >
            {t("logInFacebook")}
        </Button>
    );
}
export default function FacebookSignIn() {
    return (
        // custom render function
        <FacebookLogin
            appId="367356678951124"
            onSuccess={(response) => {
                console.log("Login Success!", response);
            }}
            onFail={(error) => {
                console.log("Login Failed!", error);
            }}
            onProfileSuccess={(response) => {
                console.log("Get Profile Success!", response);
            }}
            render={({ onClick }) => <FacebookButton onClick={onClick} />}
        />
    );
}
