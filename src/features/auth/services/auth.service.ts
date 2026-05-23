import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { User } from 'src/database/models/user';
import { ResponseApi } from 'src/utils/models/responseApi.model';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async findAll(companyId: string): Promise<ResponseApi<User[] | null>> {
    if (!companyId) {
      return {
        statusCode: 400,
        message: 'Company ID is required',
        data: null,
      };
    }
    return await this.authRepository
      .findAll(companyId)
      .then(([data, count]: [User[], number]) => {
        return {
          statusCode: 200,
          message: 'Users found',
          data,
          count,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while fetching users: ' + error.message,
          data: null,
        };
      });
  }

  async login(user: Partial<User>): Promise<ResponseApi<User | null>> {
    if (!user || !user.email || !user.password) {
      return {
        statusCode: 400,
        message: 'Email and password are required',
        data: null,
      };
    }

    return await this.authRepository
      .login(user)
      .then((data: User | null) => {
        if (!data) {
          return {
            statusCode: 401,
            message: 'Invalid email or password',
            data: null,
          };
        }
        return {
          statusCode: 200,
          message: 'Login successful',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred during login: ' + error.message,
          data: null,
        };
      });
  }

  async register(user: RegisterDto): Promise<ResponseApi<User | null>> {
    if (
      !user ||
      !user.email ||
      !user.password ||
      !user.name ||
      !user.role ||
      !user.companyId
    ) {
      return {
        statusCode: 400,
        message: 'All fields are required',
        data: null,
      };
    }
    return await this.authRepository
      .register(user)
      .then((data: User) => {
        return {
          statusCode: 200,
          message: 'User registered successfully',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred during registration: ' + error.message,
          data: null,
        };
      });
  }
}
