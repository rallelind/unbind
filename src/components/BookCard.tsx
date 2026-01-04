interface Book {
  id: string;
  title: string | null;
  author: string | null;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  detectionConfidence: number;
}

interface BookCardProps {
  book: Book;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

export function BookCard({ book, index, isHovered, onHover }: BookCardProps) {
  return (
    <div
      className={`book-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="book-number">{index + 1}</div>
      <div className="book-info">
        <h3 className="book-title">{book.title ?? "Unknown Title"}</h3>
        <p className="book-author">{book.author ?? "Unknown Author"}</p>
      </div>
    </div>
  );
}

