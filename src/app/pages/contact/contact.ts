import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactPage {
  private emailService: EmailService = inject(EmailService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  readonly contactForm = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  isSubmitting = false;
  submitError = '';
  submitSuccess = '';

  onSubmit(): void {
    this.submitError = '';
    this.submitSuccess = '';

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { fullName, email, subject, message } = this.contactForm.getRawValue();

    if (!fullName || !email || !subject || !message) {
      return;
    }

    this.isSubmitting = true;

    const html = `
      <div>
        <p><strong>Name:</strong> ${this.escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${this.escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${this.escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${this.escapeHtml(message).replace(/\n/g, '<br />')}</p>
      </div>
    `;

    this.emailService
      .sendEmail({
        to: 'diego2001pama@gmail.com',
        subject: `Portfolio contact: ${subject}`,
        html,
      })
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.submitSuccess = 'Thanks! Your message has been sent.';
          this.contactForm.reset();
        },
        error: () => {
          this.submitError = 'Sorry, something went wrong. Please try again.';
        },
      });
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
