// Import sketch objects
import Stalagmite from './stalagmite.js';
import * as dat from 'dat.gui';
const palettes = require('nice-color-palettes/1000.json');
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 300;
const vertical = 12 * 300;

const gui = new dat.GUI({closed: true});

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	//duration: 30,
	//fps: 60,
	animate: true,
	attributes: {
		antialias: true,
	},
};

window.preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	noSmooth();
	colorMode(HSB, 360, 100, 100, 100);
	rectMode(CENTER);
	angleMode(DEGREES);

	const bgColor = color(190, 20, 15);
	background(bgColor);

	// Stalagmites
	const stalagNum = 15;
	let stalagList = [];
	let xSteps = width / (stalagNum + 1);
	let xPos = xSteps;
	let yPos;
	let yDir = -1;
	let stalagHue = 10;
	let stalagSat = 10;
	let stalagBright = 0;

	for (let i = 0; i < stalagNum; i++) {
		if (i % 2 == 0) {
			yPos = -250;
			yDir = 1;
		} else {
			yPos = height + 250;
			yDir = -1;
		}
		stalagList[i] = new Stalagmite(xPos, yPos, 300, yDir, stalagHue, stalagSat, stalagBright);
		xPos += xSteps;
	}

	//Cave
	let caveBrightness = 1;
	let cavePosX = width / 2;
	let cavePosY = height / 2;
	let caveSpeed = 100;
	let vertexMovement = 150;

	let pos1 = createVector(-width / 2, 0);
	let pos2 = createVector(-width / 2, -height / 2);
	let pos3 = createVector(0, -height / 2);
	let pos4 = createVector(width / 2, -height / 2);
	let pos5 = createVector(width / 2, 0);
	let pos6 = createVector(width / 2, height / 2);
	let pos7 = createVector(0, height / 2);
	let pos8 = createVector(-width / 2, height / 2);
	translate(width / 2, height / 2);

	for (let caveWidth = 1; caveWidth > 0; caveWidth += -0.01) {
		stroke(0, 0, caveBrightness);
		fill(0, 0, caveBrightness);
		//ellipse(cavePosX, cavePosY, caveWidth);
		scale(caveWidth);

		beginShape();
		curveVertex(pos8.x, pos8.y);
		curveVertex(pos1.x, pos1.y);
		curveVertex(pos2.x, pos2.y);
		curveVertex(pos3.x, pos3.y);
		curveVertex(pos4.x, pos4.y);
		curveVertex(pos5.x, pos5.y);
		curveVertex(pos6.x, pos6.y);
		curveVertex(pos7.x, pos7.y);
		curveVertex(pos8.x, pos8.y);
		curveVertex(pos1.x, pos1.y);
		endShape();
		pos1.x += random(-vertexMovement, vertexMovement);
		pos1.y += random(-vertexMovement, vertexMovement);
		pos2.x += random(-vertexMovement, vertexMovement);
		pos2.y += random(-vertexMovement, vertexMovement);
		pos3.x += random(-vertexMovement, vertexMovement);
		pos3.y += random(-vertexMovement, vertexMovement);
		pos4.x += random(-vertexMovement, vertexMovement);
		pos4.y += random(-vertexMovement, vertexMovement);
		pos5.x += random(-vertexMovement, vertexMovement);
		pos5.y += random(-vertexMovement, vertexMovement);
		pos6.x += random(-vertexMovement, vertexMovement);
		pos6.y += random(-vertexMovement, vertexMovement);
		pos7.x += random(-vertexMovement, vertexMovement);
		pos7.y += random(-vertexMovement, vertexMovement);
		pos8.x += random(-vertexMovement, vertexMovement);
		pos8.y += random(-vertexMovement, vertexMovement);
		caveBrightness = caveBrightness * 1.19;
		cavePosX += random(-caveSpeed, caveSpeed);
		cavePosY += random(-caveSpeed, caveSpeed);
		caveSpeed = caveSpeed * 0.985;
	}

	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		exporting = true;
		for (let i = 0; i < stalagNum; i++) {
			stalagList[i].display();
			stalagList[i].move();
		}
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
