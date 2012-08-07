
var restHttp = require('RESThttp');

var headerUtil = restHttp.httpHeaderUtil;
var headerKeys = headerUtil.keys;
var responseUtil = restHttp.responseUtil;
var fileResponses = restHttp.fileResponses;

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
