import { Buffer as Buffer } from "buffer/";
export declare const stripHexPrefix: (str: any) => any;
export declare const toChecksumAddress: (address: any, chainId?: any) => string;
export declare function isValidChecksumAddress(address: any, chainId: any): boolean;
export interface IFormat {
    coinType: number;
    name: string;
    encoder: (data: Buffer) => string;
    decoder: (data: string) => Buffer;
}
export declare const formats: IFormat[];
export declare const formatsByName: {
    [key: string]: IFormat;
};
export declare function matchProtocol(text: any): any;
export declare function decodeContenthash(encoded: any): {
    protocolType?: undefined;
    decoded?: undefined;
    error?: undefined;
} | {
    protocolType: any;
    decoded: any;
    error?: undefined;
} | {
    protocolType: any;
    decoded: any;
    error: any;
};
export declare function encodeContenthash(text: any): {
    encoded: string | null;
    error: any;
};
export declare function decodeContentUrl(url: any): string;
export declare function encodeContentUrl(data: any): string;
export declare function validateContent(encoded: any): any;
export declare function isValidContenthash(encoded: any): boolean;
export declare function getProtocolType(encoded: any): {
    protocolType: any;
    decoded: any;
};
