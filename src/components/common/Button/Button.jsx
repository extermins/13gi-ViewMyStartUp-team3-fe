import styles from './Button.module.css'

// size: 'large' | 'medium' | 'small'
// variant: 'filled' | 'outline'
export default function Button({
  size = 'medium',
  variant = 'filled',
  disabled = false,
  onClick,
  children,
  type = 'button',
  className = '',
}) {
  const classes = [styles.btn, styles[size], styles[variant], className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

