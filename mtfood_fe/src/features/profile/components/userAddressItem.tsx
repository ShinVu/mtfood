import React, { useState } from "react";
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../../../components/button";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../public/theme";
import { userInfo } from "os";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import axiosClient from "../../../../axios-client";
import {
    deleteAddress,
    setAddressInitialDialogState,
    setDefaultAddress,
} from "../../authentication/authenticationSlice";
export default function UserAddressItem(props) {
    const { t } = useTranslation();
    const {
        address,
        handleModalOpen,
        handleSnackbarOpen,
        handleSnackbarClose,
    } = props;

    //Redux
    const { user } = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();
    const handleAddressUpdate = () => {
        const initialAddressDialog = {
            name: address.name,
            phoneNumber: address.phone_number,
            address: address.address,
            default: address.default ? true : false,
            type: address.type,
            wardValue: {
                code: address.ward_code,
                full_name: address.ward_name,
            },
            districtValue: {
                code: address.district_code,
                full_name: address.district_name,
            },
            provinceValue: {
                code: address.province_code,
                full_name: address.province_name,
            },
            addressId: address.id,
            updateFlag: true,
        };
        dispatch(setAddressInitialDialogState(initialAddressDialog));
        handleModalOpen();
    };

    const handleAddressDelete = () => {
        const payload = {
            customerId: user.id,
            addressId: address.id,
        };
        axiosClient
            .post("/deleteAddress", payload)
            .then(({ data }) => {
                dispatch(deleteAddress(address.id));
                handleSnackbarOpen(data.message, "success");
            })
            .catch(({ response }) => {
                const responseData = response.data;
                handleSnackbarOpen(responseData.message, "error");
            });
    };

    const handleAddressSetdefault = () => {
        const payload = {
            customerId: user.id,
            addressId: address.id,
        };
        axiosClient
            .post("/setDefaultAddress", payload)
            .then(({ data }) => {
                dispatch(setDefaultAddress(address.id));
                handleSnackbarOpen(data.message, "success");
            })
            .catch(({ response }) => {
                const responseData = response.data;
                handleSnackbarOpen(responseData.message, "error");
            });
    };
    return (
        <div className="flex w-full flex-col ">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="my-0 text-base font-bold text-black">
                        {address.name}
                        <span className="font-normal text-gray-100 ml-2">
                            | {address.phone_number}
                        </span>
                    </p>
                    <p className=" text-gray-100 my-0 text-base font-normal">
                        {address.address}
                    </p>
                    <p className=" text-gray-100 my-0 text-base font-normal">
                        {address.ward_name}, {address.district_name},{" "}
                        {address.province_name}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row">
                        <TextButton onClick={handleAddressUpdate}>
                            <span className="text-blue normal-case ">
                                {t("update")}
                            </span>
                        </TextButton>
                        <TextButton onClick={handleAddressDelete}>
                            <span className="text-blue normal-case">
                                {t("delete")}
                            </span>
                        </TextButton>
                    </div>
                    <OutlinedButton
                        sx={{
                            color: colors.gray[200],
                            borderColor: colors.gray[200],
                        }}
                        onClick={handleAddressSetdefault}
                    >
                        {t("setDefault")}
                    </OutlinedButton>
                </div>
            </div>
            {address.default ? (
                <span className="text-primary_main normal-case my-2">
                    {t("default")}
                </span>
            ) : (
                <></>
            )}
        </div>
    );
}
