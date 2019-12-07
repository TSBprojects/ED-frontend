import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

/** A service to show marvelous snackbars to user when something happens */
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private closeText: string;

  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBarWithHttpError(httpError: HttpErrorResponse) {
    const errorMessage = httpError.error.message ? httpError.error.message : httpError.message;
    this.snackBar.open(errorMessage, this.closeText, {
      duration: 5000,
    });
  }

  showSnackBarWithTextWithTranslateAndClose(text: string) {
    this.snackBar.open(text, this.closeText, {
      duration: 5000,
    });
  }

}
