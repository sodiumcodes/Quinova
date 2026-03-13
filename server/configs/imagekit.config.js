import { ImageKit } from "@imagekit/nodejs/client.js";
class ImageKitConfig {
//in js, static method belongs to the class and not to instance of class.

/*We usually want only one ImageKit client instance.
This is similar to a singleton pattern.*/

  static initialize() {
    return new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
  }
}

const imagekit = ImageKitConfig.initialize();
export default imagekit;

/*
urlEndpoint is used for:
    generating URLs
    transformations
    CDN delivery
*/