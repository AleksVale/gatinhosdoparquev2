export type ApplicationErrorCode = 'bad_request' | 'conflict' | 'not_found' | 'unauthorized';

export class ApplicationError extends Error {
  constructor(
    public readonly code: ApplicationErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}
