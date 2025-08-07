import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  const username = (await ask('Username: ')).trim();
  const fullName = (await ask('Full name: ')).trim();
  const role = (await ask('Role (coordinator/carer): ')).trim();
  const password = (await ask('Password: ')).trim();
  const salt = (await ask(`Salt [default: ${username}_salt_2024]: `)).trim() || `${username}_salt_2024`;

  const saltedPassword = salt + password;
  const hash = bcrypt.hashSync(saltedPassword, 12);

  console.log('\n--- User details ---');
  console.log('Username:', username);
  console.log('Full name:', fullName);
  console.log('Role:', role);
  console.log('Salt:', salt);
  console.log('Password:', password);
  console.log('Salted password:', saltedPassword);
  console.log('Password hash:', hash);

  console.log('\n--- SQL Insert Statement ---');
  console.log(`insert into users (id, full_name, username, salt, password_hash, role, created_at)`);
  console.log(`values (gen_random_uuid(), '${fullName.replace(/'/g, "''")}', '${username}', '${salt}', '${hash}', '${role}', now());`);

  rl.close();
}

main(); 