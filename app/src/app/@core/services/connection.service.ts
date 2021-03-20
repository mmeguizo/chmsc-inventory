import { Injectable } from '@angular/core';

@Injectable()
export class ConnectionService {

  //localhost development
  //public domain: String = "http://localhost:3000";

  // if deployed online
  public domain: String = "";
}

