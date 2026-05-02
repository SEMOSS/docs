export interface PixelReturn {
    pixelId: string;
    pixelExpression: string;
    isMeta: boolean;
    timeToRun: number;
    output: any; // Can be string, object, array, etc. depending on the reactor
    operationType: string[];
}

export interface RunPixelResponse {
    insightID: string;
    pixelReturn: PixelReturn[];
}

export interface ReactorHelpOutput {
    R: string[];
    NATIVE: string[];
    General: string[];
    H2: string[];
    PYTHON: string[];
    EXPRESSION: string[];
    TINKER: string[];
}

export interface HelpJsonPixelReturn extends Omit<PixelReturn, 'output'> {
    output: ReactorHelpOutput;
}

export interface HelpJsonResponse extends Omit<RunPixelResponse, 'pixelReturn'> {
    pixelReturn: HelpJsonPixelReturn[];
}

export interface Reactor {
    name: string;
    description?: string;
    requiredKeys: string[];
    optionalKeys: string[];
    usage?: string;

}

export interface AllReactors {
    [category: string]: Reactor[];
}
