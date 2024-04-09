/**
 * List of API endpoints
 */
import { environment } from '../../../environments/environment';
const api_base_url = environment.api_base_url; // http://127.0.0.1:9001 (lokal) , https://core.dev.prerenderproxy.com (development) , https://core.prerenderproxy.com (production)

const API = {
  BASE_URL: api_base_url,
  USERS: {
    register: api_base_url + '/panel/users/register',
    login: api_base_url + '/panel/users/login',
  },
  ADMIN: {
    users: api_base_url + '/panel/admin/users',
    websites: api_base_url + '/panel/admin/websites',
    websiteSegments: api_base_url + '/panel/admin/website-segments',
    rules: api_base_url + '/panel/admin/rules',
    modifiers: api_base_url + '/panel/admin/modifiers',
    schedules: api_base_url + '/panel/admin/schedules',
    websiteUrls: api_base_url + '/panel/admin/website-urls',
    agents: api_base_url + '/panel/admin/agents',
    agentsScraper: api_base_url + '/panel/admin/agents/scraper',
    agentsUrlOpener: api_base_url + '/panel/admin/agents/url-opener',
    agentsUrlValidator: api_base_url + '/panel/admin/agents/url-validator',
    mediators: api_base_url + '/panel/admin/mediators',
    agentProcs: api_base_url + '/panel/admin/agentprocs',
    fastly: api_base_url + '/panel/admin/fastly',
    validationErrors: api_base_url + '/panel/admin/validation-errors',
  },
  CUSTOMER: {
    test: api_base_url + '/panel/customer/test'
  }
};

export default API;
