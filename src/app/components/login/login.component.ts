import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  recuerdame = false;
  usuario: UsuarioModel = new UsuarioModel();

  Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    showClass: {
      popup: 'animate__animated animate__fadeInDown animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp animate__faster',
    },
    customClass: {
      popup: 'popup-class'
    },
  });

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recuerdame = true;
    }
  }

  login( form: NgForm ){
    if (form.invalid) {
      this.Toast.fire({
        title: '<span class="text-white"><i class="fas fa-times fa-fw text-danger"></i> EXISTEN CAMPOS INVALIDOS</span>',
        timer: 3000
      });
      return;
    }

    this.loading = true;
    this.Toast.fire({
      title: '<span class="text-white"><i class="fas fa-sync-alt fa-spin fa-fw text-success"></i> AUTENTICANDO</span>',
    });


    this.auth.login( this.usuario ).subscribe( resp => {
      if (this.recuerdame) {
        localStorage.setItem('email', this.usuario.email);
      }
      this.loading = false;
      this.Toast.close();
      this.Toast.fire({
        title: `<span class="text-white"><i class="fas fa-check fa-fw text-success"></i> SESION INICIADA CORRECTAMENTE</span>`,
        timer: 3000
      });
      this.router.navigateByUrl('/home');
    }, err => {
      const errMsg = err.error.error.message;
      this.loading = false;
      if ( errMsg == 'EMAIL_NOT_FOUND' ||  errMsg == 'INVALID_PASSWORD'){
        this.Toast.fire({
          title: `<span class="text-white"><i class="fas fa-times fa-fw text-danger"></i> LAS CREDENCIALES SON INVALIDAS</span>`,
          timer: 3000
        });
      }
    });

    // setTimeout(() => {
    //   this.loading = false;
    //   this.Toast.close();
    //   this.router.navigateByUrl('/home');
    // }, 3000);
  }

}



// Swal.fire({
//   title: '<span class="text-white"><i class="fas fa-sync-alt fa-spin fa-fw text-success"></i> INICIANDO SESION</span>',
//   toast: true,
//   position: 'top',
//   showConfirmButton: false,
//   // timer: 3000,
//   // timerProgressBar: false,
//   // background: '#0F1023',
//   html: true,
//   onOpen: (toast) => {
//     toast.addEventListener('mouseenter', Swal.stopTimer);
//     toast.addEventListener('mouseleave', Swal.resumeTimer);
//   },
//   showClass: {
//     popup: 'animate__animated animate__backInDown',
//   },
//   hideClass: {
//     popup: 'animate__animated animate__backOutUp',
//   },
//   customClass: {
//     // container: 'container-class',
//     popup: 'popup-class'
//   },
// });