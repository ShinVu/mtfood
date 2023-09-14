// Import tailwind css
import "../index.css";

// Import library from bootstrap
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type ButtonProps = {
    text: string;
    onClick: () => void;
};
function MainButton(props: ButtonProps) {
    const { text, onClick } = props;
    return <Button onClick={onClick}>{text}</Button>;
}

export { MainButton };
