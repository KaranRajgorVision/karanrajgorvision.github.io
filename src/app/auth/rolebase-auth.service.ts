import { Injectable, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RolebaseAuthService implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  getDecodedAccessToken(token: any) {
    try {
      const decodeToken = jwt_decode(token) as { role: string[] };
      return decodeToken;
    } catch (error) {
      console.error('JWT decode error:', error);
      return null;
    }
  }
}
