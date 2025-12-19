// src/lib/qr/qr.ts
import QRCode from 'qrcode';

export type QrEcLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrGenerateOptions {
    size?: number;
    errorCorrectionLevel?: QrEcLevel;
    margin?: number;
    mimeType?: 'image/png' | 'image/jpeg' | 'image/webp';
}

export class QrCodeError extends Error {
    public cause?: unknown;
    constructor(message: string, cause?: unknown) {
        super(message);
        this.name = 'QrCodeError';
        this.cause = cause;
    }
}

const DEFAULTS: Required<QrGenerateOptions> = {
    size: 256,
    errorCorrectionLevel: 'M',
    margin: 2,
    mimeType: 'image/png',
};

export function normalizeUrl(input: string): string {
    const trimmed = (input ?? '').trim();
    if (!trimmed) throw new QrCodeError('URL is empty.');

    try {
        return new URL(trimmed).toString();
    } catch {
        try {
            return new URL(`https://${trimmed}`).toString();
        } catch (e) {
            throw new QrCodeError('Invalid URL format.', e);
        }
    }
}

export async function qrToDataUrl(
    url: string,
    options?: QrGenerateOptions
): Promise<string> {
    const opt = { ...DEFAULTS, ...options };
    const normalized = normalizeUrl(url);

    try {
        return await QRCode.toDataURL(normalized, {
            errorCorrectionLevel: opt.errorCorrectionLevel,
            margin: opt.margin,
            width: opt.size,
            type: opt.mimeType,
        });
    } catch (e) {
        throw new QrCodeError('Failed to generate QR data URL.', e);
    }
}

export async function qrToBlob(url: string, options?: QrGenerateOptions): Promise<Blob> {
    const dataUrl = await qrToDataUrl(url, options);
    const res = await fetch(dataUrl);
    return await res.blob();
}

/** Blob → ObjectURL 생성 (img src에 넣기 좋음) */
export async function qrToObjectUrl(
    url: string,
    options?: QrGenerateOptions
): Promise<string> {
    const blob = await qrToBlob(url, options);
    return URL.createObjectURL(blob);
}

/** ObjectURL 정리 */
export function revokeObjectUrl(objectUrl: string | null | undefined): void {
    if (!objectUrl) return;
    try {
        URL.revokeObjectURL(objectUrl);
    } catch {
        // ignore
    }
}
