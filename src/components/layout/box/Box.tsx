export interface BoxProps {
  className?: string;
  children?: React.ReactNode;
  direction?: "horizontal" | "vertical";
  align?: "left" | "right" | "center" | "space-between";
  verticalAlign?: "top" | "middle" | "bottom";
  onClick?: () => void;
}

const alignVariants: Record<string, string> = {
  left: "justify-start",
  right: "justify-end",
  center: "justify-center",
  "space-between": "justify-between",
};

const verticalAlignVariants: Record<string, string> = {
  top: "items-start",
  middle: "items-center",
  bottom: "items-end",
};

export default function Box({
  className,
  children,
  direction = "horizontal",
  align = "left",
  verticalAlign = "top",
  onClick,
}: BoxProps) {
  const style = [
    direction == "horizontal" ? "flex-row" : "flex-col",
    alignVariants[align],
    verticalAlignVariants[verticalAlign],
    className,
  ].join(" ");

  return (
    <div onClick={onClick} className={`flex ${style}`}>
      {children}
    </div>
  );
}
