import { MouseEventHandler } from "react";

interface ButtonProps {
    label: string;
    icon: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ label, icon, onClick }: ButtonProps) => (
    <button onClick={onClick}>
        <span role="img">{icon}</span>
        {label}
    </button>
);

export default Button;
