export class StandardResponse<T> {
  isSuccess: boolean;
  errorMessage: string;
  timestamp: Date;
  responseIdentifier: string;
  payload: T | null;

  constructor() {
    this.isSuccess = false;
    this.errorMessage = '';
    this.timestamp = new Date();
    this.responseIdentifier = this.generateUUID();
    this.payload = null;
  }

  private generateUUID(): string {
    // Replace this with your UUID generation logic, or you can use a library like uuid.js
    return 'GeneratedUUIDHere';
  }
}
