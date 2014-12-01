/**
 * @fileoverview In this file we override some core behavioural patterns of Blockly.
 * @author lg4@ebi.ac.uk (Leo Gordon)
 */

'use strict';


    // this override records the previous parent of the block being dragged:
var original_disconnect = Blockly.Connection.prototype.disconnect;

Blockly.Connection.prototype.disconnect = function() {

    var otherConnection = this.targetConnection;
    var childBlock  = this.isSuperior() ? otherConnection.sourceBlock_ : this.sourceBlock_;
    var parentBlock = this.isSuperior() ? this.sourceBlock_ : otherConnection.sourceBlock_;

    original_disconnect.call(this);

        // record the block that will be unfrozen when the child under the cursor will be docked somewhere else:
    childBlock.prevParent = parentBlock;
};


    // this override performs all steps necessary after docking:
var original_connect = Blockly.Connection.prototype.connect;

Blockly.Connection.prototype.connect = function(otherConnection) {

    original_connect.call(this, otherConnection);

    var childBlock  = this.isSuperior() ? otherConnection.sourceBlock_ : this.sourceBlock_;
    var parentBlock = this.isSuperior() ? this.sourceBlock_ : otherConnection.sourceBlock_;

        // freeze the new parent:
    if(parentBlock.type != 'base') {
        parentBlock.setMovable(false);
        parentBlock.setColour(180);
    }
        // unfreeze the former parent attached to another base:
    var prevParent = childBlock.prevParent;
    if(prevParent && prevParent!=parentBlock && prevParent.type!='base') {
        prevParent.setMovable(true);
        prevParent.setColour(120);
    }

    if(childBlock.checkGameOver) {
        childBlock.checkGameOver.call(childBlock);
    }
};


    // this override makes it impossible to drop a block without docking it:
var original_onMouseUp_ = Blockly.Block.prototype.onMouseUp_;

Blockly.Block.prototype.onMouseUp_ = function(e) {
    if(Blockly.selected && Blockly.highlightedConnection_) {
        original_onMouseUp_.call(this, e);
    }
};


    // this override prevents the block being dragged to bind to one of the "busy" connections inside a statement stack:
var original_onMouseMove_ = Blockly.Block.prototype.onMouseMove_;

Blockly.Block.prototype.onMouseMove_ = function(e) {
    original_onMouseMove_.call(this, e);

    if(Blockly.highlightedConnection_) {
        if(Blockly.highlightedConnection_.targetConnection != null) {
            Blockly.highlightedConnection_.unhighlight();
            Blockly.highlightedConnection_ = null;
        }
    }
};

