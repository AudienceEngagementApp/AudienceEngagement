// @flow

// This class consolidates different endpoints into an easier handler.
export class Http {

  get(url: string, headers?: Map<string, string>): Promise<string> {
    return Promise.reject("Method needs to be implemented")
  }
}
