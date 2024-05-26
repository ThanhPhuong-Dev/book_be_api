export class UserDataModel {
  "User-ID": number;
  "Location"?: string;
  "Age"?: number;

  constructor(obj: UserDataModel) {
    this["User-ID"] = obj["User-ID"];
    this["Location"] = "Viet Nam";
    this["Age"] = 20;
  }
}
