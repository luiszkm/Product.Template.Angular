import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    // Forçar pt-BR como locale do browser para testes consistentes
    Object.defineProperty(navigator, 'language', { value: 'pt-BR', configurable: true });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(I18nService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('deve ser criado', () => {
    const req = httpMock.expectOne('/i18n/pt-BR.json');
    req.flush({});
    expect(service).toBeTruthy();
  });

  it('deve carregar traduções do locale padrão (pt-BR)', () => {
    const req = httpMock.expectOne('/i18n/pt-BR.json');
    expect(req.request.method).toBe('GET');

    req.flush({ common: { save: 'Salvar' } });

    expect(service.currentLocale()).toBe('pt-BR');
  });

  it('deve traduzir chave simples', () => {
    const req = httpMock.expectOne('/i18n/pt-BR.json');
    req.flush({ common: { save: 'Salvar', cancel: 'Cancelar' } });

    expect(service.translate('common.save')).toBe('Salvar');
    expect(service.translate('common.cancel')).toBe('Cancelar');
  });

  it('deve traduzir chave com interpolação', () => {
    const req = httpMock.expectOne('/i18n/pt-BR.json');
    req.flush({
      errors: {
        minLength: 'Mínimo de {{min}} caracteres',
        range: 'Entre {{min}} e {{max}}'
      }
    });

    expect(service.translate('errors.minLength', { min: 3 }))
      .toBe('Mínimo de 3 caracteres');

    expect(service.translate('errors.range', { min: 5, max: 10 }))
      .toBe('Entre 5 e 10');
  });

  it('deve retornar a key se tradução não encontrada', () => {
    const req = httpMock.expectOne('/i18n/pt-BR.json');
    req.flush({ common: { save: 'Salvar' } });

    expect(service.translate('nonexistent.key')).toBe('nonexistent.key');
  });

  it('deve mudar idioma e recarregar traduções', () => {
    const req1 = httpMock.expectOne('/i18n/pt-BR.json');
    req1.flush({ common: { save: 'Salvar' } });

    expect(service.currentLocale()).toBe('pt-BR');

    service.setLocale('en-US');

    const req2 = httpMock.expectOne('/i18n/en-US.json');
    req2.flush({ common: { save: 'Save' } });

    expect(service.currentLocale()).toBe('en-US');
    expect(service.translate('common.save')).toBe('Save');
  });

  it('deve persistir locale no localStorage', () => {
    const req1 = httpMock.expectOne('/i18n/pt-BR.json');
    req1.flush({});

    service.setLocale('en-US');

    const req2 = httpMock.expectOne('/i18n/en-US.json');
    req2.flush({});

    expect(localStorage.getItem('locale')).toBe('en-US');
  });

  it('deve ignorar locale inválido', () => {
    const req = httpMock.expectOne('/i18n/pt-BR.json');
    req.flush({});

    const consoleSpy = vi.spyOn(console, 'error');

    service.setLocale('invalid-locale');

    expect(consoleSpy).toHaveBeenCalledWith('[I18n] Locale not available: invalid-locale');
    expect(service.currentLocale()).toBe('pt-BR');
  });

  it('deve ter locales disponíveis', () => {
    const req = httpMock.expectOne('/i18n/pt-BR.json');
    req.flush({});

    expect(service.availableLocales).toEqual([
      { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
      { code: 'en-US', label: 'English', flag: '🇺🇸' }
    ]);
  });

  it('deve tratar erro no carregamento de traduções', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    const req = httpMock.expectOne('/i18n/pt-BR.json');
    req.error(new ProgressEvent('error'));

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('deve atualizar atributo lang do documento', () => {
    const req1 = httpMock.expectOne('/i18n/pt-BR.json');
    req1.flush({});

    service.setLocale('en-US');

    const req2 = httpMock.expectOne('/i18n/en-US.json');
    req2.flush({});

    expect(document.documentElement.lang).toBe('en-US');
  });
});

describe('I18nService - restauração do localStorage', () => {
  let service: I18nService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('locale', 'en-US');

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(I18nService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('deve restaurar locale do localStorage', () => {
    const req = httpMock.expectOne('/i18n/en-US.json');
    req.flush({});

    expect(service.currentLocale()).toBe('en-US');
  });
});

