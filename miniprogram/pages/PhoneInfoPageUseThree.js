import * as THREE from '../api/three/three.min'
import {OBJLoader} from '../api/three/jsm/loaders/OBJLoader.js';
import {OrbitControlsOld} from '../api/three/jsm/controls/OrbitControlsOld'
import {ModalCache} from "../api/ModalCache";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";

const RESOURCE_URL = 'https://cdn.zhisonggang.com/threejs/examples/models/obj/cerberus/'

const {pixelRatio,} = wx.getSystemInfoSync();
let canvas, scene, renderer, camera, controls;
let cube;

export default (_canvas, id, width, height) => {
    canvas = _canvas;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    // 适配点击事件
    canvas.clientHeight = canvas.height
    canvas.clientWidth = canvas.width;

    // 防止threejs报错，本意是修改canvas的style上的属性，即视图窗口大小
    canvas.style = {}
    canvas.style.width = width * pixelRatio;
    canvas.style.height = height * pixelRatio;

    initRenender(); // 初始化渲染器
    initCamera(); // 初始化相机
    initScene(); // 初始化场景
    initControl(); // 初始化控制器
    initLight(); // 初始化光线
    initGeometrys() // 初始化物体

    /**
     * 初始化渲染器
     */
    function initRenender() {
        renderer = new THREE.WebGLRenderer({
            canvas,
        });
        renderer.setClearColor(0x000000, 0)
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
        const length = 55;
        camera.position.set(1 * length, 0.2 * length, 1 * length);
        camera.lookAt(0, 0, 0);
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
        controls = new OrbitControlsOld(camera, renderer.domElement);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
        controls.enableRotate = false;
    }

    async function initGeometrys() {
        const material = new THREE.MeshStandardMaterial();

        let jpgPath = ImgPathUtils.getJpg(id);
        let objPath = ImgPathUtils.getObj(id);
        let jpgCachePath = await ModalCache.getPath(jpgPath);
        if (jpgCachePath == null)
            jpgCachePath = jpgPath
        const objCachePath = await ModalCache.getPath(objPath);

        const onLoad = (group) => {
            const textureLoader = new THREE.TextureLoader(undefined, canvas)
            material.roughness = 1;
            material.metalness = 1;
            material.map = textureLoader.load(
                jpgCachePath,
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
        }

        if (objCachePath == null) {
            new OBJLoader()
                .load(objPath, onLoad)
        } else {
            new OBJLoader()
                .loadLocal(objCachePath, onLoad)
        }
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

    /**
     * 渲染函数
     */
    function render() {
        renderer.render(scene, camera)
        controls.update()
        canvas.requestAnimationFrame(() => {
            render()
        });
    }

    render()
}