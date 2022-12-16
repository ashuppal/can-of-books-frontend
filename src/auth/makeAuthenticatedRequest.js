import axiox from 'axios';


async function makeAuthenticatedRequest(url, method, body) {

  let token = await getTokenSilently();

  let request = {
    method: method,
    data: data,
  
  }}
