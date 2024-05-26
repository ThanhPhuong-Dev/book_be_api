export class RatingModel {
  userID: number;
  ISBN: string;
  rating: number;

  constructor(obj: RatingModel) {
    this.userID = obj.userID;
    this.ISBN = obj.ISBN;
    this.rating = obj.rating;
  }
}
