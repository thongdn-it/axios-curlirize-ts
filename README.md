# axios-curlirize-ts

This package provides a utility to generate cURL commands from Axios requests using an interceptor. It helps with debugging and logging HTTP requests in an easily reproducible cURL format.

[![npm][npm_image_url]][npm_url]
[![bundlephobia][bundlephobia_image_url]][bundlephobia_url]

## Installation

```bash
npm install --save axios-curlirize-ts

OR

yarn add axios-curlirize-ts

OR

pnpm add axios-curlirize-ts
```

## Usage

```ts
import axios from "axios";
import QueryString from "query-string";
import curlirize from "axios-curlirize-ts";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
  paramsSerializer: (params) => QueryString.stringify(params),
});

curlirize(instance);

instance.get("https://api.example.com/data").then((response) => {
  console.log("Response:", response.data);
});
```

## API

### `curlirize(instance: AxiosInstance, callback?: LogCallback)`

- `instance`: The Axios instance to be curlirized.
- `callback`: An optional function `(curl: string | null, error: unknown | null) => void` that receives the generated cURL command or an error.

### Default Callback Behavior

If no callback is provided, the cURL command is logged using `console.info`, and errors (if any) are logged using `console.error`.

## Example with Custom Callback

```ts
const customLogger = (curl: string | null, error: unknown | null) => {
  if (error) {
    console.error("CURL Generation Error:", error);
  } else {
    console.log("Generated CURL Command:", curl);
  }
};

curlirize(instance, customLogger);
```

## License

This library is open-source and available under the MIT license.

## Author

`axios-curlirize-ts` is developed by Thong Dang. You can contact me at thongdn.it@gmail.com.

If you like my project, you can [support me][buy_me_a_coffee_url] or star (like) for it.

<p align="center">
<img src="https://media.giphy.com/media/hXMGQqJFlIQMOjpsKC/giphy.gif" alt="axios-curlirize-ts-buy-me-a-coffee" style="aspect-ratio:385/405;" width="200"/>
</p>

[//]: # "reference links"
[buy_me_a_coffee_image_url]: https://media.giphy.com/media/hXMGQqJFlIQMOjpsKC/giphy.gif
[buy_me_a_coffee_url]: https://www.buymeacoffee.com/thongdn.it
[npm_image_url]: https://img.shields.io/npm/v/axios-curlirize-ts
[npm_url]: https://www.npmjs.com/package/axios-curlirize-ts
[bundlephobia_image_url]: https://badgen.net/bundlephobia/minzip/axios-curlirize-ts
[bundlephobia_url]: https://bundlephobia.com/result?p=axios-curlirize-ts
