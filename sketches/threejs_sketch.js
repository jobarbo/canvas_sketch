// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');
require('three/examples/js/geometries/RoundedBoxGeometry.js');
require('three/examples/js/loaders/RGBELoader.js');
require('three/examples/js/postprocessing/EffectComposer.js');
require('three/examples/js/postprocessing/RenderPass.js');
require('three/examples/js/postprocessing/ShaderPass.js');
require('three/examples/js/postprocessing/UnrealBloomPass.js');
require('three/examples/js/shaders/LuminosityHighPassShader.js');
require('three/examples/js/shaders/CopyShader.js');

const canvasSketch = require('canvas-sketch');

const settings = {
	animate: true,
	dimensions: [3600, 3600],
	units: 'px',
	// Get a WebGL canvas rather than 2D
	context: 'webgl',
	// Turn on MSAA
	attributes: {antialias: true},
};

const sketch = ({context, width, height}) => {
	// Create a renderer
	const renderer = new THREE.WebGLRenderer({
		context,
	});

	// WebGL background color
	renderer.setClearColor(0x1f1e1c, 1);

	// Setup a camera
	const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
	camera.position.set(0, 0, 5);

	// Setup camera controller
	const controls = new THREE.OrbitControls(camera, context.canvas);

	// Setup your scene
	const scene = new THREE.Scene();

	const bloomRadius = 1.13;
	const bloomStrength = 0.55;
	const bloomThreshold = 0.15;

	const renderPass = new THREE.RenderPass(scene, camera);
	const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(width, height), bloomStrength, bloomRadius, bloomThreshold);

	const composer = new THREE.EffectComposer(renderer);
	composer.addPass(renderPass);
	composer.addPass(bloomPass);

	const hdrEquirect = new THREE.RGBELoader().load('/media/images/empty_warehouse_01_4k.hdr', () => {
		hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
	});

	const bgTexture = new THREE.TextureLoader().load('/media/images/duality.png');
	const bgGeometry = new THREE.PlaneGeometry(15, 15);
	const bgMaterial = new THREE.MeshBasicMaterial({map: bgTexture});
	const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
	bgMesh.position.set(0, 0, -1);
	scene.add(bgMesh);

	const textureLoader = new THREE.TextureLoader();
	const normalMapTexture = textureLoader.load('/media/images/normal.jpeg');
	normalMapTexture.wrapS = THREE.RepeatWrapping;
	normalMapTexture.wrapT = THREE.RepeatWrapping;
	normalMapTexture.repeat.set(1, 1);

	const geometry = new THREE.SphereGeometry(1, 120, 120);
	const material = new THREE.MeshPhysicalMaterial({roughness: 0.04, transmission: 1, thickness: 4, envMap: hdrEquirect, envMapIntensity: 0.2, clearcoat: 0.1, clearcoatRoughness: 0.1, normalScale: new THREE.Vector2(0.05), normalMap: normalMapTexture, clearcoatNormalMap: normalMapTexture, clearcoatNormalScale: new THREE.Vector2(0.05)});

	const MESH_COUNT = 1;
	const mesh = new THREE.InstancedMesh(geometry, material, MESH_COUNT);
	scene.add(mesh);

	const matrixDummy = new THREE.Object3D();

	const instanceData = [...Array(MESH_COUNT)].map(() => {
		const position = new THREE.Vector3(0, 0, 1);
		const rotation = new THREE.Euler(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);

		const axis = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);

		const BASE_SCALE = 1;
		const scale = 1;

		const rotateTime = 5 + 15 * Math.random();

		return {
			position,
			rotation,
			axis,
			scale: new THREE.Vector3(scale, scale, scale),
			rotateTime,
		};
	});
	const updateInstances = (deltaTime) => {
		for (let i = 0; i < MESH_COUNT; i++) {
			const data = instanceData[i];

			matrixDummy.position.copy(data.position);
			matrixDummy.scale.copy(data.scale);
			matrixDummy.quaternion.setFromEuler(data.rotation);
			matrixDummy.rotateOnWorldAxis(data.axis, deltaTime / data.rotateTime);
			data.rotation.copy(matrixDummy.rotation);

			matrixDummy.updateMatrix();
			mesh.setMatrixAt(i, matrixDummy.matrix);
		}
		mesh.instanceMatrix.needsUpdate = true;
	};
	// Specify an ambient/unlit colour
	scene.add(new THREE.AmbientLight('#59314f'));

	// Add some light
	const light = new THREE.DirectionalLight(0xfff0dd, 1);
	light.position.set(0, 5, 10);
	scene.add(light);

	const update = (time, deltaTime) => {
		updateInstances(deltaTime);
	};
	// draw each frame
	return {
		// Handle resize events here
		resize({pixelRatio, viewportWidth, viewportHeight}) {
			const dpr = Math.min(pixelRatio, 2);
			renderer.setPixelRatio(pixelRatio);
			renderer.setSize(viewportWidth, viewportHeight);

			composer.setPixelRatio(dpr);
			composer.setSize(viewportWidth, viewportHeight);

			camera.aspect = viewportWidth / viewportHeight;
			camera.updateProjectionMatrix();
		},
		// Update & render your scene here
		render({time, deltaTime}) {
			update(time, deltaTime);
			renderer.render(scene, camera);

			composer.render();
		},
		// Dispose of events & renderer for cleaner hot-reloading
		unload() {
			controls.dispose();
			renderer.dispose();
		},
	};
};

canvasSketch(sketch, settings);
