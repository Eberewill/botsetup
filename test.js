async function fetchCoinData(contractAddress) {
    const axios = require('axios')
    const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          'accept': 'application/json'
        }
      });

      const resOb = {
        tokenID: response.data['id'],
        symbol: response.data['symbol'],
        name: response.data['name'],
        thumb: response.data['image']['thumb'],
        prices: {
            eth: response.data['market_data']['current_price'].eth,
            btc: response.data['market_data']['current_price'].btc,
            eur: response.data['market_data']['current_price'].eur,
            usd: response.data['market_data']['current_price'].usd

        }

      }
      return resOb;
    } catch (error) {
      throw error;
    }
  }
  

  
fetchCoinData("0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE").then((res)=>{
    console.log(res)
}).catch((err)=> {
    console.log("err", err)

})

/*

{
    "statusCode": 200,
    "data": {
      "audit": {
        "is_contract_renounced": true,
        "codeVerified": true,
        "date": "2023-08-21T14:56:34.907Z",
        "lockTransactions": false,
        "mint": false,
        "provider": "GoPlus",
        "proxy": false,
        "status": "OK",
        "unlimitedFees": false,
        "version": 1
      },
      "decimals": 18,
      "info": {
        "description": "",
        "email": "",
        "extraInfo": "",
        "nftCollection": "",
        "ventures": false
      },
      "links": {
        "bitbucket": "",
        "discord": "",
        "facebook": "",
        "github": "",
        "instagram": "",
        "linkedin": "",
        "medium": "",
        "reddit": "",
        "telegram": "",
        "tiktok": "",
        "twitter": "",
        "website": "",
        "youtube": ""
      },
      "logo": "",
      "metrics": {
        "maxSupply": 100000000,
        "totalSupply": 100000000,
        "holders": 107,
        "txCount": 492
      },
      "name": "Baby Finance",
      "symbol": "BABYFI",
      "totalSupply": "100000000000000000000000000",
      "creationBlock": 17962827,
      "reprPair": {
        "id": {
          "chain": "ether",
          "exchange": "univ2",
          "pair": "0x26a5ba27212cc311e829370d3e4d8f4fd12ee253",
          "token": "0x8b4777e0814e7b58ec20bda845410b51034c4082",
          "tokenRef": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        },
        "price": 0
      },
      "pairs": [
        {
          "address": "0x26a5ba27212cc311e829370d3e4d8f4fd12ee253",
          "exchange": "univ2",
          "dextScore": 1,
          "price": 0,
          "tokenRef": {
            "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "name": "Wrapped Ether",
            "symbol": "WETH"
          }
        }
      ],
      "chain": "ether",
      "address": "0x8b4777e0814e7b58ec20bda845410b51034c4082"
    }
  }


*/
