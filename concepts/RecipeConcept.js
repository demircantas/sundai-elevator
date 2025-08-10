// RecipeConcept: encapsulates a scene or object configuration as a reusable recipe
export class RecipeConcept {
  constructor() {
    this.objects = [];
    this.params = {};
  }
  load({ data }) {
    this.objects = data.objects || [];
    this.params = data.params || {};
    return { recipe: this };
  }
  save() {
    return { data: { objects: this.objects, params: this.params } };
  }
  update({ data }) {
    Object.assign(this, data);
    return { recipe: this };
  }
  interpolate({ recipeA, recipeB, t }) {
    return { recipe: recipeA };
  }
}
