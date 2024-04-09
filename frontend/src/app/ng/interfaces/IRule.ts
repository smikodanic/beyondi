interface IRule {
  _id?: string;
  website_id: any;
  css_selector: string;
  tip: 'exists' | 'attribute' | 'text' | '';
  exists?: boolean | null;
  attribute?: string | '';
  contains?: string | '';
  notcontains?: string | '';
  __v?: any;
}

export { IRule };
