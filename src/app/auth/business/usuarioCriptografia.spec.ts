import { CryptoService } from './crypto.service';

describe('Campo Service', () => {
  const criptografia = new CryptoService();

  it('Criptografar texto', async () => {
    const textoCriptografado = criptografia.encryptText('123456');
    expect(textoCriptografado).toBe(
      'b8ad08a3a547e35829b821b75370301dd8c4b06bdd7771f9b541a75914068718',
    );
  });

  it('Criptografar texto caracteres especiais', async () => {
    const textoCriptografado = criptografia.encryptText(
      '!@#$%**()+=[]{}~?;.,<>?;*-+.',
    );
    expect(textoCriptografado).toBe(
      'dd5a6d84155ebbff3a9a47087de1f6cd8370e625f6f1c23d9171804ae848b8d2',
    );
  });
});
