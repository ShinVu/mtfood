// Import tailwind css
import "../index.css";

import { colors } from "../../public/theme";
// Import MUI
import Button from "@mui/material/Button";

function TextButton(props: any) {
    return (
        <Button
            variant="text"
            onClick={props.onClick}
            className={props.className}
            sx={props.sx}
            {...props}
        >
            {props.children}
        </Button>
    );
}

function IconButton(props: any) {
    return (
        <Button
            variant="text"
            onClick={props.onClick}
            startIcon={props.startIcon}
            className={props.className}
            sx={props.sx}
        >
            {props.children}
        </Button>
    );
}

function ContainedButton(props: any) {
    return (
        <Button
            variant="contained"
            onClick={props.onClick}
            startIcon={props.startIcon}
            className={props.className}
            sx={{
                backgroundColor: colors.primary_main,
            }}
        >
            {props.children}
        </Button>
    );
}

function OutlinedButton(props: any) {
    return (
        <Button
            variant="outlined"
            onClick={props.onClick}
            startIcon={props.startIcon}
            sx={{
                borderColor: colors.primary_main,
                color: colors.primary_main,
            }}
            {...props}
        >
            {props.children}
        </Button>
    );
}
export { TextButton, IconButton, ContainedButton, OutlinedButton };
