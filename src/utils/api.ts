export function getApiEndpoint(path = '/api/send-sms', baseUrl = ''): string {
  if (!baseUrl) return path;
  return `${baseUrl.replace(/\/$/, '')}${path}`;
}

export function getSmsEndpoint(baseUrl = ''): string {
  return getApiEndpoint('/api/send-sms', baseUrl);
}

export function getAlertEndpoint(baseUrl = ''): string {
  return getApiEndpoint('/api/send-alert', baseUrl);
}
