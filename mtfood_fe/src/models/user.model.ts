// onSubmit parameter type
// pages:/signup
export type onSubmitValue = {
    account: string;
};
//Sign up API success response type
// pages:/signup
export type signUpSuccessResponse = {
    message: "accountCreatedSuccessful";
    result: {
        user: {
            id: string;
            email: string;
        };
    };
};

//Sign up API error response type
// pages:/signup
export type signUpFailResponse = {
    status: number;
    data: {
        message:
            | "emailAlreadyExist"
            | "phoneNumberAlreadyExist"
            | "typeInvalid";
        result: {};
    };
};

//Sign up password add success response type
//page: /signup_password
export type signUpPasswordSuccessResponse = {
    message: "accountCreatedSuccessful";
    result: {
        user: {
            id: string;
            name: string;
            phoneNumber: string;
            email: string;
            identificationNumber: string;
            gender: string;
            dateOfBirth: string;
        };
        token: string;
    };
};

//Sign up password add success response type
//page: /signup_password
export type signUpPasswordFailResponse = {
    status: number;
    data: {
        message: string;
        result: {};
    };
};

//Mail Verification API success response type
// pages:/signup
export type mailVerificationSuccessResponse = {
    message: "mailSuccessfullySent";
    result: {
        user: {
            id: string;
            email: string;
        };
    };
};

//Mail Verification API success response type
// pages:/signup
export type mailVerificationFailResponse = {
    status: number;
    data: {
        message: "emailAlreadyVerified" | string;
        result: {};
    };
};

//Logout  success response type
//page: /header
export type logOutSuccessResponse = {
    message: "logOutSuccessful";
    result: {};
};

//Logout fail response type
//page: /header
export type logOutFailResponse = {
    status: number;
    data: {
        message: string;
        result: {};
    };
};

//Login success response type
//page: /header, login
export type logInSuccessResponse = {
    message: "logInSuccessful";
    result: {
        user: {
            id: number;
            name: string;
            phoneNumber: string;
            email: string;
            identificationNumber: string;
            gender: string;
            dateOfBirth: string;
            googleId: string;
        };
        token: string;
    };
};

//Logout fail response type
//page: /header, login
export type logInFailResponse = {
    status: number;
    data: {
        message:
            | "emailInvalid"
            | "loginWithGoogle"
            | "loginWithFacebook"
            | "passwordIncorrect";
        result: {};
    };
};

//Password reset mail API success response type
// pages:/forgetPassword
export type mailResetPasswordSuccessResponse = {
    message: "mailSuccessfullySent";
    result: {
        user: {
            id: string;
            email: string;
        };
    };
};

//Mail Verification API success response type
// pages:/forgetPassword
export type mailResetPasswordFailResponse = {
    status: number;
    data: {
        message: "emailInvalid";
        result: {};
    };
};
