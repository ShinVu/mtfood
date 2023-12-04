import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AppDatePicker(props) {
    return (
        <DatePicker
            format="DD-MM-YYYY"
            slotProps={{
                textField: {
                    size: "small",
                    inputProps: {
                        style: { fontSize: 14 },
                    },
                },
            }}
            {...props}
        />
    );
}
