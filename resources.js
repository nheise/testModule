/**
 * [heisemedia] 2011
 */

var mediaType = require("../../lib/MediaType.js");
var uriPattern = require("../../lib/URIPattern.js");

var responseLoader = require('../../lib/ResponseLoader.js').responseLoader;

var resourceFactory = require("../../lib/ResourceFactory.js");

var indexResource = resourceFactory.createResource( '/testResource/{id}' );
indexResource.addMediaTypeAndResponseLoaderForRequestMethodGET( mediaType.TEXT_HTML, loadIndex );

var imageResource = resourceFactory.createResource( '/testResource/image/{filename}' );
imageResource.addMediaTypeAndResponseLoaderForRequestMethodGET( mediaType.IMAGE_PNG, responseLoader[mediaType.IMAGE_PNG] );
imageResource.addMediaTypeAndResponseLoaderForRequestMethodGET( mediaType.ALL, responseLoader[mediaType.IMAGE_PNG] );

var cssResource = resourceFactory.createResource( '/testResource/css/{filename}' );
cssResource.addMediaTypeAndResponseLoaderForRequestMethodGET( mediaType.TEXT_CSS, responseLoader[mediaType.TEXT_CSS] );

var jsResource = resourceFactory.createResource( '/testResource/js/{filename}' );
jsResource.addMediaTypeAndResponseLoaderForRequestMethodGET( mediaType.TEXT_JAVASCRIPT, responseLoader[mediaType.TEXT_JAVASCRIPT] );
jsResource.addMediaTypeAndResponseLoaderForRequestMethodGET( mediaType.ALL, responseLoader[mediaType.TEXT_JAVASCRIPT] );

var videoResource = resourceFactory.createResource( '/testResource/video/{filename}' );
videoResource.addMediaTypeAndResponseLoaderForRequestMethodGET( mediaType.VIDEO_OGG, responseLoader[mediaType.VIDEO_OGG] );
videoResource.addMediaTypeAndResponseLoaderForRequestMethodGET( mediaType.TEXT_HTML, responseLoader[mediaType.VIDEO_OGG] );
videoResource.addMediaTypeAndResponseLoaderForRequestMethodGET( mediaType.VIDEO_MP4, responseLoader[mediaType.VIDEO_MP4] );
videoResource.addMediaTypeAndResponseLoaderForRequestMethodGET( mediaType.ALL, responseLoader[mediaType.VIDEO_MP4] );

exports.resources = [         
    indexResource,
    imageResource,
    cssResource,
    jsResource,
    videoResource
];


//var path = require('path');

var RESOURCE_PATH = require( '../../Configuration.js' ).RESOURCE_PATH;

function loadIndex( request, response ) {
    console.log( 'receive id:' + request.args.id );

    var fileResponse = responseLoader[mediaType.TEXT_HTML]( response.header );

    fileResponse.onContent( function( data, encoding ) {
        response.send200( data, encoding );
    } );

    fileResponse.loadData( RESOURCE_PATH + '/testResource/index.html' );
}