import styles from './Button.module.css'

// size: 'large' | 'medium' | 'small'
// variant: 'filled' | 'outline' | 'secondary'
// leftIcon / rightIcon: 아이콘 요소 (예: <CheckIcon />)
// fullWidth: true면 가로 전체 너비
export default function Button({
  size = 'medium',
  variant = 'filled',
  disabled = false,
  onClick,
  children,
  type = 'button',
  className = '',
  leftIcon = null,
  rightIcon = null,
  fullWidth = false,
}) {
  const classes = [
    styles.btn,
    styles[size],
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
    </button>
  )
}

