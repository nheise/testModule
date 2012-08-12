
var restHttp = require('RESThttp');

var queryString = require('querystring');

var headerUtil = restHttp.httpHeaderUtil;
var headerKeys = headerUtil.keys;
var responseUtil = restHttp.responseUtil;
var contextUtil = restHttp.contextUtil;
var fileResponses = restHttp.fileResponses;

var foo = "hallo";

restHttp.modules.put( {
  id : 'testModule',
  resourceLocators : [
    {
      uriPattern : '/testModule',
      methods : {
        GET : {
          'text/html' : fileResponses.createStreamFileResponse( function( context ) { return 'index.html'; } )
        }
      }
    },
    {
      uriPattern : '/testModule/forms',
      methods : {
        GET : {
          'text/html' : fileResponses.createStreamFileResponse( function( context ) { return 'POST_normal_PUT_via_AJAX.html'; } )
        },
        POST : {
          'text/html' : function( context ) {
            context.requestListener.on( 'data', function( chunk ) {
console.log(chunk.toString());
              foo = queryString.parse(chunk.toString()).foo;
            });
            context.requestListener.on( 'end', function() {
              contextUtil.prepare303( context, 'http://nheise.net/testModule/forms/p1' );
              responseUtil.send303( context );
            });
          }
        }
      }
    },
    {
      uriPattern : '/testModule/forms/p1',
      methods : {
        GET : {
          'text/html' : function( context ) {
            contextUtil.prepare200( context, '<p> P1 say\'s ' + foo  + '</p>' );
            responseUtil.send200( context );
          }
        },
        PUT : {
          'text/html' : function( context ) { 
console.log(context.request.data);
            foo = queryString.parse( context.request.data ).foo;
            responseUtil.send200( context );
          },
          'application/json' : function( context ) {
            context.requestListener.on( 'data', function( chunk ) {
console.log(chunk.toString());
              foo = queryString.parse(chunk.toString()).foo;
            });
            context.requestListener.on( 'end', function() {
              contextUtil.prepare200( context, JSON.stringify( { 'foo' : foo } ) );
              responseUtil.send200( context );
            });
          }
        }
      }
    },
    {
      uriPattern : '/testModule/image/{filename}',
      methods : {
        GET : {
          'image/*' : fileResponses.createStreamFileResponse( function( context ) { return 'image/' + context.request.args.filename; } ),
          '*/*' : fileResponses.createStreamFileResponse( function( context ) { return 'image/' + context.request.args.filename; } )
        }
      }
    },
    {
      uriPattern : '/testModule/css/{filename}',
      methods : {
        GET : {
          'text/css' : fileResponses.createStreamFileResponse( function( context ) { return 'css/' + context.request.args.filename; } ),
          '*/*' : fileResponses.createStreamFileResponse( function( context ) { return 'css/' + context.request.args.filename; } )
        }
      }
    },
    {
      uriPattern : '/testModule/js/{filename}',
      methods : {
        GET : {
          '*/*' : fileResponses.createStreamFileResponse( function( context ) { return 'js/' + context.request.args.filename; } )
        }
      }
    },
    {
      uriPattern : '/testModule/video/{filename}',
      methods : {
        GET : {
          'video/ogg' : fileResponses.createStreamFileResponse( function( context ) { return 'video/' + context.request.args.filename; } ),
          'video/mp4' : fileResponses.createStreamFileResponse( function( context ) { return 'video/' + context.request.args.filename; } ),
          '*/*' : fileResponses.createStreamFileResponse( function( context ) { return 'video/' + context.request.args.filename; } )
        }
      }
    },
    {
      uriPattern : '/testModule/json',
      methods : {
        GET : {
          'application/json' : function( context ) { responseUtil.send200( context, JSON.stringify( { status : 'JSON test passed.' } ) ); } 
        }
      }
    }
  ]
});

restHttp.createServer( { name : 'testModule', ip : 'localhost', port : 4321 } );
