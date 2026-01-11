import { useState, useEffect } from "react";
import { useAnalyzerStore, type Book } from "../../stores/analyzer";
import { Check, Pencil } from "lucide-react";
import { Button, Input, Label, Spinner } from "../ui";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { updateBook, acceptBook, nextBook } = useAnalyzerStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(book.title ?? "");
  const [editAuthor, setEditAuthor] = useState(book.author ?? "");

  // Update local state when book changes
  useEffect(() => {
    setEditTitle(book.title ?? "");
    setEditAuthor(book.author ?? "");
    setIsEditing(false);
  }, [book.id, book.title, book.author]);

  const isPending = book.status === "pending";
  const isAccepted = book.status === "accepted";

  const handleSave = () => {
    updateBook(book.id, {
      title: editTitle || null,
      author: editAuthor || null,
    });
    setIsEditing(false);
  };

  const handleAccept = () => {
    acceptBook(book.id);
    nextBook();
  };

  if (isPending) {
    return (
      <div className="px-4 py-6 border-t border-stone-700 bg-stone-800/50">
        <div className="flex items-center justify-center gap-3 text-stone-400">
          <Spinner size="md" />
          <span className="font-ui text-sm">Extracting book info...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 border-t border-stone-700 bg-stone-800/50">
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Enter title..."
            />
          </div>
          <div>
            <Label>Author</Label>
            <Input
              type="text"
              value={editAuthor}
              onChange={(e) => setEditAuthor(e.target.value)}
              placeholder="Enter author..."
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              variant="secondary"
              rounded="lg"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              rounded="lg"
              size="sm"
              onClick={handleSave}
              className="flex-1"
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <span className="block text-stone-500 text-xs font-ui">Title</span>
            <span className="block text-stone-100 font-display text-lg">
              {book.title ?? (
                <span className="text-stone-500 italic">Unknown</span>
              )}
            </span>
          </div>
          <div>
            <span className="block text-stone-500 text-xs font-ui">Author</span>
            <span className="block text-stone-300 font-ui">
              {book.author ?? (
                <span className="text-stone-500 italic">Unknown</span>
              )}
            </span>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              variant="secondary"
              rounded="lg"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex-1 py-2.5"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
            {!isAccepted ? (
              <Button
                rounded="lg"
                size="sm"
                onClick={handleAccept}
                className="flex-1 py-2.5"
              >
                <Check className="w-4 h-4" />
                Accept
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg bg-stone-700 text-stone-300 font-ui text-sm">
                <Check className="w-4 h-4" />
                Accepted
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
