import Button from "@/components/Button";
import { BOOKING_URL } from "@/lib/flags";

const FALLBACK_HREF = "mailto:devseth34@gmail.com?subject=Intro%20call";

// Primary "get in touch" CTA. Points at the booking tool once BOOKING_URL is
// set (Button opens http links in a new tab); until then it's an honest email link.
export default function BookingButton() {
  return BOOKING_URL ? (
    <Button variant="primary" href={BOOKING_URL} label="Book a 20-min call" />
  ) : (
    <Button variant="primary" href={FALLBACK_HREF} label="Email me to set up a call" />
  );
}
