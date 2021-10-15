export class Resource<T> {
  private resource: T;
  private safeResource: Partial<T>;
  private readonly defaultPropsToHide: string[] = [
    'id',
    'createdAt',
    'updatedAt',
  ];

  constructor(resource: T) {
    this.resource = resource;
    this.safeResource = {};
  }

  safe(propsToHide: string[] = this.defaultPropsToHide): Partial<T> {
    if (!Array.isArray(propsToHide)) {
      throw new Error('Invalid arg, should be an array');
    }

    for (const key of Object.keys(this.resource)) {
      if (!propsToHide.includes(key)) {
        this.safeResource[key] = this.resource[key];
      }
    }

    return this.safeResource;
  }

  unsafe(): T {
    return this.resource;
  }
}
