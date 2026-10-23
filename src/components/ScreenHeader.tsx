export function ScreenHeader({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <header>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="screen-title">{title}</h1>
      {lede && <p className="screen-lede">{lede}</p>}
    </header>
  );
}
