import type { Metadata } from "next";
import MembershipContent from "./MembershipContent";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join the Sacred Intelligence Collection membership for unlimited access to 90+ videos, exclusive content, and more.",
};

export default function MembershipPage() {
  return <MembershipContent />;
}
