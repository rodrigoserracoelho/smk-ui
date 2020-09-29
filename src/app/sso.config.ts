import { KeycloakService, KeycloakConfig } from 'keycloak-angular';
 
export function initializer(keycloak: KeycloakService): () => Promise<any> {
  
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      let keycloakConfig: KeycloakConfig = {
        //url: 'https://capigateway.eu:8443/auth',
        url: 'https://keycloak:8443/auth',
        realm: 'capi',
        clientId: 'rest'
      };
      try {
        await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          enableBearerInterceptor: true,
          bearerExcludedUrls: []
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}