/**
 * Script para carregar variáveis de ambiente do arquivo .env
 * e disponibilizá-las para o build do Angular.
 *
 * Uso: node scripts/load-env.js development|production
 */

const fs = require('fs');
const path = require('path');

function loadEnvFile(environment) {
  const envFile = path.join(__dirname, '..', `.env.${environment}`);

  if (!fs.existsSync(envFile)) {
    console.error(`❌ Arquivo ${envFile} não encontrado!`);
    console.error(`   Copie .env.example para .env.${environment} e configure os valores.`);
    process.exit(1);
  }

  const content = fs.readFileSync(envFile, 'utf-8');
  const vars = {};

  content.split('\n').forEach(line => {
    // Ignorar comentários e linhas vazias
    if (line.trim().startsWith('#') || !line.trim()) return;

    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      vars[key.trim()] = valueParts.join('=').trim();
    }
  });

  return vars;
}

function generateDefineConfig(vars) {
  const defines = {};

  for (const [key, value] of Object.entries(vars)) {
    // Converter para formato que o Angular builder aceita
    defines[key] = JSON.stringify(value);
  }

  return defines;
}

function main() {
  const environment = process.argv[2] || 'development';

  console.log(`📦 Carregando variáveis de ambiente: ${environment}`);

  const vars = loadEnvFile(environment);
  const defines = generateDefineConfig(vars);

  console.log(`✅ Variáveis carregadas:`);
  for (const key of Object.keys(vars)) {
    console.log(`   - ${key}`);
  }

  // Escrever arquivo temporário com defines para o build
  const outputPath = path.join(__dirname, '..', 'env-defines.json');
  fs.writeFileSync(outputPath, JSON.stringify(defines, null, 2));

  console.log(`✅ Configuração salva em: ${outputPath}\n`);
}

main();

