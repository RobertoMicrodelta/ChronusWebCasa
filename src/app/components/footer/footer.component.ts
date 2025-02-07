import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  actualYear = new Date().getFullYear();
  newsletterEmail: string = '';
  isLoading: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  ngOnInit(): void {
    this.loadRecaptcha();
  }

  loadRecaptcha(): void {
    // Eliminar script antiguo si ya está cargado
    const oldScript = document.querySelector(
      'script[src="https://www.google.com/recaptcha/enterprise.js?render=6LdvksUqAAAAANm1VmzbJjTtU5WJH_cnYcJAsSRa"]'
    );
    if (oldScript) {
      oldScript.remove(); // Borra el script anterior
    }

    // Crear un nuevo script y agregarlo al DOM
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/enterprise.js?render=6LdvksUqAAAAANm1VmzbJjTtU5WJH_cnYcJAsSRa';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Asegurarse de que grecaptcha esté disponible
      if (typeof grecaptcha !== 'undefined') {
        console.log('reCAPTCHA cargado correctamente');
      } else {
        console.error('reCAPTCHA no se ha cargado correctamente');
      }
    };
  }

  openGooglePlay() {
    window.open(
      'https://play.google.com/store/apps/details?id=microdelta.chronustime&hl=es&gl=US',
      '_blank'
    );
  }

  openAppleStore() {
    window.open(
      'https://apps.apple.com/es/app/chronus-time/id1570611343',
      '_blank'
    );
  }

  sendNewsletter(newsletterForm: NgForm): void {
    if (!this.newsletterEmail) {
      alert('Por favor, ingresa tu dirección de correo electrónico.');
      return;
    }
  
    this.isLoading = true;
  
    // Verificar si grecaptcha está disponible
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(() => {
        grecaptcha
          .execute('6LdvksUqAAAAANm1VmzbJjTtU5WJH_cnYcJAsSRa', {
            action: 'submit',
          })
          .then((token) => {
            console.log('Token de reCAPTCHA:', token);
            this.submitFormWithToken(newsletterForm, token);
          })
          .then(
            () => {
              // Se ejecuta después de que el formulario ha sido enviado exitosamente
            },
            (error) => {
              console.error('Error obteniendo el token de reCAPTCHA:', error);
              this.showErrorMessage = true;
              this.isLoading = false;
            }
          );
      });
    } else {
      console.error('grecaptcha no está disponible');
      this.showErrorMessage = true;
      this.isLoading = false;
    }
  }

  submitFormWithToken(newsletterForm: NgForm, token: string): void {
    const templateParams = {
      email: this.newsletterEmail,
      recaptchaToken: token, // Enviar el token de reCAPTCHA
    };

    emailjs
      .send(
        'service_gqs1hs7',
        'template_y28dsr3',
        templateParams,
        'Y3ti3IWhmmCXGrJgu'
      )
      .then(
        (response) => {
          console.log(
            'Correo enviado correctamente!',
            response.status,
            response.text
          );
          this.showSuccessMessage = true;
          this.isLoading = false;
          newsletterForm.resetForm();

          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        },
        (error) => {
          console.error('Error enviando el correo', error);
          this.showErrorMessage = true;
          this.isLoading = false;

          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      );
  }
}