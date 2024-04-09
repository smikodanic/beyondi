interface IMediator {
  _id?: string;
  website_id: any;
  ip: string;

  port: number;
  authtoken: string;

  proxy_port: number;
  proxy_type: 'static' | 'dynamic';
}

export { IMediator };
