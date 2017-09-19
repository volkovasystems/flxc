
const assert = require( "assert" );
const flxc = require( "./flxc.js" );

assert.equal( flxc( "./test", true ), process.cwd( ), "should be equal" );

console.log( "ok" );
