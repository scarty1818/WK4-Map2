require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/Camera",
  "esri/widgets/Home",
  "esri/widgets/Legend",
  "esri/widgets/LayerList", // Corrected the order and included LayerList
  "dojo/domReady!"
], function(WebScene, SceneView, Camera, Home, Legend, LayerList) { // Corrected the parameters order

  var scene = new WebScene({
    portalItem: {
      id: "8046207c1c214b5587230f5e5f8efc77"
    }
  });

  var view = new SceneView({
    container: "viewDiv",
    map: scene,
    camera: new Camera({
      position: [
        -71.060217, // lon
        42.382655,  // lat
        2500        // elevation in meters
      ],
      tilt: 45,
      heading: 180
    })
  });

  view.when(function() {
    // Get the first layer in the collection of operational layers in the WebScene
    // when the resources in the SceneView have loaded.
    var featureLayer = scene.layers.getItemAt(1);

    var legend = new Legend({
      view: view,
      layerInfos: [{
        layer: featureLayer,
        title: "Major project buildings"
      }]
    });

    var layerList = new LayerList({
      view: view
    });

    // Adding both Legend and LayerList to the UI
    view.ui.add(legend, "bottom-right");
    view.ui.add(layerList, "top-right"); // Position can be adjusted as needed
  });

  var homeBtn = new Home({
    view: view
  });
  // Add the home button to the top left corner of the view
  view.ui.add(homeBtn, "top-left");
});
