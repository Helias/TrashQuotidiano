(function () {
  'use strict';

  let app = angular.module('TrashQuotidiano', ['ngSanitize', 'ui.select', 'ui.bootstrap']);
	app.controller('MainController', function($scope) {

    $scope.memes = { name:"TrashQuotidiano", url:"img/TrashQuotidiano.png" };

    $scope.disabled = undefined;
    $scope.text = '';
    $scope.font_size = 80;

    /* create canvas */
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let width = 1200, height = 675;

    ctx.clearRect(0, 0, width, height);
    canvas.width = width;
    canvas.height = height;

    ctx.scale(width/1200, height/675);

    canvas.id = 'myCanvas';
    document.getElementsByClassName("canvas")[0].appendChild(canvas);
    /* end create canvas */

    $scope.addText = () => {
    	let ctx = document.getElementById("myCanvas").getContext("2d");

      let img = document.getElementById("current_image");
    	ctx.drawImage(img, 0, 0, 1200, 675);

      $scope.drawText(ctx, $scope.text, 1200/2, 525);
    };

    // load image on canvas
    let current_image = document.getElementById("current_image");
    current_image.onload = () => { $scope.addText(); };

    $scope.drawText = (ctx, text, x, y) => {
//    	text = text.toUpperCase();
    	ctx.fillStyle = "#231f20";
    	ctx.textAlign = "center";
    	ctx.textBaseline = "middle";
    	ctx.lineWidth = 1;
    	ctx.strokeStyle = "#000";

      ctx.font = $scope.font_size + "px Impact";
    	ctx.strokeText(text, x, y);
    	ctx.fillText(text, x, y);
    };

    $scope.addText();

    $scope.create = () => {
       let uri = document.getElementById('myCanvas').toDataURL("image/png");
       downloadImage(uri, "TrashQuotidiano.png");
    }

    /* Save the img */
    function downloadImage(uri,name) {
    	let link = document.createElement('a');
    	link.setAttribute("href", uri);
    	link.setAttribute('download', name);

    	if (document.createEvent) {
    		let event = document.createEvent('MouseEvents');
    		event.initEvent('click', true, true);
    		link.dispatchEvent(event);
    	}
    	else
    		link.click();
    }

	});

}());
