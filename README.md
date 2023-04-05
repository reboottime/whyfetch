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
