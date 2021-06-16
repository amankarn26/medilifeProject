import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    phone: '',
    name:'',
    // gender:'',
    // dob:'',
    email:'',
    city: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      pincode: '',
      states: '',
      country: 'India'
    },
    login: {
      type: 'CUSTOMER',
      username: '', // ----------User name can be phone or email
      password: '',
      role: 'CUSTOMER'
    },

  };

  login = {
    username: '',
    password: '',

  };

  constructor(
    private restService: RestService
  ) { }

  ngOnInit(): void {
  }

  getState() {

    const url = this.restService.loginRest('getState', this.user.address.pincode);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.restService.getJSONFromURL(response);
        // this.statelist = response;
        this.user.address.states = response.state_name;
        this.user.address.city = response.city_name;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public register() {
    this.user.login.username = this.user.phone;
    this.user.login.password = window.btoa(this.user.login.password);
    const url = this.restService.loginRest('addCutomer', '');
    this.restService.postFormData(url, this.user).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        // this.userId = response.id;
        localStorage.setItem('id', response.id);
        localStorage.setItem('name', response.name);
        localStorage.setItem('type', response.login.type);
        localStorage.setItem('islogin', 'true');
        // localStorage.setItem('islogin', 'true');
        localStorage.setItem('email', response.email);
        localStorage.setItem('phone', response.phone);
        localStorage.setItem('Address', JSON.stringify(response.address));
        window.scrollTo(0, 0);

        Swal.fire({
          icon: 'success',
          title: 'You Registered and Logged in successfully',
          text: "Enjoy Shopping",
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            location.reload();
          }
        })
      },
      error => {
        // Error Message
        console.log('Error in data load.');
        Swal.fire(
          'The Internet?',
          'That thing is still around?',
          'question'
        )
      }
    );
  }

  public loginNow() {

    if ((this.login.username != '') && (this.login.password != '')) {
      console.log(this.login);
      const url = this.restService.loginRest('login', '');
      this.login.password = window.btoa(this.login.password); // added on 5/1/2019
      this.restService.postFormData(url, this.login).subscribe(
        (response: any) => {

          if (response.login.role == 'CUSTOMER') {

            localStorage.setItem('id', response.id);
            localStorage.setItem('name', response.name);
            localStorage.setItem('role', response.login.role);
            localStorage.setItem('type', response.login.type);
            localStorage.setItem('islogin', 'true');
            localStorage.setItem('email', response.email);
            localStorage.setItem('phone', response.phone);
            localStorage.setItem('Address', JSON.stringify(response.address));
            localStorage.setItem('pas',response.login.password);


            if (response.photo) {
              sessionStorage.setItem('photo', response.photo.docpath);
            }
            if (response.phone) {
              sessionStorage.setItem('phone', response.phone);
            }

            Swal.fire({
              icon: 'success',
              title: 'You Logged in successfully',
              text: "Enjoy Shopping",
              showConfirmButton: false,
              timer: 1500,
              willClose: () => {
                location.reload();
              }
            })
          }
          else {
            Swal.fire({
              icon: 'info',
              title: 'Invalid account',
              text: "Please use customer account Only",
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        error => {
          // Error Message
          
          console.log('Error in data load.');

          Swal.fire({
            icon: 'error',
            title: 'Invalid Credientals',
            text: "Please check your number and password again!",
            showConfirmButton: false,
            timer: 2500
          })
        }
      );

      //  location.reload();

    } else {
      console.log('Please provide user ID and Password.');
      Swal.fire({
        icon: 'error',
        title: 'Invalid Credientals',
        text: "Please fill your number and password!",
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

}
