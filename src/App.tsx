import { useMutation } from "@tanstack/react-query";
import type { AnalyzeResponse } from "./api";
import { BookIllustrations } from "./components/illustrations/BookIllustrations";
import "./index.css";
import { Analyzer } from "./components/image-analyzer/Analyzer";

async function analyzeImage(imageBase64: string): Promise<AnalyzeResponse> {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64 }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to analyze image");
  }

  return response.json();
}

function useAnalyzeImage() {
  return useMutation({
    mutationFn: analyzeImage,
  });
}

export function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <main className="max-w-md w-full text-center space-y-8">
        {/* Logo/Title */}
        <header className="space-y-3">
          <h1 className="text-5xl font-normal font-serif text-stone-100 tracking-tight">
            Unbind
          </h1>
        </header>

        {/* Illustration */}
        <div className="flex justify-center py-4">
          <BookIllustrations
            width={200}
            height={168}
            className="text-stone-400 drop-shadow-lg"
          />
        </div>

        {/* Description */}
        <p className="text-stone-400 text-lg leading-relaxed px-4">
          Simply take a photo of your bookshelf and we'll identify every title
          to unbind them from the physical shelf and adding them to your digital
          library.
        </p>

        <div className="pt-4 flex justify-center">
          <Analyzer />
        </div>
      </main>
    </div>
  );
}

export default App;
