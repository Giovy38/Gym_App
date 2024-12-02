import { MethodType } from "@/src/type/MethodType.type";

type Err<T> = {
    // 2 varianti, erorre e non tramite ok 
    ok: false;
    error: T
}

type Ok<T> = {
    ok: true;
    value: T
};

type Result<T, E> = Ok<T> | Err<E>



export default async function FetchFunction<T>(url: string, method: MethodType, body?: T): Promise<Result<Response, Response>> {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);


    if (!response.ok) {
        return {
            ok: false,
            error: response
        }
    } else {
        return {
            ok: true,
            value: response
        }
    }

}