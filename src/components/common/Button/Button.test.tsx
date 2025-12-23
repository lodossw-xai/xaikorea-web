/**
 * Button Component Tests
 * Constitution: Testing Requirements - AAA Pattern
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('should render children correctly', () => {
    // Arrange
    render(<Button>Click Me</Button>);

    // Act
    const button = screen.getByRole('button', { name: /click me/i });

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
  });

  it('should call onClick handler when clicked', () => {
    // Arrange
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    // Act
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    // Arrange
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    );

    // Act
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Assert
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('should apply correct variant class', () => {
    // Arrange
    const { rerender } = render(<Button variant="primary">Primary</Button>);

    // Assert
    let button = screen.getByRole('button');
    expect(button).toHaveClass('button--primary');

    // Act
    rerender(<Button variant="secondary">Secondary</Button>);

    // Assert
    button = screen.getByRole('button');
    expect(button).toHaveClass('button--secondary');
  });

  it('should apply full width class when fullWidth is true', () => {
    // Arrange
    render(<Button fullWidth>Full Width</Button>);

    // Assert
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button--full-width');
  });

  it('should have correct aria-label', () => {
    // Arrange
    const ariaLabel = 'Submit form';
    render(<Button ariaLabel={ariaLabel}>Submit</Button>);

    // Assert
    const button = screen.getByLabelText(ariaLabel);
    expect(button).toBeInTheDocument();
  });
});
