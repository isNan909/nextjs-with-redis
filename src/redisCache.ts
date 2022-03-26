import { redisConnect } from "../utils/redisConnection";
import { performance } from "perf_hooks";

const startPerfTimer = (): number => {
    return performance.now();
}

const endPerfTimer = (): number => {
    return performance.now();
}

const calculatePerformance = (startTime: number, endTime: number): void => {
    console.log(`Call took ${endTime - startTime} milliseconds`);
}

export const fetchCache = async (key: string, fetchData: () => Promise<unknown>, expiresIn: number) => {
    startPerfTimer();
    const cachedData = await getKey(key);
    if (cachedData) {
        calculatePerformance(startPerfTimer(), endPerfTimer());
        return cachedData

    };
    setValue(key, fetchData, expiresIn);
    calculatePerformance(startPerfTimer(), endPerfTimer());
    return
}

const getKey = async <T>(key: string): Promise<T | null> => {
    const result = await redisConnect.get(key);
    if (result) return JSON.parse(result);
    endPerfTimer();
    return null;
}

const setValue = async <T>(key: string, fetchData: () => Promise<T>, expiresIn: number): Promise<T> => {
    const setValue = await fetchData();
    await redisConnect.set(key, JSON.stringify(setValue), "EX", expiresIn);
    endPerfTimer();
    return setValue;
}

