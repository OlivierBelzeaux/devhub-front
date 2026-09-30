import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-code-block',
  imports: [ButtonModule],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss'
})
export class CodeBlockComponent {
  private readonly document = inject(DOCUMENT);
  readonly code = input.required<string>();
  readonly previewLines = input<number>();
  readonly copied = signal(false);
  readonly displayedCode = computed(() => {
    const lineLimit = this.previewLines();
    if (!lineLimit) {
      return this.code();
    }

    const lines = this.code().split('\n');
    const preview = lines.slice(0, lineLimit).join('\n');
    const maxCharacters = 240;
    const shortenedPreview = preview.length > maxCharacters ? preview.slice(0, maxCharacters) : preview;
    const hasMoreContent = lines.length > lineLimit || preview.length > maxCharacters;
    return hasMoreContent ? `${shortenedPreview}\n…` : shortenedPreview;
  });

  public async copy(): Promise<void> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(this.code());
      } else {
        this.copyWithTemporaryInput();
      }
      this.copied.set(true);
      window.setTimeout(() => this.copied.set(false), 2_000);
    } catch {
      this.copied.set(false);
    }
  }

  private copyWithTemporaryInput(): void {
    const input = this.document.createElement('textarea');
    input.value = this.code();
    input.style.position = 'fixed';
    input.style.opacity = '0';
    this.document.body.append(input);
    input.select();
    this.document.execCommand('copy');
    input.remove();
  }
}
