import { CSSProperties, ReactNode } from 'react'
import './button.scss'

interface ButtonProps {
    children: ReactNode,
    className?: string,
    style?: CSSProperties,
    onClick?: () => void
}

const Button = ({ children, className, style, onClick }: ButtonProps) => {
    return <button className={`button ${className || ''}`} onClick={onClick} style={{ ...style }}>{children}</button>
}

export default Button
