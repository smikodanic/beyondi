interface IModifierElement {
  localName: string; // script, div, span
  attributes?: any; // {href: 'http//...', class: 'bolder'},
  innerHTML?: string;
}


interface IModifier {
  _id?: string;
  website_id: any;
  websiteSegment_id: any;

  action: 'remove' | 'insert-before' | 'insert-prepend' | 'insert-append' | 'insert-after' | 'replace' | '404-recognizer-corrector' | 'custom';

  // used to define element on which the action will be taken, when the action is: "remove", "insert-...", "replace"
  css_selector: string;

  // used to define new HTML content, when the action is: "insert-...", "replace"
  // when the action is "custom" the field should contain puppeteer's evaluate function [body of the function -> https://pptr.dev/api/puppeteer.page.evaluate)
  content: string;

  __v?: any;
}

export { IModifier, IModifierElement };
