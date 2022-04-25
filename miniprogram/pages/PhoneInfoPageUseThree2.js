import * as THREE from '../api/three/three.min'
import {OBJLoader} from '../api/three/jsm/loaders/OBJLoader.js';
import {OrbitControlsOld} from '../api/three/jsm/controls/OrbitControlsOld'
import {ImgPathUtils} from "../api/utils/ImgPathUtils";
import {MTLLoader} from "../api/three/jsm/loaders/MTLLoader";
import {ModalCache} from "../api/ModalCache";

const RESOURCE_URL = 'https://cdn.zhisonggang.com/threejs/examples/models/obj/cerberus/'

const {pixelRatio} = wx.getSystemInfoSync();
let canvas, scene, renderer, camera, controls;
let cube;

export default (_canvas, id, width, height, func) => {
    canvas = _canvas;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.clientHeight = canvas.height
    canvas.clientWidth = canvas.width;
    canvas.style = {}
    canvas.style.width = width * pixelRatio;
    canvas.style.height = height * pixelRatio;

    initRenender();
    initCamera();
    initScene();
    initControl();
    initLight();
    initGeometrys();

    function initRenender() {
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias:true,
        });
        renderer.setClearColor(0x000000, 0)
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(width, height);
    }

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
        // const pointLight = new THREE.PointLight(0xffffff, 0.8);
        // camera.add(pointLight);
    }

    function initScene() {
        scene = new THREE.Scene();
    }

    function initControl() {
        controls = new OrbitControlsOld(camera, renderer.domElement);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
        controls.enableRotate = false;
    }

    async function initGeometrys() {
        let mtlPath = ImgPathUtils.getMtl(id);
        let jpgPath = ImgPathUtils.getJpg(id);
        let objPath = ImgPathUtils.getObj(id);
        let jpgCachePath = await ModalCache.getPath(jpgPath);
        if (jpgCachePath == null)
            jpgCachePath = jpgPath
        const mtlCachePath = await ModalCache.getPath(mtlPath);
        const objCachePath = await ModalCache.getPath(objPath);
        const onMTLLoad = async (material) => {
            material.preload();
            const onObjLoad = (object) => {
                // loadsycces
                func();
                scene.add(object);
            }
            if (objCachePath == null) {
                new OBJLoader().setMaterials(material)
                    .load(objPath, onObjLoad)
            } else {
                new OBJLoader().setMaterials(material)
                    .loadLocal(objCachePath, onObjLoad)
            }
        }
        if (mtlCachePath == null) {
            new MTLLoader(undefined, canvas, jpgCachePath).load(mtlPath, onMTLLoad)
        } else {
            new MTLLoader(undefined, canvas, jpgCachePath).loadLocal(mtlCachePath, onMTLLoad)
        }
    }

    /**
     * 初始化灯光
     */
    function initLight() {
        const ambientLight = new THREE.AmbientLight(0x404040);
        // const ambientLight = new THREE.AmbientLight();
        scene.add(ambientLight);

        const direLight = new THREE.DirectionalLight(0xffffff, 0.5);
        direLight.position.set(0, 100, 0)
        scene.add(direLight);
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