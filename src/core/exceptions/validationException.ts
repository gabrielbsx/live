export class ValidationError extends Error {
  issues: string[] = [];

  constructor(errors: string[]) {
    super(errors.join());
    errors.map((error) => this.issues.push(error));
  }
}
