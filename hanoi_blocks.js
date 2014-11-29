'use strict';


Blockly.Blocks['base'] = {
  init: function() {
    this.setPreviousStatement(false);

    this.setColour(210);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("****")
        .appendField("Base", "block_label")
        .appendField("****")

    this.setNextStatement(true, ["disk1", "disk2", "disk3"]);

    this.setDeletable(false);
    this.setMovable(false);
  }
};


Blockly.Blocks['disk3'] = {
  init: function() {
    this.setPreviousStatement(true, ['disk3']);

    this.setColour(120);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("*** 3 ***");

    this.setNextStatement(true, ['disk1', 'disk2']);

    this.setDeletable(false);
  }
};


Blockly.Blocks['disk2'] = {
  init: function() {
    this.setPreviousStatement(true, ['disk2']);

    this.setColour(120);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("** 2 **");

    this.setNextStatement(true, ['disk1']);

    this.setDeletable(false);
  }
};


Blockly.Blocks['disk1'] = {
  init: function() {
    this.setPreviousStatement(true, ['disk1']);

    this.setColour(120);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("* 1 *");

    this.setNextStatement(false);

    this.setDeletable(false);
  },

  checkGameOver: function() {
    var rootBlock;
    var block = this;
    var pathLength = -1;
    do {
        rootBlock = block;
        block = rootBlock.parentBlock_;
        pathLength++;
    } while (block);
    
    if(rootBlock.getFieldValue( 'block_label' )=='Finish' && pathLength==3) {   // FIXME: the magic constant is the number of disks in the game
        alert('Game over, well done!');
    }
  }
};

