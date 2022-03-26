import { redisConnect } from "../utils/redisConnection";


export const fetchCache = async <T>(key: any, fetchData: () => T) => {
    const cachedData = await getKey(key);
    if (cachedData) {
        return cachedData;
    }
    return setValue(key, fetchData);
}

const getKey = async <T>(key: string): Promise<T | null> => {
    const result = await redisConnect.get(key);
    if (!result) return null;
    return JSON.parse(result);
}

const setValue = async <T>(key: string, fetchData: () => Promise<T>): Promise<T> => {
    const setValue = await fetchData();
    await redisConnect.set(key, JSON.stringify(setValue));
    return setValue;
}

