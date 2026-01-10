"use client";
import { CameraIllustration } from "../illustrations/CameraIllustration";
import { Drawer } from "vaul";
import { ArrowUp, Sun } from "lucide-react";

export function Analyzer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-stone-700 px-6 text-sm font-medium shadow-sm transition-all hover:bg-stone-600 text-stone-100 font-ui">
        Scan Bookshelf
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60" />
        <Drawer.Content className="bg-stone-800 flex flex-col rounded-t-[10px] h-[94vh] fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-4 bg-stone-800 rounded-t-[10px] flex-1 overflow-auto">
            <div
              aria-hidden
              className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-stone-600 mb-8"
            />
            <div className="max-w-sm mx-auto flex flex-col items-center text-center">
              <CameraIllustration className="text-stone-400 mb-6" />

              <Drawer.Title className="font-medium text-stone-100 font-display text-2xl mb-3">
                Scan Your Bookshelf
              </Drawer.Title>

              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Take a photo with the book spines clearly visible.
              </p>

              <div className="flex gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-700/50 text-stone-400 text-xs">
                  <ArrowUp className="w-3.5 h-3.5" />
                  Vertical spines
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-700/50 text-stone-400 text-xs">
                  <Sun className="w-3.5 h-3.5" />
                  Good lighting
                </div>
              </div>

              <button
                type="button"
                className="w-full py-3 px-6 rounded-xl bg-stone-100 text-stone-900 font-ui font-medium text-sm hover:bg-white transition-colors"
              >
                Choose Image
              </button>

              <button
                type="button"
                className="w-full mt-3 py-3 px-6 rounded-xl border border-stone-600 text-stone-300 font-ui font-medium text-sm hover:bg-stone-700/50 transition-colors"
              >
                Take Photo
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
