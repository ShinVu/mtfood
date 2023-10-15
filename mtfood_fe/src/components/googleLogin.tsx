import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Google from "/assets/google.svg";

export default function GoogleSignIn() {
    const { t } = useTranslation();
    const [user, setUser] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error),
    });

    useEffect(() => {
        if (user) {
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
    };

    return (
        <Button
            component="label"
            variant="contained"
            className="w-full"
            startIcon={<img src={Google} className="w-4 h-4" />}
            onClick={() => login()}
        >
            {t("logInGoogle")}
        </Button>
    );
}
