import styled from "styled-components";
import { MuiOtpInput } from "mui-one-time-password-input";

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

export default function OtpInputStyled({ otp, handleChange, validateChar }) {
    return (
        <MuiOtpInputStyled
            value={otp}
            onChange={handleChange}
            length={6}
            autoFocus
            validateChar={validateChar}
        />
    );
}
