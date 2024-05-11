import fetch from "cross-fetch";

// Function to fetch user channel details
const getUserChanDetails = async () => {
    let obj = { list: [] };

    try {
        const responseChannels = await fetch("https://tplayapi.code-crafters.app/321codecrafters/fetcher.json");
        const cData = await responseChannels.json();

        if (cData && cData.data && Array.isArray(cData.data.channels)) {
            const flatChannels = cData.data.channels.flat();
            flatChannels.forEach(channel => {
                let rearrangedChannel = {
                    id: channel.id,
                    clearkey: channel.clearkeys ? JSON.stringify(channel.clearkeys[0].base64) : null
                };
                obj.list.push(rearrangedChannel);
            });
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return obj;
    }

    return obj;
};

// Function to get the key based on ID
const getKey = async (id) => {
    let cKey = '';
    let data = await getUserChanDetails();
    let dataList = data.list;
    for(let i = 0; i < dataList.length; i++){
        if(dataList[i].id === id){
            cKey = dataList[i].clearkey;
            break;
        }
    }
    return cKey;
};

// Exporting the functions as an object
export { getUserChanDetails, getKey };
