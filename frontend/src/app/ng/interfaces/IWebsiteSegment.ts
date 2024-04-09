interface IWebsiteSegment {
  _id?: string;
  website_id: any;
  segment_name: string;
  path_regex: string;
}

export { IWebsiteSegment };
