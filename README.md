# README

An browser side httpClient crafted with window.fetch.

## Hot use it

- Install package

```sh
yarn add whyfetch
```

- How to use it

```ts
import HttpClient from "whyfetch";

const baseUri = "Your base uri";
const options = {
  Accept: "application/json, text/plain",
  "Content-Type": "application/json;charset=UTF-8",
};

const httpClient = new HttpClient(baseUri, options);

httpClient.get<User[]>("users");
httpClient.patch<User>("users/user_id", userUpdate);
httpClient.post<User[]>("users", userData);
httpClient.delete<User[]>("users/user_id");
```
- Extend HttpClient

- Add injection before making or after recieivng response
```ts
class MyHttpClient extends HttpClient {
   async request (conf) {
   
   // do something before request;

   const result =  await super.request(conf);

   // do something after request;
   
   return result;
}
```
- Query Params

```ts
class OrderClient extends HttpClient {
  getOrders = (params: Record<string, string>) => {
    return this.get<Order[]>({
      apiPath: 'orders',
      query: {
        sort: 'date',
        order: 'desc'
      }
    })
  }
  
  // Or
  getOrders = (params: Record<string, string>) => {
    return this.get<Order[]>({
      apiPath: 'orders',
      query: {
        params: {
          sort: 'date',
          order: 'desc'
        },
        options: // IStringifyOptions 
      }
    })
  },
}
```

- Abort a request

```ts
import React, { useState, useEffect } from 'react';

import HttpClient from './HttpClient';

const httpClient = new HttpClient('https://example.com/api');

const apiPath = 'users';
const query = {
  city: 'LA'
}

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const queryOption = {
      apiPath,
      query
    };

    httpClient
      .get(queryOption)
      .then((response) => setData)
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setError(error.message);
          setLoading(false);
        }
      });

    return () => {
      httpClient.abort({
        ...queryOption,
        method: "GET"
      });
    };
  }, []);

  return (
    <div>
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyComponent;
```