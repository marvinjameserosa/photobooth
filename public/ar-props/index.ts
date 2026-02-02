import { ARProp } from '@/lib/ar/types';
import { drawArduinoShadesTeal } from './sunglasses/arduinoShadesTeal';
import { drawArduinoCap } from './hats/arduinoCap';
import { drawRobotHelmet } from './hats/robotHelmet';
import { drawLED } from './components/led';
import { drawResistor } from './components/resistor';
import { drawDebugLandmarks } from './debug/faceLandmarks';

/**
 * Registry of all available AR props
 */
export const AR_PROPS: ARProp[] = [
    // Sunglasses
    {
        id: 'arduino-shades-teal',
        name: 'Arduino Teal Shades',
        category: 'sunglasses',
        draw: drawArduinoShadesTeal,
        defaultColors: {
            primary: '#00CED1',   // Teal
            secondary: '#FF6B35', // Orange
        },
        anchorPoints: [33, 133, 362, 263], // Eyes landmarks
        defaultScale: 1.0, // Reduced further to 1.0 for smaller fit
    },

    // Hats
    {
        id: 'arduino-cap',
        name: 'Arduino Day Cap',
        category: 'hats',
        draw: drawArduinoCap,
        defaultColors: {
            primary: '#00CED1',   // Teal
            secondary: '#FF6B35', // Orange
        },
        anchorPoints: [10, 338, 109], // Forehead landmarks
        defaultScale: 1.6, // Reduced from 2.2
    },

    {
        id: 'robot-helmet',
        name: 'Robot Helmet',
        category: 'hats',
        draw: drawRobotHelmet,
        defaultColors: {
            primary: '#C0C0C0',   // Silver
            secondary: '#00BFFF', // Blue light
        },
        anchorPoints: [10, 338, 109], // Forehead landmarks
        defaultScale: 1.5, // Increased slightly per request
    },

    // Electronic Components
    {
        id: 'led-red',
        name: 'Glowing LED',
        category: 'components',
        draw: drawLED,
        defaultColors: {
            primary: '#FF0000',   // Red
            secondary: '#FF6B35', // Orange glow
        },
        anchorPoints: [10], // Forehead center
        defaultScale: 0.5, // Standard size
    },

    {
        id: 'resistor-rainbow',
        name: 'Rainbow Resistor',
        category: 'components',
        draw: drawResistor,
        defaultColors: {
            primary: '#D4A574',   // Beige body
            secondary: '#888888', // Gray legs
        },
        anchorPoints: [1], // Nose tip
        defaultScale: 0.5, // Standard size
    },

    // Debug
    {
        id: 'debug-landmarks',
        name: 'Debug Landmarks',
        category: 'effects',
        draw: drawDebugLandmarks,
        defaultColors: {
            primary: '#00CED1',
            secondary: '#FF6B35',
        },
        anchorPoints: [1], // Will render all landmarks
        defaultScale: 1.0,
    },
];

/**
 * Get prop by ID
 */
export function getPropById(id: string): ARProp | undefined {
    return AR_PROPS.find(prop => prop.id === id);
}

/**
 * Get props by category
 */
export function getPropsByCategory(category: string): ARProp[] {
    return AR_PROPS.filter(prop => prop.category === category);
}
