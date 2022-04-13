import * as THREE from '../api/three/three.min'
import { OrbitControls } from '../api/three/jsm/controls/OrbitControls'

const { windowWidth, windowHeight, pixelRatio, } = wx.getSystemInfoSync();
let canvas, scene, renderer, camera, controls;

export default (_canvas) => {
    canvas = _canvas;
    // 设置画布大小
    canvas.width = windowWidth * pixelRatio;
    canvas.height = windowHeight * pixelRatio;

    // 适配点击事件
    canvas.clientHeight = canvas.height
    canvas.clientWidth = canvas.width;

    // 防止threejs报错，本意是修改canvas的style上的属性，即视图窗口大小，但微信小程序不支持. threejs和其它文件中有使用这个属性
    canvas.style = {}
    canvas.style.width = windowWidth * pixelRatio;
    canvas.style.height = windowHeight * pixelRatio;

    initRenender(); // 初始化渲染器
    initCamera(); // 初始化相机
    initScene(); // 初始化场景
    initControl(); // 初始化控制器
    initLight(); // 初始化光线
    initaxesHelper(); // 辅助坐标
    initGeometrys() // 初始化物体
    initOthers(); // 初始化其他参数

    /**
     * 初始化渲染器
     */
    function initRenender() {
        renderer = new THREE.WebGLRenderer({
            canvas,
        });
        // renderer.setClearColor(0x7fffd4, 1)
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
        camera.up.set(0, 1, 0); // 设置相机对象的上方向是哪个轴
        camera.position.set(100,100,100);
        camera.lookAt(0,0,0);
    }

    /**
     * 初始化场景
     */
    function initScene() {
        scene = new THREE.Scene();
    }

    /**
     * 渲染控制器
     */
    function initControl() {
        controls = new OrbitControls(camera, renderer.domElement);
        //是否可以缩放
        controls.enableZoom = true;
        controls.addEventListener('change', render);
    }

    /**
     * 初始化灯光
     */
    function initLight() {}

    /**
     * 初始化辅助坐标
     */
    function initaxesHelper() {
        //辅助线 红色x轴 蓝色z轴 绿色y轴
        const axesHelper = new THREE.AxesHelper(100);
        scene.add( axesHelper );
    }

    /**
     * 初始化物体
     */
    function initGeometrys() {
        const cubeGeo = new THREE.BoxGeometry(20, 20, 20);
        const texture = new THREE.TextureLoader(undefined, canvas).load( '../api/three/textures/crate.gif' );
        const mat = new THREE.MeshBasicMaterial({ map: texture });
        const cube = new THREE.Mesh(cubeGeo, mat);
        cube.position.set(0, 0, 0);
        scene.add( cube );
        // 异步
        setTimeout(() => {
            render()
        }, 200)
    }

    /**
     * 设置其它参数
     */
    function initOthers() {}

    /**
     * 设置动画
     */
    function animation() {}

    /**
     * 渲染函数
     */
    function render() {
        renderer.render(scene, camera)
    }

    render()
}