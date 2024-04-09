/**
 * List of API endpoints
 */
import { environment } from '../../../environments/environment';
const api_base_url = environment.api_base_url; // http://127.0.0.1:9001 (lokal) , https://core.dev.prerenderproxy.com (development) , https://core.prerenderproxy.com (production)

const API = {
  BASE_URL: api_base_url,
  USERS: {
    register: api_base_url + '/users/register',
    login: api_base_url + '/users/login',
  },
  ADMIN: {
    dashboard: api_base_url + '/admin/dashboard'
  },
  CUSTOMER: {
    dashboard: api_base_url + '/user/dashboard'
  }
};

export default API;
