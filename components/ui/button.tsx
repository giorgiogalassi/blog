import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'link';

type ButtonProps = {
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<'button'>;

type ButtonLinkProps = {
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<typeof Link>;

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`button button-${variant} ${className}`.trim()} {...props} />;
}

export function ButtonLink({ variant = 'primary', className = '', ...props }: ButtonLinkProps) {
  return <Link className={`button button-${variant} ${className}`.trim()} {...props} />;
}
