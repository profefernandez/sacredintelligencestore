import { cn } from "@/lib/utils";
import { Lock, Unlock, Mail } from "lucide-react";

type Tier = "free" | "free-email" | "premium";

interface AccessBadgeProps {
  tier: Tier;
  className?: string;
  size?: "sm" | "md";
}

const tierConfig: Record<
  Tier,
  { label: string; cssClass: string; Icon: typeof Lock }
> = {
  free: { label: "FREE", cssClass: "badge-free", Icon: Unlock },
  "free-email": { label: "FREE \u00b7 SIGN UP", cssClass: "badge-email", Icon: Mail },
  premium: { label: "PREMIUM", cssClass: "badge-premium", Icon: Lock },
};

export default function AccessBadge({
  tier,
  className,
  size = "sm",
}: AccessBadgeProps) {
  const { label, cssClass, Icon } = tierConfig[tier];
  const iconSize = size === "sm" ? 10 : 12;

  return (
    <span
      className={cn(
        cssClass,
        "inline-flex items-center gap-1",
        size === "md" && "text-xs px-3 py-1",
        className
      )}
    >
      <Icon size={iconSize} strokeWidth={2.5} />
      {label}
    </span>
  );
}
