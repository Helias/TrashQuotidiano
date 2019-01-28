(function () {
  'use strict';

  let app = angular.module('TrashQuotidiano', ['ngSanitize', 'ui.select', 'ui.bootstrap']);
	app.controller('MainController', function($scope) {

    $scope.memes = { name:"TrashQuotidiano", url:"img/TrashQuotidiano.png" };

    $scope.disabled = undefined;
    $scope.pre_text = "C'è poco da stare allegri";
    $scope.title1_text = "Calano fatturato e pil";
    $scope.title2_text = "Ma aumentano i meme";

    $scope.pre_font_size = 80;
    $scope.title_font_size = 140;

    /* create canvas */
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let width = 1200 * 0.8, height = 675 * 0.8;

    ctx.clearRect(0, 0, width, height);
    canvas.width = width;
    canvas.height = height;
    canvas.style = "display:block; margin: 0 auto";

    canvas.id = 'myCanvas';
    document.getElementsByClassName("canvas")[0].appendChild(canvas);
    /* end create canvas */

    $scope.addText = () => {
    	let ctx = document.getElementById("myCanvas").getContext("2d");

      let img = document.getElementById("current_image");
    	ctx.drawImage(img, 0, 0, width, height);

      $scope.drawText(ctx, $scope.pre_text, width/2, height/2.5, "rgb(192, 30, 37)", $scope.pre_font_size);
      $scope.drawText(ctx, $scope.title1_text, width/2, height/1.7, "rgb(35, 31, 32)", $scope.title_font_size);
      $scope.drawText(ctx, $scope.title2_text, width/2, height/1.2, "rgb(35, 31, 32)", $scope.title_font_size);
    };

    // load image on canvas
    let current_image = document.getElementById("current_image");
    current_image.onload = () => { $scope.addText(); };

    $scope.drawText = (ctx, text, x, y, fillStyle, fontSize) => {
    	ctx.fillStyle = fillStyle;
    	ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "0.5em";
    	ctx.lineWidth = 1;
    	// ctx.strokeStyle = "#000";

      ctx.font = fontSize + "px URW Impact W01 Bold Condensed";
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
