export interface RegisterPayload {
  nome: string;
  documento: string;
  email: string;
  telefone?: string;
  senha: string;
}

export const authService = {
  async register(data: RegisterPayload): Promise<{ success: boolean; message: string }> {
    console.log('Dados recebidos no cadastro:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Cadastro realizado com sucesso!' });
      }, 1000);
    });
  },

  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    console.log('Solicitação de recuperação para:', email);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: 'Se o e-mail estiver cadastrado, você receberá as instruções em instantes.' 
        });
      }, 1000);
    });
  },

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    console.log('Redefinindo senha com token:', token, 'Nova senha:', newPassword);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Sua senha foi redefinida com sucesso!' });
      }, 1000);
    });
  }
};