"use client";
import { useRef } from "react";
import { Drawer } from "vaul";
import { ArrowUp, Sun, AlertCircle, RotateCcw } from "lucide-react";
import { CameraIllustration } from "../illustrations/CameraIllustration";
import { useAnalyzerStore } from "../../stores/analyzer";
import { useAnalyzeStream } from "../../hooks/useAnalyzeStream";
import { BookViewer } from "./BookViewer";
import { Button, Badge, Spinner } from "../ui";

function DetectingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size="lg" className="text-stone-50 mb-4" />
      <p className="text-stone-300 font-ui text-lg">Detecting books...</p>
      <p className="text-stone-500 font-ui text-sm mt-2">
        This may take a few seconds
      </p>
    </div>
  );
}

function ErrorState({
  error,
  onRetry,
}: {
  error: string | null;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
      <p className="text-stone-300 font-ui text-lg mb-2">
        Something went wrong
      </p>
      <p className="text-stone-500 font-ui text-sm mb-6 text-center px-4">
        {error ?? "Failed to analyze image"}
      </p>
      <Button variant="ghost" onClick={onRetry}>
        <RotateCcw className="w-4 h-4" />
        Try Again
      </Button>
    </div>
  );
}

function IdleState({
  onTakePhoto,
  onChooseFromLibrary,
}: {
  onTakePhoto: () => void;
  onChooseFromLibrary: () => void;
}) {
  return (
    <div className="max-w-sm mx-auto flex flex-col items-center text-center">
      <CameraIllustration className="text-stone-400 mb-6" />

      <Drawer.Title className="font-medium text-stone-100 font-display text-2xl mb-3">
        Scan Your Bookshelf
      </Drawer.Title>

      <p className="text-stone-400 text-sm leading-relaxed mb-6">
        Take a photo with the book spines clearly visible.
      </p>

      <div className="flex gap-3 mb-8">
        <Badge>
          <ArrowUp className="w-3.5 h-3.5" />
          Vertical spines
        </Badge>
        <Badge>
          <Sun className="w-3.5 h-3.5" />
          Good lighting
        </Badge>
      </div>

      <Button onClick={onTakePhoto} className="w-full">
        Take Photo
      </Button>

      <Button
        variant="secondary"
        onClick={onChooseFromLibrary}
        className="w-full mt-3"
      >
        Choose from Library
      </Button>
    </div>
  );
}

function getTriggerContent(status: string, pendingCount: number, bookCount: number, extractedCount: number) {
  if (status === "detecting") {
    return { text: "Detecting...", showSpinner: true };
  }
  if (status === "extracting") {
    return { text: `Extracting ${extractedCount}/${bookCount}`, showSpinner: true };
  }
  if (status === "complete" && pendingCount > 0) {
    return { text: `Review ${pendingCount} Book${pendingCount === 1 ? "" : "s"}`, showSpinner: false };
  }
  return { text: "Scan Bookshelf", showSpinner: false };
}

export function Analyzer() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const { status, error, books, extractedCount, setImage, reset } = useAnalyzerStore();
  const { analyze } = useAnalyzeStream();
  
  const pendingCount = books.filter((b) => b.status !== "accepted").length;
  const { text: triggerText, showSpinner } = getTriggerContent(status, pendingCount, books.length, extractedCount);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImage(base64);
      await analyze(base64);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const handleTakePhoto = () => {
    cameraInputRef.current?.click();
  };

  const handleChooseFromLibrary = () => {
    fileInputRef.current?.click();
  };

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="ghost" rounded="full" size="sm" className="h-10 shadow-sm gap-2">
          {showSpinner && <Spinner size="sm" />}
          {triggerText}
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60" />
        <Drawer.Content className="bg-stone-800 flex flex-col rounded-t-[10px] h-[94dvh] fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-4 pt-3 bg-stone-800 rounded-t-[10px] max-h-full flex-1 max-w-md mx-auto w-full">
            <div
              aria-hidden
              className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-stone-500 mb-5"
            />

            {status === "detecting" && <DetectingState />}
            {status === "error" && <ErrorState error={error} onRetry={reset} />}
            {(status === "extracting" || status === "complete") && (
              <BookViewer />
            )}
            {status === "idle" && (
              <IdleState
                onTakePhoto={handleTakePhoto}
                onChooseFromLibrary={handleChooseFromLibrary}
              />
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
