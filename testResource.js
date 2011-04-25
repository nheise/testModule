/**
 * [heisemedia] 2011
 */

var mediaType = require("../../lib/MediaType.js");
var uriPattern = require("../../lib/URIPattern.js");

var responseLoader = require('../../lib/ResponseLoader.js').responseLoader;

exports.resources = [ {
    uriPattern : uriPattern.create( '/testResource/{id}' ),
    'GET' : {
        'text/html' : loadIndex
    }
}, {
    uriPattern : uriPattern.create( '/testResource/image/{filename}' ),
    'GET' : {
        'image/png' : responseLoader[mediaType.IMAGE_PNG],
        '*/*' : responseLoader[mediaType.IMAGE_PNG]
    }
}, {
    uriPattern : uriPattern.create( '/testResource/css/{filename}' ),
    'GET' : {
        'text/css' : responseLoader[mediaType.TEXT_CSS]
    }
}, {
    uriPattern : uriPattern.create( '/testResource/js/{filename}' ),
    'GET' : {
        'text/javascript' : responseLoader[mediaType.TEXT_JAVASCRIPT],
        '*/*' : responseLoader[mediaType.TEXT_JAVASCRIPT]
    }
}, {
    uriPattern : uriPattern.create( '/testResource/video/{filename}' ),
    'GET' : {
        'video/ogg' : responseLoader[mediaType.VIDEO_OGG],
        'text/html' : responseLoader[mediaType.VIDEO_OGG],
        'video/mp4' : responseLoader[mediaType.VIDEO_MP4],
        '*/*' : responseLoader[mediaType.VIDEO_MP4]
    }
} ];

//var path = require('path');

var response = require('../../lib/Response.js');

var RESOURCE_PATH = require('../../Configuration.js').RESOURCE_PATH;

function loadIndex(req, res, args) {
    console.log('receive id:' + args.id);
    
    var fileResponse = responseLoader[  mediaType.TEXT_HTML]();
    
    fileResponse.onContent( function( header, data, encoding ) {
        response.send200(res, header, data, encoding);
    } );
    
    fileResponse.loadData( RESOURCE_PATH + '/testResource/index.html' );
}