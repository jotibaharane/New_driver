// image.compress.tsx
import { Image } from 'react-native';
import ImageCompressor from 'react-native-compressor';
import RNFS from 'react-native-fs';
import ImageCropPicker from 'react-native-image-crop-picker';
import { PhotoQuality } from 'react-native-image-picker';

export const MAX_IMAGE_SIZE_KB = 30;
export const QUALITY_STEPS: PhotoQuality[] = [0.8, 0.6, 0.4, 0.3];
export const MAX_DIMENSION_REDUCTION_STEPS = 3;
export const MIN_DIMENSION = 400;

export type CompressionResult = {
  uri: string;
  base64?: string;
  sizeKB: number;
};

interface Asset {
  uri?: string;
}

/**
 * Get image dimensions from URI
 */
export async function getImageDimensions(
  uri: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => resolve({ width, height }),
      error => reject(error),
    );
  });
}

/**
 * Approximate base64 size in KB
 */
export function getBase64SizeKB(base64: string): number {
  return (base64.length * 3) / (4 * 1024);
}

/**
 * Convert local URI to Base64 using react-native-fs
 */
async function convertToBase64(uri: string): Promise<string> {
  try {
    let filePath = uri;

    // Remove file:// prefix if present
    if (uri.startsWith('file://')) {
      filePath = uri.replace('file://', '');
    }

    const base64String = await RNFS.readFile(filePath, 'base64');
    return base64String;
  } catch (error) {
    console.error('Base64 conversion error:', error);
    throw new Error('Base64 conversion failed');
  }
}

/**
 * Compress image using react-native-compressor
 */
async function tryCompression(
  uri: string,
  quality: number,
  width: number,
  height: number,
): Promise<CompressionResult> {
  try {
    const compressedUri = await ImageCompressor.Image.compress(uri, {
      compressionMethod: 'auto',
      quality,
      maxWidth: width,
      maxHeight: height,
      output: 'jpg',
    });

    const base64 = await convertToBase64(compressedUri);

    return {
      uri: compressedUri,
      base64: `data:image/jpeg;base64,${base64}`,
      sizeKB: getBase64SizeKB(base64),
    };
  } catch (error) {
    console.error('Compression error:', error);
    throw new Error('Compression failed');
  }
}

/**
 * Main function: Compress image to ≤ MAX_IMAGE_SIZE_KB
 */
export async function compressImageToMax30KB(
  asset: Asset,
): Promise<CompressionResult> {
  if (!asset.uri) throw new Error('No image URI provided');

  let processedUri = asset.uri;
  const { width: originalWidth, height: originalHeight } =
    await getImageDimensions(asset.uri);
  let currentWidth = originalWidth;
  let currentHeight = originalHeight;

  // Optional cropping
  const needsCropping = false;
  if (needsCropping) {
    const cropResult = await ImageCropPicker.openCropper({
      path: asset.uri,
      width: currentWidth,
      height: currentHeight,
      compressImageQuality: 1.0,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
    });
    processedUri = cropResult.path;
    currentWidth = cropResult.width;
    currentHeight = cropResult.height;
  }

  // Try compressing with multiple quality & dimension steps
  for (const quality of QUALITY_STEPS) {
    let result = await tryCompression(
      processedUri,
      quality,
      currentWidth,
      currentHeight,
    );
    if (result.sizeKB <= MAX_IMAGE_SIZE_KB) return result;

    for (let step = 0; step < MAX_DIMENSION_REDUCTION_STEPS; step++) {
      currentWidth = Math.max(MIN_DIMENSION, Math.floor(currentWidth * 0.7));
      currentHeight = Math.max(MIN_DIMENSION, Math.floor(currentHeight * 0.7));

      result = await tryCompression(
        processedUri,
        quality,
        currentWidth,
        currentHeight,
      );
      if (result.sizeKB <= MAX_IMAGE_SIZE_KB) return result;
    }
  }

  // Fallback: smallest possible compression
  return await tryCompression(
    processedUri,
    QUALITY_STEPS[QUALITY_STEPS.length - 1],
    MIN_DIMENSION,
    MIN_DIMENSION,
  );
}
