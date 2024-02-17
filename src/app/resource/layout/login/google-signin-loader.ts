// google-signin-loader.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleSignInLoader {
  private static readonly GOOGLE_API_URL = 'https://apis.google.com/js/platform.js';

  private isLoaded = false;

  load(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.isLoaded) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = GoogleSignInLoader.GOOGLE_API_URL;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          this.isLoaded = true;
          resolve();
        };
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
      }
    });
  }
}
