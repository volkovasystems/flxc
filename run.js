#!/usr/bin/env node

/*;
	@run-module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
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
	@end-run-module-license

	@run-module-configuration:
		{
			"package": "flxc",
			"path": "flxc/run.js",
			"file": "run.js",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/flxc.git",
			"shell": "flxc",
			"command": "execute",
			"parameter": [ "script" ]
		}
	@end-run-module-configuration

	@run-module-documentation:
		Run module for the flxc module.
	@end-run-module-documentation

	@include:
		{
			"path": "path",
			"yargs": "yargs"
		}
	@end-include
*/

const path = require( "path" );
const pedon = require( "pedon" );
const yargs = require( "yargs" );

const DEFAULT_SHELL_INTERPRETER = process.env.DEFAULT_SHELL_INTERPRETER || ( ( ) => {
	if( pedon.WINDOWS ){
		return process.env.ComSpec;

	}else{
		return "/bin/bash";
	}
} )( );

const flxc = require( path.resolve( __dirname, "flxc" ) );
const package = require( path.resolve( __dirname, "package.json" ) );

const parameter = yargs
	.epilogue( ( package.homepage )?
		`For more information go to, ${ package.homepage }` :
		"Please read usage and examples carefully." )

	.usage( `Usage: ${ package.option.shell } execute <script>` )

	.command( "execute <script>",
		"Execute shell script file using default bash environment." )

	.demand( 1, [ "script" ] )

	.example( "$0 execute ./.install",
		"Execute '.install.*' using a shell environment based on platform" )

	.option( "sh", {
		"alias": "shell",
		"default": DEFAULT_SHELL_INTERPRETER,
		"describe": "Base shell command interpreter to be used, defaults to bash.",
		"type": "string"
	} )

	.help( "help" )

	.version( function version( ){
		return package.version;
	} )

	.wrap( null )

	.strict( )

	.argv;

flxc( parameter.script, parameter.shell, true, { "stdio": [ 0, 1, 2 ] } );
