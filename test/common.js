const { Peer } = require('../dist')

exports.Peer = Peer;
exports.config = {
  bundlePolicy: 'max-bundle',
  iceCandidatePoolsize: 1,
}

// For testing on node, we must provide a WebRTC implementation

// create a test MediaStream with two tracks
let canvas
exports.getMediaStream = function () {
  if (!canvas) {
    canvas = document.createElement('canvas')
    canvas.width = canvas.height = 100
    canvas.getContext('2d') // initialize canvas
  }
  const stream = canvas.captureStream(30)
  stream.addTrack(stream.getTracks()[0].clone()) // should have 2 tracks
  return stream
}

exports.isBrowser = function (name) {
  return typeof (window) !== 'undefined';
}
