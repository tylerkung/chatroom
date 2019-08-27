import { giphyHost, giphyApiKey } from "./api-settings";

export default {
    random: async () => {
        const response = await fetch(`${giphyHost}/gifs/random?api_key=${giphyApiKey}`, {
            method: "GET",
        });

        const giphyResponse = await response.json();
        
        if (giphyResponse.error){
            throw new Error(giphyResponse.error.en);
        }

        return giphyResponse;
    }
}
