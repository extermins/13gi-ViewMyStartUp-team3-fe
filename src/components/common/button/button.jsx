import styles from './button.module.css'

// size: 'large' | 'medium' | 'small'
// variant: 'filled' | 'outline' | 'secondary'
// radius: 'round' (50px, 기본) | 'square' (10px)
//   - round: filled / outline 모두 사용 가능
//   - square: outline 전용 (디자인 스펙)
// leftIcon / rightIcon: 아이콘 요소 (예: <CheckIcon />)
// fullWidth: true면 가로 전체 너비
export default function Button({
  size = 'medium',
  variant = 'filled',
  radius = 'round',
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
    styles[radius],
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

