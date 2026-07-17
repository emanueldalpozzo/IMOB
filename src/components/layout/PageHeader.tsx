import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
      {children && <div className="flex gap-2">{children}</div>}
    </div>
  );
}