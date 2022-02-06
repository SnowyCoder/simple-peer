const common = require('./common')
const { Peer, config } = common;
const test = require('tape')

test('duplex stream: send data before "connect" event', function (t) {
  t.plan(1)
  t.timeoutAfter(20000)

  const peer1 = new Peer({ config, initiator: true })
  const peer2 = new Peer({ config })
  peer1.on('signal', function (data) { if (!peer2.destroyed) peer2.signal(data) })
  peer2.on('signal', function (data) { if (!peer1.destroyed) peer1.signal(data) })

  peer1.write('abc')

  peer1.on('data', function () {
    t.fail('peer1 should not get data')
  })

  peer2.on('data', function (chunk) {
    t.equal(chunk, 'abc', 'got correct message')
  })
})

test('duplex stream: send data one-way', function (t) {
  t.plan(1)
  t.timeoutAfter(20000)

  const peer1 = new Peer({ config, initiator: true })
  const peer2 = new Peer({ config })
  peer1.on('signal', function (data) { peer2.signal(data) })
  peer2.on('signal', function (data) { peer1.signal(data) })
  peer1.on('connect', tryTest)
  peer2.on('connect', tryTest)

  function tryTest () {
    if (!peer1.connected || !peer2.connected) return

    peer1.on('data', function () {
      t.fail('peer1 should not get data')
    })

    peer2.on('data', function (chunk) {
      t.equal(chunk, 'abc', 'got correct message')
    })

    peer1.send('abc')
  }
})
