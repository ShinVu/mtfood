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