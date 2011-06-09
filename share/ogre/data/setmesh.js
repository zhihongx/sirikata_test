sirikata.ui(
    'SetMesh',
    function() {
        $('<div id="set-mesh-ui" title="SetMesh">' +             // (1)
          '  <button id="set-mesh-button">Set Mesh!</button>' +
          '</div>').appendTo('body');

        var window = new sirikata.ui.window(                     // (2)
           "#set-mesh-ui",
           {
              width: 100,
              height: 'auto'
           }
        );

        sirikata.ui.button('#set-mesh-button').click(setMesh);   // (3)

        function setMesh() {                                     // (4)
            sirikata.event("setmesh", "meerkat:///test/cube.dae/original/0/cube.dae");
        }
    }
);