"use client";

/**
 * Real-time MediaPipe FaceMesh detection using TensorFlow
 * Provides all 468 face landmarks for accurate AR prop positioning
 * 
 * Uses dynamic imports to avoid Turbopack build errors
 */

type FaceLandmarksDetection = typeof import('@tensorflow-models/face-landmarks-detection');
type FaceLandmarksDetector = import('@tensorflow-models/face-landmarks-detection').FaceLandmarksDetector;

let detector: FaceLandmarksDetector | null = null;
let isLoading = false;
let faceLandmarksDetection: FaceLandmarksDetection | null = null;

/**
 * Dynamically load the face-landmarks-detection library
 * This avoids Turbopack trying to resolve the MediaPipe import at build time
 */
async function loadLibrary(): Promise<FaceLandmarksDetection> {
    if (faceLandmarksDetection) {
        return faceLandmarksDetection;
    }

    console.log('📦 Dynamically loading TensorFlow.js libraries...');

    // Dynamically import TensorFlow.js dependencies
    await import('@tensorflow/tfjs-core');
    await import('@tensorflow/tfjs-backend-webgl');

    // Dynamically import face-landmarks-detection
    faceLandmarksDetection = await import('@tensorflow-models/face-landmarks-detection');

    return faceLandmarksDetection;
}

/**
 * Load the MediaPipe FaceMesh model
 * Uses TensorFlow's face-landmarks-detection for real-time tracking
 */
export async function loadFaceMeshModel(): Promise<FaceLandmarksDetector> {
    if (detector) {
        return detector;
    }

    if (isLoading) {
        // Wait for the current loading to complete
        while (isLoading) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        if (detector) return detector;
    }

    isLoading = true;

    try {
        console.log('🔄 Loading MediaPipe FaceMesh model (mediapipe runtime)...');

        // Load the library dynamically
        const lib = await loadLibrary();

        // Create detector with MediaPipe runtime
        // The import issue is now patched in node_modules using CJS interop fix
        detector = await lib.createDetector(
            lib.SupportedModels.MediaPipeFaceMesh,
            {
                runtime: 'mediapipe',
                refineLandmarks: true,
                maxFaces: 1,
                solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
            }
        );

        console.log('✅ MediaPipe FaceMesh model loaded successfully!');
        console.log('📍 Detecting 468 face landmarks in real-time');

        isLoading = false;
        return detector;
    } catch (error) {
        isLoading = false;
        console.error('❌ Error loading MediaPipe FaceMesh:', error);
        throw error;
    }
}

/**
 * Dispose of the model to free memory
 */
export async function disposeFaceMeshModel() {
    if (detector) {
        await detector.dispose();
        detector = null;
        console.log('🗑️ MediaPipe FaceMesh detector disposed');
    }
}

/**
 * Get the current detector instance
 */
export function getFaceMeshModel() {
    return detector;
}
