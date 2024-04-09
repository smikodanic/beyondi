interface IWebsiteurl {
  _id?: string;
  website_id: any;
  url: string;
  source?: string;
  validation_http_status?: number; // the http status: 200, 301, 404, ... on last opening with the validator
  validation_passed?: boolean; // did the url passed or not the validation rules
  validation_message?: string; // specify the rule which was not passed
  validation_counter?: number; // how many times the url was validated i.e. opened with validator
  created_at?: Date; // date when inserted in DB
  validated_at?: Date; // last validation date
}


interface IUrlsearch {
  _id?: any;
  website_id?: any;
  url_contains: string;
  source?: '' | 'sitemap' | 'siteurl' | 'manual' | 'mediator';
  validation_http_status: number | '';
  validation_message_contains: string;
  validation_passed: boolean | string;
  validation_counter?: number;
}

export { IWebsiteurl, IUrlsearch };
