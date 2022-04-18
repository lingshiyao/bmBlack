import * as THREE from '../api/three/three.min'
import {OBJLoader} from '../api/three/jsm/loaders/OBJLoader.js';
// import {OrbitControls} from '../api/three/jsm/controls/OrbitControls'
import {OrbitControlsOld} from "../api/three/jsm/controls/OrbitControlsOld";

//console.log(OBJLoader)

const {windowWidth, windowHeight, pixelRatio,} = wx.getSystemInfoSync();
let canvas, scene, renderer, camera, controls;

export default (_canvas) => {
    canvas = _canvas;

    canvas.width = windowWidth * pixelRatio;
    canvas.height = windowHeight * pixelRatio;

    // 适配点击事件
    canvas.clientHeight = canvas.height
    canvas.clientWidth = canvas.width;

    // 防止threejs报错，本意是修改canvas的style上的属性，即视图窗口大小
    canvas.style = {}
    canvas.style.width = windowWidth * pixelRatio;
    canvas.style.height = windowHeight * pixelRatio;

    initRenender(); // 初始化渲染器
    initCamera(); // 初始化相机
    initScene(); // 初始化场景
    initLight(); // 初始化光线
    initaxesHelper(); // 辅助坐标
    initGeometrys() // 初始化物体
    initControl();

    /**
     * 初始化渲染器
     */
    function initRenender() {
        renderer = new THREE.WebGLRenderer({
            canvas,
        });
        renderer.setClearColor(0xffe4c4, 1)
        renderer.outputEncoding = THREE.sRGBEncoding; //
        renderer.toneMapping = THREE.ReinhardToneMapping; // 色彩映射
        renderer.toneMappingExposure = 3; // 色调映射的曝光级别
    }

    /**
     * 初始化相机
     */
    function initCamera() {
        camera = new THREE.PerspectiveCamera(
            60,
            canvas.width / canvas.height,
            1,
            1000
        );
        camera.position.set(100, 100, 100);
        camera.lookAt(0, 0, 0);
    }

    /**
     * 初始化场景
     */
    function initScene() {
        scene = new THREE.Scene();
    }

    /**
     * 初始化辅助坐标
     */
    function initaxesHelper() {
        //辅助线 红色x轴 蓝色z轴 绿色y轴
        const axesHelper = new THREE.AxesHelper(100);
        scene.add(axesHelper);
    }

    /**
     * 初始化物体
     */
    async function initGeometrys() {
        const material = new THREE.MeshStandardMaterial();
        new OBJLoader()
            .load("https://cdn.jsdelivr.net/gh/lingshiyao/shutulian/1511/1511.obj", (group) => {
                ////console.log("load success")
                const textureLoader = new THREE.TextureLoader(undefined, canvas)
                material.roughness = 1;
                material.metalness = 1;
                material.map = textureLoader.load(
                    "https://cdn.jsdelivr.net/gh/lingshiyao/shutulian/1511/1Image1.jpg",
                    render
                );
                material.map.encoding = THREE.sRGBEncoding;
                material.map.wrapS = THREE.RepeatWrapping;

                group.traverse(function (child) {
                    if (child.isMesh) {
                        child.material = material;
                    }
                });
                scene.add(group);
            })
    }

    /**
     * 初始化灯光
     */
    function initLight() {
        const direLight = new THREE.DirectionalLight(0xffffff, 1.0);
        direLight.position.set(100, 300, 100)
        scene.add(direLight);
        // const light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
        // scene.add(light);
    }

    function initControl() {
        controls = new OrbitControlsOld(camera, renderer.domElement);
        //是否可以缩放
        // controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        controls.enableRotate = false;
        // controls.addEventListener('change', render);
    }

    /**
     * 渲染函数
     */
    function render() {
        renderer.render(scene, camera)
        controls.update();
        canvas.requestAnimationFrame(() => {
            render()
        });
    }

    render()
}