const AUTH_CONFIG = {
    exactPublicPaths: ['/login', '/register', '/complete-auth', '/forgot-password'],
    publicPathPrefixes: ['/reset-password'],
    privatePathPrefixes: ['/settings', '/chats'],
    authenticatedRedirect: '/chats',
    unauthenticatedRedirect: '/login',
  };

export{
    AUTH_CONFIG
}