import { Component, HostListener } from '@angular/core';
import { HelperService } from './core/services/helper.service';
import { environment } from '../environments/environment';
import {
  RouterOutlet,
  Router
} from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public env = environment;

  constructor(
    public helperService: HelperService,
    public router: Router,
    public httpService: HttpService
  ) {
  }

  ngOnInit() {
  }
}
