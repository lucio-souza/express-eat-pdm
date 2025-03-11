import UserController from '../src/controller/UserController';
import UserRepository from '../src/repositories/UserRepository';
import { Request, Response } from 'express';

// Mocking the repository methods
jest.mock('../src/repositories/UserRepository');

describe('UserController Tests', () => {
  
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { params: {}, body: {}, ID: 'user-id' };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
  });

  // 1. Test listAllUsers (Success)
  it('should list all users successfully', async () => {
    UserRepository.getAllUsers = jest.fn().mockResolvedValue({ usuarios: [], status: 200 });

    await UserController.listAllUsers(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  // 2. Test listAllUsers (Failure)
  it('should return an error when listing all users fails', async () => {
    UserRepository.getAllUsers = jest.fn().mockResolvedValue({ message: 'Erro', status: 400, error: 'Some error' });

    await UserController.listAllUsers(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro', erro: 'Some error' });
  });

  // 3. Test listUserByEmail (Success)
  it('should list user by email successfully', async () => {
    req.params!.email = 'test@example.com';
    UserRepository.getUserByEmail = jest.fn().mockResolvedValue({ usuario: { email: 'test@example.com' }, status: 200 });

    await UserController.listUserByEmail(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  // 4. Test listUserByEmail (User Not Found)
  it('should return 404 when user is not found by email', async () => {
    req.params!.email = 'test@example.com';
    UserRepository.getUserByEmail = jest.fn().mockResolvedValue({ message: 'Usuario inexistente', status: 404 });

    await UserController.listUserByEmail(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario inexistente', erro: undefined });
  });

  // 5. Test registerUser (Success)
  it('should register a user successfully', async () => {
    req.body = { nome: 'Test', email: 'test@example.com', idade: 25, localizacao: {}, senha: '123456', cpf: '12345678900' };
    UserRepository.createUser = jest.fn().mockResolvedValue({ usuario: { email: 'test@example.com' }, status: 201 });

    await UserController.registerUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  // 6. Test registerUser (Failure)
  it('should return error when user registration fails', async () => {
    req.body = { nome: 'Test', email: 'test@example.com', idade: 25, localizacao: {}, senha: '123456', cpf: '12345678900' };
    UserRepository.createUser = jest.fn().mockResolvedValue({ message: 'Erro ao criar usuario', status: 400, error: 'Some error' });

    await UserController.registerUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar usuario', erro: 'Some error' });
  });

  // 7. Test editUser (Success)
  it('should update user successfully', async () => {
    req.body = { nome: 'Test', idade: 26, localizacao: {}, senha: 'newpass' };
    UserRepository.updateUser = jest.fn().mockResolvedValue({ usuarioAtualizado: { nome: 'Test' }, status: 200 });

    await UserController.editUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ nome: 'Test' });
  });

  // 8. Test editUser (User Not Found)
  it('should return 404 when user is not found on update', async () => {
    req.body = { nome: 'Test', idade: 26, localizacao: {}, senha: 'newpass' };
    UserRepository.updateUser = jest.fn().mockResolvedValue({ message: 'Usuario inexistente', status: 404 });

    await UserController.editUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario inexistente', erro: undefined });
  });

  // 9. Test eraseUser (Success)
  it('should delete user successfully', async () => {
    UserRepository.deleteUser = jest.fn().mockResolvedValue({ usuarios: [], status: 200 });

    await UserController.eraseUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  // 10. Test eraseUser (User Not Found)
  it('should return 400 when trying to delete a non-existent user', async () => {
    UserRepository.deleteUser = jest.fn().mockResolvedValue({ message: 'Usuario inexistente', status: 404 });

    await UserController.eraseUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario inexistente', erro: undefined });
  });

});
