const MOCKED_USERS = [
  'oleks@gmail.com'
]


export class Api {
  public async login(data: { email: string, password: string }): Promise<void> {
    console.log('login', data);

    if (!MOCKED_USERS.indexOf(data.email)) {
      throw new Error('No user found');
    }
  }
}