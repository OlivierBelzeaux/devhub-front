import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { getRuntimeConfiguration } from '../config/runtime-configuration';

@Injectable({ providedIn: 'root' })
export class ContactLinkService {
  private readonly document = inject(DOCUMENT);
  private readonly email = getRuntimeConfiguration().contactEmail ?? '';

  public openMailClient(): void {
    this.document.location.href = `mailto:${this.email}`;
  }
}
