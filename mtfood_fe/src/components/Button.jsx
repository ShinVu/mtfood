// Import tailwind css
import "../index.css";

import { colors } from "../../public/theme";
// Import MUI
import Button from "@mui/material/Button";

function TextButton(props) {
    return (
        <Button variant="text" onClick={props.onClick} {...props}>
            {props.children}
        </Button>
    );
}

function IconButton(props) {
    return (
        <Button
            variant="text"
            onClick={props.onClick}
            startIcon={props.startIcon}
            {...props}
        >
            {props.children}
        </Button>
    );
}

function ContainedButton(props) {
    return (
        <Button
            variant="contained"
            onClick={props.onClick}
            startIcon={props.startIcon}
            sx={{
                "background-color": colors.primary_main,
            }}
            {...props}
        >
            {props.children}
        </Button>
    );
}

function OutlinedButton(props) {
    return (
        <Button
            variant="outlined"
            onClick={props.onClick}
            startIcon={props.startIcon}
            sx={{
                "border-color": colors.primary_main,
                color: colors.primary_main,
            }}
            {...props}
        >
            {props.children}
        </Button>
    );
}
export { TextButton, IconButton, ContainedButton, OutlinedButton };
