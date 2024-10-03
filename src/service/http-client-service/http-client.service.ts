import { v4 } from 'uuid';
import { HTTP_STATUS_CODE } from '../../data/constants/http-status-code';

export class HttpClientService {
  private baseUrl: string | null = process.env.REACT_APP_API_BASE_URL ?? null;
  private timeout: number = parseInt(process.env.REACT_APP_API_TIMEOUT ?? "25000");

  /**
   * Constructs an instance of HttpClientService.
   * @param http The Http instance to use for making requests.
   */
  public constructor() { }

  /**
   * Executes an HTTP request and handles the response.
   * @param observable The Promise representing an HTTP request call via the Fetch API.
   * @param request The request object.
   * @param customErrorHandlers Custom error handlers.
   * @returns A Promise that resolves to the response.
   */
  private executeMethod = <TResponse, TRequest>(
    fetchPromise: any,
    request: any
  ): Promise<TResponse> => {
    return new Promise<TResponse>((resolve, reject) => {
      let timeoutId: NodeJS.Timeout = setTimeout(() => reject(this.createTimeoutObject()), this.timeout);

      fetchPromise.then(async (result: any) => {

        if (this.checkStatusForSuccess(result.status)) {
          let response = await result.json();
          clearTimeout(timeoutId);
          resolve(response);
          return;
        }
        clearTimeout(timeoutId);
        reject({ status: result.status, message: result.statusText });
      }).catch((error: Error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
    });
  }

  /**
   * Checks if the response status indicates success.
   * @param response The response object.
   * @returns True if the response status indicates success, false otherwise.
   */
  private checkStatusForSuccess<TResponse>(status: number): boolean {
    switch (status) {
      case 200:
      case 201: case 202:
      case 203: case 204:
      case 205: case 206:
      case 207: case 208:
      case 226:
        return true;
      default:
        return false;
    }
  }


  /**
   * Creates a timeout object.
   * @returns The timeout object.
   */
  private createTimeoutObject() {
    return {
      "type": "https://tools.ietf.org/html/rfc7231#section-6.5.7",
      "title": "Request Timeout",
      "status": `${HTTP_STATUS_CODE.REQUEST_TIMEOUT}`,
      "errors": "Waited too long for response from server: Request Timeout",
      "traceId": v4()
    };
  }

  /**
   * Creates the headers for the request.
   * @returns The request headers.
   */
  private createHeaders(method: string): any {
    let header = {
      'Accept-Language': 'en-US,en;q=0.9',
      'Access-Control-Allow-Origin': this.baseUrl,
      "Connection": "keep-alive",
      'Content-Type': 'application/json'
    }
    return header;
  }

  /**
   * Joins query parameters into a string.
   * @param params The query parameters.
   * @returns The joined query parameters string.
   */
  private joinQueryParams({ params }: { [key: string]: any }): string {
    const queryParams = Object.keys(params)
      .map(objKey => {
        let key = encodeURIComponent(objKey);
        let value = undefined;
        if (Array.isArray(params[objKey]))
          value = params[objKey].map(v => encodeURIComponent(v)).join(",");
        else
          value = encodeURIComponent(params[objKey]);
        return `${key}=${value}`
      }
      ).join('&');
    if (queryParams.length > 0)
      return '?' + queryParams;
    else return '';
  }

  /**
   * Sends a GET request to the API.
   * @param endpoint The API endpoint.
   * @param body The request body.
   * @param customErrorHandlers Custom error handlers.
   * @returns A Promise that resolves to the response.
   */
  public async get<TResponse, TRequest>(
    endpoint: string,
    body: TRequest
  ): Promise<TResponse> {
    const fullUrl = `${this.baseUrl}${endpoint}`;

    // build headers
    const headers = this.createHeaders("GET");

    let urlWithParams = fullUrl + this.joinQueryParams({ params: body });
    let request = new Request(urlWithParams, {
      headers,
      method: 'GET',
      mode: "cors",
      referrerPolicy: "strict-origin-when-cross-origin",
      redirect: "follow",
    });

    return this.executeMethod<TResponse, TRequest>(fetch(request), body);
  }

  /**
   * Sends a POST request to the API.
   * @param endpoint The API endpoint.
   * @param body The request body.
   * @param customErrorHandlers Custom error handlers.
   * @returns A Promise that resolves to the response.
   */
  public async post<TResponse, TRequest>(
    endpoint: string,
    body: TRequest
  ): Promise<TResponse> {
    const fullUrl = `${this.baseUrl}${endpoint}`;
    // build headers
    const headers = this.createHeaders("POST");


    const request = new Request(fullUrl, {
      body: JSON.stringify(body),
      headers,
      method: 'POST',
      mode: "cors",
      referrerPolicy: "same-origin",
      redirect: "follow",//'cors' | 'navigate' | 'no-cors' | 'same-origin'
    });
    return this.executeMethod<TResponse, TRequest>(fetch(request), body);

  }

  /**
   * Sends a PUT request to the API.
   * @param endpoint The API endpoint.
   * @param body The request body.
   * @param customErrorHandlers Custom error handlers.
   * @returns A Promise that resolves to the response.
   */
  public async put<TResponse, TRequest>(
    endpoint: string,
    body: TRequest
  ): Promise<TResponse> {
    const fullUrl = `${this.baseUrl}${endpoint}`;
    // build headers
    const headers = this.createHeaders("PUT");

    let request = new Request(fullUrl, {
      body: JSON.stringify(body),
      headers,
      method: 'PUT',
      mode: "cors",
      referrerPolicy: "same-origin",
      redirect: "follow",
    });
    return this.executeMethod<TResponse, TRequest>(fetch(request), body);
  }

  /**
   * Sends a DELETE request to the API.
   * @param endpoint The API endpoint.
   * @param body The request body.
   * @param customErrorHandlers Custom error handlers.
   * @returns A Promise that resolves to the response.
   */
  public async delete<TResponse, TRequest>(
    endpoint: string,
    body: TRequest
  ): Promise<TResponse> {
    const fullUrl = `${this.baseUrl}${endpoint} `;
    // build headers
    const headers = this.createHeaders("DELETE");

    // build params
    let urlWithParams = fullUrl + this.joinQueryParams({ params: body });
    let request = new Request(urlWithParams, {
      headers,
      method: 'GET',
      mode: "cors",
      referrerPolicy: "same-origin",
      redirect: "follow",
    });
    return this.executeMethod<TResponse, TRequest>(fetch(request), body);
  }
}

