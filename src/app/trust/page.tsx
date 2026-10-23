import { ScreenHeader } from "@/components/ScreenHeader";

export default function TrustPage() {
  return (
    <>
      <ScreenHeader eyebrow="Your data" title="It stays on your phone" lede="Harbor has no accounts and no server. Check-ins are saved only in this browser." />
      <p className="placeholder">{"Export and delete-all controls are coming in phase 4."}</p>
    </>
  );
}
