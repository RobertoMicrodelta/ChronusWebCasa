import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-pedir-una-demo',
  templateUrl: './pedir-una-demo.component.html',
  styleUrls: ['./pedir-una-demo.component.scss'],
})
export class PedirUnaDemoComponent implements OnInit{

  ngOnInit(): void {
    this.loadRecaptcha();
  }


  loadRecaptcha(): void {
    // Eliminar script antiguo (si ya estaba cargado)
    const oldScript = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
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

  formTouched = {
    name: false,
    email: false,
    phone: false,
    employeeCount: false,
  };

  // Variable para mostrar el mensaje de éxito
  showSuccessMessage: boolean = false;

  // Variable para mostrar el mensaje de carga
  isLoading: boolean = false;

  onEmployeeCountChange(): void {
    this.showAdditionalFields = true;
    this.showAdditionalFields = !!this.selectedEmployeeCount;
  }

  // Función para validar el correo electrónico
  validEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  // Función para validar el teléfono
  validPhone(phone: string): boolean {
    const phoneRegex = /^\+?[0-9]{9,12}$/;
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

    // Captura la resposta de reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
      alert('Por favor, completa el reCAPTCHA.');
      return;
    }

    // Agregar el número de empleados a los datos del formulario
    this.formData.employeeCount = this.selectedEmployeeCount;

    // Activar el mensaje de carga
    this.isLoading = true;

    // Hacer scroll hacia arriba de la página
    window.scrollTo(0, 0);

    this.sendEmail();
  }

  verifyRecaptcha(token: string): void {
    const secretKey = '6Lc9j8UqAAAAAM3bZSh8Tz2YthvaeD2X2bh3Sryg'; // Substitueix per la teva clau secreta
  
    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.sendEmail(); // Si és vàlid, envia el correu
        } else {
          alert('Error: No se ha podido verificar el reCAPTCHA. Inténtalo de nuevo.');
          this.isLoading = false;
        }
      })
      .catch((error) => {
        console.error('Error en la validación del reCAPTCHA:', error);
        alert('Hubo un problema verificando el reCAPTCHA.');
        this.isLoading = false;
      });
  }

  sendEmail(): void {
    const adminConfig = [
      {
        serviceID: 'service_wvfwyfn',
        templateID: 'template_yt2d4mb',
        publicKey: 'UOHRL-3z80n4yWQoZ',
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
  }

  resetForm(): void {
    this.selectedEmployeeCount = '';
    this.formData.name = '';
    this.formData.email = '';
    this.formData.phone = '';
    this.formData.employeeCount = '';
    this.showAdditionalFields = false;

    //Reiniciar el reCAPTCHA
    grecaptcha.reset();
  }
}