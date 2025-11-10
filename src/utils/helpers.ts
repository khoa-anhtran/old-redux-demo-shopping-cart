import { STATUS } from "@/constants/api";
import { notification } from "antd";
import axios, { AxiosError } from "axios";

export function roundTo(n: number, decimals = 2): number {
    const f = 10 ** decimals;
    return Math.round((n + Number.EPSILON) * f) / f;
}

export const isAxiosError = <T = unknown>(e: unknown): e is AxiosError<T> =>
    axios.isAxiosError(e);

export function notify({ duration = 2, status, message }: { status: string, message?: string | null, duration?: number }) {
    if (status === STATUS.FAIL) notification.error({ message, duration });
    if (status === STATUS.SUCCESS) notification.success({ message, duration });
}