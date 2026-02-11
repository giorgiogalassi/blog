import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ContainerProps = ComponentPropsWithoutRef<'div'>;

type SectionProps = {
  title?: ReactNode;
  lead?: ReactNode;
} & ComponentPropsWithoutRef<'section'>;

type StackProps = {
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
} & ComponentPropsWithoutRef<'div'>;

export function Container({ className = '', ...props }: ContainerProps) {
  return <div className={`container ${className}`.trim()} {...props} />;
}

export function Section({ title, lead, className = '', children, ...props }: SectionProps) {
  return (
    <section className={`section ${className}`.trim()} {...props}>
      {title ? <h2>{title}</h2> : null}
      {lead ? <p className="lead">{lead}</p> : null}
      {children}
    </section>
  );
}

export function Stack({ space = 'md', className = '', ...props }: StackProps) {
  return <div className={`stack stack-${space} ${className}`.trim()} {...props} />;
}
