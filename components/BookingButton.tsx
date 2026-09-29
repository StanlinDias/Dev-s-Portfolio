import Button from "@/components/Button";
import { site } from "@/content/site";

type BookingButtonProps = {
  /** Email subject, URL-encoded. */
  subject?: string;
  emailLabel?: string;
};

// Primary CTA: the booking tool once site.bookingUrl is set (Button opens http
// links in a new tab); until then an honest email link.
export default function BookingButton({ subject = "Intro%20call", emailLabel = "Email me" }: BookingButtonProps) {
  return site.bookingUrl ? (
    <Button variant="primary" href={site.bookingUrl} label="Book a call" />
  ) : (
    <Button variant="primary" href={`mailto:${site.email}?subject=${subject}`} label={emailLabel} />
  );
}
