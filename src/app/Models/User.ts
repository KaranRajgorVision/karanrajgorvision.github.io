export interface UserList {
  userid: number;
  FullName: string;
  Username: string;
  Email: string;
  RoleId: number;
  Role: string;
  FileLink: string;
}

export interface AcceptRejectHistoricalUserDataFile {
  historicalUserDataId: number;
  isApprove: boolean;
}
