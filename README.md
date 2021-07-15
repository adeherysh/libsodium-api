# libsodium-api
 
Api tools for generate encrypted value from github secret value with public key (with [tweetsodium](https://github.com/github/tweetsodium)).
This tool was created because I want to use `tweetsodium` in postman `pre-script` (but postman can only import predefined libraries)

## Getting started

### Usage:
Postman pre-script like this:
```
var apiUrl = 'https://csb-2x6tr.vercel.app/api';
var publicKey = 'public-key-here';
var secretValue = 'secret-value-here';

//set encrypted value
const setEncryptedValue = (secretValue, publicKey) => ({
  url: `${apiUrl}/encrypt`,
  method: 'POST',
  header: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: {
    mode: 'raw',
    raw: JSON.stringify({
      secret_value: secretValue,
      public_key: publicKey
    })
  }
});

pm.sendRequest(setEncryptedValue(secretValue, publicKey), function (err, res) {
  console.log('encrypted_value', res.json().data)
}
```
