import { hanoiEndpoint } from "../utils";

export const GetHanoiSolution = async (rings: string | null) => {
  try {
    const response = await fetch(hanoiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rings: rings })
    });
    const results = await response.json();
    return results
  } catch (err) {
    console.error(`Error fetching the hanoi solution: ${err}`);
  }
};