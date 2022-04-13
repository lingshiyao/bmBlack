import * as THREE from '../api/three/three.min'
import { OBJLoader } from '../api/three/jsm/loaders/OBJLoader.js';
import { OrbitControls } from '../api/three/jsm/controls/OrbitControls'
import {ModalCache} from "../api/ModalCache";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";

const RESOURCE_URL = 'https://cdn.zhisonggang.com/threejs/examples/models/obj/cerberus/'

const { windowWidth, windowHeight, pixelRatio, } = wx.getSystemInfoSync();
let canvas, scene, renderer, camera, controls;
let cube;

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
    initControl(); // 初始化控制器
    initLight(); // 初始化光线
    initaxesHelper(); // 辅助坐标
    initGeometrys() // 初始化物体
    initGeometrys1();

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
        // controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        controls.enableRotate = false;
        // controls.addEventListener('change', render);
    }

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
    async function initGeometrys() {
        const material = new THREE.MeshStandardMaterial();
        // let obj = await ModalCache.getRes(ImgPathUtils.getObj("5b44c7f078104e9fa3ac129cf87c5780"));
        // let obj = ImgPathUtils.getObj("5b44c7f078104e9fa3ac129cf87c5780");
        // let obj = "https://cdn.jsdelivr.net/gh/lingshiyao/shutulian/1511/1511.obj"

        //b5333420b52e413f9966ae28e1d103f4
        const model = await ModalCache.getModel(ImgPathUtils.getMedia("b5333420b52e413f9966ae28e1d103f4"), "b5333420b52e413f9966ae28e1d103f4");
        console.log(model)

        let obj = await ModalCache.getRes2("https://cdn.jsdelivr.net/gh/lingshiyao/shutulian/1511/1511.obj", "obj");
        //console.log("a1", obj)
        // let jpg = await ModalCache.getRes(ImgPathUtils.getJpg("5b44c7f078104e9fa3ac129cf87c5780"));
        // let jpg = ImgPathUtils.getJpg("5b44c7f078104e9fa3ac129cf87c5780");
        // let jpg = "https://cdn.jsdelivr.net/gh/lingshiyao/shutulian/1511/1Image1.jpg"
        let jpg = await ModalCache.getRes("https://cdn.jsdelivr.net/gh/lingshiyao/shutulian/1511/1Image1.jpg", "jpg");
        //console.log("b", jpg)
        new OBJLoader()
            .load("https://cdn.jsdelivr.net/gh/lingshiyao/shutulian/1511/1511.obj", ( group ) => {
                //console.log("load success")
                const textureLoader = new THREE.TextureLoader(undefined, canvas)
                material.roughness = 1;
                material.metalness = 1;
                material.map = textureLoader.load(
                    model.jpg,
                    render
                );
                material.map.encoding = THREE.sRGBEncoding;
                material.map.wrapS = THREE.RepeatWrapping;

                group.traverse( function ( child ) {
                    ////console.log('child', child.isMesh)
                    if ( child.isMesh ) {
                        child.material = material;
                    }
                } );
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

    /**
     * 渲染函数
     */
    function render() {
        renderer.render(scene, camera)
        controls.update()
        // ////console.log("render")
        canvas.requestAnimationFrame(()=>{
            render()
        });
    }

    function initGeometrys1() {
        const cubeGeo = new THREE.BoxGeometry(30, 30, 30);
        //创建材质，设置材质为基本材质（不会反射光线，设置材质颜色为绿色）
        const mat = new THREE.MeshBasicMaterial({ color: 0xfca745 });
        //创建Cube的Mesh对象
        cube = new THREE.Mesh(cubeGeo, mat);
        //设置Cube对象的位置
        cube.position.set(0, 0, -100);
        //将Cube加入到场景中
        scene.add(cube);
    }

    render()
}