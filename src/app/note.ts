export default class Note {
   constructor(
      public filePath:string,
      public etag:string,
      public fileName:string = null,
      public name: string = null
   ) {
      if (!fileName) {
         this.fileName = decodeURI(this.filePath.split('/').pop());
      }

      if (!name) {
         this.name = decodeURI(this.fileName.replace('.md', ''));
      }
   }
}
