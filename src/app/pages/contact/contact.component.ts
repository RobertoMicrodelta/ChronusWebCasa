import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as emailjs from 'emailjs-com';
import { NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent{
  formData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

    // constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
    // ngOnInit(): void {
    //   if (isPlatformBrowser(this.platformId)) {
    //     // Inicializar el script de Google reCAPTCHA solo en el navegador
    //     const script = document.createElement('script');
    //     script.src = 'https://www.google.com/recaptcha/api.js';
    //     script.async = true;
    //     script.defer = true;
    //     document.body.appendChild(script);
    //   }
    // }

  showSuccessMessage: boolean = false;
  isLoading: boolean = false;
  acceptPrivacyPolicy: boolean = false;

  // Función para enviar el correo
  sendEmail(contactForm: NgForm): void {
    // Verificar si el formulario es válido
    if (
      !this.formData.name ||
      !this.formData.email ||
      !this.formData.phone ||
      !this.formData.message ||
      !this.acceptPrivacyPolicy
    ) {
      alert(
        'Por favor, completa todos los campos y acepta la política de privacidad.'
      );
      return;
    }

    //Obtenir el token de reCAPTCHA
    const recaptchaResponse = (
      document.getElementById('g-recaptcha-response') as HTMLInputElement
    ).value;

    if (!recaptchaResponse) {
      alert('Por favor, completa el reCAPTCHA.');
      return;
    }

    // Activar el estado de carga
    this.isLoading = true;

    // Valida el reCAPTCHA amb Google
    const secretKey = '6Lc9j8UqAAAAAM3bZSh8Tz2YthvaeD2X2bh3Sryg';
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    fetch(verificationUrl, { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // reCAPTCHA verificat correctament, enviar el correu
          const adminConfig = [
            {
              serviceID: 'service_4m1hx3o', // Service ID de EmailJS per al primer destinatari
              templateID: 'template_dnmxmwb', // Template ID de EmailJS per al primer destinatari
              publicKey: 'lRpBU3ydYKsGcuL1t', // Public key (User ID)
            },
            {
              serviceID: 'service_tkixzm7', // Service ID de EmailJS per al segon destinatari
              templateID: 'template_n21u6e8', // Template ID de EmailJS per al segon destinatari
              publicKey: 'aFaAHzo4FMc5mrC9a', // Public key (User ID)
            },
          ];

          // Enviar el correu a cada destinatari
          adminConfig.forEach((config) => {
            const templateParams = {
              to_name: 'Admin', // Nom del destinatari
              from_name: this.formData.name, // Nom del remitent
              email: this.formData.email, // Correu electrònic del remitent
              phone: this.formData.phone, // Telèfon del remitent
              message: this.formData.message, // Missatge del remitent
            };

            emailjs
              .send(
                config.serviceID,
                config.templateID,
                templateParams,
                config.publicKey
              )
              .then(
                (response) => {
                  console.log(
                    'Correu enviat correctament!',
                    response.status,
                    response.text
                  );
                  this.showSuccessMessage = true; // Mostrar missatge d'èxit
                  this.isLoading = false; // Desactivar l'estat de càrrega
                  this.resetForm(contactForm); // Reiniciar el formulari

                  // Ocultar el missatge d'èxit després de 5 segons
                  setTimeout(() => {
                    this.showSuccessMessage = false;
                  }, 5000);
                },
                (error) => {
                  console.error('Error enviant el correu', error);
                  alert(
                    'Hi ha hagut un problema enviant el teu missatge. Torna a intentar-ho.'
                  );
                  this.isLoading = false; // Desactivar l'estat de càrrega en cas d'error
                }
              );
          });
        } else {
          alert('No s’ha pogut verificar el reCAPTCHA. Torna a intentar-ho.');
          this.isLoading = false;
        }
      })
      .catch((error) => {
        console.error('Error en la validació del reCAPTCHA:', error);
        alert(
          'Hi ha hagut un error en verificar el reCAPTCHA. Torna a intentar-ho.'
        );
        this.isLoading = false;
      });
  }

  // Función para resetear el formulario
  resetForm(contactForm: NgForm): void {
    contactForm.resetForm();
    this.formData = {
      name: '',
      email: '',
      phone: '',
      message: '',
    };
    this.acceptPrivacyPolicy = false; // Desmarcar la checkbox
  }
}
