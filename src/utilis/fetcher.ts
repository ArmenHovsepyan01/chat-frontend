import axios from 'axios';

export async function fetcher(url: string) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
}
