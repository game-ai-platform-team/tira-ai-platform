import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon: string;
}

const Button = (props: ButtonProps) => (
    <button {...props}>
        <span role="img">{props.icon}</span>
        {props.label}
    </button>
);

export default Button;
