/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const should = require('chai').should();
const { hiscores, ge } = require('../index');

describe('getPlayer', () => {
  it('should return player object', async () => {
    const boaty = await hiscores.getPlayer('b0aty');
    should.exist(boaty);
    boaty.should.be.an('object');
  });

  it('should throw RSN must be of type string', async () => {
    try {
      await hiscores.getPlayer(50);
    } catch (err) {
      should.exist(err);
      err.message.should.equal('RSN must be of type string');
    }
  });

  it('should throw RSN must be 12 or less characters long', async () => {
    try {
      await hiscores.getPlayer('over 12 characters long string');
    } catch (err) {
      should.exist(err);
      err.message.should.equal('RSN must be less or equal to 12 characters');
    }
  });

  it('should throw Invalid game mode', async () => {
    try {
      await hiscores.getPlayer('rsn', 'invalidgamemode');
    } catch (err) {
      should.exist(err);
      err.message.should.equal('Invalid game mode');
    }
  });

  it('should throw invalid RSN error', async () => {
    try {
      await hiscores.getPlayer('ççd3[ras~ç');
    } catch (err) {
      should.exist(err);
      err.message.should.equal('Player not found! Check RSN or game mode.');
    }
  });
});

describe('Grand Exchange API', () => {
  describe('getItem', () => {
    it('should return item object', async () => {
      const item = await ge.getItem(10);

      should.exist(item);
      item.should.be.an('object');
    });

    it('should throw Invalid item id', async () => {
      try {
        await ge.getItem('invalid item id');
      } catch (err) {
        should.exist(err);
        err.message.should.equal('Invalid item id');
      }
    });
  });

  describe('getGraph', () => {
    it('should return item graph object', async () => {
      const item = await ge.getGraph(10);

      should.exist(item);
      item.should.be.an('object');
    });

    it('should throw Invalid item id', async () => {
      try {
        await ge.getGraph('invalid item id');
      } catch (err) {
        should.exist(err);
        err.message.should.equal('Invalid item id');
      }
    });
  });
});
