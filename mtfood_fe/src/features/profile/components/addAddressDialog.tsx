import React, { useState, useEffect, useCallback } from "react";
//Import MUI element
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//Import i18-next
import { useTranslation } from "react-i18next";

//Import color
import { colors } from "../../../../public/theme";

//Import components
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../../../components/button";
import useWindowSizeDimensions from "../../../hooks/useWindowResponsiveDimensions";
import { getSizeDialog } from "../../../utils";
import axiosClient from "../../../../axios-client";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { Alert, Snackbar } from "@mui/material";
import {
    addAddress,
    updateAddress,
} from "../../authentication/authenticationSlice";
import MyMap from "../../../components/map";

export default function AddAddressDialog(props) {
    //Redux
    const { addressInitialDialogState } = useAppSelector(
        (state) => state.authentication
    );
    const {
        open,
        handleModalOpen,
        handleClose,
        handleSnackbarOpen,
        handleSnackbarClose,
    } = props;
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: addressInitialDialogState.name,
            phoneNumber: addressInitialDialogState.phoneNumber,
            address: addressInitialDialogState.address,
            default: addressInitialDialogState.default,
        },
    });
    const { t } = useTranslation();
    const size = useWindowSizeDimensions();

    const [type, setType] = useState(addressInitialDialogState.type);

    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);

    const [provinceValue, setProvinceValue] = useState(
        addressInitialDialogState.provinceValue
    );
    const [districtValue, setDistrictValue] = useState(
        addressInitialDialogState.districtValue
    );
    const [wardValue, setWardValue] = useState(
        addressInitialDialogState.wardValue
    );

    const [provinceSearchValue, setProvinceSearchValue] = useState("");
    const [districtSearchValue, setDistrictSearchValue] = useState("");
    const [wardSearchValue, setWardSearchValue] = useState("");

    const [update, setUpdate] = useState(addressInitialDialogState.updateFlag);
    const handleAddressType = (addressType) => {
        setType(addressType);
    };
    const PopperMy = useCallback((props) => {
        const anchorEl = document.getElementById("autocompleteContainer");
        return (
            <Popper
                {...props}
                anchorEl={anchorEl}
                style={{ width: anchorEl.clientWidth }}
                placement="bottom"
            />
        );
    }, []);

    useEffect(() => {
        const fetchProvince = async () => {
            const response = await axiosClient.get("/getProvince");
            const province = response.data.result.province;
            setProvince(province);
        };

        fetchProvince();
    }, []);

    useEffect(() => {
        const fetchDistrict = async (provinceValue) => {
            if (provinceValue) {
                const payload = {
                    provinceCode: provinceValue.code,
                };
                const response = await axiosClient.get("/getDistrict", {
                    params: payload,
                });
                const district = response.data.result.district;
                setDistrict(district);
            }
        };
        if (!update) {
            setDistrict([]);
            setDistrictValue(null);
        }
        if (provinceValue) {
            fetchDistrict(provinceValue);
        }
    }, [provinceValue]);

    useEffect(() => {
        const fetchWard = async (districtValue) => {
            if (districtValue) {
                const payload = {
                    districtCode: districtValue.code,
                };
                const response = await axiosClient.get("/getWard", {
                    params: payload,
                });

                const ward = response.data.result.ward;
                setWard(ward);
            }
        };
        if (!update) {
            setWard([]);
            setWardValue(null);
        }
        if (update) {
            setUpdate(false);
        }
        if (districtValue) {
            fetchWard(districtValue);
        }
    }, [districtValue]);

    //Redux
    const { user } = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();
    const onSubmit = (data) => {
        let payload = {};
        if (addressInitialDialogState.addressId) {
            payload = {
                name: data.name,
                phoneNumber: data.phoneNumber,
                address: data.address,
                default: data.default,
                wardCode: wardValue?.code ?? null,
                customerId: user.id,
                type: type,
                addressId: addressInitialDialogState.addressId,
            };
        } else {
            payload = {
                name: data.name,
                phoneNumber: data.phoneNumber,
                address: data.address,
                default: data.default,
                wardCode: wardValue?.code ?? null,
                customerId: user.id,
                type: type,
            };
        }
        console.log(payload);
        axiosClient
            .post("/addAddress", payload)
            .then(({ data }) => {
                const address = data.result.address;
                console.log(address);
                if (data.message === "updatedAddressSuccessfully") {
                    dispatch(updateAddress(address));
                } else if (data.message === "addAddressSuccessfully") {
                    dispatch(addAddress(address));
                }
                if (handleSnackbarOpen) {
                    handleSnackbarOpen(data.message, "success");
                }
                handleClose();
            })
            .catch(({ response }) => {
                const responseData = response.data;
                if (handleSnackbarOpen) {
                    handleSnackbarOpen(responseData.message, "error");
                }
            });
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={getSizeDialog(size)}
            disableScrollLock
        >
            <DialogTitle>
                {" "}
                <span>{t("addAddress")}</span>
            </DialogTitle>
            <DialogContent>
                <div className="flex flex-1 flex-col space-y-8">
                    <div className="flex flex-row flex-1 space-x-8">
                        <div className="w-3/4 min-w-fit">
                            <TextField
                                required
                                id="outlined-required"
                                placeholder={t("nameFAL")}
                                className="w-full"
                                {...register("name")}
                            />
                        </div>
                        <div className="w-1/4 min-w-fit">
                            <TextField
                                required
                                id="outlined-required"
                                placeholder={t("phoneNumber")}
                                className="w-full"
                                {...register("phoneNumber")}
                            />
                        </div>
                    </div>
                    <div
                        className="flex flex-1 flex-row space-x-4"
                        id="autocompleteContainer"
                    >
                        <div className="w-1/3">
                            <Autocomplete
                                disablePortal
                                id="province"
                                options={province}
                                getOptionLabel={(option) => option.full_name}
                                value={provinceValue}
                                onChange={(event, newValue) => {
                                    setProvinceValue(newValue);
                                }}
                                inputValue={provinceSearchValue}
                                onInputChange={(event, newInputValue) => {
                                    setProvinceSearchValue(newInputValue);
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    option.full_name === value.full_name
                                }
                                className="w-full"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={t("province")}
                                    />
                                )}
                                PopperComponent={PopperMy}
                            />
                        </div>
                        <div className="w-1/3">
                            <Autocomplete
                                disablePortal
                                id="district"
                                value={districtValue}
                                onChange={(event, newValue) => {
                                    setDistrictValue(newValue);
                                }}
                                inputValue={districtSearchValue}
                                onInputChange={(event, newInputValue) => {
                                    setDistrictSearchValue(newInputValue);
                                }}
                                options={district}
                                getOptionLabel={(option) => option.full_name}
                                isOptionEqualToValue={(option, value) =>
                                    option.full_name === value.full_name
                                }
                                className="w-full"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={t("district")}
                                    />
                                )}
                                PopperComponent={PopperMy}
                            />
                        </div>
                        <div className="w-1/3">
                            <Autocomplete
                                disablePortal
                                id="ward"
                                value={wardValue}
                                onChange={(event, newValue) => {
                                    setWardValue(newValue);
                                }}
                                inputValue={wardSearchValue}
                                onInputChange={(event, newInputValue) => {
                                    setWardSearchValue(newInputValue);
                                }}
                                options={ward}
                                getOptionLabel={(option) => option.full_name}
                                isOptionEqualToValue={(option, value) =>
                                    option.full_name === value.full_name
                                }
                                className="w-full"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={t("ward")}
                                    />
                                )}
                                PopperComponent={PopperMy}
                            />
                        </div>
                    </div>
                    <div className="flex flex-1">
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            className="w-full"
                            placeholder={t("addressField")}
                            {...register("address")}
                        />
                    </div>
                    <div className="h-96 w-full">
                        <MyMap />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <h1 className="font-medium text-sm text-black">
                            {t("addressType")}
                        </h1>
                        <div className="flex flex-1 space-x-4">
                            <OutlinedButton
                                sx={
                                    !(type == 0)
                                        ? {
                                              color: colors.gray[100],
                                              borderColor: colors.gray[100],
                                          }
                                        : undefined
                                }
                                onClick={() => handleAddressType(0)}
                            >
                                <span>Nhà riêng / chung cư</span>
                            </OutlinedButton>
                            <OutlinedButton
                                sx={
                                    !(type == 1)
                                        ? {
                                              color: colors.gray[100],
                                              borderColor: colors.gray[100],
                                          }
                                        : undefined
                                }
                                onClick={() => handleAddressType(1)}
                            >
                                <span>Cơ quan / công ty</span>
                            </OutlinedButton>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-row">
                        <Controller
                            control={control}
                            name="default"
                            render={({ field: { onChange, value } }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={(e) =>
                                                onChange(e.target.checked)
                                            }
                                            checked={value}
                                        />
                                    }
                                    label={
                                        <span className="text-gray-100 text-sm">
                                            {t("setDefault")}
                                        </span>
                                    }
                                />
                            )}
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <TextButton
                    sx={{ color: colors.gray[200] }}
                    onClick={handleClose}
                >
                    {t("cancel")}
                </TextButton>
                <Button onClick={handleSubmit(onSubmit)}>{t("confirm")}</Button>
            </DialogActions>
        </Dialog>
    );
}
