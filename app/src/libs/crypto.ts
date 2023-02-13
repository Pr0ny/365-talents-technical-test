import bcrypt from "bcryptjs";

class Crypto {

  #saltRound = 10

  get rounds(): number {
    return this.#saltRound
  }

  set rounds(rounds: number) {
    this.#saltRound = rounds
  }

  async generateHash(data: string): Promise<string> {
    return await bcrypt.hash(data, this.rounds);
  }

  async compareHash(data: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(data, hash);
    } catch (error) {
      return false;
    }
  }

}

export { Crypto };
