import { KeycloakService, KeycloakConfig } from 'keycloak-angular';
 
export function initializer(keycloak: KeycloakService): () => Promise<any> {
  
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      let keycloakConfig: KeycloakConfig = {
        url: 'http://ec2-18-159-36-123.eu-central-1.compute.amazonaws.com:8080/auth',
        realm: 'SmokeTest',
        clientId: 'smk-spa'
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