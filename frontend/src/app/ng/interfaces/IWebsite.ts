interface IWebsite {
  _id?: string;
  user_id: any;
  title: string;
  description: string;
  protocol: 'http:' | 'https:';
  host: string;
  origprotocol: 'http:' | 'https:';
  orighost: string;
  sitemap_url: string;
  fastly_service_id: string;
  is_active: boolean;
}

export { IWebsite };
