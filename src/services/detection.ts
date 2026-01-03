import Replicate from "replicate";

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Detection {
  label: string;
  confidence: number;
  box: BoundingBox;
}

const replicate = new Replicate();

/**
 * Calculate Intersection over Union (IoU) between two bounding boxes
 */
function calculateIoU(box1: BoundingBox, box2: BoundingBox): number {
  const x1 = Math.max(box1.x, box2.x);
  const y1 = Math.max(box1.y, box2.y);
  const x2 = Math.min(box1.x + box1.width, box2.x + box2.width);
  const y2 = Math.min(box1.y + box1.height, box2.y + box2.height);

  const intersectionWidth = Math.max(0, x2 - x1);
  const intersectionHeight = Math.max(0, y2 - y1);
  const intersectionArea = intersectionWidth * intersectionHeight;

  const box1Area = box1.width * box1.height;
  const box2Area = box2.width * box2.height;
  const unionArea = box1Area + box2Area - intersectionArea;

  return unionArea > 0 ? intersectionArea / unionArea : 0;
}

/**
 * Non-Maximum Suppression to remove overlapping detections
 * Uses IoU-only suppression to avoid issues with large encompassing boxes
 */
function applyNMS(detections: Detection[], iouThreshold: number = 0.5): Detection[] {
  if (detections.length === 0) return [];

  // Sort by confidence (highest first)
  const sorted = [...detections].sort((a, b) => b.confidence - a.confidence);
  const kept: Detection[] = [];
  const suppressed = new Set<number>();

  for (let i = 0; i < sorted.length; i++) {
    if (suppressed.has(i)) continue;

    const current = sorted[i]!;
    kept.push(current);

    // Check all remaining detections
    for (let j = i + 1; j < sorted.length; j++) {
      if (suppressed.has(j)) continue;

      const other = sorted[j]!;
      const iou = calculateIoU(current.box, other.box);

      // Suppress only if IoU is high (significant overlap)
      if (iou > iouThreshold) {
        suppressed.add(j);
      }
    }
  }

  return kept;
}

interface GroundingDinoDetection {
  label?: string;
  class?: string;
  confidence?: number;
  score?: number;
  box?: [number, number, number, number];
  bbox?: [number, number, number, number];
  xyxy?: [number, number, number, number];
}

export async function detectBooks(imageBase64: string): Promise<Detection[]> {
  const imageUrl = imageBase64.startsWith("data:")
    ? imageBase64
    : `data:image/jpeg;base64,${imageBase64}`;

  const output = await replicate.run(
    "adirik/grounding-dino:efd10a8ddc57ea28773327e881ce95e20cc1d734c589f7dd01d2036921ed78aa",
    {
      input: {
        image: imageUrl,
        query: "book spine",
        box_threshold: 0.12,
        text_threshold: 0.12,
      },
    }
  );

  console.log("Grounding DINO raw output:", JSON.stringify(output, null, 2));

  // Handle different response formats
  let detections: GroundingDinoDetection[] = [];

  if (Array.isArray(output)) {
    detections = output;
  } else if (output && typeof output === "object") {
    const obj = output as Record<string, unknown>;
    if (Array.isArray(obj.detections)) {
      detections = obj.detections;
    } else if (Array.isArray(obj.output)) {
      detections = obj.output;
    } else if (Array.isArray(obj.predictions)) {
      detections = obj.predictions;
    }
  }

  // Convert to our format
  const rawDetections = detections
    .map((det) => {
      const bbox = det.box ?? det.bbox ?? det.xyxy;
      if (!bbox || bbox.length < 4) {
        return null;
      }

      const [x1, y1, x2, y2] = bbox;

      return {
        label: det.label ?? det.class ?? "book",
        confidence: det.confidence ?? det.score ?? 0.5,
        box: {
          x: x1,
          y: y1,
          width: x2 - x1,
          height: y2 - y1,
        },
      };
    })
    .filter((det): det is Detection => det !== null);

  console.log(`Raw detections: ${rawDetections.length}`);

  // Find max dimensions to filter out unreasonably large boxes
  const maxX = Math.max(...rawDetections.map(d => d.box.x + d.box.width));
  const maxY = Math.max(...rawDetections.map(d => d.box.y + d.box.height));
  
  // Filter out boxes that are too wide (>20% of image) - these are likely false positives
  const filteredDetections = rawDetections.filter(det => {
    const widthRatio = det.box.width / maxX;
    return widthRatio < 0.20; // A single book spine shouldn't be more than 20% of image width
  });

  console.log(`After size filter: ${filteredDetections.length}`);

  // Apply Non-Maximum Suppression to remove overlapping boxes
  const nmsDetections = applyNMS(filteredDetections, 0.5);

  console.log(`After NMS: ${nmsDetections.length}`);

  // Sort left to right by x position
  return nmsDetections.sort((a, b) => a.box.x - b.box.x);
}
