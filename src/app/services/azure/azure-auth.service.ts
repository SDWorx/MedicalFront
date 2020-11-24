import { Injectable } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
@Injectable({
  providedIn: 'root'
})
export class AzureAuthService {
isIframe = false;	  
loggedIn = false;	
  
constructor(
  private broadcastService: BroadcastService,     
  private authService: MsalService) {  }

initializeAuth() {
  
  this.isIframe = window !== window.parent && !window.opener;
  this.checkoutAccount();
  console.log(this.broadcastService)
  this.broadcastService.subscribe('msal:loginSuccess', () => {
    this.checkoutAccount();
  });

  this.authService.handleRedirectCallback((authError, response) => {
    if (authError) {
      console.error('Redirect Error: ', authError.errorMessage);
      return;
    }9

    console.log('Redirect Success: ', response);
  });

  this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
    console.log('MSAL Logging: ', message);
  }, {
    correlationId: CryptoUtils.createNewGuid(),
    piiLoggingEnabled: false
  }));
}

logIn() {
  const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 
           || window.navigator.userAgent.indexOf('Trident/') > -1;

  if (isIE) {
    this.authService.loginRedirect();
  }
  else {
    this.authService.loginPopup();
  }
}

checkoutAccount() {
  this.loggedIn = !!this.authService.getAccount();
}

logOut() {
  this.authService.logout();
}
}
