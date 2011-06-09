

system.require('std/shim/restore/persistService.em');


var toPersist = new Object();

toPersist.a = 'a';
toPersist.b = 'b';
toPersist.c = {
    'm':'m',
    'd': toPersist
};

//printing first object graph.
system.print('\ncycled graph\n');
system.prettyprint(toPersist);

//performing persist
var fName = 'btestPartialPersist3.em.bu';
var nameServe = std.persist.checkpointPartialPersist(toPersist,fName);


var id = nameServe.lookupName(toPersist);

//restoring object from file
var newCopy = std.persist.restoreFrom(fName,id);
system.print('\nAfter restore\n');
system.prettyprint(newCopy);


// // //deleting cycle
// delete toPersist.c;
// system.print('\nAfter delete\n');
// system.prettyprint(toPersist);


// // //re-printing object.
// system.print('\nAfter second restore\n');
// system.prettyprint(newCopy);
