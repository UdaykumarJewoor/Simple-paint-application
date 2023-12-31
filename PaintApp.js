
			// Get canvas element and 2D context
			var canvas = document.getElementById("canvas");
			var ctx = canvas.getContext("2d");

			// Track mouse position and whether mouse is down
			var mouseX;
			var mouseY;
			var isMouseDown = false;
			var circleIndex = -1;

			// Array to store circles
			var circles = [];

			// Event listener for mouse down
			canvas.addEventListener("mousedown", function (event) {
				isMouseDown = true;
				mouseX = event.offsetX;  //this event is because of mouse button moved to be down
				mouseY = event.offsetY;	//when event occurs the function sets mouse down true
				circleIndex = -1;		// and stores the mouse position in mouseX and mouseY
				for (var i = 0; i < circles.length; i++) {
					var dx = circles[i].x - mouseX;
					var dy = circles[i].y - mouseY;
					var distance = Math.sqrt(dx * dx + dy * dy);
					if (distance < circles[i].radius) {
						circleIndex = i;
						break;
					}
				}
			});

			// Event listener for mouse up
			canvas.addEventListener("mouseup", function (event) {
				isMouseDown = false; // this time mouse down is false
				if (circleIndex == -1) {    //mouse button to be pressed up
					var dx = event.offsetX - mouseX;
					var dy = event.offsetY - mouseY;
					var radius = Math.sqrt(dx * dx + dy * dy);
					circles.push(new Circle(mouseX, mouseY, radius));// push into circle array
				}	// the created circle pushes into the circle arraay
			});

			// Event listener for mouse move
			canvas.addEventListener("mousemove", function (event) {
				if (isMouseDown) {
					if (circleIndex != -1) {
						circles[circleIndex].x = event.offsetX;
						circles[circleIndex].y = event.offsetY;
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						for (var i = 0; i < circles.length; i++) {
							ctx.fillStyle = circles[i].color;
							ctx.beginPath();
							ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, 2 * Math.PI);
							ctx.closePath();
							ctx.fill();
						}	//  this event checks whether the mouse is hovering the circle or not
					}		// if it is function updte the position of the circle
					else {		// If it is not then function calculate the radius of circle that should drawn on the canvas
						var dx = event.offsetX - mouseX;
						var dy = event.offsetY - mouseY;
						var radius = Math.sqrt(dx * dx + dy * dy);
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						for (var i = 0; i < circles.length; i++) {
							ctx.fillStyle = circles[i].color;
							ctx.beginPath();
							ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, 2 * Math.PI);
							ctx.closePath();
							ctx.fill();
						}
						ctx.fillStyle = getRandomColor();
						ctx.beginPath();
						ctx.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
						ctx.closePath();
						ctx.fill();
					}
				}
				else {
					var hit = false;
					for (var i = 0; i < circles.length; i++) {
						var dx = circles[i].x - event.offsetX;
						circles[i].x - event.offsetX;
						var dy = circles[i].y - event.offsetY;
						var distance = Math.sqrt(dx * dx + dy * dy);
						if (distance < circles[i].radius) {
							hit = true; 	//
							break;
						}
					}
					if (hit) {
						document.getElementById("message").textContent = "Hit";
					}
					else {
						document.getElementById("message").textContent = "Miss";
					}
				}
			});
			// Event listener for double click
			canvas.addEventListener("dblclick", function (event) {
				for (var i = 0; i < circles.length; i++) {
					var dx = circles[i].x - event.offsetX;
					var dy = circles[i].y - event.offsetY;
					var distance = Math.sqrt(dx * dx + dy * dy);
					if (distance < circles[i].radius) {
						circles.splice(i, 1);
						break;
					}
				}
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				for (var i = 0; i < circles.length; i++) {
					ctx.fillStyle = circles[i].color;
					ctx.beginPath();
					ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fill();
				}
			});

			// Event listener for reset button
			document.getElementById("reset").addEventListener("click", function () {
				circles = [];
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			});

			// Circle object
			function Circle(x, y, radius) {
				this.x = x;
				this.y = y;
				this.radius = radius;
				this.color = getRandomColor();
			}

			// Function to generate random color
			function getRandomColor() {
				var letters = "0123456789ABCDEF";
				var color = "#";
				for (var i = 0; i < 6; i++) {
					color += letters[Math.floor(Math.random() * 16)];
				}
				return color;
			}