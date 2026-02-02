"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { loadFaceMeshModel, disposeFaceMeshModel } from '../models/faceMeshLoader';
import { FacePrediction } from '../types';

export function useFaceMesh(videoElement: HTMLVideoElement | null, isEnabled: boolean = true) {
    const [detector, setDetector] = useState<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
    const [predictions, setPredictions] = useState<FacePrediction[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);

    // Load model
    useEffect(() => {
        if (!isEnabled) return;

        let isMounted = true;

        async function initModel() {
            setIsLoading(true);
            setError(null);

            try {
                const loadedDetector = await loadFaceMeshModel();
                if (isMounted) {
                    setDetector(loadedDetector);
                    setIsLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load model');
                    setIsLoading(false);
                }
            }
        }

        initModel();

        return () => {
            isMounted = false;
        };
    }, [isEnabled]);

    // Detect faces
    const detectFaces = useCallback(async () => {
        if (!detector || !videoElement || !isEnabled) return;

        try {
            const faces = await detector.estimateFaces(videoElement, {
                flipHorizontal: false,
            });

            // Convert Face[] to FacePrediction[] - add score property
            setPredictions(faces.map(face => ({
                keypoints: face.keypoints,
                box: face.box,
                score: 0.99, // Face type doesn't include score, use default
            })));
        } catch (err) {
            console.error('Face detection error:', err);
        }

        // Continue detection loop
        animationFrameRef.current = requestAnimationFrame(detectFaces);
    }, [detector, videoElement, isEnabled]);

    // Start/stop detection loop
    useEffect(() => {
        if (detector && videoElement && isEnabled) {
            detectFaces();
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [detector, videoElement, isEnabled, detectFaces]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            // Note: We don't dispose the detector here as it's a singleton
            // It will be reused if the component remounts
        };
    }, []);

    return {
        detector,
        predictions,
        isLoading,
        error,
        faceDetected: predictions.length > 0,
    };
}
