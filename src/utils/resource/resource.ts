export const defaultPropsToHide: string[] = ['id', 'password', 'createdAt', 'updatedAt'];

export class Resource<T> {
  private resource: T;
  private safeResource: Partial<T>;

  constructor(resource: T) {
    this.resource = resource;
    this.safeResource = {};
  }

  safe(propsToHide: string[] = defaultPropsToHide): Partial<T> {
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
