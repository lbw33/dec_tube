const { assert } = require('chai')

const DecTube = artifacts.require('../src/contracts/Dectube.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('DecTube', ([deployer, author]) => {
  let dectube

  before(async () => {
    dectube = await DecTube.deployed()
  })
  
  describe('deployment', async() => {
    it('deploys sucessfully', async () => {
      const address = await dectube.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await dectube.name()
      assert.equal(name, 'DecTube')
    })

    it('has an initial video count of zero', async () => {
      const videocount = await dectube.videoCount()
      assert.equal(videocount, 0)
    })
  })

  describe('uploading a video', async () => {
    let result, videoCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

    before(async () => {
      result = await dectube.uploadVideo(hash, 'Video Title', { from: author })
      videoCount = await dectube.videoCount()
    })

    it('increases videoCount on creation of video', async () =>  {
      assert.equal(videoCount, 1)
    })

    it('records the correct video information', async () => {
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), videoCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'hash is correct')
      assert.equal(event.title, 'Video Title', 'video title is correct')
      assert.equal(event.author, author, 'author is correct')
    })

    it('will fail if video not given a hash', async () => {
      await dectube.uploadVideo('', 'Video Title', {from: author }).should.be.rejected
    })

    it('will fail if video not given a title', async () => {
      await dectube.uploadVideo('Video Hash', '', {from: author }).should.be.rejected
    })
  })

  describe('lists a video', async () => {
    let result, videoCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

    before(async () => {
      result = await dectube.uploadVideo(hash, 'Video Title', { from: author })
      videoCount = await dectube.videoCount()
    })

    it('should include the correct information', async () => {
      const video = await dectube.videos(videoCount)
      assert.equal(video.id.toNumber(), videoCount.toNumber(), 'id is correct')
      assert.equal(video.hash, hash, 'hash is correct')
      assert.equal(video.title, 'Video Title', 'video title is correct')
      assert.equal(video.author, author, 'author is correct')
    })
  })
  
})