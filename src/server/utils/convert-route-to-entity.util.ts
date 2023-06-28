const mapping: Record<string, string> = {
  'access-keys': 'access_key',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
