import { isDevMode } from '@angular/core';

let api_url;
const prod_url = 'https://guarded-woodland-59899.herokuapp.com';
const local_url = 'http://localhost:3000';

if (isDevMode()) {
    api_url = local_url;
} else {
    api_url = prod_url;
}

export { api_url };