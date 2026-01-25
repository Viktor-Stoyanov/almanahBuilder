export type DimensionInput = {
    id: string;
    label: string;
    defaultValue?: number;
};

export type ProjectDimensions = Record<string, number>;

export type LabelCoordinate = {
    x: number; // Percentage (0-100) from left
    y: number; // Percentage (0-100) from top
    rotation?: number; // Default 0
};

export type Variation = {
    id: string;
    name: string;
    description?: string;
    previewImage: string;
    templateImage: string;
    dimensionsImage: string;
    inputs: DimensionInput[];
    labels: Record<string, LabelCoordinate>;
};

const VARIATION_NAMES = [
    "УКРЕПЕНА СТАТИЧНА ПРЕГРАДА",
    "ПРЕГРАДА ВРАТА С ЛИФТ ПАНТА",
    "УКРЕПЕНА СТАТИЧНА ЧАСТ И ВРАТА",
    "УКРЕПЕНА СТАТИЧНА ЧАСТ И ВРАТА С ЛИФТ ПАНТА",
    "ПРЕГРАДА ДВЕ ХАРМОНИКИ",
    "ПРЕГРАДА ХАРМОНИКА С ДВЕ КРИЛА",
    "ДВЕ СТАТИЧНИ ЧАСТИ С ВРАТА",
    "ВРАТА С ПРУЖИННА ПАНТА",
    "УКРЕПЕНА СТАТИЧНА ЧАСТ И ВРАТА",
    "УКРЕПЕНА СТАТИЧНА ЧАСТ И ВРАТА",
    "ПЕТОЪГЪЛНА ДУШ КАБИНА",
    "ЧАСТИ ЗА ПЛЪЗГАЩА СИСТЕМА"
];

const DEFAULT_INPUTS: DimensionInput[] = [
    { id: 'width', label: 'Ширина (A)', defaultValue: 900 },
    { id: 'depth', label: 'Дълбочина (B)', defaultValue: 900 },
    { id: 'height', label: 'Височина (H)', defaultValue: 2000 },
];

const DEFAULT_LABELS: Record<string, LabelCoordinate> = {
    width: { x: 50, y: 90, rotation: 0 },
    depth: { x: 90, y: 50, rotation: -90 },
    height: { x: 10, y: 50, rotation: -90 },
};

export const VARIATIONS: Variation[] = VARIATION_NAMES.map((name, i) => {
    const num = i + 1;
    const zeroPad = num.toString().padStart(5, '0'); // 00001
    const twoPad = num.toString().padStart(2, '0'); // 01
    const id = `v${num}`;

    let inputs = [...DEFAULT_INPUTS];
    let labels = { ...DEFAULT_LABELS };

    // Specific configurations
    if (num === 1) {
        inputs = [
            { id: 'width', label: 'Ширина (A)', defaultValue: 900 },
            { id: 'height', label: 'Височина (H)', defaultValue: 2000 },
        ];
        delete labels.depth;
    }

    if (num === 2) {
        inputs = [
            { id: 'width', label: 'Ширина (A)', defaultValue: 900 },
            { id: 'height', label: 'Височина (H)', defaultValue: 2000 },
        ];
        delete labels.depth;
    }

    if (num === 5) {
        inputs = [
            { id: 'a1', label: 'Ширина 1 (a1)', defaultValue: 450 },
            { id: 'a2', label: 'Ширина 2 (a2)', defaultValue: 450 },
            { id: 'b1', label: 'Дълбочина 1 (b1)', defaultValue: 450 },
            { id: 'b2', label: 'Дълбочина 2 (b2)', defaultValue: 450 },
            { id: 'height', label: 'Височина (h)', defaultValue: 2000 },
        ];
        labels = {};
    }

    if (num === 7 || num === 11) {
        inputs = [
            { id: 'a', label: 'Страна (a)', defaultValue: 900 },
            { id: 'b', label: 'Страна (b)', defaultValue: 900 },
            { id: 'c', label: 'Страна (c)', defaultValue: 900 },
            { id: 'height', label: 'Височина (h)', defaultValue: 2000 },
        ];
        labels = {};
    }

    if (num === 8) {
        inputs = [
            { id: 'b', label: 'Страна (b)', defaultValue: 900 },
            { id: 'height', label: 'Височина (h)', defaultValue: 2000 },
        ];
        labels = {};
    }

    if (num === 12) {
        inputs = [
            { id: 'L', label: 'Дължина (L)', defaultValue: 1500 },
            { id: 'height', label: 'Височина (h)', defaultValue: 2000 },
        ];
        labels = {};
    }

    return {
        id,
        name: `${num}. ${name}`,
        previewImage: `/variations/previews/preview_${zeroPad}.png`,
        templateImage: `/variations/sketches/sketch${twoPad}.png`,
        dimensionsImage: `/variations/dimensions/dimensions${twoPad}.png`,
        inputs,
        labels,
    };
});
