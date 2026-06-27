const sdk = require('@insforge/sdk');
console.log('SDK exports:', Object.keys(sdk));
if (sdk.createBrowserClient) console.log('Has createBrowserClient');
if (sdk.createServerClient) console.log('Has createServerClient');
if (sdk.createClient) console.log('Has createClient');
