import { redisConnect } from "../utils/redisConnection";

export const fetchCache = async (key: string, fetchData: () => Promise<unknown>, expiresIn: number) => {
    const cachedData = await getKey(key);
    if (cachedData) return cachedData;
    return setValue(key, fetchData, expiresIn);
}

const getKey = async <T>(key: string): Promise<T | null> => {
    const result = await redisConnect.get(key);
    if (result) return JSON.parse(result);
    return null;
}

const setValue = async <T>(key: string, fetchData: () => Promise<T>, expiresIn: number): Promise<T> => {
    const setValue = await fetchData();
    await redisConnect.set(key, JSON.stringify(setValue), "EX", expiresIn);
    return setValue;
}

