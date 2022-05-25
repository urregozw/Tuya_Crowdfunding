export class ObjectMethod {

  public static deepCopy(obj: any) {
      let copy: any;

      if (null == obj || 'object' !== typeof obj) { return obj; }

      if (obj instanceof Date) {
          copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
      }

      if (obj instanceof Array) {
          copy = [];
          for (let i = 0, len = obj.length; i < len; i++) {
              copy[i] = this.deepCopy(obj[i]);
          }
          return copy;
      }

      if (obj instanceof Object) {
          copy = {};
          for (const attr in obj) {
              if (obj.hasOwnProperty(attr)) { copy[attr] = this.deepCopy(obj[attr]); }
          }
          return copy;
      }
  }
}
