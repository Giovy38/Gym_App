import { MethodType } from "@/src/type/MethodType.type";

export default async function FetchFunction<T>(url: string, method: MethodType, body?: T): Promise<Response> {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response; // Restituisce la risposta HTTP
}