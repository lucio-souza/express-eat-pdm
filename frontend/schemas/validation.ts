import Z from 'zod'

export const loginSchema = Z.object({
    email: Z
        .string()
        .email("Formato de e-mail inválido")
        .nonempty("Email é obrigatório"),

    senha: Z
        .string()
        .min(4, "A senha deve ter no minimo 4 caracteres")
        .nonempty("A senha é obrigatória")
});

export const cadastroSchema = Z.object({
    email: Z
    .string()
    .email("Formato de e-mail inválido")
    .nonempty("Email é obrigatório"),

    senha: Z
    .string()
    .min(4, "A senha deve ter no minimo 4 caracteres")
    .nonempty("A senha é obrigatória"),

    nome: Z
    .string()
    .nonempty("Nome é obrigatório"),

    cpf: Z
    .string()
    .min(11,"o cpf deve ter 11 caracteres")
    .max(11,"o cpf deve ter 11 caracteres")
    .nonempty("Cpf é obrigatório"),

    idade: Z
    .number()
    .nonnegative("Idade não pode ser negativa")
})