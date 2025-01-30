import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-pedir-una-demo',
  templateUrl: './pedir-una-demo.component.html',
  styleUrls: ['./pedir-una-demo.component.scss'],
})
export class PedirUnaDemoComponent {

  employeeOptions: string[] = [
    '1 - 15',
    '16 - 30',
    '31 - 50',
    '51 - 100',
    '101 - 150',
    '151 - 300',
    '301 - 500',
    '501 - 1000',
    '1000+',
  ];

  selectedEmployeeCount: string = '';
  showAdditionalFields: boolean = false;

  formData = {
    name: '',
    email: '',
    phone: '',
    employeeCount: '',
  };

  // Variable para mostrar el mensaje de éxito
  showSuccessMessage: boolean = false;

  // Variable para mostrar el mensaje de carga
  isLoading: boolean = false;

  onEmployeeCountChange(): void {
    this.showAdditionalFields = true;
  }

  // Función para validar el correo electrónico
  validEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  // Función para validar el teléfono
  validPhone(phone: string): boolean {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  }

  // Verificar si el formulario es válido
  isFormValid(): boolean {
    return (
      this.selectedEmployeeCount !== '' &&
      this.formData.name !== '' &&
      this.validEmail(this.formData.email) &&
      this.validPhone(this.formData.phone)
    );
  }

  // Función para enviar la solicitud de demo
  sendDemoRequest(): void {
    // Validar el formulario antes de enviarlo
    if (!this.isFormValid()) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const recaptchaResponse = (
      document.getElementById('g-recaptcha-response') as HTMLInputElement
    ).value;

    if (!recaptchaResponse) {
      alert('Por favor, completa el reCAPTCHA.');
      return;
    }

    // Agregar el número de empleados a los datos del formulario
    this.formData.employeeCount = this.selectedEmployeeCount;

    // Assegurar-se que grecaptcha està disponible
    if (typeof grecaptcha === 'undefined' || !grecaptcha.enterprise) {
      alert(
        'Error: reCAPTCHA no está disponible. Recarga la página e inténtalo de nuevo.'
      );
      return;
    }

    // Activar el mensaje de carga
    this.isLoading = true;

    // Hacer scroll hacia arriba de la página
    window.scrollTo(0, 0);

    // Obtener el token de reCAPTCHA
    grecaptcha.enterprise
      .execute('6LdmssYqAAAAAA_0OLJ5MlWY5eoxAvLR7gtTqWCq', { action: 'submit' })
      .then((token: string) => {
        this.verifyRecaptcha(token);
      })
  }

  // Función para verificar el token de reCAPTCHA
  verifyRecaptcha(token: string): void {
    const secretKey = '6LdmssYqAAAAAEf06GdIgY15l6pZ13JQ2djkbV2e'; // Clau secreta de Google reCAPTCHA
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    fetch(verificationUrl, { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const adminConfig = [
            {
              serviceID: 'service_4m1hx3o',
              templateID: 'template_prv9rn8',
              publicKey: 'lRpBU3ydYKsGcuL1t',
            },
            {
              serviceID: 'service_tkixzm7',
              templateID: 'template_8s6ixpb',
              publicKey: 'aFaAHzo4FMc5mrC9a',
            },
          ];

          adminConfig.forEach((config) => {
            const templateParams = {
              to_name: 'Admin',
              from_name: this.formData.name,
              email: this.formData.email,
              phone: this.formData.phone,
              employee_count: this.formData.employeeCount,
              message: `Teléfono: ${this.formData.phone}, Correo electrónico: ${this.formData.email}`,
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
                    'Correo enviado correctamente!',
                    response.status,
                    response.text
                  );
                  this.showSuccessMessage = true;
                  this.isLoading = false;
                  this.resetForm();

                  setTimeout(() => {
                    this.showSuccessMessage = false;
                  }, 5000);
                },
                (error) => {
                  console.error('Error enviando el correo', error);
                  alert('Hubo un problema enviando tu solicitud.');
                  this.isLoading = false;
                }
              );
          });
        } else {
          alert('No se ha podido verificar el reCAPTCHA. Inténtalo de nuevo.');
          this.isLoading = false;
        }
      })
      .catch((error) => {
        console.error('Error en la validación del reCAPTCHA:', error);
        alert('Hubo un problema verificando el reCAPTCHA.');
        this.isLoading = false;
      });
  }

  resetForm(): void {
    this.selectedEmployeeCount = '';
    this.formData.name = '';
    this.formData.email = '';
    this.formData.phone = '';
    this.formData.employeeCount = '';
    this.showAdditionalFields = false;
  }
}
