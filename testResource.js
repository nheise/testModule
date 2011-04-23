/**
 * [heisemedia] 2011
 */

var mediaType = require("../lib/MediaType.js");
var uriPattern = require("../lib/URIPattern.js");

var responseLoader = require('../lib/ResponseLoader.js').responseLoader;

exports.resources = [ {
    uriPattern : uriPattern.create( '/test/{id}' ),
    'GET' : {
        'text/html' : loadIndex
    }
}, {
    uriPattern : uriPattern.create( '/test/image/{filename}' ),
    'GET' : {
        'image/png' : responseLoader[mediaType.IMAGE_PNG]
    }
}, {
    uriPattern : uriPattern.create( '/test/css/{filename}' ),
    'GET' : {
        'text/css' : responseLoader[mediaType.TEXT_CSS]
    }
}, {
    uriPattern : uriPattern.create( '/test/js/{filename}' ),
    'GET' : {
        'text/javascript' : responseLoader[mediaType.TEXT_JAVASCRIPT],
        '*/*' : responseLoader[mediaType.TEXT_JAVASCRIPT]
    }
}, {
    uriPattern : uriPattern.create( '/test/video/{filename}' ),
    'GET' : {
        'video/ogg' : responseLoader[mediaType.VIDEO_OGG],
        'text/html' : responseLoader[mediaType.VIDEO_OGG]
    }
} ];

//var path = require('path');

var response = require('../lib/Response.js');

var FILE_PATH = './resources';

function loadIndex(req, res, args) {
    console.log('receive id:' + args.id);
    
    var fileResponse = responseLoader[  mediaType.TEXT_HTML]();
    
    fileResponse.onContent( function( header, data, encoding ) {
        response.send200(res, header, data, encoding);
    } );
    
    fileResponse.loadData( FILE_PATH + '/test/index.html' );
}