import queryString from 'query-string';
let rootUrl = 'https://www.fastmock.site/mock/9d5defe35aa551442a7c304effaa4429/api';

let myFetch = {
    get(url,queryParams){
      url = rootUrl+url
      if(queryParams){
        url += "?"+queryString.stringify(queryParams);
      }
      return fetch(url)
                .then(res=>res.json())
    },
    post(url , body){
        return fetch(rootUrl + url, {
            method: 'POST',
            headers: {
              "Accept": 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })
            .then(res => res.json())
        
    }
}

export {myFetch}