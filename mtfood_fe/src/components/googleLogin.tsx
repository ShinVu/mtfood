import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Google from "/assets/google.svg";
import axiosClient from "../../axios-client";
import { logInFailResponse, logInSuccessResponse } from "../models/user.model";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setToken,
    setUser,
} from "../features/authentication/authenticationSlice";

export default function GoogleSignIn() {
    const { t } = useTranslation();
    const [user, setUserGoogle] = useState([]);
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUserGoogle(codeResponse),
        onError: (error) => console.log("Login Failed:", error),
    });

    //use redux
    const dispatch = useDispatch();

    const GoogleLogin = (data) => {
        const payload = {
            name: data.user.name,
            email: data.user.email,
            googleId: data.user.id,
            verifiedEmail: data.user.verified_email,
            accessToken: data.token,
        };
        axiosClient
            .post("/googleLogin", payload)
            .then(({ data }: { data: logInSuccessResponse }) => {
                const { user, token } = data.result;
                //Set user, token
                dispatch(setUser(user));
                dispatch(setToken(token));
                navigate("/home");
            })
            .catch(({ response }: { response: logInFailResponse }) =>
                console.log(response)
            );
    };
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
                    const data = {
                        user: res.data,
                        token: user.access_token,
                    };
                    GoogleLogin(data);
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
            className="w-full bg-rich-black"
            startIcon={<img src={Google} className="w-4 h-4" />}
            onClick={() => login()}
        >
            {t("logInGoogle")}
        </Button>
    );
}
