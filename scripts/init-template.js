#!/usr/bin/env node
/**
 * Substitui nomes e branding do template por valores do novo projeto.
 *
 * Uso:
 *   node scripts/init-template.js --npm-name acme-portal --angular-project AcmePortal --app-title "Acme Portal" --shell-brand "Acme"
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const OLD_NPM = 'product-template-angular';
const OLD_ANGULAR = 'ProductTemplateAngular';
const OLD_SHELL = 'Product Template';
const OLD_README_H1 = 'Product Template Angular';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      throw new Error(`Valor em falta para --${key}`);
    }
    out[key.replace(/-/g, '')] = next;
    i++;
  }
  return out;
}

function validateNpmName(name) {
  if (!/^[a-z0-9-]+$/.test(name)) {
    throw new Error(
      `--npm-name deve ser kebab-case (letras minúsculas, números e hífens): recebido "${name}"`
    );
  }
}

function validateAngularProject(name) {
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
    throw new Error(
      `--angular-project deve ser PascalCase (ex.: AcmePortal): recebido "${name}"`
    );
  }
}

function writeFile(relPath, content) {
  const full = path.join(ROOT, relPath);
  fs.writeFileSync(full, content, 'utf8');
  console.log(`  ✓ ${relPath}`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  const npmName = args.npmname;
  const angularProject = args.angularproject;
  const appTitle = args.apptitle;
  const shellBrand = args.shellbrand;

  if (!npmName || !angularProject || !appTitle || !shellBrand) {
    console.error(`
Uso:
  node scripts/init-template.js \\
    --npm-name <kebab-case> \\
    --angular-project <PascalCase> \\
    --app-title "<título da app>" \\
    --shell-brand "<marca na sidebar>"

Exemplo:
  node scripts/init-template.js \\
    --npm-name acme-portal \\
    --angular-project AcmePortal \\
    --app-title "Acme Portal" \\
    --shell-brand "Acme"
`);
    process.exit(1);
  }

  validateNpmName(npmName);
  validateAngularProject(angularProject);

  const angularPath = path.join(ROOT, 'angular.json');
  if (!fs.readFileSync(angularPath, 'utf8').includes(OLD_ANGULAR)) {
    console.error(
      'Não foi encontrado o nome do projeto template neste angular.json. Já foi personalizado ou não é a raiz correta.'
    );
    process.exit(1);
  }

  const files = [
    {
      rel: 'angular.json',
      transform: (s) => s.replaceAll(OLD_ANGULAR, angularProject)
    },
    {
      rel: 'package.json',
      transform: (s) => {
        const j = JSON.parse(s);
        if (j.name !== OLD_NPM) {
          throw new Error('package.json: nome esperado do template não encontrado.');
        }
        j.name = npmName;
        return JSON.stringify(j, null, 2) + '\n';
      }
    },
    {
      rel: 'package-lock.json',
      transform: (s) => s.replaceAll(OLD_NPM, npmName)
    },
    {
      rel: 'src/index.html',
      transform: (s) => s.replaceAll(OLD_ANGULAR, appTitle)
    },
    {
      rel: 'src/app/layouts/shell/shell-layout.component.html',
      transform: (s) => s.replaceAll(OLD_SHELL, shellBrand)
    },
    {
      rel: 'src/styles.css',
      transform: (s) => s.replaceAll(OLD_README_H1, appTitle)
    },
    {
      rel: 'README.md',
      transform: (s) =>
        s
          .replace(/^# .+$/m, `# ${appTitle}`)
          .replaceAll(`cd ${OLD_ANGULAR}`, `cd ${npmName}`)
          .replaceAll(`dist/${OLD_ANGULAR}/`, `dist/${angularProject}/`)
    },
    {
      rel: 'CONTRIBUTING.md',
      transform: (s) =>
        s
          .replace(/^# .+$/m, `# Guia de Contribuição — ${appTitle}`)
          .replaceAll(`dist/${OLD_ANGULAR}/`, `dist/${angularProject}/`)
    }
  ];

  console.log('A aplicar substituições...\n');
  for (const { rel, transform } of files) {
    const full = path.join(ROOT, rel);
    const before = fs.readFileSync(full, 'utf8');
    const after = transform(before);
    writeFile(rel, after);
  }

  console.log(`
Concluído. Sugestão: executar npm install e npm run test:env (ou npm start) para validar.
`);
}

try {
  main();
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
}
