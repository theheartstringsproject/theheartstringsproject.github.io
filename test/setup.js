var JsDom = require('jsdom');

global.document = JsDom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

require('./test.bundle.js');