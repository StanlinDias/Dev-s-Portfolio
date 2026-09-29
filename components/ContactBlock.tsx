import Button from "@/components/Button";
import { site } from "@/content/site";

export default function ContactBlock({ id = "contact" }: { id?: string }) {
  return (
    <section
      id={id}
      className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto border-t border-border flex flex-col gap-6"
    >
      <h2 data-reveal="heading" className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl">
        Open to partnerships and select projects.
      </h2>
      <p data-reveal className="text-text-muted text-base md:text-lg max-w-2xl">
        If you&apos;re building something where AI has to work in production, or has to stay private, I&apos;d like
        to hear about it.
      </p>
      <div data-reveal className="flex flex-wrap gap-4 items-center mt-2">
        <Button variant="primary" href={`mailto:${site.email}?subject=Hello%20Dev`} label="Email me" />
        {site.bookingUrl && <Button variant="secondary" href={site.bookingUrl} label="Book a call" />}
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm uppercase tracking-wider text-text-muted hover:text-accent transition-colors"
        >
          LinkedIn ↗
        </a>
      </div>
    </section>
  );
}
