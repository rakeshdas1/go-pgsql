import { TransferModel } from "../models/Transfer.model";

const postgrestApiUrl = process.env.REACT_APP_POSTGREST_API_ENDPOINT;

export const getAllTransfers = async (): Promise<TransferModel[]> => {
    const res = await fetch(`${postgrestApiUrl}/transfers`)
    return await res.json();
}
export const getNTransfers = async (transfers: number = 25): Promise<TransferModel[]> => {
    const res = await fetch(`${postgrestApiUrl}/transfers?limit=${transfers}&order=time.desc`)
    return await res.json();
}