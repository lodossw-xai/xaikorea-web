/**
 * Button Component
 * Constitution I: Functional Component with Hooks
 * Constitution IV: Single Responsibility - 재사용 가능한 버튼 UI
 */
import type { ReactElement } from 'react';
import type { ButtonProps } from './Button.types';
import './Button.css';

function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  ariaLabel,
}: ButtonProps): ReactElement {
  const classNames = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? 'button--full-width' : '',
    disabled ? 'button--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default Button;
