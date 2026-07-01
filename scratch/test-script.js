import https from 'https';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxPrjUI82-VFsYGYev1Jcodog7-2oAhyb7dpqKc0WCj1EILDJf5JogZrfv5GeQiJK15/exec';

const params = new URLSearchParams();
params.append("fullName", "Test User");
params.append("phone", "9876543210");
params.append("email", "test@example.com");
params.append("location", "Darbhanga");
params.append("serviceType", "Modular Kitchen");
params.append("appointmentDate", "2026-07-02");
params.append("referral", "Google Search");
params.append("message", "Test message from script");

const postData = params.toString();

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log("Sending request to Google Apps Script...");
const req = https.request(GOOGLE_SCRIPT_URL, options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);
  
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('BODY:', body.slice(0, 1000));
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();
