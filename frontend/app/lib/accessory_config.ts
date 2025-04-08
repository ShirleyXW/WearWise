export const accessoryConfigs: AccessoryConfig = {
    "/assets/glasses/acc3.png": {
        default: {widthMultiplier: 0.5, heightMultiplier: 0.8},
        presets: {
            ultraPortrait: {widthMultiplier: 0.35, heightMultiplier: 1.2, positionOffset: [0, 0.05]}, // huzinan
            portrait: {widthMultiplier: 0.36, heightMultiplier: 1}, //
            square: {widthMultiplier: 0.48, heightMultiplier: 0.78},
            landscape: {widthMultiplier: 0.55, heightMultiplier: 0.75},
            ultraLandscape: {widthMultiplier: 0.50, heightMultiplier: 0.7},
            extremePortrait: {widthMultiplier: 0.43, heightMultiplier: 0.9} // phone selfie
        }
    },
    "/assets/glasses/acc4.png": {
        default: {widthMultiplier: 0.5, heightMultiplier: 0.8},
        presets: {
            ultraPortrait: {widthMultiplier: 0.35, heightMultiplier: 0.85}, //
            portrait: {widthMultiplier: 0.4, heightMultiplier: 0.82}, //
            square: {widthMultiplier: 0.5, heightMultiplier: 0.8},
            landscape: {widthMultiplier: 0.45, heightMultiplier: 0.75},
            ultraLandscape: {widthMultiplier: 0.48, heightMultiplier: 0.72},
            extremePortrait: {widthMultiplier: 0.45, heightMultiplier: 0.85} // phone selfie
        }
    },
    "/assets/glasses/acc5.png": {
        default: {widthMultiplier: 0.45, heightMultiplier: 1.2},
        presets: {
            ultraPortrait: {widthMultiplier: 0.35, heightMultiplier: 1.3}, //
            portrait: {widthMultiplier: 0.42, heightMultiplier: 1.25}, //
            square: {widthMultiplier: 0.42, heightMultiplier: 1.15},
            landscape: {widthMultiplier: 0.55, heightMultiplier: 1.1},
            ultraLandscape: {widthMultiplier: 0.45, heightMultiplier: 1.05},
            extremePortrait: {widthMultiplier: 0.40, heightMultiplier: 1} // phone selfie
        }
    },
    "/assets/glasses/acc6.png": {
        default: {widthMultiplier: 0.45, heightMultiplier: 0.3},
        presets: {
            ultraPortrait: {widthMultiplier: 0.3, heightMultiplier: 0.4}, //
            portrait: {widthMultiplier: 0.3, heightMultiplier: 0.4}, //
            square: {widthMultiplier: 0.45, heightMultiplier: 0.3},
            landscape: {widthMultiplier: 0.45, heightMultiplier: 0.35},
            ultraLandscape: {widthMultiplier: 0.5, heightMultiplier: 0.22},
            extremePortrait: {widthMultiplier: 0.40, heightMultiplier: 0.35} // phone selfie
        }
    },
    "/assets/glasses/acc7.png": {
        default: {widthMultiplier: 0.6, heightMultiplier: 0.4},
        presets: {
            ultraPortrait: {widthMultiplier: 0.3, heightMultiplier: 0.45}, //
            portrait: {widthMultiplier: 0.3, heightMultiplier: 0.38}, //
            square: {widthMultiplier: 0.6, heightMultiplier: 0.4},
            landscape: {widthMultiplier: 0.5, heightMultiplier: 0.38},
            ultraLandscape: {widthMultiplier: 0.65, heightMultiplier: 0.35},
            extremePortrait: {widthMultiplier: 0.4, heightMultiplier: 0.35} // phone selfie
        }
    }
};

export type AspectRatioPreset = {
    widthMultiplier: number;
    heightMultiplier: number;
    positionOffset?: [number, number];
};

export type AspectRatioType =
    | 'extremePortrait'
    | 'ultraPortrait'
    | 'portrait'
    | 'square'
    | 'landscape'
    | 'ultraLandscape'

export type AccessoryConfig = Record<string, {
    default: AspectRatioPreset;
    presets: Partial<Record<AspectRatioType, AspectRatioPreset>>;
}>;
//
// export const getAspectRatioType = (width: number, height: number): AspectRatioType => {
//     const ratio = height / width;
//     return ratio >= 2.0 ? 'extremePortrait' :
//         ratio >= 1.5 ? 'ultraPortrait' :
//             ratio >= 1.2 ? 'portrait' :
//                 ratio >= 0.8 ? 'square' :
//                     ratio >= 0.5 ? 'landscape' :
//                         'ultraLandscape';
// };

export const getAspectRatioType = (width: number, height: number): AspectRatioType => {
  const ratio = height / width;
  return ratio >= 2.0 ? 'extremePortrait' :
         ratio >= 1.5 ? 'ultraPortrait' :
         ratio >= 1.2 ? 'portrait' :
         ratio >= 0.8 ? 'square' :
         ratio >= 0.5 ? 'landscape' :
         'ultraLandscape';
};

