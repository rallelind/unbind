import OpenAI from "openai";

export interface BookInfo {
  title: string | null;
  author: string | null;
}

const openai = new OpenAI();

export async function extractBookInfo(
  croppedImageBase64: string
): Promise<BookInfo> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are analyzing a cropped image of a book spine from a bookshelf.

This crop is centered on ONE specific book spine. Extract ONLY the title and author printed on that central spine.

CRITICAL RULES:
- Look at the physical spine structure - identify which text is actually printed ON the central spine
- Text at the far left or right edges likely belongs to adjacent books - IGNORE IT
- If text seems to "bleed" in from a neighboring spine, do not include it

Respond in JSON: {"title": "...", "author": "..."}
Use null if you cannot read the title or author.`,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${croppedImageBase64}`,
            },
          },
        ],
      },
    ],
    response_format: { type: "json_object" },
    max_tokens: 100,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    return { title: null, author: null };
  }

  try {
    const parsed = JSON.parse(content) as BookInfo;
    return {
      title: parsed.title ?? null,
      author: parsed.author ?? null,
    };
  } catch {
    return { title: null, author: null };
  }
}

