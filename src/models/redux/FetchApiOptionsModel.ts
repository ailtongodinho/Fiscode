export class FetchApiOptions {
    Type: string;
    Url: string;
    Method: string;
    Body: object;
    Headers?: Headers;
    constructor(
        _type: string,
        _url: string,
        _method: string,
        _body: object = null,
        _headers: Headers = new Headers()
    ) {
        this.Type = _type;
        this.Url = _url;
        this.Method = _method;
        this.Body = _body;
        this.Headers = _headers ?? new Headers();   
    }
}