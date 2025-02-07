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
export class ContactComponent implements OnInit {
  ngOnInit(): void {
    this.loadRecaptcha();
  }

  loadRecaptcha(): void {
    // Eliminar script antiguo (si ya estaba cargado)
    const oldScript = document.querySelector(
      'script[src="https://www.google.com/recaptcha/api.js"]'
    );
    if (oldScript) {
      oldScript.remove(); // Borra el script anterior para evitar conflictos
    }

    // Crear un nuevo script y agregarlo al DOM
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Esperar a que el script se cargue y luego inicializar el reCAPTCHA
    script.onload = () => {
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.reset(); // Reiniciar reCAPTCHA si ya estaba
      }
    };
  }

  formData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  };

  acceptPrivacyPolicy: boolean = false;
  showPrivacyPolicyError: boolean = false;

  showSuccessMessage: boolean = false;
  isLoading: boolean = false;

  handleFormSubmit(contactForm: NgForm): void {
    // Verifica que la política de privacidad esté aceptada antes de hacer cualquier acción
    this.checkPrivacyPolicy();
  
    // Revisar que el captcha esté completado
    this.revisarCaptcha(contactForm);
  }
  
  revisarCaptcha(contactForm: NgForm): void {
    const recaptchaResponse = grecaptcha.getResponse(); // Obtener la respuesta del reCAPTCHA
    if (!recaptchaResponse) {
      // Si no hay respuesta del reCAPTCHA, mostramos el error y no enviamos el formulario
      alert('Por favor, completa el reCAPTCHA antes de enviar el formulario.');
      return; // Detener la ejecución, no enviamos el formulario
    }
  
    // Si reCAPTCHA está completado, procedemos a verificarlo en el servidor
    this.verifyRecaptcha(recaptchaResponse, contactForm);
  }
  
  verifyRecaptcha(token: string, contactForm: NgForm): void {
    const secretKey = '6Lc9j8UqAAAAAM3bZSh8Tz2YthvaeD2X2bh3Sryg'; // Tu clave secreta reCAPTCHA
  
    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Si la verificación es exitosa, procedemos a enviar el correo
          this.sendEmail(contactForm);
        } else {
          // Si la verificación falla, mostramos el error
          alert('Error: No se ha podido verificar el reCAPTCHA. Intenta nuevamente.');
          this.isLoading = false; // Detener el proceso
        }
      })
      .catch((error) => {
        // Si hay un problema con la verificación del reCAPTCHA
        console.error('Error en la validación del reCAPTCHA:', error);
        alert('Hubo un problema verificando el reCAPTCHA. Inténtalo de nuevo.');
        this.isLoading = false; // Detener el proceso
      });
  }
  
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
      this.showPrivacyPolicyError = !this.acceptPrivacyPolicy; // Mostrar el mensaje de error si no se ha aceptado la política de privacidad
      alert('Por favor, completa todos los campos y acepta la política de privacidad.');
      return; // Si el formulario no es válido, no se envía el correo
    }
  
    // Activar el estado de carga
    this.isLoading = true;
  
    const adminConfig = [
      {
        serviceID: 'service_8htsnsj',
        templateID: 'template_h8eg1u8',
        publicKey: 'UOHRL-3z80n4yWQoZ',
      },
      {
        serviceID: 'service_tkixzm7',
        templateID: 'template_n21u6e8',
        publicKey: 'aFaAHzo4FMc5mrC9a',
      },
    ];
  
    // Enviar correo a cada administrador
    adminConfig.forEach((config) => {
      const templateParams = {
        to_name: 'Admin',
        name: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        company: this.formData.company,
        message: this.formData.message,
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
            console.log('Correo enviado correctamente!', response.status, response.text);
            this.showSuccessMessage = true;
            this.isLoading = false;
            this.resetForm(contactForm);
  
            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 5000);
          },
          (error) => {
            console.error('Error enviando el correo', error);
            alert('Hubo un problema enviando tu mensaje. Inténtalo de nuevo.');
            this.isLoading = false;
          }
        );
    });
  }

  checkPrivacyPolicy(): void {
    if (!this.acceptPrivacyPolicy) {
      this.showPrivacyPolicyError = true;
    }
  }

  // Función para resetear el formulario
  resetForm(contactForm: NgForm): void {
    const acceptPrivacyPolicyValue = this.acceptPrivacyPolicy; // Guardar el valor actual de acceptPrivacyPolicy
    contactForm.resetForm();
    this.formData = {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    };
    this.acceptPrivacyPolicy = false;
    this.acceptPrivacyPolicy = acceptPrivacyPolicyValue; // Restaurar el valor de acceptPrivacyPolicy
    this.showPrivacyPolicyError = false; // Ocultar el mensaje de error después de resetear el formulario

    //Reiniciar el reCAPTCHA
    grecaptcha.reset();
  }
}
