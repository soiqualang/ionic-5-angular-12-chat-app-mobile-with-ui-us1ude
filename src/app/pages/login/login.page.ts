import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController,
    private _appService: AppService,
    public loadingController: LoadingController
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            // tslint:disable-next-line: max-line-length
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  async login() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: 'custom-loader-class',
      showBackdrop: false,
    });
    await loading.present();
    const email: string = this.loginForm.value.email;
    const password: string = this.loginForm.value.password;
    this.userService.login(email, password).subscribe(
      async (res) => {
        localStorage.setItem('chatToken', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this._appService.setUser = res.user;
        this.router.navigate(['home'], { replaceUrl: true });
        await this.loadingController.dismiss();
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Login successful',
          duration: 2000,
        });
        toast.present();
      },
      async (err) => {
        await this.loadingController.dismiss();
        const toast = await this.toastController.create({
          color: 'danger',
          message: err.error.message,
          duration: 2000,
        });
        toast.present();
      }
    );
  }
}
