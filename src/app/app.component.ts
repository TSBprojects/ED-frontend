import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpService} from './services/http.service';
import {ImageResponse} from './dto/ImageResponse';
import {SnackbarService} from './services/snackbar.service';
import {ImageResult, ResizeOptions} from 'ng2-imageupload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  imgPlaceHolder: any = '../assets/placeholder.jpg';

  isLoading = false;

  image: any;

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 600,
    resizeMaxWidth: 10000 // non-limit
  };

  private readonly imageType: string = 'data:image/PNG;base64,';


  constructor(
    private httpService: HttpService,
    private domSanitizer: DomSanitizer,
    private snackbarService: SnackbarService,
  ) {
  }

  selected(imageResult: ImageResult) {
    this.image = imageResult.resized && imageResult.resized.dataURL || imageResult.dataURL;

    const blob = this.dataURItoBlob(imageResult.resized.dataURL);
    const file = new File([blob], imageResult.file.name);

    this.isLoading = true;
    this.httpService.sendToRecognize(file).subscribe((data: ImageResponse) => {
      this.image = this.domSanitizer.bypassSecurityTrustUrl(this.imageType + data.content);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.image = this.imgPlaceHolder;
      this.snackbarService.showSnackBarWithHttpError(error);
    });
  }

  private dataURItoBlob(dataURI) {

    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

}
