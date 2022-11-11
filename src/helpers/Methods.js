/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/

export default function ArrayDefineMethod(method) {
  if(method === 'insert') {
    Array.prototype.insert = function ( index, item ) {
      this.splice( index, 0, item );
    };
  }
}