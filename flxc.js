"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "flxc",
			"path": "flxc/flxc.js",
			"file": "flxc.js",
			"module": "flxc",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/flxc.git",
			"test": "flxc-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Flatten and run multi-line executable shell script file.
	@end-module-documentation

	@include:
		{
			"child": "child_process",
			"depher": "depher",
			"falzy": "falzy",
			"kept": "kept",
			"pedon": "pedon",
			"protype": "protype",
			"shft": "shft"
		}
	@end-include
*/

const child = require( "child_process" );
const depher = require( "depher" );
const detr = require( "detr" );
const falzy = require( "falzy" );
const gnaw = require( "gnaw" )
const kept = require( "kept" );
const lire = require( "lire" );
const pedon = require( "pedon" );
const protype = require( "protype" );
const shft = require( "shft" );

const DEFAULT_SHELL_INTERPRETER = process.env.DEFAULT_SHELL_INTERPRETER || ( ( ) => {
	if( pedon.WINDOWS ){
		return process.env.ComSpec;

	}else{
		return "/bin/bash";
	}
} )( );

const EXECUTABLE_SCRIPT_FILE_EXTENSION_PATTERN = /\.(?:sh|cmd)$/;

const flxc = function flxc( script, shell, synchronous, option ){
	/*;
		@meta-configuration:
			{
				"script:required": "string",
				"shell": "string",
				"synchronous": "boolean",
				"option": "object"
			}
		@end-meta-configuration
	*/

	if( falzy( script ) || !protype( script, STRING ) ){
		throw new Error( "invalid script file" );
	}

	if( !EXECUTABLE_SCRIPT_FILE_EXTENSION_PATTERN.test( script ) ){
		if( pedon.WINDOWS ){
			script = `${ script }.cmd`;

		}else{
			script = `${ script }.sh`;
		}
	}

	let parameter = shft( arguments );

	shell = depher( parameter, STRING, DEFAULT_SHELL_INTERPRETER );

	synchronous = depher( parameter, BOOLEAN, false );

	option = detr( parameter, { "cwd": process.cwd( ), "env": process.env, "shell": shell } );

	if( synchronous ){
		if( kept( script, EXECUTE, true ) ){
			try{
				return gnaw( lire( script, true ).replace( /\^\s*$|\\\s*$|\n+/gm, " " ), true, option );

			}catch( error ){
				throw new Error( `cannot execute script file, ${ error.stack }` );
			}

		}else{
			throw new Error( "cannot execute script file" );
		}

	}else{
		throw new Error( "non-synchronous version not currently supported" );
	}
};

module.exports = flxc;
