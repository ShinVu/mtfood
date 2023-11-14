import { createSlice, current } from "@reduxjs/toolkit";

//Date time format
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { update } from "lodash";
import { string } from "yup";
import { addressType, userType } from "../../models/user.model";
dayjs.extend(utc);

const getLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    if (!value) {
        return null;
    } else {
        return JSON.parse(value);
    }
};
//initial state for authentication slice
const initialState: initialStateType = {
    user: getLocalStorage("USER"),
    token: getLocalStorage("ACCESS_TOKEN"),
    signup: getLocalStorage("SIGNUP"),
    resetPassword: getLocalStorage("RESET_PASSWORD"),
    addresses: null,
    addressInitialDialogState: {
        name: "",
        phoneNumber: "",
        address: "",
        default: true,
        provinceValue: null,
        districtValue: null,
        wardValue: null,
        type: 0,
        addressId: null,
        updateFlag: false,
    },
    currentAddress: null,
};

type initialStateType = {
    user: userType;
    token: string;
    signup: any;
    resetPassword: any;
    addresses: addressType[] | null;
    addressInitialDialogState: {
        name: string;
        phoneNumber: string;
        address: string;
        default: boolean;
        provinceValue: any | null;
        districtValue: any | null;
        wardValue: any | null;
        type: number;
        addressId: number | null;
        updateFlag: boolean;
    };
    currentAddress: addressType | null;
};
export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setUser(state, action) {
            //set user based on action payload
            const user = action.payload;
            state.user = user;
            //Save log in information into storage
            localStorage.setItem("USER", JSON.stringify(user));
        },
        setToken(state, action) {
            //set token based on action payload
            const token = action.payload;
            state.token = token;
            //Save log in information into storage
            localStorage.setItem("ACCESS_TOKEN", JSON.stringify(token));
        },
        setSignup(state, action) {
            const signup = action.payload;
            state.signup = signup;
            localStorage.setItem("SIGNUP", JSON.stringify(signup));
        },
        clearSignup(state, action) {
            const signup = { id: null, email: null };
            state.signup = signup;
            localStorage.removeItem("SIGNUP");
        },
        setResetPassword(state, action) {
            const resetPassword = action.payload;
            state.resetPassword = resetPassword;
            localStorage.setItem(
                "RESET_PASSWORD",
                JSON.stringify(resetPassword)
            );
        },
        clearResetPassword(state, action) {
            const resetPassword = { id: null, email: null };
            state.resetPassword = resetPassword;
            localStorage.removeItem("RESET_PASSWORD");
        },
        signOut(state, action) {
            state.user = null;
            state.token = null;
            //Delete user from local storage
            localStorage.removeItem("USER");
            localStorage.removeItem("ACCESS_TOKEN");
        },
        setAddress(state, action) {
            const addresses = action.payload;
            state.addresses = addresses;
            if (addresses) {
                state.currentAddress = addresses[0];
            }
        },
        addAddress(state, action) {
            const newAddress = action.payload;
            if (newAddress.default) {
                const addresses = state.addresses;
                const newAddresses = addresses.map((address) => {
                    return { ...address, default: false };
                });
                newAddresses.unshift(newAddress);
                state.addresses = newAddresses;
            } else {
                state.addresses.push(newAddress);
            }
        },
        updateAddress(state, action) {
            const updateAddress = action.payload;

            const addresses: Array<any> | null = state.addresses;
            const newAddresses = addresses.map((address) => {
                if (address["id"] !== updateAddress["id"]) {
                    if (updateAddress.default) {
                        return { ...address, default: 0 };
                    }
                    return { ...address };
                } else {
                    return { ...updateAddress };
                }
            });
            state.addresses = newAddresses;
        },
        deleteAddress(state, action) {
            const deleteAddressId = action.payload;
            const addresses: Array<any> | null = state.addresses;
            const newAddresses = addresses.filter(
                (address) => address["id"] !== deleteAddressId
            );
            state.addresses = newAddresses;
        },
        setDefaultAddress(state, action) {
            const defaultAddressId = action.payload;
            const addresses: Array<any> | null = state.addresses;
            const newAddresses = addresses.map((address) => {
                if (address["id"] !== defaultAddressId) {
                    return { ...address, default: 0 };
                } else {
                    return { ...address, default: 1 };
                }
            });
            state.addresses = newAddresses;
        },
        setAddressInitialDialogStateToInitial(state) {
            state.addressInitialDialogState =
                initialState.addressInitialDialogState;
        },
        setAddressInitialDialogState(state, action) {
            const initialAddress = action.payload;
            state.addressInitialDialogState = initialAddress;
        },
        setCurrentAddress(state, action) {
            const currentAddress = action.payload;
            state.currentAddress = currentAddress;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setUser,
    setToken,
    setSignup,
    clearSignup,
    setResetPassword,
    clearResetPassword,
    signOut,
    setAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    setCurrentAddress,
    setAddressInitialDialogStateToInitial,
    setAddressInitialDialogState,
} = authenticationSlice.actions;

// Export reducer to create store in app/store.tsx
export default authenticationSlice.reducer;
