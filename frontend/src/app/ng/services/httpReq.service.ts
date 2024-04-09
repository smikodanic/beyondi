import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class HttpReq {

  constructor(
    private httpClient: HttpClient,
    @Inject('ENV') private ENV: any,
  ) { }


  authHeader(authtoken = '') {
    if (!authtoken) { throw new Error('The "authtoken" is not defined.'); }
    const headers = new HttpHeaders().set('X-Authtoken', authtoken);
    const httpOptions = { headers };
    return httpOptions;
  }


  /**

   * @param defs - header definitions: {'X-Authtoken': 'abc', 'Agent-Host': '65.21.184.0:9021'}]
   */
  defineRequestHeaders(defs: any) {
    if (this.ENV.envName === 'lokal') { delete defs['Agent-Host']; }
    let headers = new HttpHeaders();
    for (const prop in defs) { headers = headers.append(prop.toString(), defs[prop].toString()); }
    return headers;
  }


  defineAgentUrl(path = '', agentObj: any = {}) {
    path = path.trim().replace(/^\//, '');

    let agent_url;
    if (this.ENV.envName === 'production') {
      agent_url = `https://agent.prerenderproxy.com/${path}`
    } else if (this.ENV.envName === 'development') {
      agent_url = `https://agent.dev.prerenderproxy.com/${path}`
    } else {
      agent_url = `http://${agentObj.ip}:${agentObj.port}/${path}`
    }

    return agent_url;
  }


  ask(url: string, method = 'GET', body: any, httpOptions: any) {
    method = method.toLowerCase();

    return new Promise((resolve, reject) => {
      if (method === 'get') {
        this.httpClient.get(url, httpOptions)
          .subscribe({
            next: (apiResp: any) => {
              resolve(apiResp);
            },
            error: (err: HttpErrorResponse) => {
              reject(err);
            }
          });
      } else if (method === 'post') {
        this.httpClient.post(url, body, httpOptions)
          .subscribe({
            next: (apiResp: any) => {
              resolve(apiResp);
            },
            error: (err: HttpErrorResponse) => {
              reject(err);
            }
          });
      }

    });

  }


}
