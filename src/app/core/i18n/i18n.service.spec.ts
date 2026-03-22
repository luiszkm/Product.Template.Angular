import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(navigator, 'language', { value: 'pt-BR', configurable: true });

    TestBed.configureTestingModule({});

    service = TestBed.inject(I18nService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve carregar traduções do locale padrão (pt-BR) sem HTTP', () => {
    expect(service.currentLocale()).toBe('pt-BR');
    expect(service.translate('common.save')).toBe('Salvar');
  });

  it('deve traduzir chave simples', () => {
    expect(service.translate('common.save')).toBe('Salvar');
    expect(service.translate('common.cancel')).toBe('Cancelar');
  });

  it('deve traduzir chave com interpolação', () => {
    expect(service.translate('errors.minLength', { min: 3 })).toBe('Mínimo de 3 caracteres');
    expect(service.translate('validation.passwordTooShort', { min: 8 })).toBe(
      'A senha deve ter pelo menos 8 caracteres'
    );
  });

  it('deve retornar a key se tradução não encontrada', () => {
    expect(service.translate('nonexistent.key')).toBe('nonexistent.key');
  });

  it('deve mudar idioma sem pedido HTTP', () => {
    expect(service.currentLocale()).toBe('pt-BR');
    expect(service.translate('common.save')).toBe('Salvar');

    service.setLocale('en-US');

    expect(service.currentLocale()).toBe('en-US');
    expect(service.translate('common.save')).toBe('Save');
  });

  it('deve persistir locale no localStorage', () => {
    service.setLocale('en-US');
    expect(localStorage.getItem('locale')).toBe('en-US');
  });

  it('deve ignorar locale inválido', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    service.setLocale('invalid-locale');

    expect(consoleSpy).toHaveBeenCalledWith('[I18n] Locale not available: invalid-locale');
    expect(service.currentLocale()).toBe('pt-BR');
  });

  it('deve ter locales disponíveis', () => {
    expect(service.availableLocales).toEqual([
      { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
      { code: 'en-US', label: 'English', flag: '🇺🇸' }
    ]);
  });

  it('deve atualizar atributo lang do documento', () => {
    expect(document.documentElement.lang).toBe('pt-BR');

    service.setLocale('en-US');

    expect(document.documentElement.lang).toBe('en-US');
  });
});

describe('I18nService - restauração do localStorage', () => {
  let service: I18nService;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('locale', 'en-US');

    TestBed.configureTestingModule({});

    service = TestBed.inject(I18nService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve restaurar locale do localStorage', () => {
    expect(service.currentLocale()).toBe('en-US');
    expect(service.translate('common.save')).toBe('Save');
  });
});
