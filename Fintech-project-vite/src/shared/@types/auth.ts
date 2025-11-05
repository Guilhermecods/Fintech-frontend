export interface UserInfo {
    ativo: string;
    vlSaldo: number;
    nmUsuario: string;
    nrTelefone: string;
    cdUsuario?: number;
    dtNascimento: string;
}

export interface Authentication {
    email: string;
    senha: string;
    cdUsuario?: number;
}