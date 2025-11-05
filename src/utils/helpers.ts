import axios, { AxiosError } from "axios";

export function roundTo(n: number, decimals = 2): number {
    const f = 10 ** decimals;
    return Math.round((n + Number.EPSILON) * f) / f;
}

export const isAxiosError = <T = unknown>(e: unknown): e is AxiosError<T> =>
    axios.isAxiosError(e);