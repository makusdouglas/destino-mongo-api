// import { JwtService } from '@nestjs/jwt';
// import { EmailService } from 'src/app/email/business/email.service';
// import { UsuarioService } from 'src/app/usuario/business/usuario.service';
// import { Usuario } from 'src/app/usuario/domain/usuario.entity';
// import { UsuarioRepository } from 'src/app/usuario/repository/usuario.repository';
// import { HttpClient } from 'src/libs/httpClient/httpClient';
// import { EncryptaService } from 'src/utils/encrypta.sevice';
// import { defineMock } from 'src/utils/mocks/mockBase.model.mock';
// import { AuthService } from './auth.service';
// import { UsuarioCriptografia } from './crypto.service';

// describe('AuthUsuario Service', () => {
//   let authUsuarioService: AuthService;
//   let jwtService: JwtService;
//   let usuarioService: UsuarioService;
//   let usuarioCriptografia: UsuarioCriptografia;
//   let encryptaService: EncryptaService;
//   let httpClient: HttpClient;

//   const usuario: Usuario[] = [
//     {
//       idUsuario: 1,
//       nome: 'usuario teste',
//       email: 'usuario_teste@email.com',
//       senha: '123',
//       ativo: true,
//       bloqueado: 0,
//       idUsuarioCadastro: 0
//     },
//     {
//       idUsuario: 2,
//       nome: 'usuario teste2',
//       email: 'usuario_teste2@email.com',
//       senha: '123',
//       ativo: true,
//       bloqueado: 0,
//       idUsuarioCadastro: 0
//     }
//   ];

//   beforeEach(() => {
//     jwtService = new JwtService({});
//     encryptaService = new EncryptaService;
//     httpClient = new HttpClient();

//     usuarioService = new UsuarioService(
//       {} as UsuarioRepository,
//       {} as UsuarioCriptografia,
//       {} as EncryptaService,
//       {} as HttpClient,
//       {} as EmailService
//     );
//     usuarioCriptografia = new UsuarioCriptografia();
//     authUsuarioService = new AuthService(
//       jwtService,
//       usuarioService,
//       usuarioCriptografia
//     );
//   });

//   it('valida usuario', async () => {
//     let hashSenha = '43u7d89adh82adh894l7l06hg78v';
//     const mockServiceUsuarioCriptografia = defineMock(
//       usuarioCriptografia,
//       'criptografaTexto',
//       hashSenha
//     );
//     const mockServiceUsuario = defineMock(
//       usuarioService,
//       'buscarUsuarioPorEmailSenha',
//       usuario[0]
//     );

//     const authUsuarioResposta = await authUsuarioService.validaUsuario(
//       usuario[0].email,
//       usuario[0].senha
//     );
//     const { senha, ...restUsuario } = usuario[0];
//     expect(authUsuarioResposta).toMatchObject(restUsuario);

//     expect(mockServiceUsuarioCriptografia.mock.calls).toHaveLength(1);
//     expect(mockServiceUsuarioCriptografia.mock.calls[0][0]).toBe(senha);
//     expect(mockServiceUsuario.mock.calls).toHaveLength(1);
//     expect(mockServiceUsuario.mock.calls[0][0]).toBe(usuario[0].email);
//   });

//   it('Erro - ao validar usuario', async () => {
//     let hashSenha = '43u7d89adh82adh894l7l06hg78v';
//     const mockServiceUsuarioCriptografia = defineMock(
//       usuarioCriptografia,
//       'criptografaTexto',
//       hashSenha
//     );
//     const mockServiceUsuario = defineMock(
//       usuarioService,
//       'buscarUsuarioPorEmailSenha',
//       undefined
//     );

//     try {
//       await authUsuarioService.validaUsuario(
//         usuario[0].email,
//         usuario[0].senha
//       );
//     } catch (error) {
//       expect(error.message).toBe('Não autorizado');
//     }

//     expect(mockServiceUsuarioCriptografia.mock.calls).toHaveLength(1);
//     expect(mockServiceUsuario.mock.calls).toHaveLength(1);
//   });

//   it('Login usuario', async () => {
//     let token = '12345678910';
//     const mockService = defineMock(jwtService, 'sign', () => token);

//     const { senha, ...dadosUsuario } = usuario[0];
//     const usuarioResposta = await authUsuarioService.loginUsuario(dadosUsuario);

//     expect(usuarioResposta).toMatchObject({
//       token,
//       idUsuario: dadosUsuario.idUsuario,
//       nome: dadosUsuario.nome,
//       email: dadosUsuario.email,
//       permissoes: dadosUsuario.permissoes || []
//     });

//     expect(mockService.mock.calls).toHaveLength(1);
//   });

//   it('Erro - Login com usuario invalido', async () => {
//     let token = '12345678910';
//     const mockService = defineMock(jwtService, 'sign', () => token);

//     const { senha, ...dadosUsuario } = usuario[0];

//     try {
//       await authUsuarioService.loginUsuario(undefined);
//     } catch (error) {
//       expect(error.message).toBe('Não autorizado');
//     }

//     expect(mockService.mock.calls).toHaveLength(0);
//   });
// });
