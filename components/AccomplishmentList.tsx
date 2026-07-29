type Accomplishment = {
  title: string;
  body: string;
};

type AccomplishmentListProps = {
  items: Accomplishment[];
};

export default function AccomplishmentList({ items }: AccomplishmentListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, i) => {
        const isPullQuote = i === 1;
        return (
          <div
            key={item.title}
            className={`border border-border p-6 md:p-8 flex flex-col ${
              isPullQuote ? "md:col-span-2 bg-accent/[0.04]" : ""
            }`}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
              {item.title}
            </p>
            {isPullQuote ? (
              <p className="font-serif italic text-2xl md:text-3xl leading-snug text-text max-w-3xl">
                {item.body}
              </p>
            ) : (
              <p className="text-sm md:text-base text-text-muted">{item.body}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
