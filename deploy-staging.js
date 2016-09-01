/* eslint-disable no-console */
var FtpDeploy = require('ftp-deploy');
var fd = new FtpDeploy();

var config = {
  username: 'webdemo',
  password: 'we890-mo', // optional, prompted if none given
  host: 'webdemo.dac.co.jp',
  port: 21,
  localRoot: __dirname + '/demo',
  remoteRoot: '/public_html/scrollstop/',
  exclude: ['']
};

fd.deploy(config, function(err){
  'use strict';
  if(err){
    console.log(err);
  }else{
    console.log('finished');
  }
});
