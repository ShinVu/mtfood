import React, { useState } from "react";
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../../../components/button";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../public/theme";
export default function UserAddressItem(props) {
    const { t } = useTranslation();
    const { user } = props;
    return (
        <div className="flex w-full flex-col ">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="my-0 text-base font-bold">
                        {user.name}
                        <span className="font-normal text-gray-100">
                            | {user.phoneNumber}
                        </span>
                    </p>
                    <p className=" text-gray-100 my-0 text-base font-normal">
                        {user.address}
                    </p>
                    <p className=" text-gray-100 my-0 text-base font-normal">
                        {user.address}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row">
                        <TextButton>
                            <span className="text-blue normal-case ">
                                {t("update")}
                            </span>
                        </TextButton>
                        <TextButton>
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
                    >
                        {t("setDefault")}
                    </OutlinedButton>
                </div>
            </div>
            <span className="text-primary_main normal-case my-2">
                {t("default")}
            </span>
        </div>
    );
}
