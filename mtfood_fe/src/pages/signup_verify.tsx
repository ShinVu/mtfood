import React, { useState, useEffect } from "react";
import { Footer } from "../components/footer";
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Google from "/assets/google.svg";
import Facebook from "/assets/facebook.svg";
import styled from "styled-components";
import { MuiOtpInput } from 'mui-one-time-password-input'

const MuiOtpInputStyled = styled(MuiOtpInput)`
  display: flex;
  gap: 10px;
  max-width: 350px;
  margin-inline: auto;
  .MuiOtpInput-TextField {
    height: fit-content;
    width: fit-content;
    margin: 0;
  }
`;

function matchIsNumeric(text) {
    const isNumber = typeof text === 'number'
    return (isNumber) && !isNaN(Number(text))

}



export default function SignUpVerify() {
    const { t } = useTranslation()
    const [otp, setOtp] = React.useState('')
    const [count, setCount] = useState(2);

    useEffect(() => {
        const id = setInterval(() => { setCount((oldCount) => oldCount - 1) },
            1000);
        const stopInterval = () => { clearInterval(id) };
        setTimeout(stopInterval, 2000);
        return () => {
            stopInterval();
        };
    }, []);
    const validateChar = (value, index) => {
        const valueNumber = parseInt(value, 10)
        return matchIsNumeric(valueNumber)
    }

    const handleChange = (newValue) => {

        setOtp(newValue)
    }
    return (

        <div className="flex flex-col flex-1 min-h-screen w-full ">
            <div className="flex flex-1 py-5 bg-signUp bg-center bg-cover justify-center items-center">
                <div className="flex flex-col p-4 bg-white shadow">
                    <h1 className="uppercase text-xl font-bold">{t("enterVerificationCode")}</h1>
                    <MuiOtpInputStyled className="mt-24 mb-12" value={otp} onChange={handleChange} length={6} autoFocus validateChar={validateChar} />
                    <div className="p-3">
                        <Button variant="contained" className="w-full">{t("continue")}</Button>
                    </div>
                    <div className="mt-5">
                        {count !== 0 ?
                            <>
                                <p className="text-xs font-bold">{t("sendCode")}: <span>{count}</span> </p>
                                <p className="text-xs font-bold">{t("verificationTimeLimited")}</p>
                            </> : <><div className="flex flex-row items-center"><p className="text-xs font-bold my-0">{t("notReceived")}?</p>
                                <Button variant="text" sx={{textTransform: "none"}}>{t("resendCode")}</Button></div>
                                <p className="text-xs font-bold ">{t("verificationTimeLimited")}</p>
                            </>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}